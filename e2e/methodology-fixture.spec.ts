import { expect, test } from "@playwright/test";
for(const locale of ["ar","en"]) {
  const prefix=locale==="en"?"/en":"";
  test(`${locale} editors can read coverage but cannot author methodology content`,async({page})=>{
    await page.goto(`${prefix}/admin/methodologies?screen=methodologies&role=editor`);
    await expect(page.getByRole("button",{name:/Create methodology$/})).toHaveCount(0);
    await expect(page.getByRole("button",{name:/Edit criterion$/})).toHaveCount(0);
    await expect(page.getByText("Fixture debt",{exact:true}).first()).toBeVisible();
    await page.locator("summary").filter({hasText:"Test report"}).click();
    await expect(page.getByText("fail",{exact:true}).first()).toBeVisible();
    expect(await page.evaluate(()=>window.methodologyFixture.calls)).toEqual([]);
  });
  test(`${locale} finalized content is visibly read-only`,async({page})=>{
    await page.goto(`${prefix}/admin/methodologies?screen=methodologies&final=1`);
    await expect(page.getByRole("button",{name:/Edit criterion$/})).toHaveCount(0);
    await expect(page.locator("textarea").filter({hasNot:page.locator("#workflow-note")})).not.toHaveCount(0);
    await expect(page.getByText(/Finalized version content/).first()).toBeVisible();
  });
  test(`${locale} stale criterion save shows the refusal and keeps entered content`,async({page})=>{
    await page.goto(`${prefix}/admin/methodologies?screen=methodologies`);
    await page.getByRole("button",{name:/Edit criterion$/}).click();
    await page.locator("#criterion-threshold").fill("25");
    await page.getByRole("button",{name:/^(?:⟦AR-REVIEW⟧ )?Save$/}).click();
    await expect(page.getByText(/Finalized criteria are immutable/)).toBeVisible();
    await expect(page.locator("#criterion-threshold")).toHaveValue("25");
    expect((await page.evaluate(()=>window.methodologyFixture.calls))[0].operation).toBe("criterion");
  });
}
