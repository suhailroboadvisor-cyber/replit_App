import { expect, test } from "@playwright/test";

const securitiesUrl = "/en/admin/securities?screen=financial";
const readCalls = () => window.financialFixture.calls;

test("admin can preview a fixture ticker and confirm it for ingestion", async ({ page }) => {
  await page.goto(`${securitiesUrl}&role=admin`);
  await page.getByLabel("Ticker").fill("NEWF");
  await page.getByRole("button", { name: "Preview", exact: true }).click();
  await expect(page.getByText("0000000001")).toBeVisible();
  await expect(page.getByText("Fixture Research Systems").first()).toBeVisible();
  await page.getByRole("button", { name: "Confirm and ingest", exact: true }).click();
  await expect.poll(async () => page.evaluate(readCalls)).toHaveLength(2);
  const calls = await page.evaluate(readCalls);
  expect(calls[0]).toMatchObject({ operation: "lookup", data: { ticker: "NEWF" } });
  expect(calls[1]).toMatchObject({ operation: "add", data: { ticker: "NEWF" } });
});

test("editor can inspect records but cannot invoke financial mutations", async ({ page }) => {
  await page.goto(`${securitiesUrl}&role=editor`);
  await expect(page.getByRole("button", { name: "Preview", exact: true })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Override", exact: true })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Confirm from filing", exact: true })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Accept SEC", exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "Segments", exact: true }).click();
  await expect(page.getByRole("button", { name: "Add segment", exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "Prices", exact: true }).click();
  await expect(page.getByLabel("Close", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Save close", exact: true })).toHaveCount(0);
  expect(await page.evaluate(readCalls)).toEqual([]);
});

test("admin can override, confirm from a filing, and accept a retained SEC alternative", async ({ page }) => {
  await page.goto(`${securitiesUrl}&role=admin`);
  await page.getByRole("button", { name: "Override", exact: true }).first().click();
  await page.getByLabel("Value", { exact: true }).fill("260000");
  await page.getByLabel("Reason (required)", { exact: true }).fill("Fixture correction review");
  await page.getByLabel("Source label", { exact: true }).fill("Fixture internal review");
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect.poll(async () => page.evaluate(readCalls)).toHaveLength(1);
  await expect(page.getByRole("button", { name: "Confirm from filing", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Confirm from filing", exact: true }).click();
  await page.getByLabel("Source label", { exact: true }).fill("Fixture note confirmation");
  await page.getByLabel("Filing note reference", { exact: true }).fill("FIXTURE-NOTE-01");
  await page.getByLabel("Source URL", { exact: true }).fill("https://example.invalid/fixture-note");
  await page.getByLabel("Reason (required)", { exact: true }).fill("Fixture filing note verified");
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect.poll(async () => page.evaluate(readCalls)).toHaveLength(2);
  await page.getByRole("button", { name: "Accept SEC", exact: true }).click();
  await expect.poll(async () => page.evaluate(readCalls)).toHaveLength(3);
  const calls = await page.evaluate(readCalls);
  expect(calls[0]).toMatchObject({ operation: "override", data: { factId: "77777777-7777-4777-8777-777777777777", value: "260000", reason: "Fixture correction review" } });
  expect(calls[1]).toMatchObject({ operation: "confirm", data: { factId: "55555555-5555-4555-8555-555555555555", reason: "Fixture filing note verified", source: { source_type: "regulatory_filing", document_reference: "FIXTURE-NOTE-01" } } });
  expect(calls[2]).toMatchObject({ operation: "accept", data: { factId: "66666666-6666-4666-8666-666666666666" } });
});

test("admin can create, edit, and delete a latest-period segment", async ({ page }) => {
  await page.goto(`${securitiesUrl}&role=admin`);
  await page.getByRole("button", { name: "Segments", exact: true }).click();
  await page.getByRole("button", { name: "Add segment", exact: true }).click();
  await page.getByLabel("Segment name", { exact: true }).fill("Fixture new segment");
  await page.getByLabel("Revenue amount", { exact: true }).fill("18000");
  await page.getByLabel("Source label", { exact: true }).fill("Fixture segment filing");
  await page.getByLabel("Filing note reference", { exact: true }).fill("FIXTURE-SEGMENT-01");
  await page.getByLabel("Source URL", { exact: true }).fill("https://example.invalid/fixture-segment");
  await page.getByRole("button", { name: "Save segment", exact: true }).click();
  await expect.poll(async () => page.evaluate(readCalls)).toHaveLength(1);
  await page.getByRole("button", { name: "Edit", exact: true }).click();
  await page.getByLabel("Segment name", { exact: true }).fill("Fixture services revised");
  await page.getByRole("button", { name: "Save segment", exact: true }).click();
  await expect.poll(async () => page.evaluate(readCalls)).toHaveLength(2);
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Delete", exact: true }).click();
  await expect.poll(async () => page.evaluate(readCalls)).toHaveLength(3);
  const calls = await page.evaluate(readCalls);
  expect(calls[0]).toMatchObject({ operation: "segment", data: { segment_name: "Fixture new segment", activity_category: "unclassified", source: { source_type: "regulatory_filing" } } });
  expect(calls[1]).toMatchObject({ operation: "segment", data: { id: "99999999-9999-4999-8999-999999999999", segment_name: "Fixture services revised" } });
  expect(calls[2]).toMatchObject({ operation: "deleteSegment", data: { id: "99999999-9999-4999-8999-999999999999" } });
});

test("admin can save manual price, coverage, company fields, and confirm removal", async ({ page }) => {
  await page.goto(`${securitiesUrl}&role=admin`);
  await page.getByRole("button", { name: "Prices", exact: true }).click();
  await page.getByLabel("Date", { exact: true }).fill("2026-01-16");
  await page.getByLabel("Close", { exact: true }).fill("48.75");
  await page.getByLabel("Source label", { exact: true }).fill("Fixture manual close");
  await page.getByLabel("Source URL", { exact: true }).fill("https://example.invalid/fixture-close");
  await page.getByRole("button", { name: "Save close", exact: true }).click();
  await expect.poll(async () => page.evaluate(readCalls)).toHaveLength(1);
  await page.getByRole("button", { name: "Coverage", exact: true }).click();
  await page.getByLabel("Assigned analyst", { exact: true }).selectOption("bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb");
  await page.getByRole("button", { name: "Save coverage", exact: true }).click();
  await expect.poll(async () => page.evaluate(readCalls)).toHaveLength(2);
  await page.getByRole("button", { name: "Company", exact: true }).click();
  await page.getByLabel("Arabic name", { exact: true }).fill("Fixture Arabic issuer");
  await page.getByLabel("Arabic description", { exact: true }).fill("Fixture Arabic description");
  await page.getByLabel("English description", { exact: true }).fill("Fixture English description");
  await page.getByRole("button", { name: "Save company fields", exact: true }).click();
  await expect.poll(async () => page.evaluate(readCalls)).toHaveLength(3);
  await page.getByRole("button", { name: "Remove from universe", exact: true }).click();
  await expect(page.getByRole("group", { name: "Confirm removal" })).toBeVisible();
  await page.getByRole("button", { name: "Confirm removal", exact: true }).click();
  await expect.poll(async () => page.evaluate(readCalls)).toHaveLength(4);
  const calls = await page.evaluate(readCalls);
  expect(calls[0]).toMatchObject({ operation: "price", data: { date: "2026-01-16", close: "48.75", currency: "USD", source_label: "Fixture manual close", source_url: "https://example.invalid/fixture-close" } });
  expect(calls[1]).toMatchObject({ operation: "coverage", data: { analystId: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb" } });
  expect(calls[2]).toMatchObject({ operation: "company", data: { name_ar: "Fixture Arabic issuer", description_ar: "Fixture Arabic description", description_en: "Fixture English description" } });
  expect(calls[3]).toMatchObject({ operation: "remove", data: { confirm: true } });
});

test("ingestion controls start, resume, and retry fixture jobs", async ({ page }) => {
  await page.goto("/en/admin/ingestion?screen=financial&view=ingestion&role=admin");
  await page.getByRole("button", { name: "Ingest now", exact: true }).click();
  await expect.poll(async () => page.evaluate(readCalls)).toHaveLength(1);
  await page.getByRole("button", { name: "Resume", exact: true }).click();
  await expect.poll(async () => page.evaluate(readCalls)).toHaveLength(2);
  await page.getByRole("button", { name: "Retry", exact: true }).click();
  await expect.poll(async () => page.evaluate(readCalls)).toHaveLength(3);
  const calls = await page.evaluate(readCalls);
  expect(calls[0]).toMatchObject({ operation: "runJob" });
  expect(calls[0].data).toBeUndefined();
  expect(calls[1]).toMatchObject({ operation: "resumeJob", data: { id: "cccccccc-cccc-4ccc-8ccc-cccccccccccc" } });
  expect(calls[2]).toMatchObject({ operation: "ingest", securityId: "11111111-1111-4111-8111-111111111111" });
});
