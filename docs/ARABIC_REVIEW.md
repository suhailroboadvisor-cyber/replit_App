# Arabic copy review — inventory and approval record

## 0. Current approval state — D-101

The founder explicitly authorized Phase 2 for **87 rows** and their edits. Applied: all 11 marked disclaimer/banner/methodology-note/styleguide JSON rows; A-001–A-042; all 27 F-* audit codes; all six E-* templates and their explanation substitutions; I-forbidden.

The founder's edits supersede the historical drafts below:

- J-disclaimer-short: `نتائج الفحص لأغراض المعلومات فقط — وليست فتوى. تختلف المنهجيات واجتهادات العلماء. التحليل المالي ليس نصيحة استثمارية شخصية.`
- J-disclaimer-full: change `مخصّصة لك` to `شخصية` and `متاحة للجميع` to `متاحة للعموم`; otherwise retain the draft.
- J-banner-demo: `بيانات افتراضية / عرض تجريبي. كل الأرقام والإفصاحات والأسعار والمنهجيات في هذه الشاشة افتراضية أُعدّت لأغراض العرض فقط، ولا تصف أي مُصدِر أو سوق أو حكم حقيقي.`
- J-banner-exampleMethodology: `مثال — غير مُتحقَّق منه — غير مُعتمد للاستخدام الفعلي. هذه المنهجية تعريف تجريبي، وليست معيارًا منشورًا، ولا تحظى بأي تأييد.`
- A-042: `تبقى الأبحاث العامة متاحة للجميع.`
- F-user_mfa_reset: `إعادة تعيين تطبيق المصادقة لمستخدم`.
- J-styleguide-intro: `للتطوير فقط. هذه نماذج للمكوّنات وليست نتائج فحص. الألوان الدلالية المشتقة مقترحات لم يعتمدها المؤسس بعد.`
- E-*: no displayed reason code. Blocking/review unknown templates are exactly `{field}: {explanation}` without extra repeated phrases. Ratio uses 2 decimals; threshold stays as configured, without forced decimals; `%` only for percent units; Western digits; null ratio `غير معروف`, null threshold `غير محدد`. This follows the founder's subsequent clarification; the English renderer is unchanged.
- `stale_data`: `الفترة المالية أقدم من الحد المسموح به لعمر البيانات.`
- `primary_tied`: `تساوت أكبر حصص القطاعات، فتعذّر تحديد النشاط الرئيسي.`
- Terminology: Editions = `الأعداد`, weekly edition = `العدد الأسبوعي`; F-edition_draft_created = `إنشاء مسودة عدد`, F-edition_published = `نشر عدد`, F-edition_revision = `مراجعة عدد`, F-edition_status_change = `تغيير حالة عدد`. Methodology/software versions remain `إصدارات`, not `أعداد`.

**Still deferred: 84 rows.** All J-methodologies-* (30), J-admin-* (51), J-nav-screen (1) retain Arabic review markers, even when an identical English phrase is approved elsewhere. L-terms-body and L-privacy-body (2) retain both legal and Arabic review markers pending O-7. Arbitrary unapproved audit summaries and future unknown fallback phrases remain marked. No legal bodies, policy versions, fixed status labels, engine decisions or founder reference were changed.

The original Phase 1 inventory follows as a **historical review baseline**. Its “UNAPPROVED” draft column headings and Phase 1-only instructions describe the state when the sheet was first prepared; the explicit D-101 approval record above governs the approved subset now. They do not revoke the founder's Phase 2 authorization or approve the remaining rows.

Phase 2 verification after syncing the concurrent methodology work: typecheck, lint, logical-direction lint and 608 unit tests passed; 215 engine tests passed with 100% coverage; all 51 Arabic/English account/methodology browser-fixture tests passed, including the actual forbidden component under each locale's provider. Both methodology and forbidden fixture modes are preserved. The forbidden screen preserves the English denial message on `/en` and uses approved Arabic on Arabic routes. The public home screenshot shows the approved Arabic disclaimer without a marker. Real signed-in UI was not visually verified; authenticated component behavior was exercised only through isolated auth-boundary fixtures. English reason rendering, all legal files, current policy versions and the founder reference have no diff.

## Historical Phase 1 scope

**Every Arabic draft below is UNAPPROVED.** This sheet is a proposal for the founder's row-level review, not professional legal or religious approval. Implementation awaits the founder's explicit row approvals and separate Phase 2 authorization. Acceptance of this documentation task does not approve any translation.

Only this document is added. Application copy, `approved-arabic.ts`, `ar.json`, tests, legal files, both review markers, the founder-owned reference and the decision log remain untouched. No D-101 is recorded.

## 1. Baseline and review rules

- Inventory snapshot: 2026-10-14, checkout `7518881`, scanned at approximately 22:00 UTC; clean working tree before this document. Counts are from this checkout, not historical handoff counts. Concurrent methodology work is not assumed to be present or edited.
- Sources consulted: `replit.md`; `docs/SUHAIL_BUILD_REFERENCE.md` Appendix B and §§4.3, 4.6, 7.1, 7.3, 11; `docs/DECISIONS.md` (especially D-42/D-59, D-63/D-66, D-70, D-79/D-80, D-96); foundation, accounts and engine handoffs; current approved dictionary and runtime callers.
- Modern Standard Arabic, short sentences, Western digits `0-9`. Keep identifiers, named services, interpolation fields, URLs and machine keys intact. The literal deletion token remains `DELETE`; its existing approved instruction `اكتب "DELETE" للتأكيد` is outside this inventory.
- D-96 wording is reused exactly where a marked source matches an approved phrase: for example `Admin` → `الإدارة`, `Name` → `الاسم`, `Audit trail` → `سجل التدقيق`. This does not authorize changing a marked JSON key merely because its phrase has approval elsewhere.
- Appendix B terminology is retained: `المنهجية`, `إصدار المنهجية`, `المعيار`, `النسبة`, `الحد`, `البسط`, `المقام`, `هامش الحد`, `الحالات الحدية`, `سجل التغييرات`. Existing approved page titles `شروط الاستخدام` and `سياسة الخصوصية` are not unapproved legal bodies.
- Fixed §7.1 labels are not proposed for replacement: `passes_selected_methodology` = `متوافق على الأرجح`; `fails_selected_methodology` = `غير متوافق على الأرجح`; `requires_review` = `يحتاج إلى مراجعة`; `insufficient_data` = `بيانات غير كافية`. The reference's pre-launch reviewer confirmation remains separate.
- §11 limitations are preserved: informational screening, no fatwa, no individual religious ruling, no claim of Shariah authority, no endorsement, no personalized investment advice. Both disclaimer drafts explicitly use `ليست فتوى`.
- Drafts translate the current English source, not a redesigned product. Some unused sources describe outdated behavior (notably production prerequisites, immutable-on-creation wording and demo mutation). Their inventory inclusion does not validate that behavior; any later source revision requires a new copy review.

### Approval or edits

Reply with individual IDs, for example `Approve J-nav-screen` or `Edit A-001: <exact replacement Arabic>`. IDs stay tied to their source key, phrase or reason kind; do not renumber existing rows when new copy is added. An approval of one JSON key does not approve another identical-valued key. Reused account phrases have one row with all screen usages. Legal rows cannot be approved as translations: supply separately reviewed O-7 text. Unmentioned rows remain unapproved. Even after row approval, do not apply wording or remove markers without explicit Phase 2 authorization.

## 2. Reconciled totals

| Source group | UI label | help/error | status reason template | disclaimer/banner (religious-legal) | legal document (do not translate; needs O-7 text) | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Marked `ar.json` leaves | 70 | 18 | 0 | 5 | 0 | 93 |
| Unapproved account dictionary entries | 2 | 40 | 0 | 0 | 0 | 42 |
| Concrete audit-code fallback values (schema vocabulary) | 27 | 0 | 0 | 0 | 0 | 27 |
| Arabic engine templates | 0 | 0 | 6 | 0 | 0 | 6 |
| Inline forbidden message | 0 | 1 | 0 | 0 | 0 | 1 |
| Arabic legal bodies | 0 | 0 | 0 | 0 | 2 | 2 |
| **Total review rows** | **99** | **59** | **6** | **5** | **2** | **171** |

JSON namespace totals: `nav` 1, `methodologies` 30, `admin` 51, `disclaimer` 2, `methodology` 1, `banner` 2, `styleguide` 6 = 93. Account dictionary: 164 entries = 122 with D-96 approved wording + 42 marked computed values; all 42 have concrete callers in this checkout. No unapproved account entry was found without a caller.

Of the 27 audit codes, 6 have current non-test writers and 21 are schema-supported values with no current writer found. All can be rendered if stored records are supplied to the audit screen; they are listed separately from the unbounded summary context, not asserted to exist in the database.

### Context notation

- **Not yet rendered** means no current caller of that dictionary key was found. It is still inventoried for future screens. In this snapshot all 30 `methodologies.*`, all 51 `admin.*` and `nav.screen` keys are not yet rendered; existing admin screens use account phrases instead, and `/methodology` is a deferred placeholder using approved `nav.methodologies`.
- **Styleguide** = `/styleguide` in development only; production returns 404. All six marked styleguide keys have callers. `methodology.pageNote` and both banners are currently sampled there, not evidence of implemented stock/methodology detail pages.
- **Public shell** = public layout, including home and legal pages. The short disclaimer and expandable full disclaimer render through `Disclaimer`; the styleguide also samples them.
- Account component locations are under `src/components/accounts/`; routes are Arabic default with equivalent `/en` routes. Errors and success messages appear only under the stated condition, not necessarily on initial page load.

## 3. Marked JSON leaves

All locations in this section are exact keys in `src/i18n/messages/ar.json`; English sources match the same keys in `en.json` after removing the Arabic review prefix. Separate keys remain individually addressable.

| ID | Key/location | Screen/context | English source | Proposed Arabic draft — UNAPPROVED | Category |
| --- | --- | --- | --- | --- | --- |
| J-nav-screen | `nav.screen` | Not yet rendered; future navigation | Screen | الفحص | UI label |
| J-methodologies-title | `methodologies.title` | Not yet rendered; future methodology directory | Methodology Center | مركز المنهجيات | UI label |
| J-methodologies-subtitle | `methodologies.subtitle` | Not yet rendered; future directory introduction | Every rule this application applies, with its source reference, version and verification status. | كل قاعدة يطبّقها هذا التطبيق، مع مرجع مصدرها وإصدارها وحالة التحقق منها. | help/error |
| J-methodologies-publisher | `methodologies.publisher` | Not yet rendered; future methodology metadata | Publisher | الجهة الناشرة | UI label |
| J-methodologies-officialOrAdapted | `methodologies.officialOrAdapted` | Not yet rendered; future metadata | Official or adapted | رسمي أو مقتبس | UI label |
| J-methodologies-sourceDocument | `methodologies.sourceDocument` | Not yet rendered; future source link | Source document | وثيقة المصدر | UI label |
| J-methodologies-version | `methodologies.version` | Not yet rendered; future version metadata | Version | الإصدار | UI label |
| J-methodologies-effectiveDate | `methodologies.effectiveDate` | Not yet rendered; future metadata | Effective date | تاريخ السريان | UI label |
| J-methodologies-ruleGroups | `methodologies.ruleGroups` | Not yet rendered; future criteria groups | Rule groups | مجموعات القواعد | UI label |
| J-methodologies-changeHistory | `methodologies.changeHistory` | Not yet rendered; future history | Change history | سجل التغييرات | UI label |
| J-methodologies-verification | `methodologies.verification` | Not yet rendered; future metadata | Verification | التحقق | UI label |
| J-methodologies-verifiedBy | `methodologies.verifiedBy` | Not yet rendered; future metadata | Verified by | تحقّق منه | UI label |
| J-methodologies-verificationDate | `methodologies.verificationDate` | Not yet rendered; future metadata | Verification date | تاريخ التحقق | UI label |
| J-methodologies-productionStatus | `methodologies.productionStatus` | Not yet rendered; future metadata | Production status | حالة الإنتاج | UI label |
| J-methodologies-inProduction | `methodologies.inProduction` | Not yet rendered; future enabled state | Available in production | متاح في الإنتاج | UI label |
| J-methodologies-notInProduction | `methodologies.notInProduction` | Not yet rendered; future disabled state | Not enabled for production | غير مفعّل للإنتاج | UI label |
| J-methodologies-licensing | `methodologies.licensing` | Not yet rendered; future metadata | Licensing | الترخيص | UI label |
| J-methodologies-scope | `methodologies.scope` | Not yet rendered; future metadata | Scope | النطاق | UI label |
| J-methodologies-official | `methodologies.official` | Not yet rendered; future provenance | Official | رسمي | UI label |
| J-methodologies-adapted | `methodologies.adapted` | Not yet rendered; future provenance | Adapted | مقتبس | UI label |
| J-methodologies-internalExample | `methodologies.internalExample` | Not yet rendered; future provenance | Internal example | مثال داخلي | UI label |
| J-methodologies-sourceRef | `methodologies.sourceRef` | Not yet rendered; future criterion source | Source reference | مرجع المصدر | UI label |
| J-methodologies-definition | `methodologies.definition` | Not yet rendered; future criterion | Definition | التعريف | UI label |
| J-methodologies-formula | `methodologies.formula` | Not yet rendered; future criterion | Formula | الصيغة | UI label |
| J-methodologies-treatment | `methodologies.treatment` | Not yet rendered; future criterion | Treatment rules | قواعد المعالجة | UI label |
| J-methodologies-edgeCases | `methodologies.edgeCases` | Not yet rendered; future criterion | Edge cases | الحالات الحدية | UI label |
| J-methodologies-requiredInputs | `methodologies.requiredInputs` | Not yet rendered; future criterion | Required inputs | المدخلات المطلوبة | UI label |
| J-methodologies-borderline | `methodologies.borderline` | Not yet rendered; future criterion | Borderline margin | هامش الحد | UI label |
| J-methodologies-none | `methodologies.none` | Not yet rendered; future missing definition | Not defined in this version | غير محدد في هذا الإصدار | help/error |
| J-methodologies-noChangeHistory | `methodologies.noChangeHistory` | Not yet rendered; future empty history | No recorded changes since this version became effective. | لا توجد تغييرات مسجلة منذ سريان هذا الإصدار. | help/error |
| J-methodologies-rules | `methodologies.rules` | Not yet rendered; future criterion count label | criteria | معايير | UI label |
| J-admin-title | `admin.title` | Not yet rendered; future JSON-based admin | Admin | الإدارة | UI label |
| J-admin-subtitle | `admin.subtitle` | Not yet rendered; future admin introduction | Methodology definitions, data and the audit trail. | تعريفات المنهجيات والبيانات وسجل التدقيق. | help/error |
| J-admin-createMethodology | `admin.createMethodology` | Not yet rendered; future methodology action | Create methodology | إنشاء منهجية | UI label |
| J-admin-methodologyName | `admin.methodologyName` | Not yet rendered; future form | Name | الاسم | UI label |
| J-admin-shortLabel | `admin.shortLabel` | Not yet rendered; future form | Short label | تسمية مختصرة | UI label |
| J-admin-publisher | `admin.publisher` | Not yet rendered; future form | Publisher | الجهة الناشرة | UI label |
| J-admin-sourceTitle | `admin.sourceTitle` | Not yet rendered; future form | Source document title | عنوان وثيقة المصدر | UI label |
| J-admin-sourceUrl | `admin.sourceUrl` | Not yet rendered; future form | Source document URL | رابط وثيقة المصدر | UI label |
| J-admin-officialOrInspired | `admin.officialOrInspired` | Not yet rendered; future form | Official or adapted | رسمي أو مقتبس | UI label |
| J-admin-licensingStatus | `admin.licensingStatus` | Not yet rendered; future form | Licensing status | حالة الترخيص | UI label |
| J-admin-scope | `admin.scope` | Not yet rendered; future form | Scope | النطاق | UI label |
| J-admin-notes | `admin.notes` | Not yet rendered; future form | Notes | ملاحظات | UI label |
| J-admin-createVersion | `admin.createVersion` | Not yet rendered; future action | Create version | إنشاء إصدار | UI label |
| J-admin-versionLabel | `admin.versionLabel` | Not yet rendered; future form | Version label | تسمية الإصدار | UI label |
| J-admin-versionNumber | `admin.versionNumber` | Not yet rendered; future form | Version | الإصدار | UI label |
| J-admin-changelog | `admin.changelog` | Not yet rendered; future form | Changelog | سجل التغييرات | UI label |
| J-admin-enableProduction | `admin.enableProduction` | Not yet rendered; future action | Enable for production | تفعيل للإنتاج | UI label |
| J-admin-productionBlocked | `admin.productionBlocked` | Not yet rendered; future gate help; source predates D-93 | Production cannot be enabled until the source URL, the verifier and the verification date are all filled in. | لا يمكن تفعيل الإنتاج حتى يُستكمل رابط المصدر واسم من تحقّق منه وتاريخ التحقق. | help/error |
| J-admin-productionBlockedShort | `admin.productionBlockedShort` | Not yet rendered; future gate help; source predates D-93 | Missing source URL, verifier or verification date | رابط المصدر أو اسم من تحقّق منه أو تاريخ التحقق غير متوفر | help/error |
| J-admin-productionEnabled | `admin.productionEnabled` | Not yet rendered; future state | Available in production | متاح في الإنتاج | UI label |
| J-admin-addCriterion | `admin.addCriterion` | Not yet rendered; future action | Add criterion | إضافة معيار | UI label |
| J-admin-criterionType | `admin.criterionType` | Not yet rendered; future form | Criterion type | نوع المعيار | UI label |
| J-admin-label | `admin.label` | Not yet rendered; future form | Label | التسمية | UI label |
| J-admin-definitionField | `admin.definitionField` | Not yet rendered; future form | Definition | التعريف | UI label |
| J-admin-formulaField | `admin.formulaField` | Not yet rendered; future form | Formula | الصيغة | UI label |
| J-admin-numeratorField | `admin.numeratorField` | Not yet rendered; future form | Numerator definition | تعريف البسط | UI label |
| J-admin-denominatorField | `admin.denominatorField` | Not yet rendered; future form | Denominator definition | تعريف المقام | UI label |
| J-admin-numeratorItems | `admin.numeratorItems` | Not yet rendered; future form | Numerator line items | بنود البسط | UI label |
| J-admin-denominatorItems | `admin.denominatorItems` | Not yet rendered; future form | Denominator line items | بنود المقام | UI label |
| J-admin-numeratorItemsHint | `admin.numeratorItemsHint` | Not yet rendered; future form help; machine keys unchanged | Comma separated line item keys, for example: cash_and_equivalents, interest_bearing_investments | مفاتيح البنود مفصولة بفواصل، مثل: cash_and_equivalents, interest_bearing_investments | help/error |
| J-admin-denominatorItemsHint | `admin.denominatorItemsHint` | Not yet rendered; future form help; machine key unchanged | Comma separated line item keys, for example: total_assets | مفاتيح البنود مفصولة بفواصل، مثل: total_assets | help/error |
| J-admin-threshold | `admin.threshold` | Not yet rendered; future form | Threshold | الحد | UI label |
| J-admin-thresholdUnit | `admin.thresholdUnit` | Not yet rendered; future form | Threshold unit | وحدة الحد | UI label |
| J-admin-thresholdDirection | `admin.thresholdDirection` | Not yet rendered; future form | Threshold direction | اتجاه الحد | UI label |
| J-admin-borderlineMargin | `admin.borderlineMargin` | Not yet rendered; future form | Borderline margin | هامش الحد | UI label |
| J-admin-borderlineMarginHint | `admin.borderlineMarginHint` | Not yet rendered; future form help | Leave empty when the methodology defines no borderline margin. An empty margin is never replaced with an assumed default. | اتركه فارغًا إذا لم تحدد المنهجية هامش حد. لا يُستبدل الهامش الفارغ بقيمة افتراضية مفترضة. | help/error |
| J-admin-treatmentRules | `admin.treatmentRules` | Not yet rendered; future form | Treatment rules | قواعد المعالجة | UI label |
| J-admin-treatmentCategories | `admin.treatmentCategories` | Not yet rendered; future form | Non-permissible activity categories | فئات الأنشطة غير المباحة | UI label |
| J-admin-prohibitedCategories | `admin.prohibitedCategories` | Not yet rendered; future form | Prohibited primary activity categories | فئات الأنشطة الرئيسية المحظورة | UI label |
| J-admin-treatmentCategoriesHint | `admin.treatmentCategoriesHint` | Not yet rendered; future form help | Comma separated category keys. | مفاتيح الفئات مفصولة بفواصل. | help/error |
| J-admin-edgeCases | `admin.edgeCases` | Not yet rendered; future form | Edge cases | الحالات الحدية | UI label |
| J-admin-sourceReference | `admin.sourceReference` | Not yet rendered; future form | Source reference | مرجع المصدر | UI label |
| J-admin-sortOrder | `admin.sortOrder` | Not yet rendered; future form | Order | الترتيب | UI label |
| J-admin-immutableNotice | `admin.immutableNotice` | Not yet rendered; future help; exact source, not an override of D-11 | A methodology version is immutable once created. Changing a rule means creating a new version, so past runs keep pointing at the rules they were produced under. | لا يقبل إصدار المنهجية التعديل بعد إنشائه. تغيير قاعدة يعني إنشاء إصدار جديد، لتظل عمليات الفحص السابقة مرتبطة بالقواعد التي أُنتجت وفقًا لها. | help/error |
| J-admin-auditTrail | `admin.auditTrail` | Not yet rendered; future JSON-based audit heading | Audit trail | سجل التدقيق | UI label |
| J-admin-auditEmpty | `admin.auditEmpty` | Not yet rendered; future empty state | No audit events recorded yet. | لا توجد أحداث تدقيق مسجلة بعد. | help/error |
| J-admin-demoData | `admin.demoData` | Not yet rendered; future demo heading | Demonstration data | بيانات تجريبية | UI label |
| J-admin-reloadDemo | `admin.reloadDemo` | Not yet rendered; future demo action | Load the demonstration dataset | تحميل مجموعة البيانات التجريبية | UI label |
| J-admin-reloadingDemo | `admin.reloadingDemo` | Not yet rendered; future pending state | Loading demonstration data | جارٍ تحميل البيانات التجريبية | UI label |
| J-admin-demoNote | `admin.demoNote` | Not yet rendered; future demo help; no mutation authorized | Writes the fabricated dataset through the provider adapters: exchanges, companies, securities, periods, facts, segments, sources, methodologies, versions and criteria. Existing demonstration records are updated in place rather than duplicated. | يكتب مجموعة البيانات الافتراضية عبر محوّلات مزوّدي البيانات: البورصات والشركات والأوراق المالية والفترات والحقائق والقطاعات والمصادر والمنهجيات والإصدارات والمعايير. تُحدَّث السجلات التجريبية الموجودة بدلًا من إنشاء نسخ مكررة منها. | help/error |
| J-admin-dataSnapshot | `admin.dataSnapshot` | Not yet rendered; future metadata | Data snapshot | لقطة البيانات | UI label |
| J-disclaimer-short | `disclaimer.short` | Public shell and styleguide; short context | Informational screening only — not a fatwa. Methodologies and scholarly interpretations differ. Financial analysis is not personalized investment advice. | نتائج الفحص للمعلومات فقط — ليست فتوى. تختلف المنهجيات والاجتهادات الشرعية. التحليل المالي ليس نصيحة استثمارية مخصّصة لك. | disclaimer/banner (religious-legal) |
| J-disclaimer-full | `disclaimer.full` | Public shell expandable disclaimer and styleguide | This application provides informational stock analysis and Shariah screening based on selected, documented methodologies and publicly available information. It is not a fatwa, does not constitute an individualized religious ruling, and does not represent itself as a Shariah authority. Different scholars, institutions, and methodologies may reach different conclusions. Financial data and screening results can change as new disclosures and methodology updates become available. Users seeking religious guidance for their personal circumstances should consult a qualified Shariah scholar or advisory body. Investment-related analysis is informational and is not personalized investment advice. Investing involves risk, including loss of capital. | يقدّم هذا التطبيق تحليلًا للأسهم وفحصًا شرعيًا لأغراض المعلومات، استنادًا إلى منهجيات مختارة وموثّقة ومعلومات متاحة للجميع. نتائج هذا التطبيق ليست فتوى، ولا تمثّل حكمًا شرعيًا خاصًا بحالة فردية، ولا يقدّم التطبيق نفسه بوصفه مرجعًا شرعيًا. قد يصل علماء وجهات ومنهجيات مختلفة إلى نتائج مختلفة. قد تتغيّر البيانات المالية ونتائج الفحص مع توفر إفصاحات جديدة وتحديثات للمنهجيات. على من يطلب إرشادًا شرعيًا يناسب ظروفه الشخصية الرجوع إلى عالم شرعي مؤهل أو جهة استشارية شرعية مؤهلة. التحليل المتعلق بالاستثمار للمعلومات فقط، وليس نصيحة استثمارية مخصّصة لك. ينطوي الاستثمار على مخاطر، منها خسارة رأس المال. | disclaimer/banner (religious-legal) |
| J-methodology-pageNote | `methodology.pageNote` | Styleguide sample; future methodology detail note | This page documents how the application implements this methodology. It does not constitute endorsement or a religious ruling. | توثّق هذه الصفحة كيفية تطبيق هذه المنهجية في التطبيق. ولا تمثّل تأييدًا لها أو حكمًا شرعيًا. | disclaimer/banner (religious-legal) |
| J-banner-exampleMethodology | `banner.exampleMethodology` | Styleguide sample; ExampleMethodologyBanner component | EXAMPLE — not verified — not production. This methodology is a demonstration definition. It is not a published standard and carries no endorsement. | مثال — لم يُتحقق منه — ليس للإنتاج. هذه المنهجية تعريف تجريبي، وليست معيارًا منشورًا، ولا تحظى بأي تأييد. | disclaimer/banner (religious-legal) |
| J-banner-demo | `banner.demo` | Styleguide sample; DemoBanner component | SYNTHETIC / DEMO. Every figure, filing, price and methodology on this screen is fabricated for demonstration. No real issuer, market or ruling is described. | بيانات افتراضية / تجريبية. كل رقم وإفصاح وسعر ومنهجية في هذه الشاشة مُختلق لأغراض العرض التجريبي. ولا يصف أيٌّ منها مُصدرًا أو سوقًا أو حكمًا حقيقيًا. | disclaimer/banner (religious-legal) |
| J-styleguide-intro | `styleguide.intro` | Styleguide introduction | Development only. Component samples, not screening results. Derived semantic colors are PROPOSALS, not founder-approved. | للتطوير فقط. هذه نماذج مكوّنات، وليست نتائج فحص. الألوان المشتقة لربط الألوان بدلالاتها مقترحات لم يعتمدها المؤسس. | help/error |
| J-styleguide-review | `styleguide.review` | Styleguide review notice | Arabic placeholders require human review. | تتطلب النصوص العربية المؤقتة مراجعة بشرية. | help/error |
| J-styleguide-decorative | `styleguide.decorative` | Styleguide contrast section | Decorative dividers do not convey boundaries or state. | الفواصل الزخرفية لا تدل على حدود العناصر أو حالتها. | help/error |
| J-styleguide-emphasis | `styleguide.emphasis` | Styleguide typography | Emphasis uses color, not bold body text. | يُستخدم اللون للتأكيد، لا الخط العريض في متن النص. | help/error |
| J-styleguide-seal | `styleguide.seal` | Styleguide seal eligibility sample | Coverage eligibility sample: covered and passing only. | نموذج لأهلية إظهار ختم التغطية: للأوراق المالية المشمولة بالتغطية والتي اجتازت الفحص فقط. | help/error |
| J-styleguide-fonts | `styleguide.fonts` | Styleguide font caption | Self-hosted IBM Plex Sans Arabic / Sans / Mono | خطوط IBM Plex Sans Arabic / Sans / Mono مستضافة محليًا | UI label |

## 4. Unapproved account phrases

Every row originates in `src/components/accounts/types.ts` → `accountMessages` → `accountCopyDictionary[English].ar`, which computes `⟦AR-REVIEW⟧ ${english}` when absent from `approvedArabicCopy`. The caller column lists usages rather than duplicating a reused phrase. All are currently renderable under the specified conditions.

| ID | Key/location | Screen/context | English source | Proposed Arabic draft — UNAPPROVED | Category |
| --- | --- | --- | --- | --- | --- |
| A-001 | `accountMessages`; AuthScreens.tsx | Sign-in noscript | Enable JavaScript to continue with Google. | فعّل JavaScript للمتابعة باستخدام Google. | help/error |
| A-002 | `accountMessages`; AuthScreens.tsx → failure → providerMessage | Sign-in inside embedded frame | Google sign-in needs a separate browser tab. Open sign-in in a new tab, then continue with Google. | يتطلب تسجيل الدخول عبر Google علامة تبويب منفصلة في المتصفح. افتح تسجيل الدخول في علامة تبويب جديدة، ثم اختر المتابعة باستخدام Google. | help/error |
| A-003 | `accountMessages`; AuthScreens.tsx → failure → providerMessage | Sign-in request/configuration failure | Google sign-in could not be started. Check your connection and try again in a new tab. If it still fails, contact the site owner to check Google provider and callback settings. | تعذّر بدء تسجيل الدخول عبر Google. تحقّق من اتصالك وحاول مجددًا في علامة تبويب جديدة. إذا استمرت المشكلة، فتواصل مع مالك الموقع للتحقق من إعدادات تسجيل الدخول عبر Google وعنوان إعادة التوجيه. | help/error |
| A-004 | `accountMessages`; AuthScreens.tsx → failure → providerMessage | Sign-in navigation timeout | Google navigation did not complete. Open sign-in in a new tab and try again. | لم يكتمل الانتقال إلى Google. افتح تسجيل الدخول في علامة تبويب جديدة وحاول مجددًا. | help/error |
| A-005 | `accountMessages`; AccountScreen.tsx | Account deletion unsuccessful; response or exception | Account deletion could not be completed. Try again. | تعذّر إكمال حذف الحساب. حاول مجددًا. | help/error |
| A-006 | `accountMessages`; MfaScreens.tsx | Enrollment and verification still require stronger session | Additional verification is still required. | لا يزال يلزم تحقق إضافي. | help/error |
| A-007 | `accountMessages`; AccountScreen.tsx | Admin/editor deletion restriction | An admin or editor account cannot be deleted. Ask another admin to remove your role first. | لا يمكن حذف حساب مسؤول النظام أو المحرّر. اطلب من مسؤول نظام آخر إزالة دورك أولًا. | help/error |
| A-008 | `accountMessages`; AdminScreens.tsx | Audit subtitle | A read-only record of privileged changes. | سجل للقراءة فقط للتغييرات التي تتطلب صلاحيات خاصة. | help/error |
| A-009 | `accountMessages`; AccountScreen.tsx | Account subtitle | A small set of preferences and account details. | مجموعة محدودة من التفضيلات وتفاصيل الحساب. | help/error |
| A-010 | `accountMessages`; MfaScreens.tsx | Enrollment verified status | Authenticator verified. | تم التحقق من تطبيق المصادقة. | help/error |
| A-011 | `accountMessages`; MfaScreens.tsx | Enrollment preparation errors, including unavailable client/provider | Could not prepare authenticator enrollment. Try again. | تعذّر تجهيز إعداد تطبيق المصادقة. حاول مجددًا. | help/error |
| A-012 | `accountMessages`; AccountControl.tsx | Shared public account menu; sign-out failure | Could not sign out. Please try again. | تعذّر تسجيل الخروج. يُرجى المحاولة مجددًا. | help/error |
| A-013 | `accountMessages`; AdminScreens.tsx | Settings eligibility switch help; D-96 scope of ineligible | Editors may publish an explicitly marked pick even when it is not eligible under the selected screening configuration. | يمكن للمحرّرين نشر اختيار يحمل علامة توضيحية صريحة، حتى إن كان غير مؤهل وفق إعدادات الفحص المختارة. | help/error |
| A-014 | `accountMessages`; MfaScreens.tsx | Verification instruction | Enter the current code from your verified authenticator to continue to the editorial workspace. | أدخل الرمز الحالي من تطبيق المصادقة الذي تم التحقق منه للمتابعة إلى مساحة عمل التحرير. | help/error |
| A-015 | `accountMessages`; AccountScreen.tsx | Sign-in method provider value | Google | Google | UI label |
| A-016 | `accountMessages`; AccountScreen.tsx | Language-save response or exception | Language preference could not be saved. Try again. | تعذّر حفظ تفضيل اللغة. حاول مجددًا. | help/error |
| A-017 | `accountMessages`; AccountScreen.tsx | Language-save success | Language saved | تم حفظ اللغة | help/error |
| A-018 | `accountMessages`; MfaScreens.tsx | Verification recovery help | Lost your authenticator? Contact another administrator for a reset. | فقدت إمكانية الوصول إلى تطبيق المصادقة؟ تواصل مع مسؤول نظام آخر لإعادة إعداده. | help/error |
| A-019 | `accountMessages`; MfaScreens.tsx | Verification without a verified factor | No verified authenticator is available for this account. | لا يتوفر لهذا الحساب تطبيق مصادقة تم التحقق منه. | help/error |
| A-020 | `accountMessages`; AuthScreens.tsx | Sign-in provider help | One Google account. No password to manage. | حساب Google واحد. لا حاجة إلى إدارة كلمة مرور. | help/error |
| A-021 | `accountMessages`; AdminScreens.tsx | Settings default-version selector help | Only public, eligible versions are listed. | تُعرض الإصدارات المتاحة للجميع والمؤهلة فقط. | help/error |
| A-022 | `accountMessages`; AuthScreens.tsx | Re-consent notice | Policy acceptance is recorded on your account. | تُسجَّل موافقتك على السياسات في حسابك. | help/error |
| A-023 | `accountMessages`; AccountControl.tsx | Shared public account menu; profile request failure | Profile is temporarily unavailable. | الملف الشخصي غير متاح مؤقتًا. | help/error |
| A-024 | `accountMessages`; AdminScreens.tsx | Users role-change dialog help | Role changes are audited. A promoted user must enroll an authenticator before entering admin. | تُسجَّل تغييرات الأدوار في سجل التدقيق. يجب على المستخدم الذي مُنح دورًا أعلى إعداد تطبيق المصادقة قبل الدخول إلى الإدارة. | help/error |
| A-025 | `accountMessages`; AdminScreens.tsx | Users role-change failure; response or exception | Role could not be updated. Try again. | تعذّر تحديث الدور. حاول مجددًا. | help/error |
| A-026 | `accountMessages`; AdminScreens.tsx | Users subtitle | Roles are granted deliberately and every change is recorded. | تُمنح الأدوار بقرار مقصود، ويُسجَّل كل تغيير. | help/error |
| A-027 | `accountMessages`; AdminScreens.tsx | Users role-change success | Role updated. | تم تحديث الدور. | help/error |
| A-028 | `accountMessages`; AdminScreens.tsx | Settings-save failure; response or exception | Settings could not be saved. Try again. | تعذّر حفظ الإعدادات. حاول مجددًا. | help/error |
| A-029 | `accountMessages`; AdminScreens.tsx | Settings-save success | Settings saved. | تم حفظ الإعدادات. | help/error |
| A-030 | `accountMessages`; auth/sign-in/page.tsx → providerError → AuthScreens.tsx | Sign-in `error=cancelled` | Sign-in was cancelled. You can try again. | أُلغي تسجيل الدخول. يمكنك المحاولة مجددًا. | help/error |
| A-031 | `accountMessages`; MfaScreens.tsx | Enrollment code verification failure | That code could not be verified. Check the time on your device and try again. | تعذّر التحقق من هذا الرمز. تحقّق من الوقت على جهازك وحاول مجددًا. | help/error |
| A-032 | `accountMessages`; MfaScreens.tsx | Verification code failure | That code could not be verified. Try again. | تعذّر التحقق من هذا الرمز. حاول مجددًا. | help/error |
| A-033 | `accountMessages`; MfaScreens.tsx | Enrollment unavailable/configuration notice | The account provider is not configured for this browser session. Contact an administrator. | لم تُضبط خدمة الحسابات لجلسة المتصفح هذه. تواصل مع مسؤول النظام. | help/error |
| A-034 | `accountMessages`; auth/sign-in/page.tsx → providerError → AuthScreens.tsx | Sign-in `error=provider` | Google sign-in could not be started. Please try again. | تعذّر بدء تسجيل الدخول عبر Google. يُرجى المحاولة مجددًا. | help/error |
| A-035 | `accountMessages`; AdminScreens.tsx | Settings subtitle | These settings affect editorial defaults. Changes are audited. | تؤثر هذه الإعدادات في الخيارات الافتراضية للتحرير. وتُسجَّل التغييرات في سجل التدقيق. | help/error |
| A-036 | `accountMessages`; AdminScreens.tsx | Deferred admin methodology, securities, ingestion, editions and analysts screens | This area is reserved for a later editorial workflow. No data can be changed here. | هذا القسم مخصّص لسير عمل تحريري لاحق. لا يمكن تغيير أي بيانات هنا. | help/error |
| A-037 | `accountMessages`; AccountScreen.tsx | Language-preference help | This controls the language used when you open Suhail. | يحدد هذا الخيار اللغة المستخدمة عند فتح سهيل. | help/error |
| A-038 | `accountMessages`; AccountScreen.tsx | Ordinary user's deletion warning | This permanently removes your account and cannot be undone. | يؤدي هذا إلى حذف حسابك نهائيًا، ولا يمكن التراجع عنه. | help/error |
| A-039 | `accountMessages`; AdminScreens.tsx | Users table column heading, distinct from approved lowercase role `user` | User | المستخدم | UI label |
| A-040 | `accountMessages`; MfaScreens.tsx | Enrollment and verification exception | Verification could not be completed. Try again. | تعذّر إكمال التحقق. حاول مجددًا. | help/error |
| A-041 | `accountMessages`; AuthScreens.tsx | Re-consent introduction | Your agreement needs to be renewed before you continue using your account. | يلزم تجديد موافقتك قبل متابعة استخدام حسابك. | help/error |
| A-042 | `accountMessages`; AuthScreens.tsx | Sign-in public-access reassurance | Your public research remains open to everyone. | تظل الأبحاث المتاحة للجميع مفتوحة للجميع. | help/error |

## 5. Concrete fallback caller: audit codes

`AdminScreens.tsx` → `AuditScreen` calls `reviewText(locale, row.event_type)` and `reviewText(locale, row.summary)`. These codes are absent from both account and approved dictionaries, so Arabic renders `⟦AR-REVIEW⟧ <code>`. Exact source strings here are machine codes, not invented English labels. The same code used as event type and summary has one row. Origins are `src/db/schema/accounts.ts` → `auditEventType`; writer locations are noted below.

**Current writers:** `src/lib/auth/audit.ts` emits `user_registered` and `consent_recorded`; `src/lib/auth/admin-mutations.ts` emits `user_role_change` and `editorial_setting_change`; `scripts/admin/grant.ts` also emits `user_role_change`; `scripts/admin/reset-mfa.ts` emits `user_mfa_reset`; `drizzle/0004_account_security.sql` emits `user_account_deleted`. These six writers use the code itself as summary. No database records or personal data were queried.

| ID | Key/location | Screen/context | English source / exact code | Proposed Arabic draft — UNAPPROVED | Category |
| --- | --- | --- | --- | --- | --- |
| F-methodology_create | `auditEventType`; AuditScreen fallback | Audit; schema-supported, no current writer found | methodology_create | إنشاء منهجية | UI label |
| F-methodology_update | `auditEventType`; AuditScreen fallback | Audit; schema-supported, no current writer found | methodology_update | تحديث منهجية | UI label |
| F-methodology_version_create | `auditEventType`; AuditScreen fallback | Audit; schema-supported, no current writer found | methodology_version_create | إنشاء إصدار منهجية | UI label |
| F-methodology_version_production_enable | `auditEventType`; AuditScreen fallback | Audit; schema-supported, no current writer found | methodology_version_production_enable | تفعيل إصدار منهجية للإنتاج | UI label |
| F-criterion_create | `auditEventType`; AuditScreen fallback | Audit; schema-supported, no current writer found | criterion_create | إنشاء معيار | UI label |
| F-criterion_update | `auditEventType`; AuditScreen fallback | Audit; schema-supported, no current writer found | criterion_update | تحديث معيار | UI label |
| F-screening_run | `auditEventType`; AuditScreen fallback | Audit; schema-supported, no current writer found | screening_run | تشغيل الفحص | UI label |
| F-explanation_generated | `auditEventType`; AuditScreen fallback | Audit; schema-supported, no current writer found | explanation_generated | إنشاء شرح | UI label |
| F-data_ingest | `auditEventType`; AuditScreen fallback | Audit; schema-supported, no current writer found | data_ingest | استيراد البيانات | UI label |
| F-alert_created | `auditEventType`; AuditScreen fallback | Audit; schema-supported, no current writer found | alert_created | إنشاء تنبيه | UI label |
| F-edition_draft_created | `auditEventType`; AuditScreen fallback | Audit; schema-supported, no current writer found | edition_draft_created | إنشاء مسودة إصدار | UI label |
| F-edition_published | `auditEventType`; AuditScreen fallback | Audit; schema-supported, no current writer found | edition_published | نشر إصدار | UI label |
| F-edition_revision | `auditEventType`; AuditScreen fallback | Audit; schema-supported, no current writer found | edition_revision | مراجعة إصدار | UI label |
| F-edition_status_change | `auditEventType`; AuditScreen fallback | Audit; schema-supported, no current writer found | edition_status_change | تغيير حالة إصدار | UI label |
| F-score_model_version_create | `auditEventType`; AuditScreen fallback | Audit; future scoring code, no current writer found | score_model_version_create | إنشاء إصدار نموذج تقييم | UI label |
| F-score_model_status_change | `auditEventType`; AuditScreen fallback | Audit; future scoring code, no current writer found | score_model_status_change | تغيير حالة نموذج تقييم | UI label |
| F-score_model_backtest | `auditEventType`; AuditScreen fallback | Audit; future scoring code, no current writer found | score_model_backtest | اختبار نموذج تقييم على بيانات سابقة | UI label |
| F-editor_pick_saved | `auditEventType`; AuditScreen fallback | Audit; schema-supported, no current writer found | editor_pick_saved | حفظ اختيار المحرّر | UI label |
| F-approval_recorded | `auditEventType`; AuditScreen fallback | Audit; schema-supported, no current writer found | approval_recorded | تسجيل موافقة | UI label |
| F-performance_recorded | `auditEventType`; AuditScreen fallback | Audit; schema-supported, no current writer found | performance_recorded | تسجيل الأداء | UI label |
| F-price_advance | `auditEventType`; AuditScreen fallback | Audit; schema-supported, no current writer found | price_advance | تحديث السعر إلى تاريخ لاحق | UI label |
| F-editorial_setting_change | `auditEventType`; AuditScreen fallback | Audit type and summary; current settings writer | editorial_setting_change | تغيير إعداد تحريري | UI label |
| F-user_registered | `auditEventType`; AuditScreen fallback | Audit type and summary; current registration writer | user_registered | تسجيل مستخدم | UI label |
| F-user_role_change | `auditEventType`; AuditScreen fallback | Audit type and summary; current admin action and grant CLI | user_role_change | تغيير دور مستخدم | UI label |
| F-user_mfa_reset | `auditEventType`; AuditScreen fallback | Audit type and summary; current reset CLI | user_mfa_reset | إعادة إعداد المصادقة متعددة العوامل لمستخدم | UI label |
| F-user_account_deleted | `auditEventType`; AuditScreen fallback | Audit type and summary; current deletion function | user_account_deleted | حذف حساب مستخدم | UI label |
| F-consent_recorded | `auditEventType`; AuditScreen fallback | Audit type and summary; current consent writer | consent_recorded | تسجيل الموافقة | UI label |

## 6. Six screening-reason templates

Origins: `src/engine/reasons/ar.ts` → `renderArabicDraft`, one marked template per `reason.kind`; corresponding English source is from `src/engine/reasons/en.ts` → `renderEnglish`, not a back-translation of the existing Arabic draft. There is no current application call to the Arabic renderer; these are exported, callable engine templates for the subsequent evidence UI. They are not claims that public screening pages already exist.

### Interpolation mapping and evidence boundary

Review notation uses braces; original source uses JavaScript `${...}`. Preserve all original evidence fields. Display proposals below include the English renderer's explanation and retain the Arabic renderer's explicit reason-code field; this is a proposal for review, not authorization to change formatting or renderer behavior.

- `{label}` → `reason.label`; `{field}` → `reason.field`; `{reasonCode}` → `reason.reasonCode`, kept as the exact machine code (not a translated replacement).
- `{ratio}` → original Arabic `${reason.ratio}`; corresponding English `${ratio}` is `reason.ratio === null ? "unknown" : reason.ratio.toFixed(2) + suffix`. `{threshold}` → original Arabic `${reason.threshold}`; corresponding English `${threshold}` is `reason.threshold === null ? "not set" : reason.threshold + suffix`. For the proposed display reading, `unknown` is `غير معروف`, `not set` is `غير محدد`. Preserve Western digits and applicable suffix. `suffix` is empty for null/absolute/boolean units and `%` for `percent_*`, from `unitSuffix(reason.thresholdUnit)`. Do not universally append `%`. The existing Arabic renderer currently interpolates raw numeric/null values without English unit formatting; any implementation must explicitly reconcile that distinction, not silently assume it has already changed.
- `{explanation}` → English `explanations[reason.reasonCode]`; Arabic review mapping immediately below. It is not a new explanation, inferred fact or LLM output.
- `{borderlineCount}` → `reason.borderlineCount`; `{unknownCount}` → `reason.unknownCount`. Retain explicit zero counts. `criterion_counts` is the structured reason code of the counts template, not an extra displayed explanation.
- Labels and fields are runtime evidence, not fixed Arabic wording. Their translations/data provenance are outside this finite marked-template inventory. Examples include configured criterion labels, numerator/denominator definitions, and the generated `Business segments` and `Data freshness` fields. Do not replace an unavailable input with an assumed value.

| ID | Key/location | Screen/context | English source template | Proposed Arabic draft — UNAPPROVED | Category |
| --- | --- | --- | --- | --- | --- |
| E-failure | `reasons/ar.ts`, `failure`; `en.ts` same kind | Engine failure reasons; each failed criterion; future evidence UI | {label} criterion: Fail — {ratio} against a {threshold} limit. {explanation} | معيار {label}: لم يجتز الفحص — النسبة {ratio} مقابل حد {threshold}. {explanation} رمز السبب: {reasonCode}. | status reason template |
| E-borderline | `reasons/ar.ts`, `borderline`; `en.ts` same kind | Engine review reasons; each borderline criterion | {label} criterion: Borderline — {ratio} against a {threshold} limit. {explanation} | معيار {label}: نتيجة حدية — النسبة {ratio} مقابل حد {threshold}. {explanation} رمز السبب: {reasonCode}. | status reason template |
| E-criterion_unknown | `reasons/ar.ts`, `criterion_unknown`; `en.ts` same kind | Engine review reasons; each unknown criterion | {label} criterion: Unknown — {explanation} | معيار {label}: النتيجة غير معروفة — {explanation} رمز السبب: {reasonCode}. | status reason template |
| E-blocking_unknown | `reasons/ar.ts`, `blocking_unknown`; `en.ts` shared unknown branch | Engine insufficient-data reasons; blocking unknown fields | {field}: {explanation} | {field}: بيانات لازمة غير متاحة؛ لا تُفترض قيمة. {explanation} رمز السبب: {reasonCode}. | status reason template |
| E-review_unknown | `reasons/ar.ts`, `review_unknown`; `en.ts` shared unknown branch | Engine review reasons; review-severity unknown fields | {field}: {explanation} | {field}: يلزم مراجعة البيانات. {explanation} رمز السبب: {reasonCode}. | status reason template |
| E-counts | `reasons/ar.ts`, `counts`; `en.ts` same kind | Engine failure summary; includes zero counts | {borderlineCount} borderline criteria; {unknownCount} unknown criteria. | عدد المعايير الحدية: {borderlineCount}؛ عدد المعايير غير المعروفة: {unknownCount}. | status reason template |

### Explanation substitutions — part of the six row proposals, not extra marked origins

These 19 finite English lookup values are included so `{explanation}` is reviewable, not an unresolved translation instruction. Approving an engine row must include its applicable substitutions; edits can identify the reason code. Codes not emitted for a given kind must not be invented into that kind. The mappings preserve current evidence and D-79/D-80 meanings.

- `boolean_positive`: “The value is greater than zero.” → `القيمة أكبر من صفر.`
- `boolean_nonpositive`: “The value is zero or negative.” → `القيمة صفر أو سالبة.`
- `within_margin`: “The ratio is within the configured borderline margin.” → `تقع النسبة ضمن هامش الحد المحدد.`
- `max_within_limit`: “The ratio is at or below the limit.” → `النسبة عند الحد أو دونه.`
- `max_exceeded`: “The ratio exceeds the limit.” → `تتجاوز النسبة الحد.`
- `min_met`: “The ratio meets the minimum.” → `تبلغ النسبة الحد الأدنى أو تتجاوزه.`
- `min_not_met`: “The ratio is below the minimum.” → `النسبة دون الحد الأدنى.`
- `denominator_unavailable`: “cannot be evaluated; screen is Insufficient Data; no value assumed” → `لا يمكن تقييمه؛ حالة الفحص هي «بيانات غير كافية»؛ لم تُفترض أي قيمة.`
- `denominator_nonpositive`: “denominator is zero or negative; ratio undefined; no value assumed” → `المقام صفر أو سالب؛ النسبة غير معرّفة؛ لم تُفترض أي قيمة.`
- `numerator_unavailable`: “numerator unavailable; no value assumed” → `البسط غير متاح؛ لم تُفترض أي قيمة.`
- `no_segments`: “no segment disclosure recorded” → `لم يُسجَّل إفصاح عن القطاعات.`
- `shares_unavailable`: “segment revenue share unavailable; primary activity not assumed” → `حصة القطاع من الإيرادات غير متاحة؛ لم يُفترض النشاط الرئيسي.`
- `unclassified_primary`: “primary activity is unclassified” → `النشاط الرئيسي غير مصنّف.`
- `primary_tied`: “primary activity tied between segments” → `تعادلت القطاعات في تحديد النشاط الرئيسي.`
- `primary_prohibited`: “The primary activity is in the prohibited categories.” → `يندرج النشاط الرئيسي ضمن الفئات المحظورة.`
- `primary_permissible`: “The primary activity is not in the prohibited categories.” → `لا يندرج النشاط الرئيسي ضمن الفئات المحظورة.`
- `evaluator_unregistered`: “no evaluator is registered” → `لا توجد دالة تقييم مسجلة.`
- `stale_data`: “The financial period is older than the configured staleness limit.” → `تجاوز عمر الفترة المالية حد قدم البيانات المحدد.`
- `criterion_counts`: `""` → `""` (empty; no added explanatory text).

## 7. Inline message and legal bodies

The legal body's English source column preserves the exact English currently carried inside the Arabic marked body, not a substitution of the shorter `*.en.md` draft. Both locale pairs were inspected. Arabic Markdown bodies are loaded by `src/lib/auth/legal.ts` and rendered by `LegalDocument` using `react-markdown` with `skipHtml`; they are runtime content, not comments.

| ID | Key/location | Screen/context | English source | Proposed Arabic draft — UNAPPROVED | Category |
| --- | --- | --- | --- | --- | --- |
| I-forbidden | `src/app/[locale]/(private)/forbidden.tsx`, paragraph | Framework forbidden screen; literal marker currently appears regardless of locale; heading remains `403` | Access is restricted to authorized roles. | يقتصر الوصول على أصحاب الأدوار المصرّح لها. | help/error |
| L-terms-body | `content/legal/terms.ar.md`, body after `draft-2026-10-11` front matter | `/terms` → LegalDocument; markers `⟦LEGAL-REVIEW⟧ ⟦AR-REVIEW⟧` both retained | Terms of Use — draft awaiting founder-supplied Arabic-first legal review. This is not approved legal text. | Do not translate; needs O-7 text | legal document (do not translate; needs O-7 text) |
| L-privacy-body | `content/legal/privacy.ar.md`, body after `draft-2026-10-11` front matter | `/privacy` → LegalDocument; markers `⟦LEGAL-REVIEW⟧ ⟦AR-REVIEW⟧` both retained | Privacy Policy — draft awaiting founder-supplied Arabic-first legal review, including Saudi PDPL and data residency. This is not approved legal text. | Do not translate; needs O-7 text | legal document (do not translate; needs O-7 text) |

No Terms or Privacy translation is drafted. O-7 and legal review remain unresolved. Their approved headings and policy-version display are not review rows. This document neither resolves consent/legal readiness nor changes policy versions.

## 8. Dynamic contexts, exclusions and completeness

### Traced dynamic callers

- `AuthScreens.tsx`: `reviewText(locale, failure || providerError || "")` resolves to A-002/A-003/A-004 plus provider/cancellation A-030/A-034 in the current page. Empty text is not passed in the displayed branch. Arbitrary future providerError props are not a finite source vocabulary.
- `AdminScreens.tsx`: `label` comes from the fixed navigation list; `title` comes from deferred section titles. All of these are already D-96-approved, including `Securities and data`, `Ingestion`, `Editions`, `Analysts` and `Methodologies`. The deferred section's explanation is A-036.
- `private-page-metadata.ts`: `title` callers use approved sign-in, consent, account, MFA, users, audit, settings, methodology and deferred-section titles, with approved `Admin section` as fallback. Metadata helper produces no additional unapproved finite phrase here.
- `LegalDocument.tsx`: title conditional selects approved `Terms of Use` / `Privacy Policy`; marked bodies are L-terms-body/L-privacy-body, not the title.
- Audit event types are bounded by the 27 schema codes in §5. `row.summary` is an arbitrary stored text field; the six current writers' exact summaries are the same six codes already inventoried. Other historical, external or future summary values are unknown without a separately authorized data inventory. Do not claim that 171 rows cover every possible database string. User-entered notes/identities, entity identifiers and JSON details are not finite marked source literals.
- Engine `{label}` / `{field}` are supplied or generated evidence; `{reasonCode}` is a structured code, deliberately retained. English explanation substitutions are bounded and listed above. No extra machine-generated explanation or interpretation is proposed.
- The generic `reviewText(locale, source)` fallback can mark any future unlisted caller. Its expression is a marker producer, not one translatable phrase row. This snapshot contains no additional unapproved literal `reviewText` call outside the 42 account phrases; audit values are accounted for separately. Future code/data additions require another scan before approved-copy application.

### Excluded occurrences

Whole-checkout marker search distinguished origins from consumers, assertions and documentation:

- `src/components/foundation/shared.tsx` consumes the prefix to set English language/direction semantics; `LocaleSwitcher.tsx` and `ThemeToggle.tsx` inspect it for language attributes. These three consumers contain no new marked copy origins.
- `src/components/accounts/types.ts` contains two producer expressions (dictionary fallback and generic fallback). Their concrete phrases/codes are inventoried, not the expressions themselves.
- Six `AR-REVIEW: needs human Arabic drafting` comments beside engine templates are comments, not displayed text.
- `src/components/accounts/copy.test.ts`, `src/engine/reasons.test.ts`, `tests/foundation.test.ts`, `tests/mfa-copy.test.ts` and `e2e/accounts-locales-fixture.spec.ts` contain assertions/fixtures (including `Unapproved new phrase`), not extra runtime origins.
- `scripts/foundation-report.ts` detects markers and describes them in generated documentation; it does not introduce runtime UI copy. Do not regenerate its historical report for this task.
- Existing marker mentions in `docs/FOUNDATION_HANDOFF.md`, `docs/ACCOUNTS_HANDOFF.md`, `docs/STEP_3_REPORT.md` and `docs/ACCOUNT_ADMIN_LOCALE_CHECKS.md` are handoff/review context, not runtime phrases. This sheet's own marker mentions are also documentation.
- `content/legal/terms.en.md` and `privacy.en.md` have legal-review markers only, not Arabic-review origins. Existing approved Arabic labels, unmarked Appendix B leaves, English-only sample content, generated outputs, dependencies and uploaded assets are outside the marked-source inventory.

### Verification of this deliverable

- Re-scanned `src`, `content`, scripts, tests and existing documentation for literal markers and traced computed account fallbacks using the current AST/callers.
- Reconciled every marked JSON key (93), every unapproved account entry (42), the audit schema code set (27), each Arabic reason kind (6), the inline message (1) and both legal bodies (2). One ID per origin/template; no duplicate account phrase rows.
- Checked exact English sources against paired JSON keys, account phrases, English engine renderer and legal placeholders. Count/category totals above describe finite source rows, not a count of visible occurrences on every screen.
- Checked retained literals, Western digits, interpolation mapping, D-96 terminology, unchanged fixed status labels and `ليست فتوى` in both disclaimers. Legal draft columns contain only the mandated O-7 instruction.
- No application behavior is changed or new UI delivered. No browser interaction, database access, migration, translation application, copy-test update or launch action is part of this sheet. Only `docs/ARABIC_REVIEW.md` is the intended project diff.
- `pnpm typecheck`, `pnpm lint`, `pnpm lint:logical` and `pnpm test` passed (557 tests in 25 files). A read-only screenshot of the unchanged public home confirmed the shell still renders with its existing review-marked disclaimer. The signed-in UI was not visually verified.

**Stop here.** Await the founder's row-level decisions. Existing Arabic-copy application tasks remain separate; no Phase 2 work is initiated.
