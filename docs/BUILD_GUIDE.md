# Suhail — Replit Build Guide (Phase 0)

The step-by-step build of Suhail on Replit, with the exact prompt for each step.
Specification: `docs/SUHAIL_BUILD_REFERENCE.md` (v1.1). Decisions: `docs/DECISIONS.md`. Context for Replit Agent: `replit.md`.

---

## How the build runs

**Order.** Part A is a one-time manual setup. Part B is 16 build steps (0–15), each one prompt for Replit Agent. Gate G1 (load the verified Al Rajhi methodology) and the launch gate come last. Don't start a step until the one before it is merged and CI is green.

**The loop for every step**

1. Open a **new Agent chat** in the `suhail-web` app, so each step starts with clean context and `replit.md` loads fresh.
2. Turn **Plan mode** on. Paste the step's prompt.
3. Review the plan before you approve it. Reject it if it:
   - uses Replit Database, Replit Auth, Replit App Storage or Replit AI;
   - skips the tests;
   - touches files outside the step's scope;
   - invents behaviour the prompt says to ask about.
4. Approve the plan and let Agent build.
5. Run **Your checks** for the step. Read the diff in the Git pane.
6. Commit with the suggested message, push, wait for CI to pass, then merge.
7. If Agent asked an open question, answer it. If the answer is a decision, add it to `docs/DECISIONS.md` before the next step.

Each prompt ends with *stop and summarise*, so Agent never runs into the next step on its own. If Agent drifts, use the recovery prompts in Appendix B.

**Phase 0 scope (from reference §2 and D-01 – D-04):**
- public verdict pages for a curated list of US stocks;
- public methodology pages;
- a weekly edition containing the analyst's Editor's Pick;
- registration and sign-in with Google, and an account page (D-45);
- an admin area for promoted admins and editors, protected by TOTP.

Not in Phase 0: payments, gated content, AI picks, live prices, search. Mobile-number / WhatsApp OTP sign-in comes later (Part C).

---

## Part A — One-time setup (manual)

### A1. GitHub
1. Create a **private** repo `suhail` with a README. Default branch: `main`.
2. Unzip `suhail-logo-svg.zip` into `public/brand/`. Leave the 9 files exactly as they are.
3. Add the kit files:
   - `replit.md` → repo root
   - `docs/DECISIONS.md`
   - your reference file, renamed `docs/SUHAIL_BUILD_REFERENCE.md`
4. Commit: `chore: add build reference, decision log and brand files`.
5. After Step 1 adds CI: in Settings → Branches, protect `main` so the `ci` check must pass before merging.

### A2. Supabase
1. Create a project named `suhail`. Pick the available region closest to your users and team. Data residency is still pending (O-6); Phase 0 holds no subscriber data, so this can change later.
2. **Auth → Sign In / Providers:**
   - Keep "Allow new users to sign up" **on**; users register through Google.
   - Turn the **Email** provider **off**, so there are no passwords.
   - Turn **Google** on, and paste in the client ID and secret from A3.
3. **Auth → Multi-Factor:** enable **TOTP**.
4. **Auth → URL Configuration:** set the Site URL to your Replit dev URL for now. Add redirect URLs for `/auth/callback` and `/en/auth/callback` on the dev URL. Add the production domain later.
5. **Project Settings → Data API:** turn the Data API **off**. The app reads data through Postgres directly (D-14, D-15). If you'd rather leave it on, make sure schema `app` is never in "Exposed schemas".
6. **Storage:**
   - Create bucket `public-media` (public), for analyst headshots.
   - Create bucket `private-archive` (private), for raw SEC responses.
   - Under Storage → S3 Connection, create an access key, and note the endpoint and region.
7. **Database → Connect:** copy three connection strings:
   - direct (port 5432) → migrations;
   - transaction pooler (port 6543) → the app;
   - session pooler → fallback.
8. After Step 2 has run its migrations, set passwords on the two app roles in the SQL editor. Never put these in git:
   ```sql
   alter role suhail_public with login password '<generate 32+ chars>';
   alter role suhail_app    with login password '<generate 32+ chars>';
   ```
   Pooler usernames take the form `suhail_public.<project-ref>` and `suhail_app.<project-ref>`. Confirm both can connect with `psql` before you set the secrets. If the transaction pooler rejects custom roles, use the session pooler and tell Agent in Step 2's follow-up.

### A3. Other accounts
- **Google Cloud (sign-in):**
  1. Create a project `suhail`.
  2. Under **Google Auth Platform → Branding**:
     - app name "سهيل · Suhail";
     - logo: the 512 px app icon from Step 4 (add it after Step 4 if you don't have it yet);
     - support email;
     - authorised domains: `supabase.co` now, plus your domain later;
     - links to `/privacy` and `/terms`.
  3. **Audience:** External.
  4. **Clients → Create → Web application.** Authorised redirect URI: `https://<project-ref>.supabase.co/auth/v1/callback`.
  5. Paste the client ID and secret into Supabase (A2.2).
  6. Before launch, submit the branding for verification so users see the Suhail name and logo instead of a warning. Optional: Supabase's paid custom-domain add-on makes Google show your domain instead of `supabase.co`.
- **Anthropic Console:** create an API key for Suhail and set a monthly spend limit.
- **SEC EDGAR:** pick a monitored contact address for the User-Agent, e.g. `Suhail Research admin@suhail.sa`. The SEC requires one.
- **Domain and Cloudflare (O-5):** needed only at Step 13.

### A4. Replit
1. **Create app → Import from GitHub →** `suhail`. Name it `suhail-web`.
2. **Account → Usage:** set a monthly budget cap and alerts on day one (reference §3.2 rule 6).
3. **Secrets:** add the secrets from the table below as you reach the step that needs them. Never paste a secret into an Agent prompt.
4. Later, at Step 14: create a second app, `suhail-jobs`, from the same repo (D-41).

### Secrets

| Name | Value | Needed from |
| --- | --- | --- |
| `DATABASE_URL_MIGRATIONS` | Direct connection, `postgres` role | Step 2 |
| `DATABASE_URL_PUBLIC` | Pooler, `suhail_public.<ref>` | Step 2 (after A2.8) |
| `DATABASE_URL_APP` | Pooler, `suhail_app.<ref>` | Step 2 (after A2.8) |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://<ref>.supabase.co` | Step 5 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Publishable / anon key (never the secret or service-role key) | Step 5 |
| `SUPABASE_SECRET_KEY` | Secret key, **only in the workspace shell for `admin:reset-mfa`**; never add it to a deployment (D-48) | Step 5 |
| `SEC_USER_AGENT` | `Suhail Research <email>` | Step 7 |
| `S3_ENDPOINT`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` | Supabase Storage S3 connection | Step 7 |
| `S3_BUCKET_PUBLIC`, `S3_BUCKET_ARCHIVE` | `public-media`, `private-archive` | Step 7 |
| `PUBLIC_MEDIA_BASE_URL` | Public URL prefix of `public-media` | Step 11 |
| `ANTHROPIC_API_KEY` | From A3 | Step 10 |
| `LLM_MODEL` | A current Claude model id, e.g. `claude-sonnet-5-5` | Step 10 |
| `SITE_URL` | Dev URL now; `https://suhail.sa` at launch | Step 9 |
| `SITE_MODE` | `preview` (until the launch gate) | Step 13 |
| `PREVIEW_BASIC_AUTH_USER`, `PREVIEW_BASIC_AUTH_PASSWORD` | For preview mode | Step 13 |
| `REVALIDATE_SECRET` | 32+ random bytes | Step 13 |

---

## Part B — Build steps

| Step | Builds | Depends on |
| --- | --- | --- |
| 0 | Agent reads the specification and confirms it understood (no code) | Part A |
| 1 | Scaffold, tooling, CI, Dockerfile | 0 |
| 2 | Database schema, roles, RLS, append-only rules, seeds | 1 |
| 3 | Screening engine (pure TypeScript) and its tests | 1 |
| 4 | Brand system, Arabic-first i18n/RTL, layout and components | 1 |
| 5 | Accounts: Google sign-in, account page, admin promotion with TOTP, audit trail | 2, 4 |
| 6 | Methodology admin, governance workflow, public methodology pages | 3, 5 |
| 7 | SEC EDGAR ingestion, universe, facts, segments, manual prices | 5 |
| 8 | Screening service and jobs | 3, 7 |
| 9 | Public verdict page | 8 |
| 10 | AI explanation pipeline | 9 |
| 11 | Editions, Editor's Pick, analyst profiles | 9 |
| 12 | SEO, sitemap, Open Graph images, icons | 9, 11 |
| 13 | Security hardening, preview mode, Cloudflare | 12 |
| 14 | Deployments and the scheduled weekly job | 13 |
| 15 | Live-check script (§13.3) and launch-gate tooling | 14 |

Steps 3 and 4 depend only on Step 1, so they can run in either order.

---

### Step 0 — Agent reads the spec and confirms it understood (Plan mode, no code)

```text
Do not write or change any code in this task.

Read these in full: replit.md, docs/DECISIONS.md, and docs/SUHAIL_BUILD_REFERENCE.md sections 0, 1, 2, 3, 4.1, 4.2, 4.2a, 5, 6, 7, 9.1, 10, 11, 12 and 13.3.

Then reply with:
1. The product's core rules, in no more than 10 bullets.
2. The Phase 0 public routes, account and auth routes, and admin areas, after applying D-02, D-04, D-39 and D-45 to D-52.
3. The Phase 0 table list: the reference §6 entities minus those deferred by D-02, plus the additions D-28 to D-36, D-42 to D-44 and D-53. Give each table one line saying what it is for.
4. Every contradiction or gap you find between the reference and DECISIONS.md, written as a question for me. Do not resolve any of them yourself.
5. Confirmation that you will not use Replit Database, Replit Auth, Replit App Storage or Replit AI in this project.

Then stop.
```

**Your checks:** the table list matches D-02 and D-28 to D-36. Answer Agent's questions, and record any new decision in `docs/DECISIONS.md`.

---

### Step 1 — Scaffold, tooling, CI, Dockerfile

```text
Step 1 of the Suhail build. Read replit.md and docs/DECISIONS.md (D-18, D-19, D-24, D-41) first.

Goal: an empty but production-grade Next.js project. No product features.

Requirements
1. Scaffold the latest stable Next.js (16+) with App Router, TypeScript strict, a src/ directory, Tailwind CSS v4, ESLint (flat config), the import alias @/*, and pnpm. Pin Node 22 LTS through .nvmrc, package.json "engines", and the Replit config. Remove all create-next-app boilerplate content and images. The home page renders just the word "Suhail" for now.
2. next.config.ts: output 'standalone', poweredByHeader false, reactStrictMode true. Do not enable cacheComponents (D-19).
3. Scripts:
   dev = next dev -H 0.0.0.0 -p ${PORT:-3000}
   build
   start = next start -H 0.0.0.0 -p ${PORT:-3000}
   typecheck, lint, lint:logical, format, test (vitest run), test:e2e (playwright)
   Configure .replit so Run starts dev and the web preview uses that port.
4. Environment: src/env/ with one zod schema per group (db, auth, storage, sec, llm, site), each read lazily by getXEnv(). On failure, report the names of missing variables and never their values. Commit .env.example listing every variable from the Secrets table in BUILD_GUIDE.md, with a comment for each and no values. .gitignore must ignore .env* except .env.example.
5. lint:logical: a Node script (scripts/lint-logical.mjs) that scans src/**/*.{ts,tsx,css} for physical-direction Tailwind classes and CSS properties (ml-, mr-, pl-, pr-, left-, right-, text-left, text-right, rounded-l, rounded-r, rounded-tl/tr/bl/br, border-l, border-r, scroll-ml/mr, margin-left, margin-right, padding-left, padding-right, left:, right:). It prints file:line for each hit and exits 1. Allow a hit only on a line carrying the comment "logical-exempt: <reason>".
6. ESLint: no-restricted-imports so that nothing under src/app/[locale]/(public) can import @/db/app, and nothing outside src/jobs and src/app/[locale]/admin may import src/jobs. Install the server-only package.
7. Testing: Vitest (node environment by default, coverage via v8) with one sample test. Playwright configured to use the preinstalled Chromium on Replit: honour PLAYWRIGHT_BROWSERS_PATH and never run "playwright install". One smoke test hits /api/health.
8. GET /api/health returns { status: "ok", version } (version from package.json plus the git SHA when available). It makes no database call.
9. Dockerfile: multi-stage, node:22-bookworm-slim, corepack pnpm, pnpm install --frozen-lockfile, next build, copy the standalone output, run as a non-root user, HEALTHCHECK on /api/health. Add .dockerignore.
10. GitHub Actions .github/workflows/ci.yml, job "ci": checkout, pnpm setup with cache, install --frozen-lockfile, typecheck, lint, lint:logical, test, build, docker build (no push), and a gitleaks secret scan.
11. A README.md with run, test and build commands only.

Out of scope: database, auth, styling beyond defaults, i18n, any product page.

Acceptance
- pnpm typecheck && pnpm lint && pnpm lint:logical && pnpm test && pnpm build all pass.
- curl -s localhost:$PORT/api/health returns status ok.
- lint:logical fails on a temporary file containing "ml-2", and passes after you delete that file.

Stop and summarise: files created, dependencies added (with one line each on why), and anything you could not verify in Replit (for example, docker build runs only in CI).
```

**Your checks:** push the branch and confirm CI is green, including the docker build and gitleaks. Then add branch protection (A1.5).
**Commit:** `chore: scaffold Next.js app with CI, Dockerfile and lint guards`

---

### Step 2 — Database schema, roles, RLS, append-only rules, seeds

Set `DATABASE_URL_MIGRATIONS` before this step. Set the other two database URLs after A2.8.

```text
Step 2 of the Suhail build. Read these in full first:
- replit.md
- docs/DECISIONS.md: D-02, D-09 to D-18, D-28 to D-36, D-42 to D-44, D-50, D-52, D-53
- docs/SUHAIL_BUILD_REFERENCE.md: §3.4, all of §6 (including "Notes for the Postgres port", the line-item keys, input states and confidence tiers), §7.4 and §8

Goal: the Phase 0 database in Postgres schema "app", with roles, grants, RLS and triggers, through Drizzle.

Requirements
1. Drizzle with postgres-js. drizzle.config.ts: schema in src/db/schema/*.ts, migrations in drizzle/, schemaFilter ['app'], dialect postgresql, credentials from DATABASE_URL_MIGRATIONS. Scripts db:generate, db:migrate, db:seed, db:studio.
2. Two clients in src/db/, each importing "server-only". Both use postgres-js with prepare:false (transaction pooler), ssl 'require' and a small pool max:
   - src/db/public.ts exports dbPublic (DATABASE_URL_PUBLIC);
   - src/db/app.ts exports dbApp (DATABASE_URL_APP).
3. Tables, all in pgSchema('app'):
   users, analyst_profile, audit_event, exchange, company, security, source, financial_period, financial_fact, business_segment, price_bar, methodology, methodology_version, methodology_criterion, methodology_version_report, screening_run, screening_criterion_result, screening_unknown, explanation_object, edition, pick, editorial_approval, edition_revision, editorial_setting, job_run.
   Do NOT create the Phase 1 scoring tables (D-02).
4. Conventions:
   - snake_case.
   - id uuid primary key default gen_random_uuid(); created_at and updated_at timestamptz; created_by uuid null → users.
   - Real foreign keys wherever the reference stores a string id.
   - pgEnum for every reference enum, with exactly the values in §6.
   - is_demo boolean NOT NULL DEFAULT false.
   - Money and quantities numeric(30,6); ratios, thresholds and margins numeric(12,6). Map them to JS numbers in the Drizzle types.
   - Keep the denormalised label columns the reference stores on immutable records (screening_run, pick, edition), because they preserve history.
   - users.id equals Supabase auth.users.id, with NO foreign key to the auth schema, so migrations also run on plain Postgres in CI (D-35). users has the columns listed in D-35; email and phone are both nullable (D-52).
   - created_by and similar user references use ON DELETE SET NULL, so a user's account can be deleted (D-50).
   - The audit_event.event_type enum = the §6 values plus the D-53 additions.
5. Columns added by decisions:
   - security.slug (unique), in_universe, coverage_analyst_id, coverage_started_at (D-31)
   - company.name_ar, description_ar, description_en (D-30)
   - methodology.slug, methodology_version.is_public (D-32)
   - methodology_version.approved_by and approved_at (D-12)
   - screening_run.status_reasons as jsonb of structured objects (D-42) and screening_run.hash_payload jsonb (D-43)
   - explanation_object.prompt_version (D-25)
   - financial_fact.is_current with a partial unique index on (company_id, period_id, line_item) WHERE is_current (D-09)
   - pick bilingual editor fields: *_ar NOT NULL when pick_type='editor' (use a CHECK constraint), *_en nullable (D-33)
   - job_run (D-28) and analyst_profile (D-29) as specified in DECISIONS.md
6. Unique constraints: exchange.code; (security.exchange_id, ticker); (methodology_version.methodology_id, version); (financial_period.company_id, period_type, fiscal_year, fiscal_period_label); a partial unique index on financial_period (company_id, period_type) WHERE is_latest; edition.edition_id together with revision_number.
7. Custom SQL migrations (drizzle-kit generate --custom), idempotent:
   a. Roles: create suhail_public and suhail_app as NOLOGIN if they do not exist. Passwords are set by hand later; never in git. GRANT USAGE ON SCHEMA app. Revoke everything on schema app from PUBLIC.
   b. Grants: suhail_public gets SELECT only, on the publicly readable tables listed in c.
      suhail_app gets SELECT, INSERT, UPDATE, DELETE on mutable tables, and SELECT, INSERT only on the append-only tables (D-17).
      Set ALTER DEFAULT PRIVILEGES so future tables are not readable by suhail_public by default.
   c. RLS: ENABLE ROW LEVEL SECURITY on every table.
      suhail_app: a permissive policy on all tables (application code enforces roles).
      suhail_public: SELECT policies only on:
      - exchange (all rows);
      - company, security, source, financial_period, financial_fact, business_segment, price_bar: only rows belonging to a security with in_universe = true AND listing_status = 'listed';
      - methodology, methodology_version, methodology_criterion: only where the version has is_public = true;
      - screening_run, screening_criterion_result, screening_unknown, explanation_object: only for public securities AND public methodology versions;
      - edition, pick, edition_revision: only where edition.status is published_demo or published_live;
      - analyst_profile: only active profiles.
      No policy at all for suhail_public on users, audit_event, editorial_approval, editorial_setting, methodology_version_report and job_run.
   d. View app.public_settings exposing ONLY default_shariah_methodology_version_id from editorial_setting, with security_barrier; GRANT SELECT to suhail_public (D-36).
   e. Trigger function app.reject_mutation(): raises on UPDATE or DELETE. Attach it to every append-only table in D-17.
   f. Trigger on methodology_version: once OLD.workflow_status <> 'draft', reject DELETE, and reject UPDATE of any column except workflow_status, workflow_history, production_enabled, impact_report_id, test_report_id, approval_id, approved_by, approved_at, is_public, updated_at. On methodology_criterion: reject INSERT, UPDATE and DELETE when the parent version is not draft (D-11).
   g. An updated_at trigger on mutable tables.
   h. app.delete_own_account(p_user_id uuid): SECURITY DEFINER, owned by postgres, SET search_path = '' with fully qualified names. It deletes from auth.users where id = p_user_id (the app.users row is removed in the same function, so no FK is needed). REVOKE EXECUTE FROM PUBLIC; GRANT EXECUTE only to suhail_app (D-50). In CI's plain Postgres, create a stub auth.users table in the test setup only, never in migrations. Make the migration skip the function body gracefully if the auth schema is absent, or guard it with to_regclass('auth.users').
8. Seed (pnpm db:seed, idempotent, runs as the migrations user):
   - Exchanges: NASDAQ (MIC XNAS) and NYSE (MIC XNYS); country US; timezone America/New_York; currency USD; regulator SEC; is_demo false.
   - Methodologies EX-A v1.0 and EX-B v1.0 exactly as in reference §8, with official_or_inspired internal_example, licensing_status internal, production_enabled false, workflow_status draft, is_public true, is_demo true, effective 2026-01-01, slugs "example-a" and "example-b". For each criterion set criterion_type, label, threshold, threshold_unit, threshold_direction, borderline_margin (leave it NULL where §8 says "no margin"; never default it), numerator_line_items, denominator_line_items, required_inputs, sort_order, and treatment_rule_data containing prohibited_categories / non_permissible_categories as listed. Copy the treatment text from §8 verbatim into treatment_rules. Do not invent line items: put lease-treatment differences in treatment_rules text only (D-44).
   - EditorialSetting: setting_key 'editorial'; default methodology version = EX-A v1.0; allow_ineligible_editor_pick false; is_demo false.
9. Integration tests against a real Postgres. In CI add a postgres:17 service container; locally use DATABASE_URL_TEST. The tests run all migrations, then connect AS suhail_public and AS suhail_app (SET ROLE is fine in tests) and assert:
   - suhail_public cannot select from users, audit_event, editorial_setting, editorial_approval, job_run or methodology_version_report;
   - suhail_public cannot see a draft edition, and can see a published_live one;
   - suhail_public cannot insert into any table;
   - suhail_public sees only in-universe, listed securities;
   - suhail_app cannot UPDATE or DELETE screening_run or audit_event (via both grants and trigger);
   - a non-draft methodology version rejects criteria edits, but its workflow_status can still change;
   - the seed is idempotent (running it twice gives the same row counts);
   - suhail_public cannot execute app.delete_own_account; suhail_app can, and it removes both the auth row and the app.users row (against the test stub).

Out of scope: UI, the engine, ingestion.

Stop and summarise:
- the table list with row-level access per role;
- the migration files;
- the exact SQL I must run by hand to set the role passwords;
- anything in §6 you could not map, written as questions.
```

**Your checks:**
- In Supabase, open Table Editor → schema `app`. Confirm the Data API doesn't expose it.
- Run A2.8, set the two database URLs, and run `pnpm test` with them.
- Read the RLS migration line by line. It is the backstop for reference §12 defect 1.

**Commit:** `feat(db): app schema, roles, RLS, append-only triggers, seeds`

---

### Step 3 — Screening engine (pure TypeScript)

```text
Step 3 of the Suhail build. Read these in full first:
- replit.md
- docs/DECISIONS.md: D-11, D-13, D-42, D-43, D-44
- docs/SUHAIL_BUILD_REFERENCE.md: §1 (core principle), §6 (line items, input states, confidence tiers), all of §7 and §8

Goal: src/engine/, a pure, deterministic screening engine with exhaustive tests.
- No database access, no network, no Date.now() and no randomness.
- The current date (asOf) is passed in as an input.
- node:crypto is allowed, for SHA-256 only.

Requirements
1. Types (src/engine/types.ts):
   EngineInput {
     securityId, asOf (YYYY-MM-DD), stalenessLimitDays (default 550), engineVersion, calculationVersion,
     methodologyVersion { id, label, criteria[] },
     period { id, label, periodEnd },
     facts[] { lineItem, value | null, inputState, confidenceTier, sourceId },
     segments[] { segmentName, activityCategory, revenueAmount | null, revenueShare | null, inputState, sourceId }
   }
   A criterion carries every MethodologyCriterion field the engine needs, including treatmentRuleData.
   Input states are reported | derived | estimated | unknown, plus 'missing' when no fact row exists for a line item.

2. Evaluator registry keyed by criterion_type:
   - Ratio types (interest_bearing_debt, cash_and_investments, receivables, custom_ratio):
     - numerator = sum of numerator_line_items; denominator = sum of denominator_line_items.
     - A sum is unavailable if any component is missing, unknown or null.
     - Denominator unavailable → result unknown, plus an unknown with severity blocking (why: cannot be evaluated; the screen is Insufficient Data; no value assumed).
     - Numerator unavailable → result unknown, plus an unknown with severity review.
     - ratio = numerator ÷ denominator, × 100 for percent_* units, rounded half away from zero to 2 decimals. Use the rounded ratio for every comparison, so what is displayed and what is decided always agree.
     - Result rule, exactly as in §7.2:
       - threshold_direction boolean, or no threshold → fail if value > 0, else pass;
       - else, if borderline_margin is not null and |ratio − threshold| ≤ margin → borderline;
       - else max: ratio ≤ threshold → pass, otherwise fail;
       - else min: ratio ≥ threshold → pass, otherwise fail.
       - A null margin is never defaulted.
   - business_activity, the primary-activity test from §7.2:
     - The largest segment is chosen by revenue share (computed from revenue_amount ÷ the sum of segment revenue when the share is missing but every amount is present).
     - No segments, any segment whose revenue share and amount are both undisclosed, or a largest segment that is 'unclassified' → unknown, with an unknown of severity review (D-13).
     - Otherwise fail if the largest segment's category is in treatment_rule_data.prohibited_categories, else pass.
     - A sector label is never evidence.
   - non_permissible_revenue:
     - numerator = revenue of segments whose category is in treatment_rule_data.non_permissible_categories; denominator = total_revenue.
     - If any segment is 'unclassified' or has no amount, the numerator is unavailable (review).
     - If total_revenue is unavailable, the denominator is unavailable (blocking).
     - Then the same result rule as the ratio types.
   - Any other criterion_type → unknown, with a blocking unknown saying no evaluator is registered.

3. Each criterion result has:
   - result;
   - numerator_value and denominator_value, with their definitions;
   - ratio, threshold, threshold_unit, threshold_direction and borderline_margin;
   - input_states (the distinct states used);
   - confidence_tier (the weakest of the inputs, ordered Verified > Calculated > Estimated > AI Interpretation);
   - source_ids;
   - calculation_trace: a deterministic English trace, e.g. "Interest-bearing debt (12,000,000) ÷ total assets (50,000,000) = 24.00%";
   - result_reason_code, rendered later per locale;
   - sort_order.

4. Staleness: if asOf − period.periodEnd > stalenessLimitDays, add a review-severity unknown with field "Data freshness".

5. Aggregation, in the precedence of §7.1:
   1. any fail → fails_selected_methodology;
   2. else any blocking unknown → insufficient_data;
   3. else any unknown or borderline criterion, or any review unknown → requires_review;
   4. else passes_selected_methodology.
   Data adequacy and confidence exactly as in §7.1. "Inputs" means the facts the criteria actually used, plus segments, plus staleness.

6. Status reasons are structured objects (D-42), with kind, criterionId, label, ratio, threshold, reasonCode and counts, following §7.3.
   Put the renderers in src/engine/reasons/: en.ts (texts taken from §7.3) and ar.ts. Every Arabic template string must start with the marker "⟦AR-REVIEW⟧" and carry a comment "AR-REVIEW: needs human Arabic drafting". Do not machine-translate silently: write a literal Arabic draft and mark it.

7. Hash (§7.4):
   - canonicalize(): sort keys recursively by code point; round numbers with Number(x.toFixed(10)) and normalise -0 to 0; drop undefined; keep null; keep array order (sort arrays only where §7.4 says to).
   - The payload contains exactly the fields listed in §7.4.
   - immutable_hash = SHA-256 hex of JSON.stringify(canonical payload).
   - financial_snapshot_id = "snap_{periodId}_{first 12 hex chars}".
   - Return the canonical payload too, so it can be stored (D-43).
   - Constants: ENGINE_VERSION = "engine-1.0.0"; CALCULATION_VERSION = "calc-2026.10.1" (bump it whenever a calculation rule changes).

8. Public API: screen(input): EngineResult, and verify(payload, storedHash): boolean.

Tests (Vitest, src/engine/**/*.test.ts; coverage threshold 100% branches for src/engine):
- Every result-rule branch: max, min, boolean, no threshold, borderline on both sides of the threshold, exactly at the threshold, margin null (never borderline), rounding at .xx5.
- Denominator missing → insufficient_data. Numerator missing → requires_review. A fail outranks a blocking unknown.
- business_activity: prohibited primary segment; permissible primary segment; unclassified primary segment; undisclosed revenue; no segments.
- non_permissible_revenue: pass; fail; unclassified segment → review; total revenue missing → blocking.
- Unregistered criterion type → blocking.
- Staleness at 550 and at 551 days.
- The full adequacy and confidence matrix, and weakest-tier combination.
- Synthetic fixtures in src/engine/__fixtures__/: obviously fake companies ("Fixture Alpha Co" and so on), covering all four statuses under EX-A and EX-B with the §8 parameters. Golden snapshot tests include the hash, so any unintended change to the hash fails.
- Property tests with fast-check: shuffling object keys or array input order (where the spec sorts) gives the same hash; changing any single fact value, state, tier or source gives a different hash; verify(payload, hash) is true for every generated case.

Out of scope: database, UI, AI.

Stop and summarise: the public API, the list of test cases, the coverage report, and every place where §7 was ambiguous and you made a choice (as questions for me).
```

**Your checks:**
- Read the ambiguity list. Your answers become new decisions in `DECISIONS.md`.
- Read the golden fixtures and check each status by hand for at least one case per status.

**Commit:** `feat(engine): deterministic screening engine with golden and property tests`

---

### Step 4 — Brand system, Arabic-first i18n/RTL, layout and components

```text
Step 4 of the Suhail build. Read these in full first:
- replit.md
- docs/DECISIONS.md: D-21, D-22, D-37, D-40
- docs/SUHAIL_BUILD_REFERENCE.md: all of §4 (4.7 is only so you can recognise prototype styling to avoid), §7.1 (status labels, EN and AR), §11, §12 items 4–8 and 10, and Appendices A and B

Goal: the visual and language foundation. Dark-first, Arabic-first, RTL by default.

Requirements
1. Brand files
   - public/brand/ already holds the 9 SVGs. Never modify them. Add a test asserting their SHA-256 values against a committed list.
   - scripts/brand-icons.ts uses sharp to export app-icon.svg to PNG at 16, 32, 180, 192 and 512 px (public/icons/), plus favicon.ico (16 and 32).
   - src/app/manifest.ts:
     - name "سهيل · Suhail", short_name "سهيل";
     - lang ar, dir rtl;
     - theme_color and background_color #0B2E33;
     - each icon with its real size and type "image/png" (this fixes §12 item 10).
   - Apple touch icon at 180 px.

2. Tokens (globals.css, Tailwind v4 @theme)
   a. Raw palette variables: every colour in §4.2 and §4.2a, using the brief's names (--night, --ink-mid, --brass, --brass-soft, --canopus, --sand, --sand-deep, --compliance, --alert, --text, --muted, --line) plus the accessible variants (--compliance-dark, --alert-dark, --teal-mid-dark, --muted-dark, --brass-deep, --sand-deep-strong).
   b. Semantic shadcn tokens. Dark is the default (D-22):
      - dark: background Night, foreground Canopus White, muted-foreground #919A9D;
      - light: background Sand, cards #FFFFFF, foreground Text, muted-foreground Muted, visible outlines Sand Deep Strong, subtle dividers Line, brass text Brass Deep.
      Any value §4.2/4.2a does not give (dark card surface, dark border, focus ring, etc.) is a PROPOSAL. Use #061E21 from the brief for deeper dark surfaces where needed. List every proposed value in your summary with its WCAG contrast ratio (text ≥ 4.5:1, borders and icons ≥ 3:1) for my approval.
   c. Status tokens per §4.2a for both modes. Price-direction tokens: up = Teal Mid (light) / #26A8B1 (dark) with a glyph; down = ink / Canopus with a glyph; never green or red. Form and system errors use Text / Canopus White with an error icon, never Alert red.
   d. Theme: class strategy with the "dark" class on <html> by default. ThemeToggle stores the choice in localStorage. A tiny inline script in <head>, kept as a separate constant so its hash can be computed later, applies the stored choice before paint. Never read cookies on public pages (D-22).

3. Typography
   - next/font/google: IBM Plex Sans Arabic (300–700, arabic subset), IBM Plex Sans (300–700), IBM Plex Mono (400, 500). All self-hosted by next/font; no Google Fonts URL at runtime.
   - :lang(ar): Plex Sans Arabic first, line-height 1.9. :lang(en): Plex Sans first, line-height 1.6.
   - Body text 14–15 px. Weights: headings 600, body 400, analyst bylines 500.
   - Never bold Arabic body text. Provide an <Emphasis> component that emphasises with colour or size.

4. Numbers and dates: src/lib/format.ts
   - formatNumber, formatPercent, formatMoney (with unit scale), formatDate.
   - Locales "ar-u-ca-gregory-nu-latn" and "en-US" only (D-21).
   - A <Num> component: IBM Plex Mono, font-variant-numeric tabular-nums lining-nums, wrapped in <bdi dir="ltr">.
   - Tests for: Western digits in Arabic; a Gregorian date in Arabic; a negative percent rendered inside RTL text.

5. i18n with next-intl
   - routing: locales ['ar','en'], defaultLocale 'ar', localePrefix 'as-needed', localeDetection false, localeCookie false.
   - Routes under src/app/[locale]/. In the [locale] layout: <html lang={locale} dir={locale==='ar'?'rtl':'ltr'}>.
   - proxy.ts runs the next-intl handler. Structure it as a composable chain, because auth and preview mode are added later.
   - Messages: copy Appendix A into en.json and Appendix B into ar.json verbatim, then apply the fixes:
     - app.name → "سهيل" / "Suhail";
     - app.tagline → the primary lockup line from §4.5 ("دليلك في السوق." / "Your bearing in the market.");
     - delete app.workingTitleNote;
     - replace every "بصغة" with "بصمة";
     - add status labels for the four codes, in EN and AR, from §7.1;
     - add the §11 disclaimers as keys (disclaimer.short, disclaimer.full, methodology.pageNote, banner.exampleMethodology, banner.demo, why.engineDecides, status.confidenceNote, stock.livePriceNote).
     Where Arabic is missing (§11 disclaimers, the whole "methodologies" and "admin" namespaces, any new key), the value must start with "⟦AR-REVIEW⟧ " followed by the English text. Never machine-translate silently.
   - Phase 0 namespaces: app, nav, common, status, stock, why, methodologies, admin, plus any new ones such as disclaimer and banner. A test asserts ar.json and en.json have identical key sets within those namespaces. Namespaces only later phases use (dashboard, compare, watchlist, alerts, portfolio, purification, governance, glossary, settings, search) stay as extracted and are exempt from the parity test until they are used.

6. Components (src/components/brand and src/components/status), RTL-correct:
   - BrandMark(surface): chooses the file per the §4.1 "which file to use where" table.
   - CoverageSeal: mark-seal-small on dark; on light, the same polygon rendered with fill #88632C (the documented exception in §4.1).
   - Lockup: primary mark, then "سهيل" (Plex Sans Arabic 600), then "Suhail" (Plex Sans 600), sized to look equal. The mark sits at the inline start, so on the right in RTL. Descriptor "سهيل · استثمار متوافق" underneath. The star is never omitted.
   - StatusBadge(status): per §4.2a. Always icon + label. Lucide check / x / alert-triangle / help-circle at stroke 1.6. Solid fill = concluded; 2 px outline = not concluded. Correct colours in both modes.
   - AnalystByline (Brass on Night, Brass Deep on light, weight 500).
   - Disclaimer (short and full), DemoBanner, ExampleMethodologyBanner, EngineStatement, ConfidenceNote, EmptyState.
   - ThemeToggle, and LocaleSwitcher (same path in the other locale).
   - Use shadcn/ui primitives. After adding each shadcn component, convert its physical-direction classes to logical ones; lint:logical must pass.

7. Public layout
   - Header on a Night background in both modes: lockup with mark-seal-small and the Arabic name in Brass Soft; nav links nav.picks (/) and nav.methodologies (/methodology), using the existing dictionary keys; LocaleSwitcher; ThemeToggle.
   - Footer: the short disclaimer and a link to the full one.
   - Follow the §4.6 copy rules; no star or navigation metaphors in UI strings.

8. A dev-only /[locale]/styleguide route (notFound() in production) showing:
   - all tokens with their contrast ratios;
   - all four badges in both modes;
   - the seal on both surfaces;
   - the lockup on both surfaces;
   - type samples in AR and EN;
   - number formatting.

Tests
- Unit: StatusBadge renders icon + label for every status; message-key parity; format helpers; no string "Thiqah", "Shariah-Aware", "base44" or "Base44" anywhere in src/ or the messages.
- Playwright:
  - / has <html lang="ar" dir="rtl">;
  - /en has lang="en" dir="ltr";
  - full-page screenshots of the styleguide in AR/EN × dark/light, saved as test artefacts;
  - an axe-core scan of the styleguide with no serious or critical violations.

Out of scope: data, auth, real pages.

Stop and summarise: proposed derived colour values with contrast ratios, the list of AR-REVIEW keys, and screenshots.
```

**Your checks:**
- Open `/styleguide` in both themes and both languages.
- Approve or adjust the derived colours.
- Have someone read the Arabic header and footer.

**Commit:** `feat(ui): brand tokens, Arabic-first i18n/RTL, status components, layout`

---

### Step 5 — Accounts: Google sign-in, account page, admin promotion with TOTP, audit trail

Finish A2.2–A2.4 and A3 (the Google OAuth client) before this step.

```text
Step 5 of the Suhail build. Read these in full first:
- replit.md
- docs/DECISIONS.md: D-14, D-16, D-35, D-38, D-40, and D-45 to D-53
- docs/SUHAIL_BUILD_REFERENCE.md: §3.4 and §6 (User, AuditEvent, EditorialSetting)

Goal: simple registration and sign-in for everyone with Google; a minimal account page; and a secure admin area that users reach only after an admin promotes them and they enrol TOTP. Every admin write is audited.

Requirements
1. Clients and sessions
   - @supabase/ssr server and browser clients, used for auth only (D-14).
   - Session refresh in the proxy.ts chain ONLY for /auth/*, /account* and /admin* (and their /en variants). Public pages never read cookies on the server (D-51).

2. Sign-in and registration (D-46, D-49), under /[locale]/auth, all dynamic:
   - /auth/sign-in is one page for both sign-in and registration:
     - the lockup, a one-line value statement, and a single "Continue with Google" button (signInWithOAuth, provider google, redirectTo /auth/callback, preserving the locale and a safe "next" path);
     - the consent line with links to /terms and /privacy;
     - no email/password fields anywhere.
   - /auth/callback:
     - exchanges the code for a session;
     - upserts app.users (id, email, full_name, last_sign_in_at; role 'user' on insert only) through dbApp. On first insert it writes audit events user_registered and consent_recorded (D-53), with terms_version, privacy_version and accepted_at set from the current policy versions;
     - then redirects to "next". Validate "next" as a same-origin relative path to prevent open redirects.
   - /auth/consent: shown when the stored terms_version or privacy_version is older than the current constants. Accept → record the new versions plus consent_recorded. Decline → sign out.
   - /auth/sign-out (POST).
   - Friendly error states (cancelled, provider error), in AR and EN.

3. Terms and privacy: public /terms and /privacy pages render versioned Markdown from content/legal/{terms,privacy}.{ar,en}.md. Each file has a front-matter version. src/legal/versions.ts exports the current versions. Commit placeholder files whose text starts with "⟦LEGAL-REVIEW⟧" (the launch gate will fail on this marker; O-7). ISR, like other public pages.

4. Header account control (D-51)
   - A small client component in the public header. Signed out: a "Sign in" link to /auth/sign-in?next=<current path>. Signed in: initials avatar (no external image) with a menu: Account, Admin (only if the role is admin or editor), Sign out.
   - It reads the session only in the browser, so public pages stay ISR.
   - The public CSP connect-src must allow NEXT_PUBLIC_SUPABASE_URL. Note this for Step 13.

5. Account page /account (requireUser; dynamic; noindex):
   - shows name and email (or phone later, D-52) and the sign-in method;
   - language preference (locale_pref, used for post-sign-in redirects);
   - links to Terms and Privacy, with the accepted versions and dates;
   - Delete account, with typed confirmation:
     - calls a server action that verifies the session user, refuses if the role is admin or editor ("ask another admin to remove your role first"), then calls app.delete_own_account(id) (D-50, created in Step 2);
     - writes the user_account_deleted audit event with the user id only;
     - signs out and redirects home.
   - No other features (D-45).

6. src/server/auth.ts
   - requireUser(): supabase.auth.getUser() (never trusting getSession alone), then loads app.users through dbApp. If the row is missing or consent is outdated, redirect to /auth/callback recovery or /auth/consent. Returns the User. In actions and route handlers it throws a typed 401.
   - requireRole(roles: ('admin'|'editor')[]): requireUser, then the role check, then AAL2 through getAuthenticatorAssuranceLevel(). Returns the Actor { id, email, role }.
   - Pages redirect: no session → /auth/sign-in?next=…; role user → a 403 page; admin/editor without a verified TOTP factor → /admin/mfa/enroll; with a factor but AAL1 → /admin/mfa/verify.
   - In server actions and route handlers it throws typed errors that map to 401 or 403.

7. Admin MFA pages (dynamic): /admin/mfa/enroll (TOTP QR code, plus verify) and /admin/mfa/verify (step up to AAL2). Every other /admin route requires the role AND AAL2 (D-47).

8. src/server/audit.ts: audit(tx, actor, { event_type, entity_name, entity_id, summary, details }). It inserts audit_event inside the caller's transaction, with actor_email, actor_role, occurred_at and is_demo false. Every admin mutation from now on goes through withAdminAction(roles, fn), which runs requireRole, opens a dbApp transaction, and passes the actor and tx to fn. Account actions go through withUserAction(fn).

9. Static guard: a Vitest test using ts-morph scans every file containing "use server" and every route handler under src/app/api (except /api/health, /api/internal/* and, later, /api/hooks/*, which carry their own signature checks). It fails unless each exported function calls requireRole, withAdminAction, requireUser or withUserAction before anything else.

10. Admin → Users page (admin only):
    - search by email or name; list role, created, last sign-in and MFA status;
    - promote user → editor/admin, or demote, with a required note and a user_role_change audit event (before/after);
    - refuse to demote the last admin;
    - a promoted user sees the MFA enrolment on their next visit to /admin.

11. Workspace CLIs (scripts/; never deployed or imported by the app):
    - pnpm admin:grant <email> <admin|editor> uses DATABASE_URL_MIGRATIONS. It finds the user by email in auth.users (the user must have signed in once), sets app.users.role, and writes user_role_change with actor "system:cli". This is for bootstrapping the first admin.
    - pnpm admin:reset-mfa <email> uses SUPABASE_SECRET_KEY, read only from the shell environment; refuse to run if NODE_ENV=production. It deletes the user's TOTP factors through the Supabase Admin API and writes user_mfa_reset (D-48).

12. Admin shell (RTL-aware, Arabic default, English under /en/admin)
    - Sidebar: Methodologies, Securities and data, Ingestion, Editions, Analysts, Users, Audit trail, Settings.
    - Empty placeholder pages for the sections later steps build.
    - Show the signed-in user and a sign-out button.

13. Audit trail page (admin only): read-only and paginated, filterable by event_type, entity_name and date range, showing summary and details as JSON. No editing or deleting anywhere.

14. Settings page (admin only): edit EditorialSetting.default_shariah_methodology_version_id (a select of is_public versions) and allow_ineligible_editor_pick. Each change writes an editorial_setting_change audit event with before and after values.

15. CSP: /admin, /account and /auth pages send the nonce-based strict CSP from the proxy chain (D-40), with connect-src including the Supabase URL. Leave the public CSP for Step 13.

Tests
- Integration (mock Supabase auth at the module boundary; use the real database for app.users):
  - the first callback creates a role-user row plus user_registered and consent_recorded audit events; a second callback inserts nothing new;
  - outdated consent redirects to /auth/consent;
  - requireUser with no session → 401;
  - requireRole with role user → 403; editor on an admin-only action → 403; admin at AAL1 → MFA redirect/403; admin at AAL2 → passes;
  - promote and demote write audit rows; the last-admin demotion is refused;
  - account deletion is refused for admins, and for users it calls the function and leaves only an id in the audit;
  - an open-redirect attempt on "next" (https://evil.example, //evil.example) falls back to "/".
- The static guard test from item 9.
- audit() writes in the same transaction: if the mutation throws, no audit row remains.
- Playwright:
  - /auth/sign-in shows only the Google button plus the consent links, in AR (RTL) and EN;
  - unauthenticated /account and /admin redirect to sign-in with "next" preserved;
  - the public home page sets no cookies (inspect the response headers);
  - /account, /auth/* and /admin/* carry noindex.

Stop and summarise, including the manual steps I must do: sign in with Google once, run admin:grant on my email, then enrol TOTP at /admin.
```

**Your checks:**
- Sign in with Google in Arabic, then in English, and check the redirect back to the page you started from.
- Run `pnpm admin:grant <you> admin`, open `/admin`, and enrol TOTP. Sign out and back in: TOTP must be asked for at `/admin`, but not on public pages or `/account`.
- Sign in with a second Google account, promote it to editor from the Users page, and confirm the audit row.
- Delete that second account from its `/account` page. Confirm it is gone from Supabase Auth and that the audit row holds only the id.
- Run `curl -sI <dev-url>/` and confirm there is no `set-cookie`.

**Commit:** `feat(auth): Google sign-in, consent, account page, admin promotion with TOTP, audit trail`

---

### Step 6 — Methodology admin, governance workflow, public methodology pages

```text
Step 6 of the Suhail build. Read these in full first:
- replit.md
- docs/DECISIONS.md: D-10, D-11, D-12, D-32
- docs/SUHAIL_BUILD_REFERENCE.md: §6 (Methodology, MethodologyVersion, MethodologyCriterion), §7.2, §7.5, §8, §11 (methodology page note, example banner) and §5.2

Goal: methodologies are managed as data through a governed workflow, and documented publicly. No threshold lives in code.

Admin (admin role for structure and workflow; editors read-only)
1. Methodologies list: name, versions, workflow_status, production flag, is_public, example/demo markers.
2. Create and edit a methodology: name, short_label, slug, type, publisher, source_title, source_url, official_or_inspired, licensing_status, verified_by, verification_date, scope, notes.
3. Create a draft version, either empty or by cloning an existing version's criteria (sets supersedes_version_id). Fields: version, version_label, effective_date, changelog, purification_treatment (optional structured JSON, shown only if set).
4. Criteria editor (draft versions only; the DB trigger rejects edits otherwise, so show a clear message):
   - every MethodologyCriterion field;
   - line items chosen from a constant list (the §6 line-item keys plus shares_outstanding, finance_lease_liabilities, operating_lease_liabilities and market_cap; D-44);
   - prohibited_categories and non_permissible_categories as multi-selects of the activity_category enum, stored in treatment_rule_data;
   - zod validation: a threshold is required unless the direction is boolean; borderline_margin ≥ 0 or empty, never defaulted; the type must have a registered engine evaluator;
   - required_inputs derived automatically from the line items (+ business_segments for segment-based types).
5. Workflow buttons, each appending { from, to, actor, at, note } to workflow_history and writing an audit event:
   - draft → source_verified: requires methodology.source_url, verified_by and verification_date.
   - → rules_normalized: requires every criterion to pass validation.
   - → tests_passed: runs the test report. The engine golden fixtures for this version, plus version-specific test cases the analyst defines (a JSON list of { name, inputs, expected criterion results and status }, editable while draft), all must pass. Store it in methodology_version_report (kind 'test'; D-12).
   - → universe_tested: runs the impact report as a dry run of the engine over every in-universe security, using current data, compared with the current default version. Nothing is persisted as a screening_run. The report shows a transition matrix (old status × new status), the top driving criteria, borderline cases and a per-security diff. Store it as kind 'impact'. If the universe is empty, record "no securities" and still allow the step.
   - → human_reviewed: a reviewer's note is required.
   - → approved: record approved_by and approved_at, plus an approval_recorded audit event.
   - → production: allowed only if is_demo = false, official_or_inspired ≠ internal_example, licensing_status is set, and test, impact and approval are all present. Sets production_enabled and writes a methodology_version_production_enable audit event.
   - Fixtures (is_demo) can never reach production; show why.
6. Report viewers for the test and impact reports.

Public (dbPublic only, ISR revalidate = 900)
7. /methodology: list of public methodology versions grouped by methodology. Show publisher, source link, verification info, effective date, and a production or example status. Show ExampleMethodologyBanner for internal_example.
8. /methodology/[slug]: version selector (default: the production version, else the latest public one); the methodology page note (§11); and a criteria table with label, definition, formula_text, numerator and denominator definitions, threshold + unit + direction, borderline margin (or stock.noMarginDefined), treatment rules, edge cases, source reference and effective date. Also the changelog and workflow status. Show a purification section only when purification_treatment is set, labelled exactly as its data says. Never show a generic formula (§8).
9. Both pages are fully server-rendered, in AR and EN. Use the DB-stored text for methodology content (it is the same in both locales until Arabic content is entered); UI chrome comes from the messages.

Tests
- Unit: criterion zod validation; transition preconditions (one test per gate); fixtures blocked from production.
- Integration: the full workflow on a non-demo test methodology reaches production; editing criteria after draft fails at the DB layer and the UI shows the error; the impact report persists no screening_run rows.
- Playwright: /methodology/example-a renders the example banner, the criteria table and the "no margin" text for receivables (EX-A has no margin there).

Stop and summarise.
```

**Your checks:**
- Walk EX-A through the workflow. It must stop before production.
- Create a throwaway non-demo methodology and take it to production in a test database only.

**Commit:** `feat(methodology): governed methodology workflow and public documentation`

---

### Step 7 — SEC EDGAR ingestion, universe, facts, segments, manual prices

Answer **O-2** (the launch universe) before this step if you can. A few tickers are enough to build with.

```text
Step 7 of the Suhail build. Read these in full first:
- replit.md
- docs/DECISIONS.md: D-03, D-05, D-06, D-07, D-08, D-09, D-23, D-28, D-30, D-31, D-44
- docs/SUHAIL_BUILD_REFERENCE.md: §6 (Company, Security, Source, FinancialPeriod, FinancialFact, BusinessSegment, PriceBar, line-item keys, input states, tiers) and §12 item 9

Goal: real, sourced financial data for a curated universe of US stocks. Every figure is traceable to a filing or an analyst entry.

SEC client (src/ingest/sec/client.ts)
1. Endpoints:
   - https://www.sec.gov/files/company_tickers_exchange.json (ticker → CIK, name, exchange)
   - https://data.sec.gov/submissions/CIK##########.json (SIC description, fiscal year end, filings)
   - https://data.sec.gov/api/xbrl/companyfacts/CIK##########.json
   The User-Agent header comes from SEC_USER_AGENT. A global token bucket keeps us at ≤ 8 requests/s (the SEC allows 10). Timeouts; exponential backoff with jitter on 429 and 5xx; retries capped.
2. Archive each raw companyfacts response, gzipped, to S3_BUCKET_ARCHIVE at sec/companyfacts/{cik}/{yyyy-mm-dd}.json.gz through @aws-sdk/client-s3 (S3_ENDPOINT, forcePathStyle true). Record the object key in job_run details.

Mapping (src/ingest/sec/mapping.ts; versioned, D-06)
3. Choose the latest annual period: FY facts from forms 10-K or 10-K/A. For a given fiscal year take the most recently filed value. Duration items need about a 12-month span; balance-sheet items are instants at the period end. Phase 0 ingests annual periods only. Create a financial_period with fiscal_period_label "FY{fy}", period_end, reported_date (filed), filing_reference (accession) and is_latest. Also ingest the prior-year comparatives for total_revenue and net_income, as prior_year_revenue and prior_year_net_income.
4. Each line item has an ordered list of candidate us-gaap or dei tags, or an explicit sum rule. Start from the list below, VERIFY every tag against the committed fixture JSON, and document each choice with a comment in mapping.ts:
   - total_revenue: Revenues | RevenueFromContractWithCustomerExcludingAssessedTax | RevenueFromContractWithCustomerIncludingAssessedTax | SalesRevenueNet
   - total_assets: Assets
   - total_equity: StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest | StockholdersEquity
   - interest_bearing_debt: SUM of the borrowings tags present (LongTermDebtNoncurrent, LongTermDebtCurrent, ShortTermBorrowings, CommercialPaper; or LongTermDebt instead of the Noncurrent + Current pair, never both). input_state derived, tier Calculated, with the components listed in mapping_note. Lease liabilities are excluded (D-44).
   - finance_lease_liabilities and operating_lease_liabilities: the current + noncurrent tags, stored separately (D-44).
   - cash_and_equivalents: CashAndCashEquivalentsAtCarryingValue. If only the broader restricted-cash tag exists, store it with input_state estimated and a mapping_note saying so.
   - interest_bearing_investments: ShortTermInvestments | MarketableSecuritiesCurrent | AvailableForSaleSecuritiesDebtSecuritiesCurrent → ALWAYS estimated / Estimated until an analyst confirms (D-06).
   - accounts_receivable: AccountsReceivableNetCurrent
   - net_income: NetIncomeLoss
   - operating_cash_flow: NetCashProvidedByUsedInOperatingActivities
   - shares_outstanding: dei:EntityCommonStockSharesOutstanding (latest), with as_of_date.
   - ebitda: not ingested in Phase 0.
   When no candidate tag exists: store the fact with value null, input_state unknown, and unknown_note "No XBRL value among: <tags>". Never assume a value.
5. Sources: one Source row per filing, with source_type regulatory_filing, provider "SEC EDGAR", document_title "<form> <fy>", document_reference = accession, source_url = the filing index URL, retrieved_at, reporting_period, confidence_tier Verified, and is_synthetic false.
6. Upsert rules (D-09):
   - same company + period + line_item with the same value and source → no-op;
   - a different value (an amendment or new filing) → insert a new current fact and mark the old one not current, in one transaction, with a data_ingest audit event.

Universe and securities admin
7. "Add security": enter a ticker → look it up in company_tickers_exchange → show the CIK, name and exchange. Accept only Nasdaq and NYSE; anything else gets a clear message. On confirm:
   - create company (name, SIC description as sector_label with sector_label_note "SEC SIC description — a label, never screening evidence", fiscal_year_end, reporting_currency USD);
   - create security with slug lowercase "{exchange}-{ticker}", where non-alphanumerics become "-" (e.g. nyse-brk-b), in_universe true, listing_status listed;
   - write an audit event;
   - run the ingest for that company immediately.
8. Securities list: ticker, name, exchange, in_universe, latest period, last ingest time, and counts of unknown and estimated facts.
9. Security detail tabs:
   - Facts: current facts with value, state, tier, source link and mapping note. "Override" inserts a new current fact (D-09), with a required reason and a Source of type internal or regulatory_filing (filing note reference). "Confirm from filing" upgrades an estimated interest_bearing_investments fact by inserting a reported/Verified fact that cites the note.
   - Segments, for the latest period: create, edit and delete with segment_name, description, revenue_amount, revenue_share (computed when total_revenue is known, stored as derived), activity_category (default unclassified), category_basis (required unless unclassified), input_state, confidence_tier and source (filing + note). Show a banner while any segment is unclassified.
   - Prices: manual close entry (date, close, currency, source label and URL) through PriceProvider 'manual' (src/ingest/prices/). Saving a close also stores a derived market_cap fact = shares_outstanding × close for the latest period, with the weakest tier and a mapping_note.
   - Coverage: assign or unassign an analyst (coverage_analyst_id, coverage_started_at).
   - Company: name_ar, description_ar and description_en.
   - Remove from universe: sets in_universe false, after a confirmation.
   Every mutation goes through withAdminAction and writes an audit event.
10. The PriceProvider interface (getCloses(securityId, from, to), name, licence note) has a 'manual' implementation now, so a licensed end-of-day provider can be added later without changing callers (D-08).

Jobs
11. src/jobs/ingest-sec.ts: processes in_universe securities in batches (JOB_BATCH_SIZE, default 100). It records progress in job_run (status, cursor, counts, errors), resumes from the cursor, and is idempotent. A per-security failure is recorded and the job moves on. The admin "Ingest now" button calls the same service for a single security.
12. Ingestion page: job_run history with counts and per-security errors; a retry button for one security.

Tests
- Commit trimmed real companyfacts fixtures for 3 companies (for example AAPL, MSFT and one company with non-standard revenue tags) plus a synthetic one with missing tags. Mapping tests assert each line item's value, state, tier and mapping_note.
- Period selection with an amendment; FY duration vs instant handling; prior-year comparatives.
- Idempotency: ingesting twice adds no facts. An amendment supersedes the old fact.
- Rate limiter timing (fake timers); retry on 429.
- Slug generation edge cases.
- Admin actions are guarded (Step 5's static test passes).

Out of scope: screening runs, public pages.

Stop and summarise: the final mapping table, plus any tags you found that change my candidate list.
```

**Your checks:**
- Add 3–5 real tickers.
- Compare `total_assets` and `interest_bearing_debt` for one company against its 10-K by hand.
- Classify its segments.
- Enter one manual close and confirm the market cap.

**Commit:** `feat(ingest): SEC EDGAR ingestion, universe admin, segments, manual prices`

---

### Step 8 — Screening service and jobs

```text
Step 8 of the Suhail build. Read these in full first:
- replit.md
- docs/DECISIONS.md: D-23, D-42, D-43
- docs/SUHAIL_BUILD_REFERENCE.md: §6 (ScreeningRun, ScreeningCriterionResult, ScreeningUnknown), all of §7, and §13.3 check 10

Goal: connect the engine to the database. Runs are append-only, idempotent and re-verifiable.

Requirements
1. src/screening/service.ts screenSecurity(securityId, methodologyVersionId, { asOf, trigger }):
   a. Load the inputs through dbApp:
      - the latest financial_period;
      - the current facts for that period (including market_cap and shares_outstanding when present);
      - the segments for that period;
      - the version and its criteria.
      Build EngineInput. A line item without a fact row is 'missing'.
   b. Run the engine.
   c. Compare the hash with the latest stored run for the same security and version. If equal, insert nothing and return { unchanged: true, runId } (D-23).
   d. Otherwise, in one transaction:
      - insert screening_run with every §6 field, plus status_reasons (structured) and hash_payload (D-43);
      - insert screening_criterion_result rows and screening_unknown rows;
      - insert a screening_run audit event.
      Denormalise the labels the reference stores (ticker, company_name, methodology_name, version label, period label).
2. src/screening/verify.ts verifyRun(runId): recompute the SHA-256 of the canonical stored hash_payload, compare it with immutable_hash, and also re-run the engine on the inputs embedded in the payload and compare the outputs. Return a detailed diff on mismatch.
3. Job src/jobs/screen-universe.ts: for every in_universe security, screen it under (a) the default methodology version from settings and (b) every production_enabled version. Batches, job_run cursor, resumable, idempotent.
4. Admin, on the security page:
   - "Run screening now" (pick a version);
   - a runs list (generated_at, version, status, short hash, unchanged markers from the job log);
   - an internal run detail view (criteria, unknowns, reasons, hash payload, a "Verify" button that calls verifyRun).
5. asOf is the job's start date in UTC. Pass it explicitly; never call new Date() inside the service. The job owns the clock.

Tests (integration, real Postgres)
- Screening the same data twice creates one run.
- Changing one fact creates a new run with a different hash, and the prior run is unchanged.
- verifyRun passes for stored runs, and fails when hash_payload is tampered with in a test database (bypass the trigger only inside the test, by disabling it explicitly).
- A security with no segments → the business_activity criterion is unknown, with a review unknown (D-13).
- A missing total_assets → insufficient_data.
- The job resumes from its cursor after a simulated crash midway.

Stop and summarise.
```

**Your checks:**
- Run the job. Look at one real company's run and check it by hand against its 10-K.
- Press Verify on that run.

**Commit:** `feat(screening): persisted append-only runs, verification, universe job`

---

### Step 9 — Public verdict page

```text
Step 9 of the Suhail build. Read these in full first:
- replit.md
- docs/DECISIONS.md: D-04, D-20, D-21, D-26, D-33, D-37, D-39
- docs/SUHAIL_BUILD_REFERENCE.md: §1, §3.5, §4.2, §4.2a, §4.4, §4.6, §5.2, §5.3, §7.1, §7.3, §11 and §13.3 checks 1, 2, 3 and 12

Goal: the public, server-rendered, Arabic-first verdict page for each stock, at /stock/[slug] (Arabic) and /en/stock/[slug].

Requirements
1. Route src/app/[locale]/(public)/stock/[slug]/page.tsx: generateStaticParams returns [], dynamicParams true, revalidate = 900 (D-20). Read data only through dbPublic. Read no cookies and no headers.

2. Data loaded:
   - the security and company (public only, otherwise notFound());
   - the default methodology version from app.public_settings;
   - the latest screening_run for the security under that version, with its criterion results, unknowns and sources;
   - the latest explanation_object for the run;
   - the prior runs under the same version;
   - the period and current facts for the Fundamentals table;
   - the coverage analyst's profile.

3. Sections in exactly this order (§5.3), leaving out the live market data (D-04):
   1. Company header: English name, plus name_ar when present; ticker; exchange; sector label (labelled as an SEC label); the coverage byline when covered.
   2. Screening card:
      - StatusBadge;
      - "Under" with the methodology name and version label, linking to the methodology page;
      - "Data as of" with the period end and filing date;
      - Confidence, with the confidence note;
      - Data adequacy;
      - a "Why?" link to the section below.
      Show CoverageSeal plus a brass byline only when the security is covered AND the status is passes_selected_methodology (D-37).
   3. Why this assessment: structured status reasons rendered in the page's locale from the engine's templates, plus the engine statement (§11).
   4. What we know: the evidence the run used, as plain statements with <Num> values and [n] source references.
   5. What we don't know: each unknown with its field, why it is missing, its effect and severity; or the no-unknowns text.
   6. Methodology: a short summary and a link.
   7. Criteria table, with the columns listed in §5.3. Use <details> for show/hide calculation (no client JavaScript). On narrow screens it becomes stacked cards.
   8. AI explanation:
      - on /en: the latest explanation if validation passed, with the validation note; if the latest failed, the "AI text discarded" notice and its body text;
      - on Arabic pages: a short note saying the explanation is available in English only for now, with a link to /en, and structured evidence only (D-26). This is a new AR-REVIEW message key.
      (Step 10 creates the explanations. Until then, render the "not generated" state.)
   9. Fundamentals: the current facts table with label, <Num> value and unit, period, input state, tier and source [n].
   10. Sources: a numbered list [n] with type, title, accession, filed date and link.
   11. Change history / prior runs: date, status badge (small), short hash, and "Unchanged" when the status equals the previous run's.
   12. Run metadata: run hash, generated at, calculation version, engine version, and the append-only note.
   13. Full disclaimer.

4. Banners: DemoBanner when the security, company or run is_demo; ExampleMethodologyBanner when the version is internal_example. When there is no run yet, show the "no run yet" text and still render the company header and disclaimer.

5. generateMetadata, per locale:
   - title: "{company} ({TICKER}) — {status label} · {methodology version label} | سهيل" (English variant on /en);
   - description: the status label, methodology name and version, and data date;
   - canonical (Arabic at the root, English under /en);
   - alternates.languages for ar and en, plus x-default → ar;
   - openGraph and twitter tags, specific to the stock. The image route comes in Step 12; use app-icon until then;
   - robots noindex when the methodology version is not production_enabled (D-24 adds site-wide preview later).

6. Bilingual fallback (D-33): when an Arabic field is missing, show the English text with an "English only" marker, and the reverse on /en.

7. Copy register: write src/lib/copy-register.ts exporting checkRegister(text, locale) with the banned lists from §4.6 and §10.4 (hard bans vs warnings). Reuse it in Steps 10 and 11.

8. Dev seed: pnpm db:seed:demo creates obviously fake demo securities (is_demo true, "Fixture …" names, slugs like demo-fixa) covering all four statuses, with segments and runs under EX-A. It refuses to run when SITE_MODE=live.

Tests
- Playwright on the demo securities:
  - the raw HTML (fetched without JavaScript) contains the company name, the status label and the data date (§13.3 #1);
  - html lang/dir is correct for ar and en (#2);
  - og:title, og:description, og:image and twitter:card are present and stock-specific (#3);
  - no console errors (#12);
  - axe shows no serious or critical violations;
  - section order matches §5.3;
  - the seal appears only for covered + passing securities;
  - screenshots in AR/EN × dark/light.
- Unit: checkRegister against every banned term in both lists; the rendered HTML of each demo page passes checkRegister.
- RLS: a security with in_universe false returns 404.

Stop and summarise, including any §5.3 item you could not fill from stored data.
```

**Your checks:**
- Read a real stock page in Arabic, all the way down.
- Run `curl -s <dev-url>/stock/<slug> | grep -c "<company name>"`.
- Share one page with your analyst for a first read.

**Commit:** `feat(public): server-rendered Arabic-first verdict pages with full evidence`

---

### Step 10 — AI explanation pipeline

Set `ANTHROPIC_API_KEY` and `LLM_MODEL` first.

```text
Step 10 of the Suhail build. Read these in full first:
- replit.md
- docs/DECISIONS.md: D-25, D-26, D-27
- docs/SUHAIL_BUILD_REFERENCE.md: §1, §6 (ExplanationObject), §10 introduction, §10.1 (prompt and validator, including the banned-register paragraph), §10.4 (banned patterns), §11 and §13.3 check 11

Goal: English explanations for screening runs. They are generated in jobs, strictly validated, and discarded when they fail. The model never decides anything.

Requirements
1. src/ai/llm.ts: an LlmProvider interface plus an Anthropic implementation (@anthropic-ai/sdk). Model from LLM_MODEL; temperature 0; max_tokens 800; timeout and retries. It returns the text and the model id the API reports. Only jobs and admin actions may import it (ESLint restriction).
2. src/ai/prompts/explain-en.ts: the §10.1 prompt text VERBATIM, with PROMPT_VERSION = "explain-en-1.0.0". A test extracts the §10.1 code block from docs/SUHAIL_BUILD_REFERENCE.md and asserts the template's static parts are byte-identical.
3. Evidence builder, src/ai/evidence.ts buildEvidence(runId):
   - claim: the run's EN status label;
   - evidence: per criterion, the label, result, ratio, threshold, unit, direction, numerator and denominator values with their definitions, and calculation_trace;
   - unknowns;
   - sources: a numbered list;
   - methodology: name and version_label;
   - allowed_numbers: every number and date in the evidence, in normalised forms;
   - allowed_tokens: the methodology name and version label.
   The prompt receives the evidence object WITHOUT allowed_numbers and allowed_tokens (§10.1).
4. Validator, src/ai/validate-explanation.ts. It returns { passed, details[] } and rejects the text if ANY of these hold:
   - It contains a forbidden word from §10.1 rule 4 (halal, haram, fatwa, verdict, certified, endorsed, guaranteed, buy, sell) or a tick or cross symbol (✓ ✔ ✗ ✘ ✅ ❌ ☑ ☒). Word boundaries, case-insensitive.
   - It contains banned register from §10.1 and §4.6 (recommendation / recommend, advice, should buy, target price, guaranteed, sure thing). Reuse checkRegister.
   - It contains a number or date not in allowed_numbers. Extract numbers including 1,234.56, 12.5%, negatives and ISO and long-form dates, and normalise both sides before comparing.
   - It contains a [n] reference outside 1..sources.length.
   - It contains a methodology name or a version reference (v\d+(\.\d+)*) that is not in allowed_tokens.
   - It does not name the run's status label, or it names any other status label.
   - It does not have exactly three paragraphs (rule 7), or it contains markdown (headings, bullets, emphasis).
5. Persistence: insert an explanation_object (append-only) with every §6 field (ai_text, ai_model, validation_status, validation_details, generated_at) plus prompt_version (D-25). Failed text is stored for audit but never rendered publicly.
6. Job src/jobs/explain-runs.ts: for runs under public versions with no explanation, generate one. Batches, cursor, resumable. Never generate on page load. Admin "Regenerate explanation" on the run detail inserts a new row (explanation_generated audit event).
7. Verdict page (/en): render the latest passed explanation's three paragraphs with the "AI-generated explanation" label and the validation note. If the latest attempt failed, show the discarded notice. Arabic pages behave as in Step 9 (D-26).

Tests
- Validator unit tests: one test per rule, plus §13.3 #11 (a text containing "halal", "buy" and an untraceable number is rejected); a valid 3-paragraph text built from fixture evidence passes; number normalisation cases.
- The LLM is mocked in CI. Add pnpm test:llm, an opt-in live test against one demo run that prints the text and the validation result. It never runs in CI.
- The job is idempotent: a second run generates nothing new.

Stop and summarise, including the pass rate from running test:llm 10 times on demo runs.
```

**Your checks:**
- Run `pnpm test:llm` a few times. Read the outputs and the rejection reasons.
- If the pass rate is low, don't loosen the validator. Tell Agent which rule fails, and fix the evidence formatting instead.

**Commit:** `feat(ai): validated English screening explanations generated in jobs`

---

### Step 11 — Editions, Editor's Pick, analyst profiles

Set `PUBLIC_MEDIA_BASE_URL` first.

```text
Step 11 of the Suhail build. Read these in full first:
- replit.md
- docs/DECISIONS.md: D-02, D-27, D-29, D-33, D-37, D-38
- docs/SUHAIL_BUILD_REFERENCE.md: §1, §4.4, §4.6, §6 (Edition, Pick, EditorialApproval, EditionRevision, EditorialSetting) and §9.1 (Editor's Pick, statuses, approvals, revisions, ineligible override, starting price), plus §11

Goal: the weekly edition with the analyst's Editor's Pick, an approval workflow, corrections, and the public home and archive pages.

Admin
1. Analysts (admin):
   - Create and edit analyst_profile: linked user; name, title and bio in AR and EN; credentials; active.
   - Headshot upload: accept jpeg, png or webp up to 2 MB, check the real type, strip EXIF, resize to 512 px webp with sharp, and upload to S3_BUCKET_PUBLIC at analysts/{id}/{contentHash}.webp. Store the key; public URL = PUBLIC_MEDIA_BASE_URL + key.
2. Editions:
   - Create a draft for a week: edition_id "YYYY-Www" (ISO week), week_start Monday and week_end Friday, market_timezone America/New_York.
   - Snapshot from settings at creation: shariah methodology id, name, version id, label and production flag; data_snapshot_date; calculation_version; demo_mode = !production_enabled.
   - Audit event edition_draft_created.
3. Editor's Pick form (editor or admin), at most 2 per edition, slot_key editor_1 and editor_2, pick_type editor:
   - Security picker (in_universe only). Show its latest status under the edition's version and its eligibility. If it is not passes_selected_methodology, block it unless EditorialSetting.allow_ineligible_editor_pick is true; then override_label is required and shown publicly (§9.1).
   - Bilingual fields (D-33), with *_ar required and *_en optional: thesis, why_now, valuation_context and conflict_disclosure (required; "none" must be written out explicitly).
   - Risks: a list.
   - Evidence: a list of { claim_ar, claim_en, source_id chosen from that company's sources, value chosen from stored facts or entered with a source }.
   - editor_author: the analyst profile.
   - Starting price: required, picked from that security's manual price_bar entries, recording starting_price, starting_price_date and start_price_source.
   - Live copy-register lint with checkRegister on every text field: hard bans block submission; warnings are shown inline (D-27).
   - Save writes an editor_pick_saved audit event.
4. Workflow:
   - draft → pending_approval (submit) → approvals by stage qa, editorial, publish. Each stage records an EditorialApproval with decision (approved, rejected or changes_requested), notes, approver and time.
   - A rejection or changes_requested returns the edition to draft.
   - Approval of the publish stage publishes the edition:
     - status published_live if the edition's methodology was production-enabled and nothing is demo, otherwise published_demo;
     - content_hash = SHA-256 of the canonical edition + picks (reuse the engine's canonicalize);
     - published_at and published_by_email;
     - audit events edition_published and edition_status_change.
   - D-38: the same person may approve several stages; record each one.
5. Revisions after publication (types correction, addition, retraction, administrative):
   - clone the edition into a new row with revision_number + 1 and apply the changes;
   - send it through the same approvals;
   - on publish, set the old row's status to superseded with superseded_by_edition_id;
   - insert an EditionRevision with reason, changes_summary, picks_added, picks_changed, picks_retained and content_hash;
   - audit event edition_revision.

Public (dbPublic, ISR revalidate = 900)
6. / (home): the latest published edition (published_live; when SITE_MODE is not live, published_demo too, with DemoBanner). Show:
   - the edition header: week, methodology version used, data snapshot date;
   - a prominent correction notice when revisions exist, listing type, reason and date for each;
   - one card per Editor's Pick:
     - AnalystByline with headshot, name, title and credentials;
     - company name and ticker, linking to the verdict page;
     - StatusBadge "under {version}", plus the seal if covered and passing (D-37);
     - override label if any;
     - thesis, why now, evidence with [n] sources, risks, valuation context, conflict disclosure;
     - starting price and date with its source;
   - the short disclaimer and a link to the full one.
   If nothing is published yet, show an empty state.
7. /editions/[editionId]: the latest revision of that edition, with links to the previous and next published editions; 404 for anything unpublished.
8. Language fallback per D-33. Any new UI string goes into both message files; Arabic values that need review carry the AR-REVIEW marker.

Tests
- Integration: an ineligible pick is blocked, and allowed with an override when the setting is on; the approval flow publishes; changes_requested returns the edition to draft; a revision supersedes correctly and keeps history; the content hash is deterministic; RLS hides drafts and pending editions from dbPublic.
- Unit: hard-banned copy blocks submission.
- Upload: a wrong content type is rejected; EXIF is stripped; the size limit is enforced.
- Playwright: the home page renders a published demo edition server-side; the correction notice is visible; the archive page works.

Stop and summarise.
```

**Your checks:**
- Your analyst writes a real draft pick end to end in Arabic, then approves and publishes it as a demo edition.
- Then issue a correction and check that the notice is prominent.

**Commit:** `feat(editions): Editor's Pick workflow, approvals, revisions, home and archive`

---

### Step 12 — SEO, sitemap, Open Graph images, icons

```text
Step 12 of the Suhail build. Read these in full first:
- replit.md
- docs/DECISIONS.md: D-21, D-24
- docs/SUHAIL_BUILD_REFERENCE.md: §3.5, §4.1 (icons, which file where), §4.2a (dark status colours), §12 items 2 and 10, and §13.3 checks 3, 4 and 6

Goal: every public page can be indexed and shared properly, with Arabic first.

Requirements
1. Root metadata: metadataBase = SITE_URL; title template "%s | سهيل" (EN: "%s | Suhail"); default description from the brand positioning (§4.5); icons from Step 4.
2. Every public page has a canonical URL and alternates.languages (ar, en, x-default → ar). Verify the home, methodology, edition and stock pages.
3. src/app/robots.ts:
   - SITE_MODE=preview → disallow everything;
   - live → allow, but disallow /admin, /account, /auth and /api (and their /en variants), and point to the sitemap.
4. src/app/sitemap.ts (dbPublic):
   - the home page (ar, en);
   - /terms and /privacy;
   - /methodology and every public methodology page;
   - every published_live edition;
   - every /stock/[slug] whose security is public AND whose latest run is under a production_enabled methodology version.
   Each entry carries hreflang alternates and lastModified. Exclude demo data and every example-methodology page from the sitemap.
5. Open Graph images:
   a. SPIKE FIRST. Render a 1200×630 test image with next/og (ImageResponse) containing "متوافق على الأرجح" and "سهيل", using IBM Plex Sans Arabic loaded from a TTF committed to src/assets/fonts/ (include the OFL licence file). Save the PNG and attach it to your summary.
   b. If the Arabic letters are disconnected, reversed or mis-ordered, implement a fallback with @resvg/resvg-js, whose text shaping supports Arabic, using the same font, and attach that PNG too.
   c. If neither renders correct Arabic, STOP and report before going further.
   d. Then build stock and edition OG images:
      - Night background; mark-seal-small; company name and ticker;
      - the status label with its icon in the §4.2a dark colours;
      - methodology version label and data date;
      - the "سهيل · Suhail" lockup;
      - Arabic layout on Arabic URLs and English on /en.
      Cache them like the pages. Each image must be under 300 KB.
6. Twitter card: summary_large_image.
7. Check that the manifest and icons are correct (§12 item 10 fixed) and that no Base44 asset URL exists anywhere.

Tests
- Playwright:
  - meta tags per page type;
  - the OG image route returns 200 image/png under 300 KB;
  - robots.txt for both modes;
  - sitemap.xml is valid XML, includes a production-methodology stock (create one in the test database) and excludes demo and example pages.
- A visual snapshot test of the Arabic OG image (pixel diff tolerance) to catch shaping regressions.

Stop and summarise, with the spike images attached.
```

**Your checks:**
- Look at the spike PNGs yourself. Arabic shaping is the risk in this step.
- Paste a dev stock URL into WhatsApp (or a link-preview checker) and confirm the preview is specific to that stock.

**Commit:** `feat(seo): canonical/hreflang, robots, sitemap, Arabic OG images`

---

### Step 13 — Security hardening, preview mode, Cloudflare

Set `SITE_MODE=preview`, the preview basic-auth pair and `REVALIDATE_SECRET` first.

```text
Step 13 of the Suhail build. Read these in full first:
- replit.md
- docs/DECISIONS.md: D-20, D-24, D-40
- docs/SUHAIL_BUILD_REFERENCE.md: §3.4, §12 item 1, §13.1 (security headers row) and §13.3 checks 5, 8 and 9

Goal: production-grade protection, with the whole site private until launch.

Requirements
1. The proxy.ts chain, in order:
   a. Preview gate: when SITE_MODE=preview, HTTP basic auth on every route except /api/health and /api/internal/revalidate, using a constant-time comparison. Add X-Robots-Tag: noindex, nofollow on every response.
   b. next-intl routing.
   c. /auth, /account and /admin: Supabase session refresh and the nonce CSP (from Step 5).
2. Headers, via next.config headers() for public routes and the proxy for admin:
   - Strict-Transport-Security: max-age=63072000; includeSubDomains (add preload only after the domain is final);
   - X-Content-Type-Options: nosniff;
   - Referrer-Policy: strict-origin-when-cross-origin;
   - Permissions-Policy denying camera, microphone, geolocation, payment and usb;
   - X-Frame-Options: DENY and CSP frame-ancestors 'none';
   - Cross-Origin-Opener-Policy: same-origin.
   CSP per D-40:
   - public (static):
     - default-src 'self';
     - script-src 'self' 'unsafe-inline';
     - style-src 'self' 'unsafe-inline';
     - img-src 'self' data: plus the PUBLIC_MEDIA_BASE_URL origin;
     - font-src 'self';
     - connect-src 'self' plus NEXT_PUBLIC_SUPABASE_URL (the header's account control, D-51);
     - object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';
   - admin, account and auth pages (nonce): script-src 'nonce-…' 'strict-dynamic', and connect-src including the Supabase URL. form-action must also allow the Supabase URL and https://accounts.google.com, so the OAuth redirect works.
3. POST /api/internal/revalidate:
   - the body is { paths: string[] };
   - X-Signature = HMAC-SHA256(REVALIDATE_SECRET, timestamp + "." + body) and X-Timestamp; reject skew above 300 s and compare in constant time;
   - accept only public paths (/, /en, /stock/*, /en/stock/*, /methodology*, /editions/*) and call revalidatePath for each;
   - rate-limited. Best-effort on Autoscale (D-20).
4. Rate limiting: an in-memory token bucket per instance in the proxy for /api/* (Cloudflare is the main layer). It returns 429 with Retry-After.
5. Error pages: not-found.tsx and error.tsx per locale, showing no stack traces and no internal identifiers. The global error boundary logs server-side only.
6. Route inventory test: enumerate every route handler, page and server action file. Assert each one is in a committed allowlist (src/security/route-inventory.ts) with its access level (public, internal-hmac, user, admin, editor). A new route fails the test until it is classified (§13.3 #5).
7. Client-bundle secret scan: scripts/scan-bundle.mjs searches .next/static and the server-reference manifests for "sk-ant", "sb_secret", "service_role", "postgres://", "postgresql://", "DATABASE_URL", "S3_SECRET", "REVALIDATE_SECRET" and AWS-style secret key patterns. It fails CI on any hit (§13.3 #9). Add it to CI after the build.
8. CI: add "pnpm audit --prod --audit-level high" as a non-blocking step that reports findings.
9. Logging: a small structured logger (pino) for jobs and server code. Never log secrets, tokens, raw auth cookies or full request bodies.

Tests
- Preview gate: 401 without credentials, 200 with them, and health always 200.
- Every header is present on a public page and on an admin page; the admin CSP contains a nonce.
- Revalidate: wrong signature → 401; stale timestamp → 401; non-public path → 400.
- The route inventory and the bundle scan pass.

Stop and summarise, plus the list of manual Cloudflare settings I need, based on the final header set.
```

**Your checks, and the manual Cloudflare setup (O-5):**
1. Point the domain's DNS to Cloudflare. Add the Replit custom domain (Step 14), first with the DNS record set to **DNS only** so Replit can verify it and issue its certificate.
2. Once verified, switch the record to **Proxied**. Set SSL/TLS to **Full (strict)**.
3. Turn on the WAF managed rules and Bot Fight Mode. Add a rate-limiting rule for `/api/*`.
4. Add a cache rule that bypasses the cache for `/admin*` and `/en/admin*`.
5. Run `curl -sI https://<domain>` and confirm the headers.

**Commit:** `feat(security): preview gate, headers/CSP, HMAC revalidate, route inventory, bundle scan`

---

### Step 14 — Deployments and the scheduled weekly job

```text
Step 14 of the Suhail build. Read these in full first:
- replit.md
- docs/DECISIONS.md: D-20, D-23, D-41
- docs/SUHAIL_BUILD_REFERENCE.md: §3.3

Goal: a deployable web app plus one resumable weekly job.

Requirements
1. src/jobs/weekly.ts orchestrates, in order:
   ingest-sec → screen-universe → explain-runs → revalidate.
   - Each phase uses its job_run cursor and resumes.
   - A Postgres advisory lock (pg_try_advisory_lock) prevents overlapping runs: if the lock is held, exit 0 with a log line.
   - JOB_BATCH_SIZE (default 100) and JOB_MAX_MINUTES (default 50): when the time budget is close, finish the current batch, save the cursor and exit 0 with "partial", so the next run continues.
   - The final revalidate phase calls SITE_URL/api/internal/revalidate with an HMAC signature, for the home page and every stock page whose latest run changed in this job.
   - Exit codes: 0 for ok or partial, 1 for failure. Write a job summary row.
2. Bundle the jobs with esbuild: scripts/build-jobs.mjs → dist/jobs/weekly.js (platform node, target node22, bundled, sourcemaps on). The script is pnpm build:jobs. Add it to CI.
3. Configure .replit for an Autoscale deployment:
   - build: pnpm install --frozen-lockfile && pnpm build
   - run: pnpm start
   - health check path /api/health
4. Write docs/DEPLOY.md with the exact settings for:
   a. the web app (Autoscale): build and run commands, the secrets list (never SUPABASE_SECRET_KEY; D-48), the custom domain, the Supabase and Google redirect URLs for the domain, and the min/max instances you recommend for Phase 0;
   b. the jobs app (Scheduled; D-41):
      - build: pnpm install --frozen-lockfile && pnpm build:jobs
      - run: node dist/jobs/weekly.js
      - schedule: cron "0 6 * * 6", timezone Asia/Riyadh (Saturday 06:00, after the US week closes)
      - job timeout 60 minutes
      - the same secrets as the web app
   c. the release order: run migrations (pnpm db:migrate with DATABASE_URL_MIGRATIONS, from the workspace shell, never at app start), then deploy web, then deploy jobs;
   d. rollback: redeploy the previous build. Migrations must be backward-compatible for one release (expand, then contract).
5. Migrations never run automatically at web start-up.

Tests
- A unit test of the orchestrator with mocked phases: the order is right; the lock blocks a second run; the time budget produces "partial" and a saved cursor; a failure in one phase records the error and exits 1.
- CI builds dist/jobs/weekly.js.

Stop and summarise.
```

**Your checks:**
1. Publish `suhail-web` as **Autoscale** with the settings from `docs/DEPLOY.md`.
2. Create `suhail-jobs`: Import from GitHub, same repo. Set the same secrets, then publish it as **Scheduled**. If Replit allows both deployment types in one app, skip the second app and record that in `DECISIONS.md` against D-41.
3. Trigger the job once by hand and read its `job_run` rows.

**Commit:** `feat(ops): weekly job orchestrator, bundling, deployment docs`

---

### Step 15 — Live-check script and launch-gate tooling

```text
Step 15 of the Suhail build. Read these in full first:
- replit.md
- docs/DECISIONS.md: D-24, D-26, D-27
- docs/SUHAIL_BUILD_REFERENCE.md: all of §13.3

Goal: the §13.3 release checks, automated, plus a launch-gate check.

Requirements
1. scripts/live-check.ts (pnpm live-check -- --base <url> [--basic-auth user:pass] [--stock <slug>]) runs checks 1–12 of §13.3 against a deployed URL and prints a PASS/FAIL table with evidence. Notes per check:
   - #1–3: fetch without JavaScript.
   - #4: robots.txt and sitemap.xml, with the expectations for the current mode.
   - #5: every route in the route inventory, called without a session.
   - #6 / #6a / #6b: Playwright computed styles. Fonts, colours from the token list, Arabic line-height about 1.9, no font-weight ≥ 600 on Arabic body paragraphs, numerals in Plex Mono in tables, status colours only on status elements.
   - #6c and #7: banned register, star/navigation metaphors and old branding, searched in the rendered text of every sitemap page plus the home and methodology pages.
   - #8: response headers.
   - #9: fetch the JS chunks referenced by the page and scan them with the Step 13 patterns.
   - #10: call a new admin-only CLI, pnpm verify-run <runId>, through the workspace (document that this check runs from the workspace, not over HTTP).
   - #11: run the validator test suite.
   - #12: browser console errors on the home page and a stock page.
2. scripts/launch-gate.ts (pnpm launch-gate) FAILS unless all of these hold:
   - at least one methodology version is production_enabled, is not internal_example, and is the default in settings;
   - no message value in ar.json or en.json contains "⟦AR-REVIEW⟧", and no Arabic engine template does;
   - no file in content/legal/ contains "⟦LEGAL-REVIEW⟧" (D-49);
   - no is_demo = true rows are reachable through dbPublic;
   - SITE_URL is https and not a replit.dev / repl.co host;
   - live-check passes against SITE_URL.
   It prints each failing condition.
3. Add a GitHub Actions workflow, live-check.yml (workflow_dispatch with an input URL), so the checks can be run against preview or live.

Stop and summarise with a sample run against the preview deployment.
```

**Your checks:** run `pnpm live-check` against the preview deployment, and fix what fails before you continue.
**Commit:** `feat(qa): automated §13.3 live checks and launch gate`

---

## Gate G1 — Load the verified Al Rajhi / Awaied methodology

Nothing goes live until this gate passes (D-10). It is mostly data entry by the analyst through the Step 6 admin. Agent is involved only if the document needs something the engine cannot express.

**Before you start:**
- Get the official Al Rajhi / Awaied criteria document (O-1). Record its title, publisher, URL or reference, and date.
- Confirm the licensing status for describing it publicly.
- If its ratios use **market cap** (and especially averaged market cap), settle O-4: either a licensed end-of-day price feed, or a universe small enough for manual closes (D-08).

**G1.1 — Gap check (Agent, Plan mode, no code changes).** Paste the criteria into the prompt as plain text. Do not ask Agent to search for them.

```text
Do not change any code in this task.

Read replit.md, docs/DECISIONS.md (D-06, D-08, D-10, D-11, D-44), docs/SUHAIL_BUILD_REFERENCE.md §7 and §8, and src/engine/.

Below is the verified Al Rajhi / Awaied screening criteria text, supplied by the founder. Treat it as the only source. Do not add, assume or "correct" any rule.

<<< PASTE THE CRITERIA TEXT HERE >>>

Produce a table with one row per rule in the text:
- the rule as written;
- the criterion_type it maps to;
- numerator and denominator line items;
- threshold, unit, direction and borderline margin (or "none stated");
- treatment rules (what counts as interest-bearing debt, cash, receivables, prohibited activities, and whether leases count);
- whether the current engine and line items support it. If not, state exactly what is missing: for example a new line item, an averaged market cap over N months, a different primary-activity rule, or a purification formula.

Then list every ambiguity in the text as a question for the analyst. Stop.
```

**G1.2 — Engine additions, only if G1.1 found gaps.** Run one prompt per gap, in this shape:

```text
Implement this engine capability for the verified methodology: <gap from the G1.1 table>.

Rules:
- Thresholds and categories stay in methodology data, never in code.
- Add the evaluator or line item, map it in src/ingest/sec/mapping.ts if it comes from SEC data (bump CALCULATION_VERSION), and add tests that mirror the existing engine tests.
- Do not change the behaviour of existing evaluators. All existing golden hashes must still match, except where CALCULATION_VERSION legitimately changes them; list those cases.

Stop and summarise.
```

**G1.3 — Entry and governance (analyst and admin, in the Step 6 admin):**
1. Create the methodology:
   - official_or_inspired: `official` or `adapted`, as the document allows;
   - licensing_status: set it;
   - fill in the source URL, verified_by and verification_date.
2. Create version 1.0 and enter the criteria exactly as in the G1.1 table.
3. Write version-specific test cases from worked examples. The document's own examples are best; otherwise construct them by hand.
4. Walk the workflow: source verified → rules normalised → tests passed → universe tested.
5. Read the impact report together, then record the review and the approval.
6. Enable production, and set it as the default in Settings.
7. Run the weekly job once by hand. Spot-check 5 stocks against the document by hand.

---

## Launch gate

Switch to `SITE_MODE=live` only when every item below is true.

- [ ] G1 is complete, and the Al Rajhi version is the default production methodology.
- [ ] `pnpm launch-gate` passes. That covers: no AR-REVIEW markers, no reachable demo data, an https custom domain, and live-check green.
- [ ] Arabic disclaimers (§11), Arabic status labels (§7.1), Arabic status-reason templates and all UI copy reviewed by a qualified Arabic writer (O-3). The legal disclaimer has legal review.
- [ ] The first Editor's Pick has been published through the full approval flow with a real analyst profile (headshot, name, credentials).
- [ ] Copy register: an analyst and a second reader have read every public page type against §4.6.
- [ ] Trademark position checked (§4.5: SAIP, the Arabic word and the star device).
- [ ] Legal advice received on data residency and PDPL, because user accounts store personal data (O-6). If the data must stay in Saudi Arabia, move hosting before launch (reference §2).
- [ ] Terms of Use and Privacy Policy written in Arabic first and legally reviewed, and their versions set (O-7, D-49).
- [ ] Google sign-in branding verified, with the production domain added to Supabase redirect URLs and to Google's authorised domains.
- [ ] If any methodology uses market cap: price data is licensed for public display, or every close is manually sourced (D-08, O-4).
- [ ] The Replit budget cap is set; the Anthropic spend limit is set; Supabase backups are on (PITR if the plan allows).
- [ ] Cloudflare is proxied with Full (strict), WAF and rate limiting, and `curl -sI` shows every header.


**Right after switching to live:** verify the domain in Google Search Console and Bing Webmaster Tools, submit `sitemap.xml`, and run `pnpm live-check` against the live URL. While in preview, robots.txt disallows indexing, so this can't happen earlier.

---

## Part C — Later: sign-in with a mobile number (WhatsApp OTP)

Run this after launch, or before it if there's time. It needs O-8 answered: the WhatsApp/SMS provider and a registered sender (for Meta, an approved "authentication" message template).

**Manual setup first:**
1. Supabase → Auth → Providers: turn **Phone** on.
2. Supabase → Auth → Hooks → **Send SMS hook**: set it to HTTPS, URL `https://<domain>/api/hooks/send-otp`. Copy the generated secret into the secret `SEND_OTP_HOOK_SECRET`.
3. Add the provider credentials as secrets, e.g. `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_TEMPLATE_NAME`, plus the SMS fallback provider's keys.
4. Turn on Supabase CAPTCHA protection with Cloudflare Turnstile, and review the OTP rate limits (SMS costs money).

```text
Part C of the Suhail build: mobile-number sign-in with WhatsApp OTP and SMS fallback. Read these in full first:
- replit.md
- docs/DECISIONS.md: D-46, D-49, D-50, D-51, D-52, D-53, O-8

Requirements
1. Sign-in page: add "Continue with mobile number" below the Google button.
   - Phone input in E.164, with +966 preselected and a country selector limited to the allowlist in src/auth/phone-countries.ts (ask me for the list).
   - Then a 6-digit code screen with resend (respecting the 60 s limit) and a "send by SMS instead" link.
   - Uses signInWithOtp({ phone, options: { captchaToken } }) and verifyOtp({ phone, token, type: 'sms' }).
   - Cloudflare Turnstile widget. Allow its script and frame origins in the auth-page CSP only.
   - The same consent line, and the same callback logic: app.users upsert, role user, consent_recorded, user_registered.
2. POST /api/hooks/send-otp:
   - Verify the Standard Webhooks signature (standardwebhooks package, secret SEND_OTP_HOOK_SECRET with the "v1,whsec_" prefix removed). Reject on failure.
   - Read user.phone and sms.otp. Never log the OTP or the full phone number (mask it to the last 3 digits).
   - Send through an OtpSender interface: first WhatsApp (the provider chosen in O-8, using the approved authentication template in Arabic, or English for users whose locale_pref is en); if WhatsApp delivery fails or the number is not on WhatsApp, fall back to SMS. A "prefer SMS" flag passed from the resend link may skip WhatsApp: store it short-lived, keyed by a hash of the phone, never the OTP.
   - Return 200 with an empty body on success, or the error JSON shape from the Supabase docs.
   - Add the route to the route inventory as internal-signed. Rate-limit it.
3. Account page: show the phone for phone users. Optionally, "Add mobile number" for Google users via updateUser({ phone }) plus OTP verification. Show both sign-in methods when the identities are linked.
4. Bump the privacy-policy version (phone numbers are now collected), so existing users re-consent (D-49).
5. Never assume an email: audit rows, the admin Users page and the CLIs must handle phone-only users (D-52). admin:grant also accepts --phone.

Tests
- Hook: a bad signature → 401; a valid one → the sender is called with the right template and locale; WhatsApp failure → SMS fallback; the OTP never appears in the logs (capture and assert).
- E2E with the Supabase test OTP numbers (configure test phone numbers in Supabase): full phone sign-in creates a user and consent rows.
- The phone-only user path through the account page and account deletion.

Stop and summarise, including the provider-side setup I still need to finish.
```

---

## Appendix A — What each part of the reference became

| Reference | Where it's built |
| --- | --- |
| §1 principles | Engine (Step 3), verdict page (9), AI validator (10) |
| §2 decisions | DECISIONS.md, preview mode (13), launch gate; user accounts brought into Phase 0 by D-45 (Step 5) |
| §3.1–3.2 stack and portability | Steps 1, 2, 5; replit.md "Never" list |
| §3.3 deployments | Step 14, D-41 |
| §3.4 security | Steps 2 (RLS), 5 (auth), 13 (hardening) |
| §3.5 SEO | Steps 9 and 12 |
| §3.6 payments | Not in Phase 0 |
| §4 brand | Step 4; OG images in 12 |
| §5.2 routes | Steps 6, 9, 11; admin in 5–8 and 11 |
| §5.3 stock page | Step 9 (live market data dropped, D-04) |
| §6 data model | Step 2 (scoring tables deferred, D-02) |
| §7 engine | Steps 3 and 8 |
| §8 fixtures | Step 2 seeds; G1 for production |
| §9 editions | Step 11 (Editor's Pick only, D-02) |
| §10 AI | Step 10 (English only, D-26); §10.2–10.3 in Phase 1 with the AI picks |
| §11 copy | Step 4 messages; launch gate for the Arabic |
| §12 defects | Each one is closed in Steps 2, 4, 5, 9, 12 and 13 |
| §13.3 live check | Step 15 |

---

## Appendix B — Recovery prompts

**Agent drifted from the rules:**
```text
Stop. Re-read replit.md (the "Never" and "Always" lists) and docs/DECISIONS.md. List every change in this task that breaks one of them, with file and line, and propose the minimal fix for each. Do not apply fixes until I confirm.
```

**Agent invented behaviour:**
```text
You added behaviour that docs/SUHAIL_BUILD_REFERENCE.md and docs/DECISIONS.md do not specify: <describe it>. Revert it. If the feature needs a decision, write it as a question for me instead.
```

**Self-review before commit:**
```text
Review the diff of this step as a strict senior reviewer. Check:
- security: auth on every server action, RLS assumptions, no secrets client-side;
- determinism: no Date.now() or randomness in the engine or the hash;
- copy register;
- RTL and logical CSS;
- missing tests.
Output the findings ranked by severity, with file:line. Do not change code.
```

**A test is failing and Agent wants to change the test:**
```text
Do not change the test's expected values. Explain why the implementation produces a different result, citing the reference section the test encodes. If you believe the test is wrong, say why and stop.
```

