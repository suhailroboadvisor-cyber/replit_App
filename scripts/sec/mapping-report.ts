/** Offline, reproducible founder review. No network, DB or application mutation. */
import { readFileSync, writeFileSync } from "node:fs";
import { mapAnnual } from "../../src/ingest/sec/annual";
import { candidates, SEC_CALCULATION_VERSION } from "../../src/ingest/sec/mapping";
import type { Fixture } from "../../src/ingest/sec/types";
import { entries } from "../../src/ingest/sec/selection";

const fixtures = ["aapl", "msft", "jpm", "missing"].map(name => ({
  name, fixture: JSON.parse(readFileSync(`tests/fixtures/sec/${name}.json`, "utf8")) as Fixture,
}));
const escape = (value: unknown) => String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
const lines = [
  "# SEC annual mapping — founder review checkpoint",
  "",
  "**STOP: mapping only. Founder go-ahead is required before any continuation.**",
  "No persistence services, live imports, Supabase writes, migrations, seeds, jobs, admin screens or analyst actions were built or run. The universe remains empty. Test issuers are not launch selections. No screening formulas or Arabic-copy approvals changed.",
  "",
  "## Selection and provenance contract",
  "",
  "- Annual evidence: 10-K/10-K/A, fp FY, USD duration of 350–380 inclusive days (52/53-week years included). Choose latest observation end, then latest filed/accession; choose the modal annual start in that filing, lexical start on a tie. Quarterly/YTD observations cannot anchor an annual period.",
  "- `fy` belongs to the filing. Never select a comparative by matching its `fy`. Direct facts take the latest actual annual filing of the exact period: USD annual durations or period-end instants. An unchanged direct fact can therefore cite the original 10-K when a sparse amendment omits it. Sums stay confined to the selected accession. No stale fallback from other periods. Candidate order stays as supplied.",
  "- Comparatives use the immediately preceding period ending the day before the selected annual start, matching its actual annual start/end, latest filed/accession per candidate. DEI shares use the latest valid shares instant in 10-K/10-K/A/10-Q/10-Q/A, then latest filed/accession. Each cites its own filing.",
  "- Equal filed dates use descending accession then form; equal usable observations use lexical start/tag and ascending value. Alternate units never displace a compatible USD/shares observation. If only incompatible selected sum components exist, the entire sum is unknown, not a partial known total.",
  "- Sums use only present components in the selected accession. A single valid component is still derived/Calculated. Zero is a present value. Absent tags are listed, never converted into assumed-zero facts. LongTermDebt excludes the current/noncurrent alternative pair, and both lease classes are excluded from debt.",
  "- Unknown facts use null/unknown and the weakest non-AI tier Estimated (not a claim that a value was estimated); unknown_note states the gap. Known direct facts are reported/Verified; investments and restricted-cash proxies are estimated/Estimated; sums are derived/Calculated.",
  "- Source fields are persistence-ready but have no fabricated database IDs. All source columns identify SEC EDGAR, regulatory_filing, form/year, accession, filing-index URL, filed/retrieved dates and filing reporting period. Real downloads are non-synthetic/non-demo; synthetic evidence stays production-blocked.",
  "",
  "## Version coordination (D-06)",
  "",
  `Mapping calculation_version: **${SEC_CALCULATION_VERSION}**. The engine now strictly accepts this exact version as well as calc-2026.10.1. Its existing default, formulas, historical payload verification and golden hashes remain unchanged. Future callers must propagate the mapping's version into the screening input; accepting the version does not authorize building those callers now.`,
  "",
  "## SEC request budget and future execution boundary",
  "",
  "The server-only client has one shared process-global token bucket across all SecClient instances and every retry: capacity one, refill one token per 125 ms. This intentionally prevents bursts: at most eight starts in any half-open rolling 1000 ms window. FIFO acquisition and fake-timer tests cover concurrent instances, all endpoints and retries. A request timeout (default 15 s; maximum 60 s) covers headers and JSON body. 429/5xx retry at most three times by default (configurable 0–5), capped exponential backoff with 50–100% jitter, maximum delay 8 s. Other statuses, invalid JSON, network errors and timeouts fail explicitly; redirects are refused. SEC_USER_AGENT is obtained lazily on the server and never recorded in the report.",
  "",
  "**Scope is one JavaScript process, not all machines.** Later admin and job callers in the same process must use this shared client, not independent fetch/bucket implementations. A scheduled job and web workers/autoscale instances do not share memory. Before enabling concurrent multi-process callers, they must share a single budget owner/serialized execution or a distributed limiter. This checkpoint implements neither ingestion/job services nor that future deployment coordination; do not claim the process-local budget is a fleet-wide SEC limit.",
  "",
  "## Fixture retrieval",
  "",
];
for (const { name, fixture } of fixtures) {
  lines.push(`### ${name.toUpperCase()} — ${fixture.companyfacts.entityName}`, "",
    `- Companyfacts: ${fixture.metadata.url}`,
    `- Retrieved: ${fixture.metadata.retrieved_at}; synthetic=${fixture.metadata.is_synthetic}; demo=${fixture.metadata.is_demo}`,
    `- Original response SHA-256: ${fixture.metadata.original_sha256 ?? "not applicable — explicitly synthetic"}`,
    `- Trimming: ${fixture.metadata.trimming}`, "");
}
lines.push("Downloads succeeded for all three real fixtures. No real-company values were fabricated. Raw downloads are temporary local retrieval inputs, not a raw-response archive. The committed JSON retains original observation values, units, dates, accession/filed metadata, prior years and quarterly distractors. Reproduce trimming with `pnpm exec tsx scripts/sec/trim-fixtures.ts <temporary-download-directory>`; generate this report with `pnpm exec tsx scripts/sec/mapping-report.ts`.", "",
  "## Candidate inventory and every deviation", "",
  "No supplied candidate was removed or reordered. No alternate financial totals were silently substituted. The following inventory lists every supplied candidate and explicit lease/restricted-cash spelling. Counts are **compatible selected-filing observations** (DEI: the latest shares observation's own filing/as-of date), not proof of financial interpretation; 0 means unverified for the selected annual mapping even if a historical concept exists.", "",
  "| Line item | Candidate / component | AAPL | MSFT | JPM | MISSING |",
  "| --- | --- | ---: | ---: | ---: | ---: |");
for (const [line, tags] of Object.entries(candidates)) for (const tag of tags) {
  const counts = fixtures.map(({ fixture }) => {
    const mapped = mapAnnual(fixture.companyfacts, fixture.metadata);
    const shares = mapped.facts.find(f => f.line_item === "shares_outstanding");
    return entries(fixture.companyfacts, tag).filter(e => line === "shares_outstanding" ?
      e.unit === "shares" && !e.start && e.accn === shares?.source?.document_reference && e.end === shares.as_of_date :
        e.accn === mapped.period.filing_reference && e.unit === "USD" &&
        e.end === mapped.period.period_end && (["total_revenue", "net_income", "operating_cash_flow"].includes(line) ?
          e.start === mapped.period.period_start : !e.start)).length;
  });
  lines.push(`| ${line} | ${tag} | ${counts.join(" | ")} |`);
}
lines.push("",
  "- **Added explicit spelling, not a new financial category:** the attachment left the broader restricted-cash tag unnamed. It is `CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents`; used only after ordinary cash fails and always with an estimated/restricted-cash caveat. Availability is above; synthetic tests exercise the fallback when ordinary cash is missing.",
  "- **Added explicit spellings for supplied lease sums:** `FinanceLeaseLiabilityCurrent`, `FinanceLeaseLiabilityNoncurrent`, `OperatingLeaseLiabilityCurrent`, `OperatingLeaseLiabilityNoncurrent`. Evidence availability is above. Lease liabilities are never folded into debt.",
  "- **Debt replacement/exclusions:** LongTermDebt replaces the entire LongTermDebtNoncurrent + LongTermDebtCurrent pair when present in the selected filing. Exclusions are recorded separately from absences in each mapping row below. ShortTermBorrowings and CommercialPaper remain additional components. No operating/finance leases, deposits, total-liability proxies or other unrequested borrowing tags were added.",
  "- **JPM non-standard revenue evidence:** the sample includes RevenuesNetOfInterestExpense as an inspection-only candidate. It is NOT added to the supplied candidate order. JPM also reports Revenues for the selected period, so the supplied first candidate suffices. The alternate tag is not verification of an issuer where only a bank-specific revenue tag exists; such a tag-only issuer would remain unknown under this config. No financing/sector/activity inference is made from it.",
  "- **Unverified candidates:** every zero-count cell above is an unavailable compatible sample for that issuer. In particular, no claim is made that unexercised revenue/equity/investment alternatives are verified by these fixtures. Their deterministic mechanics are covered synthetically, which is not real-company verification.",
  "- **Prior-year additions:** prior_year_revenue and prior_year_net_income reuse exactly the supplied revenue and income candidates, selecting true preceding dates, not comparative fy metadata.",
  "- **Excluded as requested:** EBITDA, market_cap and prices are not mapped; no estimated debt components, assumed-zero facts, segment/SIC classifications, launch seeds or analyst confirmations are invented.",
  "",
  "## Complete per-fixture mapping tables",
  "",
  "Each mapping note lists tags actually used with **raw component values**, distinct from the mapped total. Values are absolute units, not millions. The filing column includes each fact's actual accession, filed date, source document and reporting period; shares as-of and comparative dates may differ from the selected annual period.",
  "");
for (const { name, fixture } of fixtures) {
  const result = mapAnnual(fixture.companyfacts, fixture.metadata);
  const p = result.period;
  lines.push(`### ${name.toUpperCase()} — ${p.fiscal_period_label}`, "",
    `Selected annual period: **${p.period_start} → ${p.period_end}**; USD; filing **${p.filing_reference}**, filed **${p.reported_date}**.`,
    `Selected filing: ${p.source.source_url}`, "",
    "| Line item | Mapped value / units | Input state | Confidence tier | Tags actually used, components, absences and mapping note | As of | Actual filing evidence |",
    "| --- | ---: | --- | --- | --- | --- | --- |");
  for (const f of result.facts) {
    const s = f.source;
    const evidence = s ? `[${s.document_reference}](${s.source_url}); ${s.document_title}; filed ${s.filed}; reporting ${s.reporting_period}` : "none — no sourced observation";
    lines.push(`| ${[f.line_item, `${f.value ?? "null"} ${f.unit}`, f.input_state, f.confidence_tier,
      f.mapping_note, f.as_of_date, evidence].map(escape).join(" | ")} |`);
  }
  lines.push("");
}
lines.push("## Founder checkpoint", "",
  "Review the totals, raw components/absences, period selection, unknowns, unverified candidate cells and process-local request-budget boundary above. Work stops here. The full downstream requirements, including company+period+line_item analyst protection, stored non-current incoming SEC facts, `SEC value changed since correction`, and audited `Accept SEC value`, are retained only for use after explicit founder go-ahead. Completion or merge is not that go-ahead. No continuation task is created or started.", "");
writeFileSync("docs/SEC_ANNUAL_MAPPING.md", lines.join("\n"));
