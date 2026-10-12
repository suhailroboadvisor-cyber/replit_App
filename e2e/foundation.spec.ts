import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

for (const locale of ["ar", "en"] as const) {
  for (const theme of ["dark", "light"] as const) {
    test(`styleguide ${locale} ${theme}: screenshots and accessible components`, async ({
      page,
    }, testInfo) => {
      await page.addInitScript(
        (t) => localStorage.setItem("suhail-theme", t),
        theme,
      );
      await page.goto(locale === "ar" ? "/styleguide" : "/en/styleguide");
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("html")).toHaveAttribute(
        "dir",
        locale === "ar" ? "rtl" : "ltr",
      );
      if (theme === "dark")
        await expect(page.locator("html")).toHaveClass(/dark/);
      else await expect(page.locator("html")).not.toHaveClass(/dark/);
      await expect(
        page.getByRole("button", {
          name: locale === "ar" ? "تغيير المظهر" : "Change theme",
        }),
      ).toBeEnabled();
      await page.evaluate(() => document.fonts.ready);
      for (const surface of ["dark", "light"]) {
        const section = page.getByTestId(`surface-${surface}`);
        await expect(section.locator(".status-pass svg")).toHaveClass(
          /lucide-check/,
        );
        await expect(section.locator(".status-fail svg")).toHaveClass(
          /lucide-x/,
        );
        await expect(section.locator(".status-review svg")).toHaveClass(
          /lucide-triangle-alert/,
        );
        await expect(section.locator(".status-insufficient svg")).toHaveClass(
          /lucide-circle-help/,
        );
        const styles = await section
          .locator(".status-review")
          .evaluate((node) => ({
            border: getComputedStyle(node).borderWidth,
            fill: getComputedStyle(node).backgroundColor,
          }));
        expect(styles).toEqual({ border: "2px", fill: "rgba(0, 0, 0, 0)" });
      }
      const scan = await new AxeBuilder({ page }).analyze();
      expect(
        scan.violations.filter((v) =>
          ["serious", "critical"].includes(v.impact ?? ""),
        ),
      ).toEqual([]);
      await mkdir("generated-artifacts/styleguide", { recursive: true });
      const screenshot = path.resolve(
        `generated-artifacts/styleguide/${locale}-${theme}.png`,
      );
      await page.screenshot({ path: screenshot, fullPage: true });
      await testInfo.attach(`styleguide-${locale}-${theme}`, {
        path: screenshot,
        contentType: "image/png",
      });
      await testInfo.attach("axe-results", {
        body: JSON.stringify(scan, null, 2),
        contentType: "application/json",
      });
    });
  }
}
test("same-path locale switching, persisted theme and full disclaimer", async ({
  page,
}) => {
  await page.goto("/styleguide");
  await page.getByRole("link", { name: "تغيير اللغة" }).click();
  await expect(page).toHaveURL(/\/en\/styleguide$/);
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  await page.getByRole("button", { name: "Change theme" }).click();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
  await page.getByRole("link", { name: "Change language" }).click();
  await expect(page).toHaveURL(/\/styleguide$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.locator("html")).not.toHaveClass(/dark/);
  await page.getByRole("button", { name: "تغيير المظهر" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await page.getByRole("link", { name: "إخلاء المسؤولية الكامل" }).click();
  await expect(page.locator("#full-disclaimer")).toHaveAttribute("open", "");
});
test("default theme, home locales, keyboard and no external font requests", async ({
  page,
}) => {
  const externalFonts: string[] = [];
  page.on("request", (req) => {
    if (/fonts\.googleapis|fonts\.gstatic/.test(req.url()))
      externalFonts.push(req.url());
  });
  for (const [url, locale, dir] of [
    ["/", "ar", "rtl"],
    ["/en", "en", "ltr"],
  ]) {
    await page.goto(url);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("html")).toHaveAttribute("dir", dir);
    await expect(page.locator("html")).toHaveClass(/dark/);
    await page.keyboard.press("Tab");
    await expect(page.locator('a[href="#content"]')).toBeFocused();
  }
  expect(externalFonts).toEqual([]);
});
