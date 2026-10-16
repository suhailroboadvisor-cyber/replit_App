# Live Arabic review — unapproved documentation-only drafts

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

| ID | Key/source | Page/component rendering context | Current English source | Arabic draft — UNAPPROVED, documentation only | Category |
| --- | --- | --- | --- | --- | --- |
| L-privacy-body | content/legal/privacy.ar.md | Rendered: /privacy, /en/privacy; LegalDocument body; O-7 unresolved | Privacy Policy — draft awaiting founder-supplied Arabic-first legal review, including Saudi PDPL and data residency. This is not approved legal text. | Do not translate; needs O-7 text | legal document (do not translate; needs O-7 text) |
| L-terms-body | content/legal/terms.ar.md | Rendered: /terms, /en/terms; LegalDocument body; O-7 unresolved | Terms of Use — draft awaiting founder-supplied Arabic-first legal review. This is not approved legal text. | Do not translate; needs O-7 text | legal document (do not translate; needs O-7 text) |

## Shared public shell and foundation samples

| ID | Key/source | Page/component rendering context | Current English source | Arabic draft — UNAPPROVED, documentation only | Category |
| --- | --- | --- | --- | --- | --- |
| U-00799d7eb4caed17030b0bb9cecb5a8263924c1e769a6f6791f684ac288d98d0 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | English name | ⟦AR-REVIEW⟧ English name | help/error |
| U-00cbe0ccc588866d7e45c808e1a0028ae1c8cfe02ca6f3f7e1e8977ebde2dc06 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Current facts | ⟦AR-REVIEW⟧ Current facts | help/error |
| U-031a8f0f659df890dfd53c92e45295b0f14c997185bae46e168831e403b273f7 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Failed | ⟦AR-REVIEW⟧ Failed | help/error |
| U-03587bb9379980aef7b43cacfa1da18e227d1297e2c9838b6ae1823f3225544e | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Mapping note | ⟦AR-REVIEW⟧ Mapping note | help/error |
| U-053b0a06c0a3194d686374b8532cf84e4c7603e043a078e15970d46407ada09a | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Outside universe | ⟦AR-REVIEW⟧ Outside universe | help/error |
| U-08f0be883564cbf2d0031e32d0b433425a4ca7b3bc87dbcd9b1b12571be9d663 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | derived | ⟦AR-REVIEW⟧ derived | help/error |
| U-09b0387dc7e0c6cdb08912c729f518e66ed6107b4ff37b6998b11e3fefb18654 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Ingest now | ⟦AR-REVIEW⟧ Ingest now | help/error |
| U-0e570ca6fabe24f94e52c1833f3ffd25567022beb826fa16891f3322051bc221 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Source | ⟦AR-REVIEW⟧ Source | help/error |
| U-13d82297227cf1e295d331ac506890a9a0e7b0976a92c5061b1737ad0c04e078 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Override saved. | ⟦AR-REVIEW⟧ Override saved. | help/error |
| U-1509f561f2416598629b886ad7d3c05a7e221e4e0675c84bbff4ee6d9e03913d | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Save | حفظ | help/error |
| U-1520c0b1b12d96eb6d00d02f33872383d64df17ab73a3b2a62166c4b2b270f0e | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Manual price history | ⟦AR-REVIEW⟧ Manual price history | help/error |
| U-161dc0c5a11c3997e98cd867b0922d86550563ca4757355cdc789408f35be343 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Add a security | ⟦AR-REVIEW⟧ Add a security | help/error |
| U-193a178cd1284bceadd124ad23b42715d6fbb48fd803a01d6bb0be01a78ccd1b | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Security details | ⟦AR-REVIEW⟧ Security details | help/error |
| U-1adf66b33f7971af29e871d20ef397fb7b0072505fd676270b173698ab9662d9 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Source URL | ⟦AR-REVIEW⟧ Source URL | help/error |
| U-1b9c5ddd13957ee79d86e241111cf3e3d9518e4c8936c8bdb9414e14564c37f6 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Ingestion controls | ⟦AR-REVIEW⟧ Ingestion controls | help/error |
| U-1c1eeb01ddd5f34a55df9794c725f27cd3b377f70cc8d86c17ae7591fd3145d5 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | real_estate_permissible | ⟦AR-REVIEW⟧ real_estate_permissible | help/error |
| U-1ce4b69446df6f66e9ed996e729097b6219937ab6cdd6c294ad8cc085864d6fb | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | No ingestion jobs recorded. | ⟦AR-REVIEW⟧ No ingestion jobs recorded. | help/error |
| U-1cf8ff725191cb7766437e998a3957c9ddc84309dc866c31d420265cf7fb6795 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Security removed from universe. | ⟦AR-REVIEW⟧ Security removed from universe. | help/error |
| U-1ea442a134b2a184bd5d40104401f2a37fbc09ccf3f4bc9da161c6099be3691d | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | No | ⟦AR-REVIEW⟧ No | help/error |
| U-221cf1d619759e505c9c7ef74a5a57aec7cdb80c811907c8b2572221ea614f22 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Assigned analyst | ⟦AR-REVIEW⟧ Assigned analyst | help/error |
| U-22a970d2e5b1cc233e462be7c7b64e135a275bb09d83d87683bf4236c43113a1 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Completed | ⟦AR-REVIEW⟧ Completed | help/error |
| U-2365d2d2e7cc4ce18578d3b2e1025706fcd0bb26db392ebd6427d03960b877eb | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | conventional_media | ⟦AR-REVIEW⟧ conventional_media | help/error |
| U-24e59ff38c6b902933e5c82b77e463488886fc66eb3ac9f489cf290d203cb360 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Source type | ⟦AR-REVIEW⟧ Source type | help/error |
| U-284e55dcc5a4772a8106d49d7060ee95c45c32d7331c58dd787249f48d75d56c | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | This security will no longer be part of the curated universe. | ⟦AR-REVIEW⟧ This security will no longer be part of the curated universe. | help/error |
| U-2a97f0418d4d5e0152b8471f843970d177238392adf784390c2ec618dcf82012 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Universe membership | ⟦AR-REVIEW⟧ Universe membership | help/error |
| U-31a231c06e6dd0d89fa2c8ae81e1b7c735b750470519d09fa6d0f506894fbe67 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Sector | ⟦AR-REVIEW⟧ Sector | help/error |
| U-324b134f57c70c729ae3dc4d298bb451656717d70523e942c1ce667b8024ea07 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Preview | ⟦AR-REVIEW⟧ Preview | help/error |
| U-32fcd265307dc3145179583e42d9f2622b4fe3697f876701a70c318ff24e1122 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Fiscal year end | ⟦AR-REVIEW⟧ Fiscal year end | help/error |
| U-331551b0de4157c9abc7b72b61b96a2a928fd6db3cdf029c1fc44b08ad633aa6 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Pending | ⟦AR-REVIEW⟧ Pending | help/error |
| U-33eef066d42191e5bd6a2a5024c68ae14209a9592b8e01d4f17abc7dbc85bbd3 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Security added and ingestion started. | ⟦AR-REVIEW⟧ Security added and ingestion started. | help/error |
| U-3444b0bd24f7fd4498d4b7ab3d84d6e9f8aa363783eb60c975d10d39fef54944 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Coverage started | ⟦AR-REVIEW⟧ Coverage started | help/error |
| U-3550f45627429e5b48077637533aa926e1f80da4cb4f88c515fcecd3372b3d3c | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | interest_based_lending | ⟦AR-REVIEW⟧ interest_based_lending | help/error |
| U-3683709dabc0ad051f0e54cfcde20cd9165d29486dac3c166dfbb19c98cf965d | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Facts | ⟦AR-REVIEW⟧ Facts | help/error |
| U-368fe157db1d35d3ab570b7c32f6b027ea433142c3c2b70711d2cc6ed37efe97 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Shares outstanding are unknown or missing. A market-cap fact cannot be derived from a close until shares are available. | ⟦AR-REVIEW⟧ Shares outstanding are unknown or missing. A market-cap fact cannot be derived from a close until shares are available. | help/error |
| U-381cfb6e1e428419d5d6b5d113be06a9023d6407ebe388791ec3d59100d87ec5 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | energy | ⟦AR-REVIEW⟧ energy | help/error |
| U-38db6554429ec1c1fcc4c5d4a7eed4399bcbc8d73840c31e8c35a1dc7786ca3e | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | retail_permissible | ⟦AR-REVIEW⟧ retail_permissible | help/error |
| U-39d206aab8a0b12175ae80c0ca5ad559cd9def2c7a8e828dd2a379565940d4bc | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Confirm and ingest | ⟦AR-REVIEW⟧ Confirm and ingest | help/error |
| U-3ac1a9ec4fa7a9fa612a30803f3d88fa479a45431f644190ebcc18d3eaafdb3a | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Currency | ⟦AR-REVIEW⟧ Currency | help/error |
| U-3bed2cb3a3acf7b6a8ef408420cc682d5520e26976d354254f528c965612054f | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | internal | ⟦AR-REVIEW⟧ internal | help/error |
| U-3d8049711c0c70671c85bab54e68a959b17a61bd44a049d50f07e3c10edbff0c | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | healthcare | ⟦AR-REVIEW⟧ healthcare | help/error |
| U-3ee6716c3c4a30884a7fb0ac5377bc508e137f40994df30c13029e484c16f997 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Select a security to inspect its records. | ⟦AR-REVIEW⟧ Select a security to inspect its records. | help/error |
| U-3f6e1dc5c7123c97f6b7b7bbe3f3a006dc37264059e6d9efe31a3d0ebff0d33e | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | AI Interpretation | ⟦AR-REVIEW⟧ AI Interpretation | help/error |
| U-40a44be8d4f241e3935760cf81de5cdad7fd01d49c078191472b8b6927144db3 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Segment name | ⟦AR-REVIEW⟧ Segment name | help/error |
| U-43bc0f5fc035108f88cb7436ade1a103b0c710ba82c733cb5835a2b89dc4568f | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Override | ⟦AR-REVIEW⟧ Override | help/error |
| U-4510b1b17c718a5ed89bc635e19d5e99091f71085a7271e9f2d65ea8b289030b | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | adult_entertainment | ⟦AR-REVIEW⟧ adult_entertainment | help/error |
| U-464c4ffd019e1e9691dcf0537c797353ef2b1c1d4833d3d463e5b74ae4547344 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Edit | ⟦AR-REVIEW⟧ Edit | help/error |
| U-46e16e9bb23ce86fdeb917ad55d512a80a6480aa95b5715224310814b1687c38 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Start a resumable ingestion job for the curated universe, or resume a recorded run below. | ⟦AR-REVIEW⟧ Start a resumable ingestion job for the curated universe, or resume a recorded run below. | help/error |
| U-48c64fe09126a18f5b6d52ebbbc3ddf0aa1b45e446d86429fddd8ac67957e06b | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Segments | ⟦AR-REVIEW⟧ Segments | help/error |
| U-48c70bf37a741a581f5495bc7a701573563f9f2e18bb2992471decfaf0ea4f7d | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Protected current | ⟦AR-REVIEW⟧ Protected current | help/error |
| U-48d9526093d74dae616d07b9a551c2a798faf56de5b50536ba3786a3d4d4db62 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Source notes | ⟦AR-REVIEW⟧ Source notes | help/error |
| U-49dfbecf6d5c1562e408f4e8faf015423541c95e7886b42ab06095b369901a72 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | conventional_finance | ⟦AR-REVIEW⟧ conventional_finance | help/error |
| U-4c0efd693ee9ae4ca1942a9b6768b665f37f9db5f1243559d9f694271d2b3af4 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Security universe | ⟦AR-REVIEW⟧ Security universe | help/error |
| U-50a6271c259788067965554e789a3265cc05054365b79e295ff01422a74c1278 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Job started. | ⟦AR-REVIEW⟧ Job started. | help/error |
| U-523487a5de21adb5301bbf09807653a537991aded9884ef99c115d906c5b8a1d | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Coverage | ⟦AR-REVIEW⟧ Coverage | help/error |
| U-526e0087cc3f254d9f86f6c7d8e23d954c4dfda2b312efc29194ae8a860106ba | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Description | ⟦AR-REVIEW⟧ Description | help/error |
| U-558488ae273eaea1c53b98a3f8e7fdc561c0646eb1bd9121ac6fa36d81fa9f1b | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Segment saved. | ⟦AR-REVIEW⟧ Segment saved. | help/error |
| U-5a6e4f56c0a254e0704672a2d71fae4356ee298c8c63b7edab8264e31c49ce3a | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Prices | ⟦AR-REVIEW⟧ Prices | help/error |
| U-5c4e108fb00df3de23523111f275198855856b94c034be9005a666ff581c12f1 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | SEC alternative accepted. | ⟦AR-REVIEW⟧ SEC alternative accepted. | help/error |
| U-60a975d5735b2d20e0fd72492f96d206653343e6535ac7beca2b6ac91d68fb0f | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Retained SEC alternatives | ⟦AR-REVIEW⟧ Retained SEC alternatives | help/error |
| U-62d116ef9524dc5d4c6e8e90a132b2b54eb7fbb9bee9d2dc091bcb5ba86e2520 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Revenue amount | ⟦AR-REVIEW⟧ Revenue amount | help/error |
| U-67a0d2e0dab41fca184a37454ca4e946011756ec7b74eede7810d7df89904a18 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Open source | ⟦AR-REVIEW⟧ Open source | help/error |
| U-6c5315914544064e38b005e72597979979917b921468742bf53828f6cd44724d | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | unclassified | ⟦AR-REVIEW⟧ unclassified | help/error |
| U-6ebe42f5ba36b0d428f2ee65e0e6f21d807bc4c180096be563e7991348c8cce7 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Security record | ⟦AR-REVIEW⟧ Security record | help/error |
| U-6f43db5c3a93c8596d1df06377040dbc3476baef4879f143ffa866fc1a729ef6 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Save coverage | ⟦AR-REVIEW⟧ Save coverage | help/error |
| U-7004ac7cd84ffafb1de30762465a7edae00d16f19b870ee420a0cb6f18a20948 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | No latest period | ⟦AR-REVIEW⟧ No latest period | help/error |
| U-7115ec1c2c76411a49b56585e089e2f911b5c2e6d52a8b7e5228eeb2fbf67814 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Business segments | ⟦AR-REVIEW⟧ Business segments | help/error |
| U-7804f7a79a9eee323b6e89d3f8287c7d36076f4d76291646295f435b0dec736e | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Finished | ⟦AR-REVIEW⟧ Finished | help/error |
| U-781923232c692141120bc84f45344c6aeb442df73bfee6dd67a61adb129e4e6c | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Save close | ⟦AR-REVIEW⟧ Save close | help/error |
| U-7a69224fdbada283fd1d5cde54ecb5af8506fbb77745d7f5d63015c01dae5313 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Inspect sourced financial records across the curated universe. | ⟦AR-REVIEW⟧ Inspect sourced financial records across the curated universe. | help/error |
| U-7af063d6aa29c1c3f787da366b17ed90fa7dd9214dce577c8a54ace8f9d9f87e | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | industrials | ⟦AR-REVIEW⟧ industrials | help/error |
| U-7f6680d4cf61a763ec11af8162e7fbb973af4861b42bc8d35d6456fe5533dd19 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Confidence tier | ⟦AR-REVIEW⟧ Confidence tier | help/error |
| U-8043c2aa8b0d4019eedf9d2cd8a95e701faaff35015b89e4fffa2a7274bac272 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | One or more segments are unclassified; classify them using filing evidence. | ⟦AR-REVIEW⟧ One or more segments are unclassified; classify them using filing evidence. | help/error |
| U-809b6c543a046c50cc357aedbd38cb3149d91d63fb34b8d5f9d4f8f3163f57dd | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Job history, progress and failed security retries. | ⟦AR-REVIEW⟧ Job history, progress and failed security retries. | help/error |
| U-841bb21e60a69a79dc00445f0a47b91b0dce098c638085109cc8d547cdc7807d | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | The request failed. Reload and try again. | ⟦AR-REVIEW⟧ The request failed. Reload and try again. | help/error |
| U-854bd83d69fa1c9b6a8daac9d3b9b2ccef7bc39fcc8faaeeee5dc0d5143118a9 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Manual close saved. | ⟦AR-REVIEW⟧ Manual close saved. | help/error |
| U-859122c7b9f9eac54befaced844fc2bb25265aff5f614fbd859defbda2afa4e7 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | insurance_conventional | ⟦AR-REVIEW⟧ insurance_conventional | help/error |
| U-85a39ab345d672ff8ca9b9c6876f3adcacf45ee7c1e2dbd2408fd338bd55e07e | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Yes | ⟦AR-REVIEW⟧ Yes | help/error |
| U-85d5ede5dac8f2bd8cd68870d79b63de806d86a84383be9f532d3b34800714b6 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Job history | ⟦AR-REVIEW⟧ Job history | help/error |
| U-881d6295619ac4f25495d586e7d67a19e9b138bbec1ae545049df94825d01fde | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Editors have read-only access. | ⟦AR-REVIEW⟧ Editors have read-only access. | help/error |
| U-8e021528984ec48441d9092c3bdf64034702be77aad753716e081b57ffd27a42 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Save company fields | ⟦AR-REVIEW⟧ Save company fields | help/error |
| U-8e37953d23daca5ff01b8282c33f4e0a2152f1d1885f94c06418617e3ee1d24e | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Value | ⟦AR-REVIEW⟧ Value | help/error |
| U-8e752bb9817c063245abbe06c58903236866f4ef3934a3d68ce059e06345e67c | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | reported | ⟦AR-REVIEW⟧ reported | help/error |
| U-914330137d1d7f27d9016cda1c87df8bb8a0f8f2e206c088b92a9659a86893f1 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Removing a security keeps its historical records and removes it from the curated universe. | ⟦AR-REVIEW⟧ Removing a security keeps its historical records and removes it from the curated universe. | help/error |
| U-920e413c7d411b61ef3e8c63b1cb6ad058d5f95f8b481dbafe60248387d8c355 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Status | ⟦AR-REVIEW⟧ Status | help/error |
| U-94ad00be85a9e2719b2b04fae5401e4f45912235dd71553179b465937c6ac57d | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Accept SEC | ⟦AR-REVIEW⟧ Accept SEC | help/error |
| U-99c40ab405926cb5ad1def9cff4d7ce624f8f8abfff4e85f655347fcb949d08e | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Date | ⟦AR-REVIEW⟧ Date | help/error |
| U-9e18708c89d9c4771ecf959dfafc463113f5a2abe403e6068dd311bef21907ba | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | No business segments are recorded for the latest period. | ⟦AR-REVIEW⟧ No business segments are recorded for the latest period. | help/error |
| U-a29ab89e70049bd32b12e37bdbcf338ca7b75ac124d8577ed2bf9d6f696be5fb | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Segment deleted. | ⟦AR-REVIEW⟧ Segment deleted. | help/error |
| U-a3b50c476732c7409d297c3d7d0e23569fee5e08318553ae76041ab5fe60582e | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | State | ⟦AR-REVIEW⟧ State | help/error |
| U-a4d31cfad033703a4ec1a20522bdb6a2a421a18d430f069b2c18afeedd4b7f24 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Add segment | ⟦AR-REVIEW⟧ Add segment | help/error |
| U-a7e3dbddddaee1873db6e0114c90b9753156590bb361a1efd7842a39f17b9cc6 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Resume requested. | ⟦AR-REVIEW⟧ Resume requested. | help/error |
| U-a94e7bcfcbed3c846d491d4f47c948e53a23908d480248b3ffe9e126e83ea865 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | records | ⟦AR-REVIEW⟧ records | help/error |
| U-aa1c01dc7dedc39f54edc8cd956268d0023f2eb2ee17f0295301eaffaa75515c | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Save segment | ⟦AR-REVIEW⟧ Save segment | help/error |
| U-abff876358d2784c43e52a9b9ad9c72fd60a0074890137cae90a51349bcea349 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Arabic description | ⟦AR-REVIEW⟧ Arabic description | help/error |
| U-ad617a0fdd57e3f4b8ebb27f6f60470bc4468aadec290db57e612f751767745d | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Job | ⟦AR-REVIEW⟧ Job | help/error |
| U-ad84940df66aea4a2b0bcfae3692eeb57f3930b8463f5ce31f3690221182246f | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Look up a US ticker before adding it to the curated universe. | ⟦AR-REVIEW⟧ Look up a US ticker before adding it to the curated universe. | help/error |
| U-ae750bc5ef4cf856891eb4b49a1605cfd2bd77a517b5e5636404e54ec7bc63fd | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | pork_related | ⟦AR-REVIEW⟧ pork_related | help/error |
| U-b033d3b8ae7b70bb555a4f0e10c2ed4b29639415fb9dbe8a90e484008a4a036f | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Delete this segment? | ⟦AR-REVIEW⟧ Delete this segment? | help/error |
| U-b0cf66d8fc0c2ae6cc4f224aff2a44ca3265988174ad40851967557bd1956a9b | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Arabic name | ⟦AR-REVIEW⟧ Arabic name | help/error |
| U-b234b2e785b82045605a2b639d3939983c287b28925d08b85af31dbeffa79ca5 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | No securities in the curated universe. | ⟦AR-REVIEW⟧ No securities in the curated universe. | help/error |
| U-b23a6a8439c0dde5515893e7c90c1e3233b8616e634470f20dc4928bcf3609bc | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | unknown | ⟦AR-REVIEW⟧ unknown | help/error |
| U-b3d6c4d8f027fabcfd39e5f5d2a2194eff1b84dc35c9cd66b2552dbb36de2175 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | English description | ⟦AR-REVIEW⟧ English description | help/error |
| U-b764cdc0eab7137467211272fa539f1260d1bf2e71bcf6ff3bdc960f5c16aa14 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Unknown | ⟦AR-REVIEW⟧ Unknown | help/error |
| U-b774599a9cd1f9a734a815fc5cf99ad188547aee7c727468d51b73dfd02988f9 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Estimated | ⟦AR-REVIEW⟧ Estimated | help/error |
| U-bb0f9ad6dc335c9a511426682bc10069ef7456504c2fd8687df1cc429b6b0302 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Confirm removal | ⟦AR-REVIEW⟧ Confirm removal | help/error |
| U-bd006bfdd99121179d5ef458f28500d44304b848d2c88142f03f34103ed8aa43 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | regulatory_filing | ⟦AR-REVIEW⟧ regulatory_filing | help/error |
| U-c06ad8a0f13cb7a476b4037592ab13251e07193df22da99d22c77072c5de37c9 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | weapons_conventional | ⟦AR-REVIEW⟧ weapons_conventional | help/error |
| U-c06f6073897e5e857e12be420e89d62163e5b0e73317d0a6c34dd34dec57c1d7 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | telecom | ⟦AR-REVIEW⟧ telecom | help/error |
| U-c19fd9536866ef86c9b3382c195dd6ab984de936ec8d61b7a0376bf5e1ac6606 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Ticker | ⟦AR-REVIEW⟧ Ticker | help/error |
| U-c2246db26eabc00adcea44dc61ca19016e1388fc145d3c18aa64c3742ff370dd | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Coverage assignment saved. | ⟦AR-REVIEW⟧ Coverage assignment saved. | help/error |
| U-c3ea5bf706e433a11fad5d5d13c99621f2d29d42c2fd57bf486616330f54e12d | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Counts | ⟦AR-REVIEW⟧ Counts | help/error |
| U-c6553c490c604bb0950847eef441e1cad8f6e2a07397ae969db7db230c3413e4 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Retry queued. | ⟦AR-REVIEW⟧ Retry queued. | help/error |
| U-c7c7eb1087c4e24d4c121b65abe24f4e54b06a997aa9eac86f3215271f635672 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | alcohol | ⟦AR-REVIEW⟧ alcohol | help/error |
| U-c804be1f43cb58870c8afb463192710a412e9611fbf277407d250098fef20be0 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Category basis | ⟦AR-REVIEW⟧ Category basis | help/error |
| U-c84f265b2fe0b886d7fd1f7ba46d08d4047677ccc98a2eb080beeb8d6c8ceac7 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Filing confirmation saved. | ⟦AR-REVIEW⟧ Filing confirmation saved. | help/error |
| U-c8b3c4b0e288f4d853337be83585bda9c7fb35b983120f59f6c5fe6833f9cac8 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Calculated | ⟦AR-REVIEW⟧ Calculated | help/error |
| U-cb9e8664edea8cf5965fb4d4d013974ef10caeaad734702b19617210828cd7ab | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Tier | ⟦AR-REVIEW⟧ Tier | help/error |
| U-cbc8a81954e306158134027ddcb0b628c9353368fc8d3d51c23c3d2ea0939886 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Source label | ⟦AR-REVIEW⟧ Source label | help/error |
| U-cd9a67fca2a5477ee4c6ada47fb682c860723b7acfd387b61c4eec58bd6bb98b | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Company profile | ⟦AR-REVIEW⟧ Company profile | help/error |
| U-d1022618b99a974b56caeae99b4f9e2eac444335123e3ab94bbbc817c306f2c0 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | inactive | ⟦AR-REVIEW⟧ inactive | help/error |
| U-d27d123e0027ac867fd1d3fd8d710cbd3c7c46519580d1ebd5fe47698a2228a3 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Filing note reference | ⟦AR-REVIEW⟧ Filing note reference | help/error |
| U-d342ed822e55a972f8070862f9433af9c5cedd89d9c3098b249fa4c12dd0dccd | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | estimated | ⟦AR-REVIEW⟧ estimated | help/error |
| U-d3e1c5f8a6e240fc97f057908e6f99feebc73acb865b641a38e28d6ae9b1264c | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Origin | ⟦AR-REVIEW⟧ Origin | help/error |
| U-d60a318dd8a0cdc8795c2c7da003c336dbfb37c6ce68aacd491137d2322f04a0 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Exchange | ⟦AR-REVIEW⟧ Exchange | help/error |
| U-d640c7421da066618a39daf4266da5f61f66a9b1afcd626481b831a17064965d | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Resume | ⟦AR-REVIEW⟧ Resume | help/error |
| U-d6f973a29441ce0fc469fd5e49aa20b118c3667be8901c6d589b22c1fd054e44 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Confirm from filing | ⟦AR-REVIEW⟧ Confirm from filing | help/error |
| U-d7320daad842d7263da1ffba4f3f097653cfda8647761109e29e6eb4c55fd413 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | CIK | ⟦AR-REVIEW⟧ CIK | help/error |
| U-d8da2c49df39d91df7ecd199b92da7bf264f026242ccc69b08daeadfe587c45b | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Note | ⟦AR-REVIEW⟧ Note | help/error |
| U-da43f06caa04c6fd627b63e9e825119a41a376d12ca7a306769d6ea652f9a486 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | tobacco | ⟦AR-REVIEW⟧ tobacco | help/error |
| U-dbdd1978417b5679c951cc0f1cc26629e58e6026cc5c97a84d7522be9872755d | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | generic_permissible | ⟦AR-REVIEW⟧ generic_permissible | help/error |
| U-de4743c879734dc38cb3e270ecefcae077c3c2e626f9298115d5a03c8613f89b | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Company | ⟦AR-REVIEW⟧ Company | help/error |
| U-e28eb2b99802051b5d6ae6da4b3dd010182524088bbbdc069ca946df153869c5 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | SEC changed | ⟦AR-REVIEW⟧ SEC changed | help/error |
| U-e2d0a54968ead24efc0dffa6ac78fc606dceec34a0f586177a74a54cc2272cf8 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Delete | ⟦AR-REVIEW⟧ Delete | help/error |
| U-e39d9d9bf7de33b6c3f7b2b38a8037636ec20c37c8ce4433ca1743dd56cd1c37 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | In universe | ⟦AR-REVIEW⟧ In universe | help/error |
| U-e440a8e6372f5bda794863672e4e59750d5c9dde44e192e6fb40b0b2279d6ce2 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | gambling | ⟦AR-REVIEW⟧ gambling | help/error |
| U-e91fadf24f78c081972a2015146e9b7ad4636bb5a208f5733b54ee4407682078 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | technology | ⟦AR-REVIEW⟧ technology | help/error |
| U-eb6ae79d46cf73b59e107997bdc7015b8a1239f0cde70359b8c30878d3fe666f | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | No manual prices are recorded. | ⟦AR-REVIEW⟧ No manual prices are recorded. | help/error |
| U-ecbc89cd37a037342e740f9e0e0633a70180a2279b0157c9a823fce729f4bd77 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Started | ⟦AR-REVIEW⟧ Started | help/error |
| U-ecbd66cb305487ea944ad8cf90e016238584e6435805c5599639b1ed9d9b9573 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Input state | ⟦AR-REVIEW⟧ Input state | help/error |
| U-f2d544096d1303087b7eb5a78d201723fd66edf43977d240eb880f7fd0fac836 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | No facts are recorded for this period. | ⟦AR-REVIEW⟧ No facts are recorded for this period. | help/error |
| U-f4ccae29e1bb0c20a124570a1b43f4347ea94bba9f84ffdfddd9c7445b126128 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Running | ⟦AR-REVIEW⟧ Running | help/error |
| U-f67958131815dfe83876654dcf242681d34ade89c0d0289abdd3ffa40653a11b | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Remove from universe | ⟦AR-REVIEW⟧ Remove from universe | help/error |
| U-f9d19e17aa798b6ec43f658df3367d605293bd929b2e49d2ca107ff68164a0bc | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | No analyst assigned | ⟦AR-REVIEW⟧ No analyst assigned | help/error |
| U-fa58feaa7106e48e7cf8b78b907a1987621e6969d7e068a2c5cef732428636bb | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Activity category | ⟦AR-REVIEW⟧ Activity category | help/error |
| U-fca046ccd586c67f7fe0b3c12c29873a8abf9376f7cd514fc6272ec03b2de0b3 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Saved. | ⟦AR-REVIEW⟧ Saved. | help/error |
| U-ff8059dc6752afdd30d275932b1d5031a2ec854b387a8c57ecc6689915293a43 | runtime phrase | Rendered/conditionally rendered: src/components/financial/FinancialAdmin.tsx:47 | Actions | ⟦AR-REVIEW⟧ Actions | help/error |
