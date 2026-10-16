import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const component = readFileSync("src/components/financial/FinancialAdmin.tsx", "utf8");
const securitiesPage = readFileSync("src/app/[locale]/(private)/admin/(protected)/securities/page.tsx", "utf8");
const ingestionPage = readFileSync("src/app/[locale]/(private)/admin/(protected)/ingestion/page.tsx", "utf8");

describe("financial admin UI wiring", () => {
  it("loads protected data through the authorized server pages", () => {
    for (const page of [securitiesPage, ingestionPage]) {
      expect(page).toContain('await requireRole(["admin", "editor"])');
      expect(page).toContain("getFinancialAdminData()");
      expect(page).toContain("getScreeningAdminData()");
      expect(page).toContain("Promise.all([getFinancialAdminData(), getScreeningAdminData()])");
      expect(page).toContain("context.user.role");
      const guardIndex = page.indexOf('await requireRole(["admin", "editor"])');
      expect(guardIndex).toBeLessThan(page.indexOf("getFinancialAdminData()"));
      expect(guardIndex).toBeLessThan(page.indexOf("getScreeningAdminData()"));
    }
  });

  it("exposes the financial review workflows through the shared action", () => {
    expect(component).toContain('from "@/app/[locale]/(private)/admin/(protected)/financial-actions"');
    for (const operation of ["lookup", "add", "ingest", "accept", "segment", "deleteSegment", "price", "coverage", "company", "remove", "runJob", "resumeJob"]) {
      expect(component).toContain(`operation: "${operation}"`);
    }
    expect(component).toContain('operation: mode');
    expect(component).toContain('"override"');
    expect(component).toContain('"confirm"');
    expect(component).toContain('data: { confirm: true }');
    expect(component).toContain('aria-labelledby="remove-title"');
  });

  it("sends the backend contract payloads from each editor form", () => {
    for (const field of [
      "data: { ticker }", "securityId: error.securityId as string", "data: { id: job.id }",
      "factId: fact.id", "reason: String(form.get(\"reason\")", "input_state: String(form.get(\"input_state\")",
      "confidence_tier: String(form.get(\"confidence_tier\")", "factId: alt.id", "segment_name: String(form.get(\"segment_name\"))",
      "data: { id: segment.id }", "date: String(form.get(\"date\"))", "analystId }",
      "name_ar: String(form.get(\"name_ar\")", "data: { confirm: true }", "operation: \"runJob\"",
    ]) expect(component).toContain(field);
    expect(component).toContain('operation: "company"');
    expect(component).toContain('operation: "price"');
    expect(component).toContain('operation: "coverage"');
  });

  it("keeps editors read-only and provides accessible feedback and source provenance", () => {
    expect(component).toContain('const canEdit = role === "admin"');
    expect(component).toContain('disabled={pending || !canEdit}');
    expect(component).toContain('disabled={!canEdit || pending || !selected.in_universe}');
    expect(component).toContain('{canEdit && <button');
    expect(component).toContain('role="status"');
    expect(component).toContain('role="alert"');
    expect(component).toContain("sec_changed");
    expect(component).toContain("source_url");
    expect(component).toContain("Shares outstanding are unknown or missing.");
  });
});
