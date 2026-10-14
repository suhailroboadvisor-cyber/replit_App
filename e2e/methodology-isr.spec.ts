import { expect, test } from "@playwright/test";
import { existsSync, readFileSync } from "node:fs";

// next-intl serializes the full message dictionary into script/Flight payloads,
// including unused error-copy keys. Assert the rendered markup, not that table.
function visibleMarkup(html: string) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
}

test("a successful database-backed build contains no unavailable methodology pages", () => {
  const manifest = JSON.parse(readFileSync(".next/prerender-manifest.json", "utf8"));
  for (const locale of ["ar", "en"]) {
    expect(manifest.routes[`/${locale}/methodology`].initialRevalidateSeconds).toBe(900);
    const html = readFileSync(`.next/server/app/${locale}/methodology.html`, "utf8");
    expect(visibleMarkup(html)).not.toContain("Methodology register unavailable");
    expect(visibleMarkup(html)).not.toContain("registerUnavailable");
  }
});

for (const [locale, path] of [["ar", "/methodology"], ["en", "/en/methodology"]] as const) {
  test(`failed ISR revalidation on ${path} retains the last good page`, async ({ request }) => {
    const cachePath = `.next/server/app/${locale}/methodology.html`;
    const good = readFileSync(cachePath, "utf8");
    const first = await request.get(path);
    expect(first.status()).toBe(200);
    expect(first.headers()["x-nextjs-cache"]).toBe("STALE");
    expect(await first.text()).toBe(good);
    // Background revalidation must fail (database URLs are absent). Give it
    // time to finish, then ensure neither response nor persistent cache changed.
    await new Promise(resolve => setTimeout(resolve, 1000));
    const retry = await request.get(path);
    expect(retry.status()).toBe(200);
    expect(await retry.text()).toBe(good);
    expect(readFileSync(cachePath, "utf8")).toBe(good);
  });
}

for (const path of ["/methodology/sample", "/en/methodology/sample"]) {
  test(`a failed database read on ${path} cannot create a cached error page`, async ({ request }) => {
    for (let attempt = 0; attempt < 2; attempt++) {
      const response = await request.get(path);
      expect(response.status()).toBe(500);
      expect(response.headers()["cache-control"]).toContain("no-store");
      const html = await response.text();
      expect(visibleMarkup(html)).not.toContain("Methodology register unavailable");
      expect(visibleMarkup(html)).not.toContain("registerUnavailable");
    }
    for (const locale of ["ar", "en"]) {
      expect(existsSync(`.next/server/app/${locale}/methodology/sample.html`)).toBe(false);
    }
  });
}
