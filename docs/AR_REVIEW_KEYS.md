# Live Arabic review keys

Generated deterministically by `pnpm ar-review:list`. Live pending rows: **148**.

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
Step-7 rows beginning ⟦AR-REVIEW⟧ are intentionally untranslated English placeholders,
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
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | English name |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Current facts |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Failed |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Mapping note |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Outside universe |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | derived |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Ingest now |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Source |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Override saved. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Save |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Manual price history |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Add a security |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Security details |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Source URL |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Ingestion controls |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | real_estate_permissible |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | No ingestion jobs recorded. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Security removed from universe. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | No |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Assigned analyst |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Completed |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | conventional_media |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Source type |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | This security will no longer be part of the curated universe. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Universe membership |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Sector |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Preview |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Fiscal year end |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Pending |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Security added and ingestion started. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Coverage started |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | interest_based_lending |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Facts |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Shares outstanding are unknown or missing. A market-cap fact cannot be derived from a close until shares are available. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | energy |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | retail_permissible |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Confirm and ingest |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Currency |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | internal |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | healthcare |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Select a security to inspect its records. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | AI Interpretation |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Segment name |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Override |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | adult_entertainment |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Edit |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Start a resumable ingestion job for the curated universe, or resume a recorded run below. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Segments |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Protected current |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Source notes |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | conventional_finance |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Security universe |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Job started. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Coverage |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Description |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Segment saved. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Prices |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | SEC alternative accepted. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Retained SEC alternatives |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Revenue amount |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Open source |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | unclassified |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Security record |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Save coverage |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | No latest period |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Business segments |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Finished |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Save close |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Inspect sourced financial records across the curated universe. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | industrials |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Confidence tier |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | One or more segments are unclassified; classify them using filing evidence. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Job history, progress and failed security retries. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | The request failed. Reload and try again. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Manual close saved. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | insurance_conventional |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Yes |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Job history |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Editors have read-only access. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Save company fields |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Value |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | reported |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Removing a security keeps its historical records and removes it from the curated universe. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Status |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Accept SEC |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Date |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | No business segments are recorded for the latest period. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Segment deleted. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | State |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Add segment |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Resume requested. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | records |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Save segment |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Arabic description |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Job |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Look up a US ticker before adding it to the curated universe. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | pork_related |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Delete this segment? |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Arabic name |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | No securities in the curated universe. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | unknown |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | English description |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Unknown |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Estimated |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Confirm removal |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | regulatory_filing |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | weapons_conventional |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | telecom |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Ticker |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Coverage assignment saved. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Counts |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Retry queued. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | alcohol |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Category basis |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Filing confirmation saved. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Calculated |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Tier |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Source label |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Company profile |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | inactive |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Filing note reference |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | estimated |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Origin |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Exchange |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Resume |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Confirm from filing |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | CIK |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Note |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | tobacco |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | generic_permissible |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Company |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | SEC changed |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Delete |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | In universe |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | gambling |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | technology |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | No manual prices are recorded. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Started |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Input state |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | No facts are recorded for this period. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Running |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Remove from universe |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | No analyst assigned |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Activity category |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Saved. |  |
| runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Actions |  |
