import { AdminShell } from "../../src/components/accounts/AdminScreens";
import type { Locale } from "../../src/components/accounts/types";
import { FinancialAdmin } from "../../src/components/financial/FinancialAdmin";
import type { FinancialAdminData } from "../../src/lib/financial/contracts";

const issuerId = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const securityId = "11111111-1111-4111-8111-111111111111";
const periodId = "22222222-2222-4222-8222-222222222222";
const sourceId = "33333333-3333-4333-8333-333333333333";
const investmentBaselineId = "44444444-4444-4444-8444-444444444444";
const investmentCurrentId = "55555555-5555-4555-8555-555555555555";
const investmentAlternativeId = "66666666-6666-4666-8666-666666666666";
const revenueFactId = "77777777-7777-4777-8777-777777777777";
const sharesFactId = "88888888-8888-4888-8888-888888888888";
const segmentId = "99999999-9999-4999-8999-999999999999";
const analystId = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
const jobId = "cccccccc-cccc-4ccc-8ccc-cccccccccccc";

const stamp = "2026-01-20T10:00:00.000Z";
const fixtureData = {
  securities: [{
    id: securityId, company_id: issuerId, exchange_id: null, exchange_code: "NASDAQ", ticker: "FIX",
    display_symbol: "FIX", identifier_type: "ticker", identifier_value: "FIX", currency: "USD",
    instrument_type: "equity", listing_status: "listed", slug: "nasdaq-fix", in_universe: true,
    last_ingest_at: stamp, last_ingest_error: null, coverage_analyst_id: null, coverage_started_at: null,
    demo_label: null, notes: null, created_at: stamp, updated_at: stamp, is_demo: false, created_by: null,
  }],
  companies: [{
    id: issuerId, name: "Fixture Research Systems", name_ar: "Fixture Research Systems", legal_name: "Fixture Research Systems",
    cik: "0000000001", country: "US", domicile: "US", description: null, description_ar: null, description_en: "Fixture issuer profile",
    sector_label: "Fixture sector", industry_label: null, website: null, founded_year: null, fiscal_year_end: "1231",
    reporting_currency: "USD", sector_label_note: null, notes: null, created_at: stamp, updated_at: stamp, is_demo: false, created_by: null,
  }],
  periods: [{
    id: periodId, company_id: issuerId, period_type: "annual", fiscal_year: 2025, fiscal_period_label: "FY2025",
    period_start: "2025-01-01", period_end: "2025-12-31", reported_date: "2026-01-15", currency: "USD", is_latest: true,
    filing_reference: "FIXTURE-ACCESSION", source_id: sourceId, notes: null, created_at: stamp, updated_at: stamp, is_demo: false, created_by: null,
  }],
  facts: [
    { id: revenueFactId, company_id: issuerId, period_id: periodId, line_item: "total_revenue", label: "Total revenue", value: "250000", value_text: null, currency: "USD", unit_scale: "absolute", input_state: "reported", confidence_tier: "Verified", source_id: sourceId, as_of_date: null, mapping_note: "Fixture reported revenue", unknown_note: null, origin: "sec", protected_current: false, calculation_version: "fixture-calc", evidence_key: "fixture-revenue", sec_baseline_id: null, sec_changed: false, is_current: true, created_at: stamp, updated_at: stamp, is_demo: false, created_by: null },
    { id: investmentCurrentId, company_id: issuerId, period_id: periodId, line_item: "interest_bearing_investments", label: "Interest-bearing investments", value: "12000", value_text: null, currency: "USD", unit_scale: "absolute", input_state: "estimated", confidence_tier: "Estimated", source_id: sourceId, as_of_date: null, mapping_note: "Fixture current estimate", unknown_note: null, origin: "override", protected_current: true, calculation_version: "fixture-calc", evidence_key: "fixture-investment-current", sec_baseline_id: investmentBaselineId, sec_changed: true, is_current: true, created_at: stamp, updated_at: stamp, is_demo: false, created_by: null },
    { id: investmentAlternativeId, company_id: issuerId, period_id: periodId, line_item: "interest_bearing_investments", label: "Interest-bearing investments", value: "14000", value_text: null, currency: "USD", unit_scale: "absolute", input_state: "estimated", confidence_tier: "Estimated", source_id: sourceId, as_of_date: null, mapping_note: "Retained SEC alternative", unknown_note: null, origin: "sec", protected_current: false, calculation_version: "fixture-calc", evidence_key: "fixture-investment-sec", sec_baseline_id: null, sec_changed: false, is_current: false, created_at: stamp, updated_at: stamp, is_demo: false, created_by: null },
    { id: sharesFactId, company_id: issuerId, period_id: periodId, line_item: "shares_outstanding", label: "Shares outstanding", value: "10000", value_text: null, currency: "shares", unit_scale: "absolute", input_state: "reported", confidence_tier: "Verified", source_id: sourceId, as_of_date: "2025-12-31", mapping_note: null, unknown_note: null, origin: "sec", protected_current: false, calculation_version: "fixture-calc", evidence_key: "fixture-shares", sec_baseline_id: null, sec_changed: false, is_current: true, created_at: stamp, updated_at: stamp, is_demo: false, created_by: null },
  ],
  segments: [{
    id: segmentId, company_id: issuerId, period_id: periodId, segment_name: "Fixture services", description: "Fixture-only segment",
    activity_category: "unclassified", category_basis: null, revenue_amount: "20000", revenue_share: null,
    input_state: "reported", confidence_tier: "Verified", source_id: sourceId, created_at: stamp, updated_at: stamp, is_demo: false, created_by: null,
  }],
  sources: [{
    id: sourceId, label: "Fixture annual filing", source_type: "regulatory_filing", provider: "Fixture only",
    document_title: "Fixture annual report", document_reference: "FIXTURE-NOTE-01", source_url: "https://example.invalid/fixture",
    retrieved_at: stamp, reporting_period: "FY2025", confidence_tier: "Verified", is_synthetic: false,
    production_blocked: false, notes: "Synthetic test provenance only", created_at: stamp, updated_at: stamp, is_demo: false, created_by: null,
  }],
  prices: [],
  analysts: [{
    id: analystId, name_ar: "Fixture Analyst", name_en: "Fixture Analyst", title_ar: null, title_en: null,
    credentials: null, headshot_object_key: null, bio_ar: null, bio_en: null, user_id: null, active: true,
    created_at: stamp, updated_at: stamp, is_demo: false, created_by: null,
  }],
  jobs: [{
    id: jobId, job_name: "ingest-sec", status: "failed", cursor: { after: "FIX" }, counts: { processed: 1, failed: 1 },
    errors: [{ securityId, message: "Fixture-only retry record" }], timings: {}, started_at: stamp, finished_at: stamp,
    created_at: stamp, updated_at: stamp, is_demo: false, created_by: null,
  }],
} as unknown as FinancialAdminData;

export function FinancialFixture({ locale }: { locale: Locale }) {
  const params = new URLSearchParams(window.location.search);
  const role = params.get("role") === "editor" ? "editor" : "admin";
  const view = params.get("view") === "ingestion" ? "ingestion" : "securities";
  return <AdminShell locale={locale} role={role} currentPath={`/admin/${view}`} userLabel="Financial Fixture">
    <FinancialAdmin data={fixtureData} role={role} view={view} />
  </AdminShell>;
}
