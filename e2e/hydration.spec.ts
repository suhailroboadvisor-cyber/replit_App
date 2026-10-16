import { expect, test, type Page } from "@playwright/test";
import { formatTimestamp } from "../src/lib/format";

const failures = new WeakMap<Page, string[]>();
test.beforeEach(async ({ page, context }) => {
  const errors: string[] = [];
  failures.set(page, errors);
  // Install BEFORE goto/click/reload. No console error exemptions.
  page.on("console", (message) => {
    if (message.type() === "error" || (message.type() === "warning" && /hydrat|server.render|script/i.test(message.text())))
      errors.push(`${page.url()} console.${message.type()}: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`${page.url()} pageerror: ${error.stack ?? error.message}`));
  await context.addCookies([{ name: "hydration-session", value: "admin", url: "http://127.0.0.1:3500" }]);
});
test.afterEach(async ({ page }, info) => {
  const errors = failures.get(page) ?? [];
  await info.attach("route-console-and-page-errors", { body: errors.join("\n"), contentType: "text/plain" });
  expect(errors, "Every console error, hydration warning and page error is a regression").toEqual([]);
});

async function checkTheme(page: Page, theme: string) {
  // toHaveURL can resolve at document commit, before delayed async chunks load.
  // Direct goto defaults to load; use that same boundary for link navigation.
  await page.waitForLoadState("load");
  if (/\/admin\/methodologies/.test(page.url())) {
    // The unchanged admin header has no theme toggle. Exercise a real client
    // state transition instead of treating static markup as hydrated UI.
    const create = page.getByRole("button", { name: /Create methodology/ });
    await create.click();
    await expect(page.locator("form")).toHaveCount(2); // sign-out + metadata form
    await create.click();
    await expect(page.locator("form")).toHaveCount(1);
  } else {
    await expect(page.getByRole("button", { name: /Change theme|تغيير المظهر/, exact: true })).toBeEnabled();
  }
  expect(await page.locator("html").evaluate((node) => node.classList.contains("dark"))).toBe(theme === "dark");
  // This is browser paint timing, not a post-hydration theme assertion.
  await expect.poll(() => page.evaluate(() => performance.getEntriesByType("paint").length)).toBeGreaterThan(0);
  const timing = await page.evaluate(() => ({
    paints: performance.getEntriesByType("paint").map(({ name, startTime }) => ({ name, startTime })),
    restores: performance.getEntriesByName("theme-applied").map(({ startTime }) => startTime),
    reads: performance.getEntriesByName("theme-storage-read").length,
  }));
  expect(timing.restores, `theme restoration once per document: ${JSON.stringify(timing)}`).toHaveLength(1);
  expect(timing.reads).toBe(1);
  for (const paint of timing.paints)
    expect(timing.restores[0], `restore before ${paint.name}: ${JSON.stringify(timing)}`).toBeLessThanOrEqual(paint.startTime);
}

for (const locale of ["ar", "en"] as const) {
  const prefix = locale === "en" ? "/en" : "";
  for (const theme of ["light", "dark"] as const) {
    test(`${locale} ${theme}: real Next SSR, direct loads, reloads and route-group navigation`, async ({ page, request }) => {
      await page.addInitScript((saved) => {
        localStorage.setItem("suhail-theme", saved);
        const get = Storage.prototype.getItem;
        Storage.prototype.getItem = function(key) {
          if (key === "suhail-theme") performance.mark("theme-storage-read");
          return get.call(this, key);
        };
        const toggle = DOMTokenList.prototype.toggle;
        DOMTokenList.prototype.toggle = function(token, force) {
          const result = force === undefined ? toggle.call(this, token) : toggle.call(this, token, force);
          if (this === document.documentElement.classList && token === "dark")
            performance.mark("theme-applied");
          return result;
        };
      }, theme);
      // A fast local bootstrap must not conceal a first-paint theme flash.
      await page.route("**/_next/static/**/*.js", async (route) => {
        await new Promise((resolve) => setTimeout(resolve, 250));
        await route.continue();
      });
      await page.route("**/theme-restore.js", async (route) => {
        // Verify render blocking itself, not only a fast theme-resource race.
        await new Promise((resolve) => setTimeout(resolve, 350));
        await route.continue();
      });
      for (const route of ["/", "/methodology", "/auth/sign-in", "/account", "/admin"]) {
        await page.context().addCookies([{ name: "hydration-session", value: route === "/account" ? "user" : "admin", url: "http://127.0.0.1:3500" }]);
        const url = route === "/" ? prefix || "/" : `${prefix}${route}`;
        const response = await page.goto(url);
        expect(response?.status(), url).toBe(200);
        const html = await response!.text();
        // Assert real server markup before trusting any browser result.
        expect(html).toContain("<h1");
        expect(html).toContain("suhail-theme-restore");
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        await checkTheme(page, theme);
        if (route === "/account") {
          const expected = formatTimestamp("2026-10-11T22:30:00Z", locale, { dateStyle: "medium" });
          expect(html).toContain(expected);
          await expect(page.getByText(expected, { exact: true })).toBeVisible();
        }
        if (["/auth/sign-in", "/account", "/admin"].includes(route)) {
          const csp = response!.headers()["content-security-policy"];
          const nonce = /'nonce-([^']+)'/.exec(csp)?.[1];
          expect(nonce).toBeTruthy();
          expect(csp).toContain("'strict-dynamic'");
          expect(csp.split(";").find((directive) => directive.trim().startsWith("script-src "))).not.toContain("'unsafe-inline'");
          const scripts = await page.locator("script").evaluateAll((nodes) => nodes.map((node) => node.nonce));
          expect(scripts.every((value) => value === nonce), `${url} script nonces`).toBe(true);
          expect(response!.headers()["cache-control"]).toContain("no-store");
        } else {
          expect(response!.headers()["cache-control"]).toContain("s-maxage=900");
          expect(response!.headers()["set-cookie"]).toBeUndefined();
          const cookieFree = await request.get(url);
          const cookieProbe = await request.get(url, { headers: { Cookie: "probe=synthetic; suhail-theme=light" } });
          expect(await cookieProbe.text()).toBe(await cookieFree.text());
          expect(cookieProbe.headers()["vary"] ?? "").not.toMatch(/cookie/i);
        }
        await page.reload();
        await checkTheme(page, theme);
      }

      // Real shared-header Link navigation within the public root, then normal
      // document links across public/private/admin roots (including /admin redirect).
      await page.goto(prefix || "/");
      await page.locator(`header a[href="${prefix}/methodology"]`).first().click();
      await expect(page).toHaveURL(`${prefix}/methodology`);
      await checkTheme(page, theme);
      await page.locator(`header a[href="${prefix}/auth/sign-in"]`).first().click();
      await expect(page).toHaveURL((url) => url.pathname === `${prefix}/auth/sign-in` && url.searchParams.get("next") === `${prefix}/methodology`);
      await checkTheme(page, theme);
      await page.locator("header summary").click();
      await page.locator(`header a[href="${prefix}/account"]`).click();
      await expect(page).toHaveURL(`${prefix}/account`);
      await checkTheme(page, theme);
      await page.locator("header summary").click();
      await page.locator(`header a[href="${prefix}/admin"]`).click();
      await expect(page).toHaveURL(`${prefix}/admin/methodologies`);
      await checkTheme(page, theme);
      await page.locator("header a[href]").first().click();
      await expect(page).toHaveURL(prefix || "/");
      await checkTheme(page, theme);
      await page.getByRole("link", { name: locale === "ar" ? "تغيير اللغة" : "Change language", exact: true }).click();
      await expect(page.locator("html")).toHaveAttribute("lang", locale === "ar" ? "en" : "ar");
      await checkTheme(page, theme);
    });
  }
}
