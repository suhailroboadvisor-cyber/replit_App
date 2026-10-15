# Live Arabic review keys

Generated deterministically by `pnpm ar-review:list`. Live pending rows: **272**.

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

Step 6 is present. Navigation restoration is not merged into this checkout.
The final combined post-navigation inventory is BLOCKED until those actual
callers/keys are merged and this command is rerun. No future navigation copy is invented.

## Admin methodology — /admin/methodologies

| Key/source | Page/component rendering context | Current English source | Arabic (approved) |
| --- | --- | --- | --- |
| governed.activityCategories | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:400 | Activity category rules |  |
| governed.actual | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:97 | Actual |  |
| governed.actualHash | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:134 | Actual hash |  |
| governed.actualStatus | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:135 | Actual status |  |
| governed.addCriteriaFirst | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:496 | Add and save criteria before authoring cases. |  |
| governed.addCriterion | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:363; Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:372 | Add criterion |  |
| governed.adminIntro | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:131 | Maintain documented rules, test evidence, workflow decisions, and public visibility. Finalized version content remains fixed. |  |
| governed.advanceWorkflow | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:499 | Advance workflow |  |
| governed.aggregateStatus | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:83 | Aggregate status · expected → actual |  |
| governed.analystCaseResults | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:72 | Analyst case comparisons |  |
| governed.analystCases | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:427 | Analyst test cases |  |
| governed.analystCasesHint | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:428 | Author version-specific evidence and expected outcomes before the test gate. |  |
| governed.analystCasesJson | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:506 | Analyst cases JSON |  |
| governed.associateSource | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:561 | Associate source |  |
| governed.baseline | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:181 | Baseline |  |
| governed.blankDraft | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:254 | Start with an empty draft |  |
| governed.borderlineCases | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:205 | Candidate borderline results |  |
| governed.borderlineMargin | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:375 | Borderline margin |  |
| governed.calculationVersion | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:334 | Calculation version |  |
| governed.cancel | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:119 | Cancel |  |
| governed.candidateCriteria | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:281 | Candidate version criteria |  |
| governed.caseCriteriaHint | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:495 | Expected criterion outcomes must use the exact criterion IDs listed here. A cloned version has new IDs and requires new expected-results keys. |  |
| governed.caseInstructions | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:494 | Use the contract shape below with real security, period, source, fact, and segment identities. The inserted sample has no financial evidence and does not represent a passing case. |  |
| governed.casesFinalized | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:435 | Analyst cases are finalized with this version and are shown read-only. |  |
| governed.casesSaved | Conditionally rendered: successful admin action feedback: src/components/methodology/AdminMethodologies.tsx:431 | Analyst cases saved. |  |
| governed.changedCriteria | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:247 | Changed candidate criteria |  |
| governed.changelog | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:261 | Changelog |  |
| governed.cloneFrom | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:230 | Start from an existing version |  |
| governed.cloneNote | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:257 | Version fields are prefilled from the selected source. Criteria are copied with new identities; analyst cases must be authored again against those new IDs. |  |
| governed.closeEdit | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:223; Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:319 | Close editor |  |
| governed.confirmDeleteCriterion | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:391 | Delete this draft criterion? This cannot be undone. |  |
| governed.confirmProduction | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:512 | Enable this methodology version for production? This is a separate audited operation. |  |
| governed.confirmPublish | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:343 | Make this version visible on the public methodology pages? |  |
| governed.confirmUnpublish | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:343 | Remove this version from the public methodology pages? |  |
| governed.coverageGaps | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:31 | Named criterion coverage gaps |  |
| governed.created | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:313 | Created |  |
| governed.createMethodology | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:141; Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:172 | Create methodology |  |
| governed.criteria | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:357 | Version criteria |  |
| governed.criteriaRecords | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:157 | CRITERIA |  |
| governed.criterion | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:95 | Criterion |  |
| governed.criterionChanges | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:236 | criterion differences |  |
| governed.criterionDeleted | Conditionally rendered: successful admin action feedback: src/components/methodology/AdminMethodologies.tsx:393 | Criterion deleted. |  |
| governed.criterionIdentity | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:361 | Stable criterion identity |  |
| governed.criterionIdentityHelp | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:358 | Identities are fixed by the system and are required when analyst cases refer to expected criterion outcomes. |  |
| governed.criterionSaved | Conditionally rendered: successful admin action feedback: src/components/methodology/AdminMethodologies.tsx:374; Conditionally rendered: successful admin action feedback: src/components/methodology/AdminMethodologies.tsx:388 | Criterion saved. |  |
| governed.criterionType | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:366 | Criterion type |  |
| governed.definition | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:383 | Definition |  |
| governed.deleteCriterion | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:440 | Delete draft criterion |  |
| governed.denominatorDefinition | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:386 | Denominator definition |  |
| governed.denominatorLineItems | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:393; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:420 | Denominator line items |  |
| governed.different | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:108 | DIFFERENT |  |
| governed.draftSaved | Conditionally rendered: successful admin action feedback: src/components/methodology/AdminMethodologies.tsx:289; Conditionally rendered: successful admin action feedback: src/components/methodology/AdminMethodologies.tsx:327 | Draft version saved. |  |
| governed.drivingCriteria | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:187 | Driving criteria |  |
| governed.edgeCases | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:426 | Edge cases |  |
| governed.editCriterion | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:415 | Edit criterion |  |
| governed.editDraft | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:319 | Edit draft content |  |
| governed.editMetadata | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:223 | Edit metadata |  |
| governed.editorReadOnly | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:548 | Editors can review this record but cannot change governance data. |  |
| governed.effectiveDate | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:312; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:227; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:379 | Effective date |  |
| governed.enableProduction | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:515 | Enable production |  |
| governed.engineVersion | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:333 | Engine version |  |
| governed.expected | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:96 | Expected |  |
| governed.expectedHash | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:133 | Expected hash |  |
| governed.failed | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:130; Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:88 | FAIL |  |
| governed.finalizedContentReadOnly | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:368; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:548 | Finalized content is read-only. Create a new draft to change methodology content. |  |
| governed.formula | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:384 | Formula text |  |
| governed.fullReportEvidence | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:339 | Full retained report payload |  |
| governed.genuineMethodologySource | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:552 | Matching verified methodology document |  |
| governed.governanceReports | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:307 | GOVERNANCE EVIDENCE |  |
| governed.impactReport | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:325 | Impact report |  |
| governed.insertExample | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:504 | Insert contract example |  |
| governed.invalidCasesJson | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:488 | Enter a valid JSON array of analyst cases. |  |
| governed.invalidJsonObject | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:219 | Enter a valid JSON object or leave the field blank. |  |
| governed.label | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:368 | Label |  |
| governed.licensing | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:241; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:166 | Licensing status |  |
| governed.match | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:98 | Comparison |  |
| governed.matched | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:108 | MATCH |  |
| governed.metadataSaved | Conditionally rendered: successful admin action feedback: src/components/methodology/AdminMethodologies.tsx:175; Conditionally rendered: successful admin action feedback: src/components/methodology/AdminMethodologies.tsx:230 | Methodology metadata saved. |  |
| governed.methodologyIndex | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:191 | METHODOLOGY REGISTER |  |
| governed.methodologyManagement | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:130 | Methodology management |  |
| governed.methodologyMetadata | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:217 | METHODOLOGY METADATA |  |
| governed.methodologyRecords | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:149 | METHODOLOGIES |  |
| governed.methodologyVersions | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:255 | Versions |  |
| governed.name | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:156 | Name |  |
| governed.newDraft | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:260; Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:286 | New draft |  |
| governed.newRecord | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:171 | NEW RECORD |  |
| governed.nextWorkflowTarget | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:484 | Next sequential stage |  |
| governed.noComparableUniverse | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:164 | No comparable securities were recorded. |  |
| governed.noCoverageGaps | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:37 | No missing required outcome coverage was recorded. |  |
| governed.noCriteria | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:379 | No criteria are recorded for this version. |  |
| governed.noEligibleSources | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:555 | No matching eligible source documents |  |
| governed.noMethodologies | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:183 | No methodology records |  |
| governed.noMethodologiesBody | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:184 | Create a methodology record to begin documenting a governed rule set. |  |
| governed.noneConfigured | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:181 | No baseline configured |  |
| governed.nonPermissibleCategories | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:407 | Non-permissible revenue categories |  |
| governed.noReports | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:313 | No reports have been recorded for this version yet. |  |
| governed.notes | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:245; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:172; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:262; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:428 | Notes |  |
| governed.notPublic | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:308 | NOT PUBLIC |  |
| governed.noVersions | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:265 | No versions have been recorded for this methodology. |  |
| governed.numeratorDefinition | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:385 | Numerator definition |  |
| governed.numeratorLineItems | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:390; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:416 | Numerator line items |  |
| governed.observedCoverage | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:54 | Observed |  |
| governed.officialOrAdapted | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:240; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:164 | Official or adapted |  |
| governed.passed | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:130; Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:329; Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:88 | PASS |  |
| governed.previousCriteria | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:281 | Prior version criteria |  |
| governed.priorStatus | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:154 | Prior status |  |
| governed.productionEnabled | Conditionally rendered: successful admin action feedback: src/components/methodology/AdminMethodologies.tsx:513; Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:306 | Production enabled. |  |
| governed.productionOperationNote | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:507 | Separate production operation note |  |
| governed.prohibitedCategories | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:402 | Prohibited primary activity categories |  |
| governed.publicVisible | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:308 | PUBLIC |  |
| governed.publisher | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:236; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:161 | Publisher |  |
| governed.publishVersion | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:348 | Make version public |  |
| governed.purificationHelp | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:265 | Leave blank for null. Enter a JSON object only when this methodology version defines stored treatment data. No generic formula is applied. |  |
| governed.purificationJson | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:263 | Methodology-specific purification data (JSON object) |  |
| governed.ratio | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:213; Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:254 | Ratio |  |
| governed.reportArchive | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:308 | Test and impact reports |  |
| governed.reportIdentity | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:335 | Report identity |  |
| governed.requiredActivityItems | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:411 | Evaluator requirements are enforced by the contract. These category lists are stored as criterion rule data. |  |
| governed.requiredCoverage | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:53 | Required |  |
| governed.requiredInputsDerived | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:410; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:431 | Required inputs · derived |  |
| governed.result | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:253 | Result |  |
| governed.retainedEvidence | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:263 | Retained unknowns and evidence inputs |  |
| governed.reviewFailed | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:329 | REVIEW / FAIL |  |
| governed.save | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:122 | Save |  |
| governed.saveCases | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:512 | Save analyst cases |  |
| governed.saved | Conditionally rendered: run() default success feedback: src/components/methodology/AdminMethodologies.tsx:92 | Change saved. |  |
| governed.saving | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:122; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:512 | Saving… |  |
| governed.scope | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:244; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:171 | Scope |  |
| governed.securityDiffs | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:221 | Per-security comparison |  |
| governed.sharedGoldenRegressions | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:124 | Shared golden regressions |  |
| governed.shortLabel | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:237; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:157 | Short label |  |
| governed.slug | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:158 | Slug |  |
| governed.sortOrder | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:377 | Sort order |  |
| governed.sourceAssociated | Conditionally rendered: successful admin action feedback: src/components/methodology/AdminMethodologies.tsx:336 | Source association saved. |  |
| governed.sourceAssociation | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:334 | Version source associations |  |
| governed.sourceReference | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:427 | Source reference |  |
| governed.sourceTitle | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:238; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:162 | Source document title |  |
| governed.sourceUrl | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:239; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:163 | Source document URL |  |
| governed.testReport | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:325 | Test report |  |
| governed.threshold | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:369; Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:213; Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:255 | Threshold |  |
| governed.thresholdDirection | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:373 | Threshold direction |  |
| governed.thresholdUnit | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:371 | Threshold unit |  |
| governed.transitionMatrix | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:180 | Status transition matrix |  |
| governed.treatmentRules | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:425 | Treatment rules |  |
| governed.type | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:246; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:159 | Methodology type |  |
| governed.unidentifiedSecurity | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:231 | Security identity unavailable |  |
| governed.unnamedCase | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:81 | Unnamed case |  |
| governed.unnamedCriterion | Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:103; Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:192; Rendered/conditionally rendered: src/components/methodology/MethodologyReports.tsx:43 | Unlabelled criterion |  |
| governed.unpublishVersion | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:348 | Remove public visibility |  |
| governed.verificationDate | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:243; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:169 | Verification date |  |
| governed.verifiedBy | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:242; Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:168 | Verified by |  |
| governed.versionControl | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:254 | VERSION CONTROL |  |
| governed.versionLabel | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:226 | Version label |  |
| governed.versionNumber | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:225 | Version |  |
| governed.versionRecords | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:153 | VERSIONS |  |
| governed.visibilityControl | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:340 | Public visibility |  |
| governed.visibilityHelp | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:341 | This changes anonymous visibility for this version only. Only versions marked public appear in public methodology pages. |  |
| governed.visibilitySaved | Conditionally rendered: successful admin action feedback: src/components/methodology/AdminMethodologies.tsx:345 | Public visibility updated. |  |
| governed.visibilitySeparate | Rendered/conditionally rendered: src/components/methodology/MethodologyForms.tsx:267 | Public visibility is controlled separately after the draft is created. |  |
| governed.workflow | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:443 | Governance workflow |  |
| governed.workflowAdvanced | Conditionally rendered: successful admin action feedback: src/components/methodology/AdminMethodologies.tsx:493 | Workflow advanced. |  |
| governed.workflowHistory | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:462 | Recorded workflow history |  |
| governed.workflowReviewNote | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:487 | Review / transition note |  |
| governed.workflowSequential | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:444 | Advance one stage at a time. Source verification, rules, tests, universe comparison, human review, and approval are checked by the server. |  |
| governed.workspaceLabel | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:129 | ADMIN / METHODOLOGY GOVERNANCE |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/gates.ts:17 | The editorial default methodology version cannot be unpublished; select another default first |  |
| runtime phrase | Conditionally rendered: admin action failure: src/components/methodology/AdminMethodologies.tsx:114 | The change was not accepted. |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/contracts.ts:46 | The evaluator requires a criterion effective date |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/service.ts:205 | Demo, internal example or permanently blocked provenance cannot be enabled |  |
| runtime phrase | Conditionally rendered: methodology review-error via action result: src/lib/methodology/contracts.ts:45 | No registered evaluator |  |
| runtime phrase | Rendered/conditionally rendered: src/components/methodology/AdminMethodologies.tsx:193 | Methodology records |  |
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
| runtime phrase | Conditionally rendered: admin action failure: src/components/methodology/AdminMethodologies.tsx:118 | The request failed. Reload the record and try again. |  |
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
