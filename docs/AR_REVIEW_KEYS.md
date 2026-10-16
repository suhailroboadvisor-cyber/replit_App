# Live Arabic review keys

Generated deterministically by `pnpm ar-review:list`. Live pending rows: **296**.

## Boundaries and coverage

This is a live-only pending inventory, not an approval record. D-96/D-101
approval evidence is pinned independently in tests/fixtures/arabic-approval-baseline.json.
D-107 batch-2 evidence is pinned separately in tests/fixtures/arabic-batch-two-approval.json;
docs/ARABIC_APPROVAL_BATCH_TWO.md lists every applied row. Approved rows are
excluded from this pending sheet; the O-7 legal bodies remain unapproved.
No translations are applied by this command. Existing IDs survive; keyed IDs
are J-namespace-key; new unkeyed phrases use a full SHA-256 source ID (U-...).
Drafts are retained only while their exact English source matches. A source
change requires a new draft; missing drafts are visibly flagged.
Edit docs/arabic-drafts.json to retain a row-specific documentation draft;
docs/arabic-draft-proposals.json supplies documentation-only defaults for new sources.
Rows beginning ⟦AR-REVIEW⟧ are intentionally untranslated English placeholders,
not Arabic proposals or approved translations. They need a separate translation review.
Neither file is imported by the application.

Contexts identify rendered/conditionally rendered call sites, including
accessible labels, confirmation prompts, metadata, error states and feedback.
“Rendered/conditionally rendered” does not assert that every branch is visible
on initial load. Foundation samples include development-only styleguide usages.
Methodology forms/reports are live, authenticated admin/editor UI, not future-only.
Stored source metadata, criterion labels, rules, report JSON, workflow notes,
engine evidence and audit summaries are arbitrary data, not finite translation keys.
reviewText/reviewError preserve markers on arbitrary unapproved auth/audit/action
fallbacks; Zod paths/issues and EngineInputError details are unbounded.
Concrete custom validation and governance-error sources are listed; generated
Zod built-in messages are described here, not fabricated as an infinite list.
Known finite report errors are localized for display only under D-107; unknown
display errors retain review markers. Raw report JSON and engine evidence remain
unchanged. Arbitrary exception/report text remains unbounded.
Approved account/audit entries and all currently approved engine templates are absent.
No engine reason template currently carries a review marker.

Caller audit uses translator bindings, finite dynamic type unions (status/theme/
disclaimer), wrapper id/label props, governedText success/error feedback, direct
dictionary adapters, and runtime markers. LocaleDocument/getMessages supplies
the provider; passing the whole dictionary is not evidence that every leaf renders.
Whole-namespace dynamic consumers are retained and reported if unresolved.
Tests, dictionaries and documentation alone never establish a live caller.

## Founder terminology — D-103–D-111

- Edge cases = الحالات الخاصة; حدية is reserved for borderline.
- User-facing production = مُعتمد للاستخدام الفعلي / غير مُعتمد للاستخدام الفعلي.
- Admin “Enable for production” = اعتماد للاستخدام الفعلي.
- Verified by = جهة التحقق.
- Workflow approval = الموافقة / موافَق عليه; اعتماد is production-only.
- Finalized = نهائي / نهائية, not مثبّت / تُثبّت.
- Publish / unpublish = نشر / إلغاء النشر; badges = منشور / غير منشور.
- Public visibility = الإتاحة العامة.
- إصدار is reserved for methodology versions. Do not create edition copy here.

Only D-107's enumerated batch has been applied. These terminology rules do not
approve unknown future copy. Legal bodies require O-7 text, not translation.

## Integration boundary

Step 6 and locale-aware navigation restoration are merged in this checkout.
This inventory includes their actual callers, including breadcrumbs, version
sections and recovery-screen home/retry controls. D-107 approved these recorded
origins; unknown future navigation copy is not approved or invented.

## Legal pages — /terms and /privacy

| Key/source | Page/component rendering context | Current English source | Arabic (approved) |
| --- | --- | --- | --- |
| content/legal/privacy.ar.md | Rendered: /privacy, /en/privacy; LegalDocument body; O-7 unresolved | Privacy Policy — draft awaiting founder-supplied Arabic-first legal review, including Saudi PDPL and data residency. This is not approved legal text. |  |
| content/legal/terms.ar.md | Rendered: /terms, /en/terms; LegalDocument body; O-7 unresolved | Terms of Use — draft awaiting founder-supplied Arabic-first legal review. This is not approved legal text. |  |

## Shared public shell and foundation samples

| Key/source | Page/component rendering context | Current English source | Arabic (approved) |
| --- | --- | --- | --- |
| publicSearch.hint | Rendered/conditionally rendered: src/components/search/SearchResults.tsx:12 | Enter 1–40 characters of a ticker or company name. |  |
| publicSearch.label | Rendered/conditionally rendered: src/components/foundation/StockSearchForm.tsx:14 | Ticker or company name |  |
| publicSearch.methodologyLine | Rendered/conditionally rendered: src/app/[locale]/(public)/page.tsx:23 | Read how the screening methodology works. |  |
| publicSearch.noResults | Rendered/conditionally rendered: src/components/search/SearchResults.tsx:11 | No matching stocks |  |
| publicSearch.noResultsBody | Rendered/conditionally rendered: src/components/search/SearchResults.tsx:12 | No listed stocks in the screening universe match this search. |  |
| publicSearch.notScreened | Rendered/conditionally rendered: src/components/search/SearchResults.tsx:24 | Not screened yet |  |
| publicSearch.submit | Rendered/conditionally rendered: src/components/foundation/StockSearchForm.tsx:20 | Search |  |
| publicSearch.title | Rendered/conditionally rendered: src/app/[locale]/(public)/search/page.tsx:22; Rendered/conditionally rendered: src/components/foundation/StockSearchForm.tsx:11; Rendered/conditionally rendered: src/components/search/SearchResults.tsx:11 | Stock search |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | English name |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Current facts |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Calculation |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:108; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Source reference |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49; Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Failed |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Mapping note |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | No reason template available. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Data adequacy |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Universe job started. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Outside universe |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | STORED RUN EVIDENCE |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | derived |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Ingest now |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Threshold |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | No result is shown because no stored run is available. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Source |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Label |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Ratio |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Override saved. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Save |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Manual price history |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Add a security |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Security details |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Source URL |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | No sources were stored for this page. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Ingestion controls |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | real_estate_permissible |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Verification passed. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Run screening now |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | No ingestion jobs recorded. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Security removed from universe. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | No criteria recorded. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49; Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | No |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Assigned analyst |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Effect |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Completed |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | conventional_media |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Source type |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | SCREENING RESULT |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | This security will no longer be part of the curated universe. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Universe membership |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Accession / reference |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Open methodology and this version |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Filed date |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Differences |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | No current-period facts were recorded. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Criterion |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Sector |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Preview |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Fiscal year end |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Pending |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Security added and ingestion started. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Coverage started |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | interest_based_lending |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Facts |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Shares outstanding are unknown or missing. A market-cap fact cannot be derived from a close until shares are available. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | energy |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | retail_permissible |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Confirm and ingest |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Numerator |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | SUHAIL / SCREENING |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Currency |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | The generated text did not pass validation against the engine's evidence, so it was discarded. Every figure below comes straight from the engine. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | internal |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | healthcare |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Select a security to inspect its records. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | AI Interpretation |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Segment name |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Data date |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Override |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | adult_entertainment |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Edit |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Start a resumable ingestion job for the curated universe, or resume a recorded run below. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Segments |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Protected current |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Source notes |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | conventional_finance |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Security universe |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Screening |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Unit |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Computed hash |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Hash matches |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Job started. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Coverage |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Analyst profile unavailable |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Description |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Job summary |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Threshold unit |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | IMMUTABLE RUN RECORD |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Data as of |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Segment saved. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | SUHAIL / SCREENING RUN |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Prices |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Field or input |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Inserted |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | No production methodology to screen with |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | SEC alternative accepted. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Why? |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Severity |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | CURRENT PERIOD FACTS |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Processed |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Retained SEC alternatives |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Revenue amount |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Path |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Confidence |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | No screening runs recorded. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | No safe profile image URL is available; no image has been manufactured. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | EXPLANATION OBJECT |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | IMPORTANT CONTEXT |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Open source |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Hash payload |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | unclassified |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | No screening run recorded for this methodology yet. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Period |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Result |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Security record |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Filing date |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Save coverage |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | No latest period |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Engine version |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Business segments |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Criteria |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Reasons |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Arabic narrative is not available; structured evidence only. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:239; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:266; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | No calculation trace was stored. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | No differences recorded. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | What we know |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Unchanged records |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Finished |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Save close |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | PUBLIC SCREENING RECORD |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Methodology version |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Inspect sourced financial records across the curated universe. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | industrials |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | No criteria were recorded for this run. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Run details |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | PROVENANCE |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Screen all |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Confidence tier |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | One or more segments are unclassified; classify them using filing evidence. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Job history, progress and failed security retries. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Under |  |
| runtime phrase | Rendered/conditionally rendered: src/stock/metadata.ts:13 | No run yet |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Generated |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49; Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | The request failed. Reload and try again. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Manual close saved. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | insurance_conventional |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49; Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Yes |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Job history |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | SEC label |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49; Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Editors have read-only access. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Ingest all |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | No specific status reasons were recorded. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Unchanged |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Criterion ID |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Save company fields |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Value |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | reported |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Security |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Removing a security keeps its historical records and removes it from the curated universe. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Fundamentals |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49; Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Status |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Denominator |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Accept SEC |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Resume screen job |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Input states |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Replay matches |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | No earlier run for this methodology. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Calculation version |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Stored hash |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Date |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | DOCUMENTED RULE SET |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Borderline margin |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Run started. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Reason code |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | No business segments are recorded for the latest period. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | CRITERION RECORD |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Screening runs |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Segment deleted. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | State |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Add segment |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | AI explanation |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Resume requested. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Hash |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Run metadata |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | records |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Save segment |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Arabic description |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49; Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Job |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Look up a US ticker before adding it to the curated universe. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | pork_related |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Why missing |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Unchanged result |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Delete this segment? |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Arabic name |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | No securities in the curated universe. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | unknown |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | English description |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Unknown |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Estimated |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | AI text discarded — showing structured evidence only |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Financial period |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:212; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Unavailable in the stored source record |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | What we don't know |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | No unknowns recorded. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Type |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Confirm removal |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Screening runs are append-only. This record is never edited. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | regulatory_filing |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | weapons_conventional |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | telecom |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Ticker |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Coverage assignment saved. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Borderline count |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Arabic only |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | No structured reasons recorded. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Counts |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Actual |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Structured evidence |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Retry queued. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Every figure in this text was checked against the engine's evidence. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | alcohol |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Category basis |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Filing confirmation saved. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Calculated |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdict.tsx:289; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:218; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Unavailable |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Expected |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:106; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Sources |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Tier |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Source label |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | APPEND-ONLY RUNS |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Company profile |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | No unknown inputs were recorded for this run. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | inactive |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Filing note reference |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Coverage by |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | estimated |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Show calculation |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Origin |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Unknowns |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Exchange |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Resume |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Confirm from filing |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | CIK |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdict.tsx:30; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Methodology unavailable |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Note |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | DETERMINISTIC RECORD |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | tobacco |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | No validated narrative text is stored; structured evidence only. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | generic_permissible |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Choose a methodology version |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Version |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdict.tsx:162; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:223; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Unlabelled criterion |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Company |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Stored criterion labels are English only |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Current |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Why this assessment |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | SEC changed |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Delete |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Run hash |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | In universe |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | gambling |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Calculation trace |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | technology |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | No manual prices are recorded. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Started |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49; Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Input state |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | English only |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Verify |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Period end |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Verification failed. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | No criterion evidence was stored for this run. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | RECORDED GAPS |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Methodology |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | No facts are recorded for this period. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Field |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Running |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Kind |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Remove from universe |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Reason |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | No analyst assigned |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Activity category |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/ScreeningControls.tsx:37 | Unknown count |  |
| runtime phrase | Rendered/conditionally rendered: src/components/stock/StockVerdictParts.tsx:45 | Change history / prior runs |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Saved. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:49 | Actions |  |
