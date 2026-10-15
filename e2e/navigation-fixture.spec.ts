import { expect, test } from "@playwright/test";
import { approvedArabicCopy } from "../src/i18n/approved-arabic";

for (const locale of ["ar","en"] as const) {
  const home = locale==="en"?"/en":"/";
  const prefix=locale==="en"?"/en":"";
  for (const screen of ["header","signin","consent","account","enroll","verify","users","deferred","methodologies","not-found","error","global-error"]) {
    test(`${locale} ${screen}: visible keyboard-operable home escape`, async ({page}) => {
      await page.setViewportSize({width:390,height:844});
      await page.goto(`${home}?screen=${screen}`);
      const link=page.locator(`a[href="${home}"]`).first();
      await expect(link).toBeVisible();
      // Reach the home link from the keyboard, not by programmatic focus alone.
      for (let index=0;index<12 && !(await link.evaluate(el=>el===document.activeElement));index++) await page.keyboard.press("Tab");
      await expect(link).toBeFocused();
      expect(await link.evaluate(el=>getComputedStyle(el).outlineStyle)).not.toBe("none");
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(home);
      await expect(page.getByRole("heading",{name:"Suhail home"})).toBeVisible();
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    });
  }
  for (const screen of ["signin","consent","enroll","verify"]) {
    test(`${locale} ${screen}: safe-next back link and secure MFA signout`, async ({page}) => {
      const target=`${prefix}/admin/methodologies?methodology=parent`;
      await page.goto(`${home}?screen=${screen}&next=${encodeURIComponent(target)}`);
      const back=page.locator("a").filter({has:page.locator("[data-back-direction]")}).first();
      await expect(back).toHaveAttribute("href",target);
      await expect(back.locator("svg")).toHaveAttribute("data-back-direction",locale==="ar"?"right":"left");
      if (screen==="enroll"||screen==="verify") {
        const form=page.locator("main").locator(`form[action="${prefix}/auth/sign-out"]`);
        await expect(form).toHaveAttribute("method","post");
        await form.getByRole("button").click();
        await expect(page).toHaveURL(`${prefix}/auth/sign-out`);
        await page.goto(`${home}?screen=${screen}&next=${encodeURIComponent(target)}`);
      }
      await back.click();
      await expect(page).toHaveURL(target);
      // Fixture only demonstrates navigation; actual access checks stay in real routes.
    });
    test(`${locale} ${screen}: rejects unsafe and recursive next destinations`, async ({page}) => {
      for (const next of ["https://evil.invalid","//evil.invalid","/%2fevil.invalid","/en/auth/consent","/admin/mfa/enroll"]) {
        await page.goto(`${home}?screen=${screen}&next=${encodeURIComponent(next)}`);
        const back=page.locator("a").filter({has:page.locator("[data-back-direction]")}).first();
        await expect(back).toHaveAttribute("href",home);
      }
    });
  }
  test(`${locale}: provider error, server identity and MFA-incomplete identity retain the shared header`, async ({page}) => {
    for (const screen of ["signin","consent","enroll","verify"]) {
      await page.goto(`${home}?screen=${screen}&identity=admin&error=cancelled`);
      await expect(page.locator("header.surface-dark")).toHaveCount(1);
      await page.locator("header.surface-dark summary").click();
      await expect(page.locator("header.surface-dark").getByText("Fixture Admin",{exact:true})).toBeVisible();
      await expect(page.locator(`header.surface-dark a[href="${prefix}/account"]`)).toBeVisible();
    }
    await page.goto(`${home}?screen=signin&error=cancelled&identity=anonymous`);
    await expect(page.getByRole("alert")).toContainText(locale==="ar"?approvedArabicCopy["Sign-in was cancelled. You can try again."]:"Sign-in was cancelled. You can try again.");
    await expect(page.locator(`header.surface-dark a[href="${home}"]`).first()).toBeVisible();
  });
  test(`${locale}: nested breadcrumbs and parent links restore valid context`,async({page})=>{
    const method="11111111-1111-4111-8111-111111111111",version="22222222-2222-4222-8222-222222222222";
    await page.goto(`${prefix}/admin/methodologies?methodology=${method}&version=${version}#criteria-record`);
    const adminNav=page.getByRole("navigation",{name:locale==="ar"?approvedArabicCopy["Admin navigation"]:"Admin navigation"});
    await expect(adminNav.locator('[aria-current="page"]')).toHaveCount(1);
    await expect(adminNav.locator('[aria-current="page"]')).toHaveAttribute("href",`${prefix}/admin`);
    const criteria=page.locator("#criteria-record");
    await expect(criteria.getByRole("navigation")).toBeVisible();
    const back=criteria.locator(`a[href$="#version-record"]`).last();
    await back.click();
    await expect(page).toHaveURL(`${prefix}/admin/methodologies?methodology=${method}&version=${version}#version-record`);
    await expect(page.locator("#version-record")).toContainText("UI v1");
    await page.locator('#version-record a[href$="#reports-title"]').click();
    // The report archive is nested under the selected version, not an invented route.
    const reportSection=page.locator('section[aria-labelledby="reports-title"]');
    await expect(reportSection.getByRole("navigation")).toBeVisible();
    await reportSection.locator('a[href$="#version-record"]').first().click();
    await page.locator('#version-record > a[href$="#methodology-record"]').click();
    await expect(page).toHaveURL(`${prefix}/admin/methodologies?methodology=${method}#methodology-record`);
    await expect(page.locator("#methodology-record")).toContainText("UI fixture methodology");
    await page.locator('a').filter({hasText:"Back to Suhail"}).click();
    await expect(page).toHaveURL(home);
  });
  test(`${locale}: a deep-linked version cannot escape its selected methodology`,async({page})=>{
    const parent="55555555-5555-4555-8555-555555555555",child="66666666-6666-4666-8666-666666666666";
    for (const version of [child,"22222222-2222-4222-8222-222222222222","invalid"]) {
      await page.goto(`${prefix}/admin/methodologies?methodology=${parent}&version=${version}#criteria-record`);
      await expect(page.locator("#version-record")).toContainText("Second v2");
      await page.locator('#criteria-record a[href$="#version-record"]').last().click();
      await expect(page).toHaveURL(`${prefix}/admin/methodologies?methodology=${parent}&version=${child}#version-record`);
      await page.locator('#version-record > a[href$="#methodology-record"]').click();
      await expect(page).toHaveURL(`${prefix}/admin/methodologies?methodology=${parent}#methodology-record`);
      await expect(page.locator("#methodology-record")).toContainText("Second UI methodology");
    }
  });
}
