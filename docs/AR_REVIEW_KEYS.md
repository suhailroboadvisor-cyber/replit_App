# Live Arabic review keys

Generated deterministically by `pnpm ar-review:list`. Live pending rows: **277**.

## Boundaries and coverage

This is a live-only pending inventory, not an approval record. D-96/D-101
approval evidence is pinned independently in tests/fixtures/arabic-approval-baseline.json.
No translations are applied by this command. Existing IDs survive; keyed IDs
are J-namespace-key; new unkeyed phrases use a full SHA-256 source ID (U-...).
Drafts are retained only while their exact English source matches. A source
change requires a new draft; missing drafts are visibly flagged.
Edit docs/arabic-drafts.json to retain a row-specific documentation draft;
docs/arabic-draft-proposals.json supplies documentation-only defaults for new sources.
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
Stored report errors render verbatim in report evidence (without a review marker);
their concrete sources are included as unapproved documentation, not silently
treated as approved translations. Arbitrary exception/report text remains unbounded.
Approved account/audit entries and all currently approved engine templates are absent.
No engine reason template currently carries a review marker.

Caller audit uses translator bindings, finite dynamic type unions (status/theme/
disclaimer), wrapper id/label props, governedText success/error feedback, direct
dictionary adapters, and runtime markers. LocaleDocument/getMessages supplies
the provider; passing the whole dictionary is not evidence that every leaf renders.
Whole-namespace dynamic consumers are retained and reported if unresolved.
Tests, dictionaries and documentation alone never establish a live caller.

## Draft terminology — D-103–D-106

- Edge cases = الحالات الخاصة; حدية is reserved for borderline.
- User-facing production = مُعتمد للاستخدام الفعلي / غير مُعتمد للاستخدام الفعلي.
- Admin “Enable for production” = اعتماد للاستخدام الفعلي.
- Verified by = جهة التحقق.

These founder-specified draft constraints do not authorize copy application,
new approvals or changing D-101. Legal bodies require O-7 text, not translation.

## Integration boundary

Step 6 and locale-aware navigation restoration are merged in this checkout.
This inventory includes their actual callers, including breadcrumbs, version
sections and recovery-screen home/retry controls. These remain unapproved
documentation-only drafts; no future navigation copy is invented.

## Admin methodology — /admin/methodologies

| Key/source | Page/component rendering context | Current English source | Arabic (approved) |
| --- | --- | --- | --- |
| governed.activityCategories | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:400 | Activity category rules |  |
| governed.actual | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:99 | Actual |  |
| governed.actualHash | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:136 | Actual hash |  |
| governed.actualStatus | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:137 | Actual status |  |
| governed.addCriteriaFirst | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:496 | Add and save criteria before authoring cases. |  |
| governed.addCriterion | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:397; Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:406 | Add criterion |  |
| governed.adminIntro | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:156 | Maintain documented rules, test evidence, workflow decisions, and public visibility. Finalized version content remains fixed. |  |
| governed.advanceWorkflow | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:533 | Advance workflow |  |
| governed.aggregateStatus | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:85 | Aggregate status · expected → actual |  |
| governed.analystCaseResults | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:74 | Analyst case comparisons |  |
| governed.analystCases | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:461 | Analyst test cases |  |
| governed.analystCasesHint | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:462 | Author version-specific evidence and expected outcomes before the test gate. |  |
| governed.analystCasesJson | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:506 | Analyst cases JSON |  |
| governed.associateSource | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:561 | Associate source |  |
| governed.baseline | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:183 | Baseline |  |
| governed.blankDraft | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:254 | Start with an empty draft |  |
| governed.borderlineCases | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:207 | Candidate borderline results |  |
| governed.borderlineMargin | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:375 | Borderline margin |  |
| governed.calculationVersion | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:341 | Calculation version |  |
| governed.cancel | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:119 | Cancel |  |
| governed.candidateCriteria | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:283 | Candidate version criteria |  |
| governed.caseCriteriaHint | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:495 | Expected criterion outcomes must use the exact criterion IDs listed here. A cloned version has new IDs and requires new expected-results keys. |  |
| governed.caseInstructions | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:494 | Use the contract shape below with real security, period, source, fact, and segment identities. The inserted sample has no financial evidence and does not represent a passing case. |  |
| governed.casesFinalized | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:469 | Analyst cases are finalized with this version and are shown read-only. |  |
| governed.casesSaved | Conditionally rendered: successful admin action feedback: src/components/methodology/AdminMethodologies.tsx:465 | Analyst cases saved. |  |
| governed.changedCriteria | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:249 | Changed candidate criteria |  |
| governed.changelog | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:261 | Changelog |  |
| governed.cloneFrom | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:230 | Start from an existing version |  |
| governed.cloneNote | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:257 | Version fields are prefilled from the selected source. Criteria are copied with new identities; analyst cases must be authored again against those new IDs. |  |
| governed.closeEdit | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:249; Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:351 | Close editor |  |
| governed.confirmDeleteCriterion | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:425 | Delete this draft criterion? This cannot be undone. |  |
| governed.confirmProduction | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:546 | Enable this methodology version for production? This is a separate audited operation. |  |
| governed.confirmPublish | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:375 | Make this version visible on the public methodology pages? |  |
| governed.confirmUnpublish | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:375 | Remove this version from the public methodology pages? |  |
| governed.coverageGaps | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:33 | Named criterion coverage gaps |  |
| governed.created | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:345 | Created |  |
| governed.createMethodology | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:166; Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:197 | Create methodology |  |
| governed.criteria | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:330; Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:387; Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:391 | Version criteria |  |
| governed.criteriaRecords | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:182 | CRITERIA |  |
| governed.criterion | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:97 | Criterion |  |
| governed.criterionChanges | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:238 | criterion differences |  |
| governed.criterionDeleted | Conditionally rendered: successful admin action feedback: src/components/methodology/AdminMethodologies.tsx:427 | Criterion deleted. |  |
| governed.criterionIdentity | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:361 | Stable criterion identity |  |
| governed.criterionIdentityHelp | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:392 | Identities are fixed by the system and are required when analyst cases refer to expected criterion outcomes. |  |
| governed.criterionSaved | Conditionally rendered: successful admin action feedback: src/components/methodology/AdminMethodologies.tsx:408; Conditionally rendered: successful admin action feedback: src/components/methodology/AdminMethodologies.tsx:422 | Criterion saved. |  |
| governed.criterionType | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:366 | Criterion type |  |
| governed.definition | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:383 | Definition |  |
| governed.deleteCriterion | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:440 | Delete draft criterion |  |
| governed.denominatorDefinition | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:386 | Denominator definition |  |
| governed.denominatorLineItems | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:393; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:420 | Denominator line items |  |
| governed.different | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:110 | DIFFERENT |  |
| governed.draftSaved | Conditionally rendered: successful admin action feedback: src/components/methodology/AdminMethodologies.tsx:316; Conditionally rendered: successful admin action feedback: src/components/methodology/AdminMethodologies.tsx:359 | Draft version saved. |  |
| governed.drivingCriteria | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:189 | Driving criteria |  |
| governed.edgeCases | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:426 | Edge cases |  |
| governed.editCriterion | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:449 | Edit criterion |  |
| governed.editDraft | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:351 | Edit draft content |  |
| governed.editMetadata | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:249 | Edit metadata |  |
| governed.editorReadOnly | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:548 | Editors can review this record but cannot change governance data. |  |
| governed.effectiveDate | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:344; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:227; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:379 | Effective date |  |
| governed.enableProduction | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:549 | Enable production |  |
| governed.engineVersion | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:340 | Engine version |  |
| governed.expected | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:98 | Expected |  |
| governed.expectedHash | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:135 | Expected hash |  |
| governed.failed | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:132; Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:90 | FAIL |  |
| governed.finalizedContentReadOnly | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:402; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:548 | Finalized content is read-only. Create a new draft to change methodology content. |  |
| governed.formula | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:384 | Formula text |  |
| governed.fullReportEvidence | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:346 | Full retained report payload |  |
| governed.genuineMethodologySource | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:552 | Matching verified methodology document |  |
| governed.governanceReports | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:313 | GOVERNANCE EVIDENCE |  |
| governed.impactReport | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:331 | Impact report |  |
| governed.insertExample | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:504 | Insert contract example |  |
| governed.invalidCasesJson | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:488 | Enter a valid JSON array of analyst cases. |  |
| governed.invalidJsonObject | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:219 | Enter a valid JSON object or leave the field blank. |  |
| governed.label | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:368 | Label |  |
| governed.licensing | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:267; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:166 | Licensing status |  |
| governed.match | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:100 | Comparison |  |
| governed.matched | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:110 | MATCH |  |
| governed.metadataSaved | Conditionally rendered: successful admin action feedback: src/components/methodology/AdminMethodologies.tsx:200; Conditionally rendered: successful admin action feedback: src/components/methodology/AdminMethodologies.tsx:256 | Methodology metadata saved. |  |
| governed.methodologyIndex | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:216 | METHODOLOGY REGISTER |  |
| governed.methodologyManagement | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:155; Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:89 | Methodology management |  |
| governed.methodologyMetadata | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:243 | METHODOLOGY METADATA |  |
| governed.methodologyRecords | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:174 | METHODOLOGIES |  |
| governed.methodologyVersions | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:281 | Versions |  |
| governed.name | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:156 | Name |  |
| governed.newDraft | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:286; Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:313 | New draft |  |
| governed.newRecord | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:196 | NEW RECORD |  |
| governed.nextWorkflowTarget | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:518 | Next sequential stage |  |
| governed.noComparableUniverse | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:166 | No comparable securities were recorded. |  |
| governed.noCoverageGaps | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:39 | No missing required outcome coverage was recorded. |  |
| governed.noCriteria | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:413 | No criteria are recorded for this version. |  |
| governed.noEligibleSources | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:555 | No matching eligible source documents |  |
| governed.noMethodologies | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:208 | No methodology records |  |
| governed.noMethodologiesBody | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:209 | Create a methodology record to begin documenting a governed rule set. |  |
| governed.noneConfigured | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:183 | No baseline configured |  |
| governed.nonPermissibleCategories | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:407 | Non-permissible revenue categories |  |
| governed.noReports | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:319 | No reports have been recorded for this version yet. |  |
| governed.notes | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:271; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:172; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:262; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:428 | Notes |  |
| governed.notPublic | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:340 | NOT PUBLIC |  |
| governed.noVersions | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:291 | No versions have been recorded for this methodology. |  |
| governed.numeratorDefinition | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:385 | Numerator definition |  |
| governed.numeratorLineItems | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:390; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:416 | Numerator line items |  |
| governed.observedCoverage | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:56 | Observed |  |
| governed.officialOrAdapted | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:266; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:164 | Official or adapted |  |
| governed.passed | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:132; Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:335; Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:90 | PASS |  |
| governed.previousCriteria | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:283 | Prior version criteria |  |
| governed.priorStatus | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:156 | Prior status |  |
| governed.productionEnabled | Conditionally rendered: successful admin action feedback: src/components/methodology/AdminMethodologies.tsx:547; Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:338 | Production enabled. |  |
| governed.productionOperationNote | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:541 | Separate production operation note |  |
| governed.prohibitedCategories | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:402 | Prohibited primary activity categories |  |
| governed.publicVisible | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:340 | PUBLIC |  |
| governed.publisher | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:262; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:161 | Publisher |  |
| governed.publishVersion | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:380 | Make version public |  |
| governed.purificationHelp | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:265 | Leave blank for null. Enter a JSON object only when this methodology version defines stored treatment data. No generic formula is applied. |  |
| governed.purificationJson | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:263 | Methodology-specific purification data (JSON object) |  |
| governed.ratio | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:215; Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:256 | Ratio |  |
| governed.reportArchive | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:331; Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:309; Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:314 | Test and impact reports |  |
| governed.reportIdentity | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:342 | Report identity |  |
| governed.requiredActivityItems | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:411 | Evaluator requirements are enforced by the contract. These category lists are stored as criterion rule data. |  |
| governed.requiredCoverage | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:55 | Required |  |
| governed.requiredInputsDerived | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:444; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:431 | Required inputs · derived |  |
| governed.result | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:255 | Result |  |
| governed.retainedEvidence | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:265 | Retained unknowns and evidence inputs |  |
| governed.reviewFailed | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:335 | REVIEW / FAIL |  |
| governed.save | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:122 | Save |  |
| governed.saveCases | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:512 | Save analyst cases |  |
| governed.saved | Conditionally rendered: run() default success feedback: src/components/methodology/AdminMethodologies.tsx:116 | Change saved. |  |
| governed.saving | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:122; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:512 | Saving… |  |
| governed.scope | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:270; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:171 | Scope |  |
| governed.securityDiffs | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:223 | Per-security comparison |  |
| governed.sharedGoldenRegressions | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:126 | Shared golden regressions |  |
| governed.shortLabel | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:263; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:157 | Short label |  |
| governed.slug | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:158 | Slug |  |
| governed.sortOrder | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:377 | Sort order |  |
| governed.sourceAssociated | Conditionally rendered: successful admin action feedback: src/components/methodology/AdminMethodologies.tsx:368 | Source association saved. |  |
| governed.sourceAssociation | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:366 | Version source associations |  |
| governed.sourceReference | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:427 | Source reference |  |
| governed.sourceTitle | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:264; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:162 | Source document title |  |
| governed.sourceUrl | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:265; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:163 | Source document URL |  |
| governed.testReport | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:331 | Test report |  |
| governed.threshold | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:369; Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:215; Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:257 | Threshold |  |
| governed.thresholdDirection | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:373 | Threshold direction |  |
| governed.thresholdUnit | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:371 | Threshold unit |  |
| governed.transitionMatrix | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:182 | Status transition matrix |  |
| governed.treatmentRules | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:425 | Treatment rules |  |
| governed.type | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:272; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:159 | Methodology type |  |
| governed.unidentifiedSecurity | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:233 | Security identity unavailable |  |
| governed.unnamedCase | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:83 | Unnamed case |  |
| governed.unnamedCriterion | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:105; Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:194; Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:45 | Unlabelled criterion |  |
| governed.unpublishVersion | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:380 | Remove public visibility |  |
| governed.verificationDate | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:269; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:169 | Verification date |  |
| governed.verifiedBy | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:268; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:168 | Verified by |  |
| governed.versionControl | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:280 | VERSION CONTROL |  |
| governed.versionLabel | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:226 | Version label |  |
| governed.versionNumber | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:225 | Version |  |
| governed.versionRecords | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:178 | VERSIONS |  |
| governed.visibilityControl | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:372 | Public visibility |  |
| governed.visibilityHelp | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:373 | This changes anonymous visibility for this version only. Only versions marked public appear in public methodology pages. |  |
| governed.visibilitySaved | Conditionally rendered: successful admin action feedback: src/components/methodology/AdminMethodologies.tsx:377 | Public visibility updated. |  |
| governed.visibilitySeparate | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:267 | Public visibility is controlled separately after the draft is created. |  |
| governed.workflow | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:477 | Governance workflow |  |
| governed.workflowAdvanced | Conditionally rendered: successful admin action feedback: src/components/methodology/AdminMethodologies.tsx:527 | Workflow advanced. |  |
| governed.workflowHistory | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:496 | Recorded workflow history |  |
| governed.workflowReviewNote | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:521 | Review / transition note |  |
| governed.workflowSequential | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:478 | Advance one stage at a time. Source verification, rules, tests, universe comparison, human review, and approval are checked by the server. |  |
| governed.workspaceLabel | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:154 | ADMIN / METHODOLOGY GOVERNANCE |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/gates.ts:17 | The editorial default methodology version cannot be unpublished; select another default first |  |
| runtime phrase | Conditionally rendered: admin action failure: src/components/methodology/AdminMethodologies.tsx:138 | The change was not accepted. |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/contracts.ts:46 | The evaluator requires a criterion effective date |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:205 | Demo, internal example or permanently blocked provenance cannot be enabled |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/contracts.ts:45 | No registered evaluator |  |
| runtime phrase | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:218 | Methodology records |  |
| runtime phrase | Conditionally rendered: governance refusal: src/app/[locale]/(private)/admin/(protected)/methodology-actions.ts:24 | Unknown methodology operation |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/contracts.ts:56 | Non-permissible categories are required |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:204 | Production is already enabled |  |
| runtime phrase | Conditionally rendered: report/action error fallback: src/app/[locale]/(private)/admin/(protected)/methodology-actions.ts:37 | Database refused the change: the identity may already exist, content may be finalized, or required production provenance is missing. Reload and review the record. |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/contracts.ts:55 | Prohibited categories are required |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/gates.ts:12 | Publish the version before enabling production |  |
| runtime phrase | Conditionally rendered: report/action error fallback: src/lib/methodology/service.ts:156 | No usable annual period |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:211 | All tests and mandatory analyst criterion coverage must pass |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:206 | Approval is required |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:93 | Criterion does not belong to this version |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:134 | Associate a genuine verified methodology document; metadata alone is insufficient |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:27 | Methodology not found |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/contracts.ts:53 | Ratio operands cannot be empty |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/contracts.ts:51 | Business activity requires boolean direction and unit |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:191 | Same-version passing reports are required |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:170 | Invalid workflow note |  |
| runtime phrase | Conditionally rendered: report/action error fallback: src/app/[locale]/(private)/admin/(protected)/methodology-actions.ts:39 | Operation failed |  |
| runtime phrase | Conditionally rendered: admin action recheck/failure: src/lib/auth/errors.ts:9 | operation_failed |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:192 | Recorded human review is required |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:106 | Criterion not found |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:115 | Expected results reference a criterion outside this version |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:15 | Invalid record identity |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/contracts.ts:48 | Threshold is required |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/contracts.ts:58 | Business activity uses business_segments only |  |
| runtime phrase | Conditionally rendered: report/action error fallback: src/lib/methodology/reports.ts:75 | No default baseline version |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:220 | Invalid visibility |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:89 | Finalized criteria are immutable; create a new draft |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:111 | Finalized analyst cases are immutable |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:126 | Select a genuine verified methodology document matching the methodology HTTPS URL |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:63 | Finalized content is immutable; create a new draft |  |
| runtime phrase | Conditionally rendered: report/action error fallback: src/lib/methodology/service.ts:180 | Tests failed or mandatory criterion coverage is missing; see the persisted report |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:69 | Clone must belong to this methodology |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:62 | Version belongs to another methodology |  |
| runtime phrase | Conditionally rendered: report/action error fallback: src/app/[locale]/(private)/admin/(protected)/methodology-actions.ts:33 | Invalid or contradictory engine evidence. No result was produced. |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/contracts.ts:47 | Duplicate line items would double-count evidence |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:207 | Set an eligible licensing status |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/contracts.ts:54 | Ratios require financial line items |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/contracts.ts:52 | A boolean unit requires boolean direction |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:23 | Version not found |  |
| runtime phrase | Conditionally rendered: admin action failure: src/components/methodology/AdminMethodologies.tsx:142 | The request failed. Reload the record and try again. |  |
| runtime phrase | Conditionally rendered: report/action error fallback: src/lib/methodology/service.ts:184 | Impact comparison is incomplete; see the persisted report |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:104 | Finalized criteria are immutable |  |
| runtime phrase | Conditionally rendered: admin action recheck/failure: src/lib/auth/actions.ts:15 | role_required |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:171 | Workflow must advance exactly one stage; reload this version |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:40 | Add at least one valid criterion |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/contracts.ts:57 | Revenue evaluator uses business_segments divided by total_revenue |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/gates.ts:16 | A production-enabled version cannot be unpublished |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:186 | A human reviewer note is required |  |
| runtime phrase | Conditionally rendered: report execution failure: src/lib/methodology/reports.ts:6 | Engine execution failed; no result produced |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:124 | Source associations are immutable after draft |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:212 | Invalid production note |  |
| runtime phrase | Conditionally rendered: admin action failure: src/components/methodology/AdminMethodologies.tsx:329 | Version sections |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:131 | Complete HTTPS source title/URL, verifier and verification date |  |

## Legal pages — /terms and /privacy

| Key/source | Page/component rendering context | Current English source | Arabic (approved) |
| --- | --- | --- | --- |
| content/legal/privacy.ar.md | Rendered: /privacy, /en/privacy; LegalDocument body; O-7 unresolved | Privacy Policy — draft awaiting founder-supplied Arabic-first legal review, including Saudi PDPL and data residency. This is not approved legal text. |  |
| content/legal/terms.ar.md | Rendered: /terms, /en/terms; LegalDocument body; O-7 unresolved | Terms of Use — draft awaiting founder-supplied Arabic-first legal review. This is not approved legal text. |  |

## Public methodology — /methodology and /methodology/[slug]

| Key/source | Page/component rendering context | Current English source | Arabic (approved) |
| --- | --- | --- | --- |
| methodologies.borderline | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:227; Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:305 | Borderline margin |  |
| methodologies.changeHistory | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:176 | Change history |  |
| methodologies.definition | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:278 | Definition |  |
| methodologies.edgeCases | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:318 | Edge cases |  |
| methodologies.effectiveDate | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:170; Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:272 | Effective date |  |
| methodologies.formula | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:281 | Formula |  |
| methodologies.inProduction | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:165 | Available in production |  |
| methodologies.licensing | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:148 | Licensing |  |
| methodologies.noChangeHistory | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:177 | No recorded changes since this version became effective. |  |
| methodologies.notInProduction | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:165 | Not enabled for production |  |
| methodologies.officialOrAdapted | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:145 | Official or adapted |  |
| methodologies.productionStatus | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:164 | Production status |  |
| methodologies.publisher | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:144 | Publisher |  |
| methodologies.requiredInputs | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:321 | Required inputs |  |
| methodologies.ruleGroups | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:205 | Rule groups |  |
| methodologies.rules | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:210 | criteria |  |
| methodologies.sourceDocument | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:137; Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:151 | Source document |  |
| methodologies.sourceRef | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:324 | Source reference |  |
| methodologies.subtitle | Rendered/conditionally rendered: src/components/methodology/MethodologyDirectory.tsx:28 | Every rule this application applies, with its source reference, version and verification status. |  |
| methodologies.title | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:104; Rendered/conditionally rendered: src/components/methodology/MethodologyDirectory.tsx:25 | Methodology Center |  |
| methodologies.treatment | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:310 | Treatment rules |  |
| methodologies.verificationDate | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:161 | Verification date |  |
| methodologies.verifiedBy | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:160 | Verified by |  |
| methodologies.version | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:128; Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:167; Rendered/conditionally rendered: src/components/methodology/MethodologyDirectory.tsx:85 | Version |  |
| publicMethodology.breadcrumb | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:102 | Breadcrumb |  |
| publicMethodology.chooseVersion | Rendered/conditionally rendered: src/components/methodology/PublicMethodologyVersions.tsx:56 | Choose a version |  |
| publicMethodology.criteriaSummaryTable | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:218 | Concise comparison of the criteria documented in this version. |  |
| publicMethodology.criterionType | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:223 | Criterion type |  |
| publicMethodology.denominatorLineItems | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:293 | Denominator line items |  |
| publicMethodology.documentedMethods | Rendered/conditionally rendered: src/components/methodology/MethodologyDirectory.tsx:33 | DOCUMENTED METHODS |  |
| publicMethodology.methodologyRecords | Rendered/conditionally rendered: src/components/methodology/MethodologyDirectory.tsx:54 | Methodology records |  |
| publicMethodology.noPublicCriteria | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:254 | No public criteria are recorded for this version. |  |
| publicMethodology.numeratorLineItems | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:290 | Numerator line items |  |
| publicMethodology.openDocumentation | Rendered/conditionally rendered: src/components/methodology/MethodologyDirectory.tsx:99 | Open documentation |  |
| publicMethodology.publicResearchDocumentation | Rendered/conditionally rendered: src/components/methodology/MethodologyDirectory.tsx:22 | PUBLIC RESEARCH / DOCUMENTATION |  |
| publicMethodology.publicVersion | Rendered/conditionally rendered: src/components/methodology/PublicMethodologyVersions.tsx:52 | Public version |  |
| publicMethodology.publicVersions | Rendered/conditionally rendered: src/components/methodology/MethodologyDirectory.tsx:89 | Public versions |  |
| publicMethodology.publishedVersionsOnly | Rendered/conditionally rendered: src/components/methodology/PublicMethodologyVersions.tsx:53 | Only published versions are listed. |  |
| publicMethodology.purificationTreatment | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:190 | Purification treatment |  |
| publicMethodology.researchRegister | Rendered/conditionally rendered: src/components/methodology/MethodologyDirectory.tsx:44 | RESEARCH REGISTER |  |
| publicMethodology.ruleRegister | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:202 | RULE REGISTER |  |
| publicMethodology.storedMethodologyData | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:185 | STORED METHODOLOGY DATA |  |
| publicMethodology.thresholdDirection | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:226; Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:302 | Threshold direction |  |
| publicMethodology.thresholdUnit | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:225; Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:299 | Threshold unit |  |
| publicMethodology.treatmentRuleData | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:313 | Treatment rule data |  |
| publicMethodology.versionSelector | Rendered/conditionally rendered: src/components/methodology/PublicMethodologyVersions.tsx:49 | Select a published methodology version |  |
| publicMethodology.workflowStatus | Rendered/conditionally rendered: src/components/methodology/MethodologyDetail.tsx:173 | Workflow status |  |
| runtime phrase | Rendered/conditionally rendered: src/components/methodology/AdminBreadcrumbs.tsx:7 | Breadcrumb |  |

## Shared public shell and foundation samples

| Key/source | Page/component rendering context | Current English source | Arabic (approved) |
| --- | --- | --- | --- |
| runtime phrase | Rendered/conditionally rendered: src/components/foundation/RecoveryScreen.tsx:13 | Back to Suhail |  |
| runtime phrase | Rendered/conditionally rendered: src/components/foundation/RecoveryScreen.tsx:14 | Retry |  |
| runtime phrase | Rendered/conditionally rendered: src/components/foundation/RecoveryScreen.tsx:11 | This page could not be loaded. |  |
