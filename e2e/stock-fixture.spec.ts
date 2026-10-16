import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import { checkRegister } from "../src/lib/copy-register";
import { formatCalendarDate } from "../src/lib/format";
import ar from "../src/i18n/messages/ar.json";
import en from "../src/i18n/messages/en.json";

for (const locale of ["ar", "en"] as const) {
  for (const [slug, company, status] of [
    ["demo-fixa", "Fixture Alpha Co", "passes_selected_methodology"],
    ["demo-fixb", "Fixture Beta Co", "requires_review"],
    ["demo-fixc", "Fixture Gamma Co", "fails_selected_methodology"],
    ["demo-fixd", "Fixture Delta Co", "insufficient_data"],
  ] as const) {
    test(`${locale} ${slug}: raw SSR, metadata, evidence order, register, accessibility and themes`, async ({ page, request }) => {
      const path = `${locale === "en" ? "/en" : ""}/stock/${slug}`;
      const response = await request.get(path);
      expect(response.status()).toBe(200);
      const html = await response.text();
      expect(html).toContain(company);
      expect(html).toContain((locale === "ar" ? ar : en).status[status]);
      expect(html).toContain(formatCalendarDate("2025-12-31", locale));
      expect(html).not.toContain("<script");
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
      await page.goto(path);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("html")).toHaveAttribute("dir", locale === "ar" ? "rtl" : "ltr");
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", new RegExp(company));
      await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", /EX-A/);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /app-icon/);
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary");
      expect(await page.locator("[data-section]").evaluateAll(nodes => nodes.map(node => node.getAttribute("data-section")))).toEqual(["header", "screening", "why", "known", "unknown", "methodology", "criteria", "fundamentals", "sources", "history", "metadata", "disclaimer"]);
      expect(checkRegister(await page.locator("body").innerText(), locale).hardBans).toEqual([]);
      await expect(page.locator("[data-coverage-seal]")).toHaveCount(slug === "demo-fixa" ? 1 : 0);
      for (const theme of ["dark", "light"]) {
        await page.goto(`${path}?theme=${theme}`);
        const results = await new AxeBuilder({ page }).analyze();
        expect(results.violations.filter(v => v.impact === "serious" || v.impact === "critical")).toEqual([]);
        await mkdir("generated-artifacts/stock-screenshots", { recursive: true });
        await page.screenshot({ path: `generated-artifacts/stock-screenshots/${slug}-${locale}-${theme}.png`, fullPage: true });
      }
      expect(errors).toEqual([]);
    });
  }
  test(`${locale}: hidden, no-run and uncovered passing cases; native calculations at phone width`, async ({ page, request }) => {
    const prefix = locale === "en" ? "/en" : "";
    expect((await request.get(`${prefix}/stock/demo-hidden`)).status()).toBe(404);
    await page.goto(`${prefix}/stock/demo-new`);
    await expect(page.locator("[data-section=header]")).toContainText("Fixture New Co");
    await expect(page.locator("[data-section=disclaimer]")).toBeVisible();
    await expect(page.locator("[data-section=screening]")).toContainText("No screening run recorded");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${prefix}/stock/demo-fixu`);
    await expect(page.locator("[data-coverage-seal]")).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.locator("details summary:visible").first().click();
    await expect(page.locator("details:visible").first()).toHaveAttribute("open", "");
  });
}

test("stored explanation slot, status-only history and reverse bilingual fallback", async ({ page }) => {
  await page.goto("/en/stock/demo-fixa?variant=passed");
  await expect(page.locator("[data-section=explanation]")).toContainText("Fixture narrative grounded in stored evidence.");
  await page.goto("/en/stock/demo-fixa?variant=failed");
  await expect(page.locator("[data-section=explanation]")).not.toContainText("Fixture narrative grounded in stored evidence.");
  await page.goto("/stock/demo-fixa?variant=passed");
  await expect(page.locator("[data-section=explanation]")).not.toContainText("Fixture narrative grounded in stored evidence.");
  await page.goto("/en/stock/demo-fixa?variant=history");
  await expect(page.locator("[data-section=history]")).toContainText("Unchanged");
  await page.goto("/en/stock/demo-fixa?variant=reverse-fallback");
  await expect(page.locator("[data-section=header]")).toContainText("Arabic only");
});
