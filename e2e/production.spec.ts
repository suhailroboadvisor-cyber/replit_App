test("encoded private roots including dotted descendants stay private over actual HTTP", async ({
  request,
}) => {
  for (const path of [
    "/%61dmin",
    "/%65n/%61dmin",
    "/en/%61uth/sign-in",
    "/en/%61dmin/hidden.json",
  ]) {
    const response = await request.get(path, { maxRedirects: 0 });
    const headers = response.headers();
    expect(headers["cache-control"]).toContain("private");
    expect(headers["cache-control"]).toContain("no-store");
    expect(headers["cdn-cache-control"]).toBe("no-store");
    expect(headers["x-robots-tag"]).toContain("noindex");
    expect(headers["content-security-policy"]).toMatch(/nonce-[^']+'/);
  }
  const malformed = await request.get("/%ZZ", { maxRedirects: 0 });
  expect(malformed.status()).toBe(400);
  const publicResponse = await request.get("/en/terms", {
    headers: { "x-private-path": "/en/admin", "x-nonce": "spoofed" },
    maxRedirects: 0,
  });
  expect(publicResponse.headers()["content-security-policy"]).toBeUndefined();
  expect(publicResponse.headers()["set-cookie"]).toBeUndefined();
});
import { expect, test } from "@playwright/test";
test("private production scripts use nonce CSP and restore theme; legal remains cookie-free ISR", async ({
  page,
  request,
}) => {
  const violations: string[] = [];
  page.on("console", (message) => {
    if (
      /Refused to execute|violates.*Content Security Policy|Executing inline script/.test(
        message.text(),
      )
    )
      violations.push(message.text());
  });
  await page.addInitScript(() => localStorage.setItem("suhail-theme", "light"));
  let profiles = 0;
  page.on("request", (request) => {
    if (request.url().endsWith("/api/account/profile")) profiles++;
  });
  await page.goto("/");
  await expect(page.getByRole("link", { name: "تسجيل الدخول" })).toBeVisible();
  expect(profiles).toBe(0);
  const response = await page.goto("/en/auth/sign-in?next=%2Fen%2Faccount");
  await expect(page.locator("html")).not.toHaveClass(/dark/);
  await expect(
    page.getByRole("button", { name: "Continue with Google" }),
  ).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
  const csp = response?.headers()["content-security-policy"] ?? "";
  expect(csp).toContain("'strict-dynamic'");
  const nonce = /nonce-([^']+)/.exec(csp)?.[1];
  expect(nonce).toBeTruthy();
  const scripts = await page
    .locator("script")
    .evaluateAll((elements) => elements.map((element) => element.nonce));
  expect(scripts.every((value) => value === nonce)).toBe(true);
  expect(violations).toEqual([]);
  const legal = await request.get("/en/terms");
  expect(legal.headers()["set-cookie"]).toBeUndefined();
  expect(legal.headers()["content-security-policy"]).toBeUndefined();
  expect(legal.headers()["cache-control"]).toContain("s-maxage=900");
  expect(await legal.text()).toContain("⟦LEGAL-REVIEW⟧");
});

test("styleguide excluded in production in both locales; shell is static and health unchanged", async ({
  request,
}) => {
  for (const url of ["/styleguide", "/en/styleguide"])
    expect((await request.get(url)).status()).toBe(404);
  for (const [url, locale, dir] of [
    ["/", "ar", "rtl"],
    ["/en", "en", "ltr"],
  ]) {
    const response = await request.get(url);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["set-cookie"]).toBeUndefined();
    expect(await response.text()).toContain(`lang="${locale}" dir="${dir}"`);
  }
  expect(await (await request.get("/api/health")).json()).toMatchObject({
    status: "ok",
  });
  expect((await request.get("/manifest.webmanifest")).ok()).toBeTruthy();
});
