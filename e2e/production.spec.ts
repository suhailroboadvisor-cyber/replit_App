import { expect, test, type Page } from "@playwright/test";

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

const publicHomes = {
  ar: {
    path: "/",
    dir: "rtl",
    theme: "تغيير المظهر",
    language: "تغيير اللغة",
    skip: "الانتقال إلى المحتوى",
    disclaimer: "إخلاء المسؤولية الكامل",
  },
  en: {
    path: "/en",
    dir: "ltr",
    theme: "Change theme",
    language: "Change language",
    skip: "Skip to content",
    disclaimer: "Full disclaimer",
  },
} as const;

async function expectHomeTheme(
  page: Page,
  locale: keyof typeof publicHomes,
  theme: "dark" | "light",
) {
  const home = publicHomes[locale];
  await expect(page).toHaveURL(new RegExp(`${home.path}$`));
  await expect(page.locator("html")).toHaveAttribute("lang", locale);
  await expect(page.locator("html")).toHaveAttribute("dir", home.dir);
  const control = page.getByRole("button", { name: home.theme, exact: true });
  // Enabled and aria-pressed prove hydration, not just the before-paint script.
  await expect(control).toBeEnabled();
  await expect(control).toHaveAttribute("aria-pressed", String(theme === "dark"));
  if (theme === "dark") await expect(page.locator("html")).toHaveClass(/dark/);
  else await expect(page.locator("html")).not.toHaveClass(/dark/);
}

for (const locale of ["ar", "en"] as const) {
  const home = publicHomes[locale];
  const otherLocale = locale === "ar" ? "en" : "ar";
  const otherHome = publicHomes[otherLocale];

  test(`public production ${locale}: hydrated theme persists through reloads and locale switches`, async ({
    page,
  }) => {
    // Use real user choices; an init script resetting storage on navigation
    // would mask a broken toggle or persistence implementation.
    await page.goto(home.path);
    expect(await page.evaluate(() => localStorage.getItem("suhail-theme"))).toBeNull();
    await expectHomeTheme(page, locale, "dark");
    await page.getByRole("button", { name: home.theme, exact: true }).click();
    await expectHomeTheme(page, locale, "light");
    expect(await page.evaluate(() => localStorage.getItem("suhail-theme"))).toBe("light");
    await page.reload();
    await expectHomeTheme(page, locale, "light");

    await page.getByRole("link", { name: home.language, exact: true }).click();
    await expectHomeTheme(page, otherLocale, "light");
    await page.reload();
    await expectHomeTheme(page, otherLocale, "light");
    await page.getByRole("button", { name: otherHome.theme, exact: true }).click();
    await expectHomeTheme(page, otherLocale, "dark");
    expect(await page.evaluate(() => localStorage.getItem("suhail-theme"))).toBe("dark");
    await page.reload();
    await expectHomeTheme(page, otherLocale, "dark");

    await page.getByRole("link", { name: otherHome.language, exact: true }).click();
    await expectHomeTheme(page, locale, "dark");
    await page.reload();
    await expectHomeTheme(page, locale, "dark");
  });

  test(`public production ${locale}: keyboard skip link and full disclaimer work`, async ({
    page,
  }) => {
    await page.goto(home.path);
    await expectHomeTheme(page, locale, "dark");
    const skip = page.getByRole("link", { name: home.skip, exact: true });
    await page.keyboard.press("Tab");
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#content$/);
    await expect(page.getByRole("main")).toHaveAttribute("id", "content");
    await expect(page.getByRole("main")).toBeInViewport();
    // Non-tabindex main landmarks receive the browser's sequential-focus start.
    // The next Tab must bypass the header, not return to its navigation.
    await page.keyboard.press("Tab");
    const details = page.locator("#full-disclaimer");
    const summary = details.locator("summary");
    await expect(summary).toBeFocused();
    await expect(details).not.toHaveAttribute("open");
    await expect(details.locator("p")).toBeHidden();

    // Exercise the hydrated link handler, not merely the native summary toggle.
    await page.getByRole("link", { name: home.disclaimer, exact: true }).click();
    await expect(page).toHaveURL(/#full-disclaimer$/);
    await expect(details).toHaveAttribute("open", "");
    await expect(details.locator("p")).toBeVisible();
    await expect(details.locator("p")).toContainText("Investing involves risk");
    await summary.click();
    await expect(details).not.toHaveAttribute("open");
    await expect(details.locator("p")).toBeHidden();
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(details).toHaveAttribute("open", "");
    await expect(details.locator("p")).toBeVisible();
  });
}
