# Step 6 — governed methodology management

## Delivered

- Admin-only, transactionally audited metadata, empty/clone draft, criterion,
  analyst-case, verified-document association and visibility controls. Editors
  can inspect definitions, workflow evidence and reports but cannot submit writes.
- Draft-only content and analyst cases. Clones get new criterion identities,
  a supersedes link and an empty analyst suite. Existing SQL immutability,
  append-only protections, serialized READ COMMITTED prerequisites and permanent
  provenance latches remain unchanged.
- Sequential source, normalized-rule, test, annual-universe-impact, human-note
  and approval gates. Production enablement is a separate audited operation:
  stored status remains `approved`, history names `production_enable`, and the
  screening default is never changed implicitly.
- Persisted shared golden regressions and candidate analyst results, expected/
  actual outcomes, engine versions, execution errors and named criterion
  coverage gaps. Failed reports commit without advancing workflow.
- Dry-run comparisons using identical latest-annual/current/matching-period
  evidence. Reports retain transition matrices, candidate and removed-rule
  drivers, borderline results, full per-security criteria/unknowns and inputs.
  No screening run, criterion-result or unknown rows are inserted.
- Public Arabic and English methodology directory/detail documentation through
  explicit existing `dbPublic` column allowlists, with 900-second ISR. Complete
  documentation for every public version is server-rendered. A small client
  selector switches between those public documents and accepts only a matching
  public `?version` value; private/invalid values cannot retrieve data. This
  avoids Next's server `searchParams` dynamic-rendering opt-out. The server
  default is a public production version, otherwise the latest public version.
- Example banners, literal criterion threshold/unit/direction documentation,
  receivables' null-margin wording and conditional stored purification data.
  Approved Arabic is preserved; new English review copy remains marked.

## Decisions and migration

`docs/DECISIONS.md` adds the founder-approved **D-97–D-100**: approved state
plus production flag; unchanged shared goldens plus candidate-specific tests;
latest annual impact evidence; mandatory candidate-identity pass/fail and
configured-margin borderline coverage. Shared goldens never count as coverage.
The production representation explicitly reconciles reference §7.5 with D-93.

New migration: **`drizzle/0006_motionless_maggott.sql`**, with
`drizzle/meta/0006_snapshot.json` and the new journal entry. It adds private,
draft-only `analyst_test_cases`; the existing compare-all-content trigger
automatically freezes that column after draft. No public grants are broadened,
no historical evidence is rewritten, and no applied migration is edited.
Legacy workflow entries and example purification JSON remain readable.

The founder-owned `docs/SUHAIL_BUILD_REFERENCE.md` was not edited.
No dependencies were added.

## Changed implementation files

### Data, contracts, actions and reports

- `src/db/schema/methodology.ts`
- `src/db/schema/types.ts`
- `src/db/methodology-public.ts`
- `src/lib/methodology/admin-data.ts`
- `src/lib/methodology/commands.ts`
- `src/lib/methodology/contracts.ts`
- `src/lib/methodology/gates.ts`
- `src/lib/methodology/reports.ts`
- `src/lib/methodology/selectors.ts`
- `src/lib/methodology/service.ts`
- `src/app/[locale]/(private)/admin/(protected)/methodology-actions.ts`

### Admin and public presentation

- `src/app/[locale]/(private)/admin/(protected)/[section]/page.tsx`
- `src/app/[locale]/(public)/methodology/page.tsx`
- `src/app/[locale]/(public)/methodology/[slug]/page.tsx`
- `src/components/methodology/AdminMethodologies.tsx`
- `src/components/methodology/GovernedCopy.tsx`
- `src/components/methodology/MethodologyCopy.tsx`
- `src/components/methodology/MethodologyDetail.tsx`
- `src/components/methodology/MethodologyDirectory.tsx`
- `src/components/methodology/MethodologyForms.tsx`
- `src/components/methodology/MethodologyReports.tsx`
- `src/components/methodology/PublicMethodologyVersions.tsx`
- `src/i18n/messages/ar.json`
- `src/i18n/messages/en.json`

### Verification

- `tests/methodology.test.ts`
- `tests/methodology.integration.test.ts`
- `e2e/methodology-fixture.spec.ts`
- `e2e/production.spec.ts`
- `tests/browser-fixture/MethodologyFixture.tsx`
- `tests/browser-fixture/router.ts`
- `tests/browser-fixture/app.tsx`
- `tests/browser-fixture/server.ts`
- `playwright.accounts.config.ts`
- `vitest.database.config.ts`

The browser fixture aliases apply only to a separate component-test process,
not the real Next application. Database integration uses uniquely named
disposable databases on PostgreSQL 17 and the original auth stub remains intact.

## Measured verification

| Check | Result |
| --- | --- |
| TypeScript, ESLint, logical CSS lint | Passed |
| Unit suite | 586 tests passed across 26 files |
| Existing engine regressions and coverage | 201 tests passed; 100% statements, branches, functions and lines |
| Disposable PostgreSQL 17 integration | 154 tests passed across 3 files, including 20 new methodology integration tests |
| Admin component browser checks | 6 passed, covering both locales, editor restrictions, finalized read-only content and stale-save refusal |
| Production Next browser/HTTP checks | 6 passed, covering both locale directories and example-a criteria/no-margin documentation, cookie-free 900-second ISR and existing private-path/CSP security assertions |
| Production build | Passed; detail documentation is classified static on demand, not dynamic |

Tests include missing pass/fail/borderline coverage (including zero margin),
empty/goldens-only suites, collective coverage, mismatched expectations,
execution errors, cloned identities, unreachable outcomes, every workflow gate,
approval concurrency, audit rollback, source refusal, private-column/RLS checks,
latest-annual selection and screening-row non-insertion.

The signed-in live admin UI was **not** verified with a real Google/AAL2 session.
Its component behavior and server/database permission boundaries were verified
separately. Public production-browser checks ran against a local production
server using read-only public data; no external database write was performed.

## Unresolved launch and rollout requirements

- Explicit authorization to review/apply the new migration to the intended
  Supabase environment, with existing production-prerequisite review and
  TLS/role smoke checks. Only disposable local databases received migrations.
- G1: genuine verified Al Rajhi/Awaied document, licensing, source review and
  analyst-authored rules/cases with complete coverage. No real methodology was
  sourced, approved or enabled in production.
- Founder decisions and launch inputs still open in the decision log: universe
  selection, any required licensed price provider, Arabic/legal wording and
  legal/data-residency review, domain/readiness and other existing launch gates.
- Existing separate Arabic, accessibility, visual approval, MFA and keyboard-
  settings follow-ups remain outside this step.

No deployment, external mutation, default-methodology change, real methodology
enablement, purification calculation or Step 7 work was performed.
