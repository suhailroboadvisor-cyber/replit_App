# Suhail — Decision Log

Decisions taken on 9 Oct 2026, after `SUHAIL_BUILD_REFERENCE.md` v1.1. They extend the reference. Where the two conflict, this file wins because it is newer. Where neither covers something, ask the founder before building it.

Each decision has a stable ID; the numbers are not in date or section order. Code comments, migrations and pull requests cite the ID (e.g. `// D-08`).

---

## Scope

| ID | Decision |
| --- | --- |
| D-01 | **Phase 0 market is US equities** (NASDAQ and NYSE). Saudi (Tadawul) comes later. The UI stays Arabic-first (reference §2). |
| D-02 | **Phase 0 weekly edition = Editor's Pick only** (1–2 analyst calls per week). The 4 AI picks, the factor/scoring engine and its tables (`CandidateEvaluation`, `FactorResult`, `ScoreDefinition`, `ScoreModelVersion`, `ScoreResult`, `MarketUniverseSnapshot`) are **Phase 1**. They are not built or migrated in Phase 0. `Pick.slot_key` and `Pick.pick_type` stay so Phase 1 can add AI slots without a breaking change. |
| D-03 | **Screening universe is a curated list** kept by admins (add a ticker → it is ingested and screened). Phase 0 has no automatic whole-market ingestion. |
| D-04 | **No live prices in Phase 0.** The live-quote block of the stock page (§5.3 "Market data") is not built. |
| D-45 | **Public user accounts ship in Phase 0.** This overrides reference §2's "no accounts for end users". Registration and sign-in are one "Continue with Google" step. A signed-in user gets an **account page only**: profile, language preference, delete account. No content is gated, and every verdict page, methodology page and edition stays public. Accounts are groundwork for subscriptions (reference §3.4 entitlements, Phase 1). Watchlists, alerts and portfolios are still out of scope. |

## Data

| ID | Decision |
| --- | --- |
| D-05 | **Financial-statement figures come from the SEC EDGAR XBRL API** (`companyfacts`, `submissions`, `company_tickers_exchange.json`). Every figure is stored with a `Source` row naming the filing (form, accession number, filed date, URL). A value read from one XBRL tag gets `input_state = reported`, tier `Verified`. A value summed from several tags gets `input_state = derived`, tier `Calculated`, and the mapping goes in `mapping_note`. |
| D-06 | **The XBRL → line-item mapping is a versioned config file** (`src/ingest/sec/mapping.ts`). Any change to it bumps `calculation_version`. `interest_bearing_investments` cannot be proven interest-bearing from XBRL alone: it is ingested as `estimated` / `Estimated` until an analyst confirms it from the filing notes. |
| D-07 | **Segments and activity categories are entered by the analyst** from the 10-K segment note, in the admin. `activity_category` is never inferred from a SIC code, sector label or AI (reference §7.2). Until a segment is classified it stays `unclassified`, and the engine returns `unknown` for it. |
| D-08 | **Prices go through a `PriceProvider` interface.** The Phase 0 implementation is `manual`: an admin enters a close, its date and its source. It is used for Editor's Pick starting prices and for market cap (shares outstanding from SEC `dei:EntityCommonStockSharesOutstanding` × close; `derived`, weakest tier wins). If the verified Al Rajhi methodology uses market-cap denominators and the universe is too large for manual entry, a licensed end-of-day provider whose licence allows public display becomes a launch requirement. Revisit at gate G1. |
| D-09 | **Analyst corrections never edit a fact in place.** An override inserts a new `FinancialFact` with its own `Source` (`source_type = internal` or the filing note) and a reason, and supersedes the earlier one. The earlier fact remains for audit. |

## Methodology

| ID | Decision |
| --- | --- |
| D-10 | **The Al Rajhi / Awaied criteria document has not been sourced yet.** EX-A and EX-B (reference §8) are seeded as fixtures (`is_demo = true`, `official_or_inspired = internal_example`). Nothing can be production-enabled until gate G1 in the build guide is complete. Thresholds are never typed from memory or from third-party summaries. |
| D-11 | **Methodology versions and criteria can be edited only while `workflow_status = draft`.** A database trigger rejects edits after that. A change means a new version. |
| D-12 | **Impact and test reports are stored rows** (`methodology_version_report`: `kind` = `impact` or `test`, `payload` jsonb, author, time; append-only). They satisfy the production gate in reference §7.5. An approval is recorded on the version (`approved_by`, `approved_at`) and as an `AuditEvent` of type `approval_recorded`. |
| D-42 | **Status reasons are stored as structured objects** (`screening_run.status_reasons` jsonb: kind, criterion id and label, ratio, threshold, reason code). Each locale renders them at display time from deterministic templates (reference §7.3), so Arabic never depends on translating stored English. |
| D-43 | **Every screening run stores its canonical hash payload** (`screening_run.hash_payload` jsonb, the exact object hashed in reference §7.4). A run can then be re-verified later (reference §13.3 check 10) even after facts or segments change. |
| D-44 | **Lease liabilities are stored as separate line items** (`finance_lease_liabilities`, `operating_lease_liabilities`) and are **not** folded into `interest_bearing_debt`. Whether they count is a methodology rule, so the verified Al Rajhi document decides at G1. Also added: `shares_outstanding` (SEC `dei` cover-page value, with its as-of date). |
| D-13 | **Business-activity criterion with no segment disclosure recorded:** the unknown has severity `review`, not `blocking`. The reference (§7.2) does not say. Change it if the founder decides otherwise. |

## Platform

| ID | Decision |
| --- | --- |
| D-14 | **Supabase** for Postgres, Auth and Storage. Auth covers everyone (D-45 to D-51): Google sign-in with sign-ups on, and the email/password provider off. Storage is used through its **S3-compatible endpoint** with `@aws-sdk/client-s3`, so it stays portable. The app never uses `supabase-js` for data, only for auth. The deployed app never holds a Supabase service-role/secret key; the only use of one is the workspace CLI in D-48. |
| D-15 | **All app tables live in a Postgres schema named `app`**, which is **not** exposed through the Supabase Data API (PostgREST). This keeps reference §12 defect 1 (open data API) from coming back. |
| D-16 | **Database roles:** `suhail_public` (SELECT only, and only what RLS policies allow: published, public rows); `suhail_app` (read/write for admin actions and jobs, but no UPDATE/DELETE on append-only tables); migrations run as `postgres`. Every table has RLS enabled. Public pages connect as `suhail_public`. Admin server actions, signed-in users' account actions and jobs connect as `suhail_app`, and account actions only ever touch the session user's own row. |
| D-17 | **Append-only tables:** `screening_run`, `screening_criterion_result`, `screening_unknown`, `explanation_object`, `audit_event`, `edition_revision`, `editorial_approval`, `methodology_version_report`. Enforced by grants and by a trigger that raises on UPDATE/DELETE. |
| D-18 | **Drizzle ORM** with `drizzle-kit`. Migrations are generated, reviewed and committed. An applied migration is never edited. |
| D-19 | **Next.js 16+ App Router**, Node 22 LTS, pnpm, TypeScript strict. `proxy.ts` (not `middleware.ts`). Classic ISR (`export const revalidate`), with `cacheComponents` off in Phase 0. |
| D-20 | **Caching on Autoscale:** instances do not share the Next.js cache, so public pages use time-based revalidation (`revalidate = 900`). The job's call to `/api/internal/revalidate` is best-effort. No Redis cache handler in Phase 0. |
| D-21 | **i18n:** `next-intl`, `localePrefix: 'as-needed'`, `localeDetection: false` (no redirects based on the browser language, so URLs stay canonical and cacheable). Arabic is the default with no prefix; English lives under `/en`. All numbers and dates are formatted with `ar-u-ca-gregory-nu-latn` / `en-US` (Gregorian calendar, Western digits; reference §4.3). Plain `ar-SA` is never used, because it defaults to the Hijri calendar. |
| D-22 | **Theme is dark-first:** dark by default, light derived from it. The user's choice is kept in `localStorage` and applied by a tiny inline script before paint. Public pages never read cookies or headers, so they stay ISR-cacheable. |
| D-23 | **Scheduled job** = one bundled entry (`dist/jobs/weekly.js`) that ingests, screens, explains and then revalidates. It works in batches of 100, records a resumable cursor in `job_run`, and is idempotent: if a run's computed hash equals the latest stored hash for the same security and version, no new run is inserted and the job logs "unchanged". |
| D-40 | **Security headers are split by surface.** Public ISR pages get a fixed CSP (`default-src 'self'`; `script-src 'self' 'unsafe-inline'`, because static pages cannot carry a per-request nonce; `object-src 'none'`; `base-uri 'self'`; `form-action 'self'`; `frame-ancestors 'none'`). Admin pages are dynamic and get a strict nonce-based CSP (`'nonce-…' 'strict-dynamic'`). Revisit if public pages ever render user-supplied HTML. |
| D-41 | **Two Replit apps from one GitHub repo**, unless Replit lets one app hold both deployment types: `suhail-web` (development with Agent, plus the Autoscale deployment) and `suhail-jobs` (pulls `main`; Scheduled deployment only). Both have the same secrets. |
| D-24 | **Pre-launch mode:** `SITE_MODE=preview` puts every public route behind HTTP basic auth, sends `X-Robots-Tag: noindex`, and serves a robots.txt that disallows everything. `SITE_MODE=live` is set only after the launch gate. |

## Accounts and sign-in

| ID | Decision |
| --- | --- |
| D-46 | **Phase 0 sign-in = Google only**, through Supabase Auth (redirect flow; no Google scripts loaded on our pages). One page, `/auth/sign-in`, handles both registration and sign-in. The first callback creates the `app.users` row with `role = user`; the upsert is idempotent. |
| D-47 | **Admins and editors are not invited.** They register as ordinary users with Google, and an existing admin promotes them in the admin's **Users** page (`user` → `editor` / `admin`, audited). A promoted user must enrol **TOTP** before entering `/admin`, which requires the admin/editor role **and** AAL2. The first admin is bootstrapped with the CLI `pnpm admin:grant <email> admin`. The last remaining admin cannot be demoted. |
| D-48 | **Lost authenticator (admins):** the workspace-only CLI `pnpm admin:reset-mfa <email>` removes the user's TOTP factors through the Supabase Admin API. It uses `SUPABASE_SECRET_KEY`, which is set only in the workspace shell and never in any deployment's secrets. |
| D-49 | **Consent:** the sign-in page shows "By continuing you agree to the Terms and the Privacy Policy" with links, before the Google button. On first sign-in (and whenever a policy version changes) the user's acceptance is recorded: `terms_version`, `privacy_version` and `accepted_at` on `app.users`. A user with an outdated acceptance sees a re-consent screen before the account page. `/terms` and `/privacy` are public pages whose content comes from versioned files in the repo (Arabic first), supplied by the founder (O-7). |
| D-50 | **Self-service account deletion** on the account page, with typed confirmation. It deletes the `auth.users` row through a `SECURITY DEFINER` Postgres function `app.delete_own_account(uuid)` (owned by `postgres`, EXECUTE granted only to `suhail_app`), called after the server has verified the session user equals the id. The `app.users` row cascades away, and `created_by` references are set to null. Admins must be demoted before they can delete their account. An audit event records the user id only, with no email (minimal personal data). |
| D-51 | **Public pages stay ISR-cacheable with accounts.** The header's sign-in / account control is a small client component that reads the session in the browser (`@supabase/ssr` browser client). Server-side session refresh runs in `proxy.ts` only for `/auth/*`, `/account*` and `/admin*`, in both locales. The public CSP's `connect-src` adds the Supabase URL. Avatars are initials only (no Google image host). `/account`, `/auth` and `/admin` are `noindex` and disallowed in robots.txt. |
| D-52 | **Mobile-number OTP comes later**, with **WhatsApp** as the preferred channel. It is built on Supabase phone auth with the **Send SMS hook** pointing at our own signed endpoint (`/api/hooks/send-otp`, Standard Webhooks signature), which sends through the chosen provider: WhatsApp Business (Meta Cloud API authentication template, or Twilio), with SMS fallback (a Saudi provider such as Unifonic/Taqnyat, or Twilio). The provider is open (O-8). Phase 0 code must not assume email is always present on a user, so phone-only users fit later. |
| D-53 | **Audit event types added** to the reference §6 enum: `user_registered`, `user_role_change`, `user_mfa_reset`, `user_account_deleted`, `consent_recorded`. |

## AI

| ID | Decision |
| --- | --- |
| D-25 | **Anthropic API with our own key.** The model id comes from env `LLM_MODEL`, temperature 0. Every call stores model, `prompt_version` (a column added to `explanation_object`), validation status and details. |
| D-26 | **Phase 0 generates English explanations only**, using reference §10.1 verbatim. Arabic pages show structured evidence only until an Arabic prompt and an Arabic forbidden-word list have been written and approved by a person (reference §10.1). Status reasons (§7.3) are deterministic templates in both languages; the Arabic templates carry a review marker until approved. |
| D-27 | **The editor's text is checked against the banned-register list** (reference §4.6 and §10.4). Hard-banned terms block publishing; other matches show as warnings in the editor. |

## Data-model additions (beyond reference §6)

| ID | Addition | Why |
| --- | --- | --- |
| D-28 | `job_run` (job name, status, cursor, counts, errors, timings) | Resumable, observable scheduled jobs |
| D-29 | `analyst_profile` (user id, name AR/EN, title AR/EN, credentials, headshot object key, bio AR/EN, active) | Brand §4.4: real names, headshots and credentials on all research |
| D-30 | `company.name_ar`, `company.description_ar`, `company.description_en` | Arabic-first pages for US issuers |
| D-31 | `security.slug` (unique, e.g. `nasdaq-aapl`), `security.in_universe`, `security.coverage_analyst_id`, `security.coverage_started_at` | Readable URLs (§5.2), curated universe (D-03), coverage flag for the seal |
| D-32 | `methodology.slug`, and an `is_public` flag on methodology versions | `/methodology/[slug]` and RLS |
| D-33 | Editor's Pick text fields in two languages: `*_ar` required, `*_en` optional. On `/en`, a missing English field falls back to Arabic with an "Arabic only" note | Arabic-first content |
| D-34 | `methodology_version_report` | See D-12 |
| D-35 | `app.users.id` = Supabase `auth.users.id`; `role` enum `admin` / `editor` / `user` (default `user`); `email` and `phone` both nullable (D-52); `full_name`, `locale_pref` (`ar` / `en`), `terms_version`, `privacy_version`, `accepted_at`, `last_sign_in_at` | Reference §3.4, D-45 to D-52 |
| D-36 | View `app.public_settings` exposing only `default_shariah_methodology_version_id` to `suhail_public` | Public pages need the default version without reading `EditorialSetting` |

## Provisional decisions (build them this way; the founder can change them)

| ID | Decision |
| --- | --- |
| D-37 | **"Covered"** means an analyst has been assigned to the security in the admin (`coverage_analyst_id` set). The seal shows only when the security is covered **and** its latest status is `passes_selected_methodology` (reference §4.2). |
| D-38 | **Approvals:** the stages are `qa` → `editorial` → `publish`. One person may approve more than one stage while the team is small. Every approval is recorded with its approver. |
| D-39 | **Discovery:** reference §5.2 has no search or stock-index page. In Phase 0, stock pages are reached through editions, the sitemap and search engines. Add a `/stocks` index only if the founder asks for one. |

## Open — ask the founder before the affected step

| ID | Question | Blocks |
| --- | --- | --- |
| O-1 | The verified Al Rajhi / Awaied criteria document (thresholds, ratios, numerators, denominators, treatment rules, purification) | Gate G1, and therefore launch |
| O-2 | Which US stocks, and how many, are in the launch universe? | Step 7 seed list; the D-08 price decision |
| O-3 | Who writes and reviews the Arabic disclaimers (§11), the Arabic status-reason templates, and later the Arabic AI prompt? | Launch gate |
| O-4 | Is a licensed end-of-day price feed needed (see D-08), and from which provider? | Gate G1 |
| O-5 | Domain (`suhail.sa`) and Cloudflare account ready? | Step 13 |
| O-6 | Legal advice on data residency and Saudi PDPL obligations (reference §2). Phase 0 now stores personal data (D-45), so this is needed before launch | Launch gate |
| O-7 | Terms of Use and Privacy Policy text, Arabic first, with legal review | Launch gate (D-49) |
| O-8 | WhatsApp/SMS OTP provider: Meta WhatsApp Cloud API, Twilio, or a Saudi provider (Unifonic, Taqnyat), plus a sender registration | The later phone-OTP step (D-52) |

## Clarifications from Step 0

| ID | Clarification |
| --- | --- |
| D-55 | **Phase 0 editions contain the Editor's Pick only** (D-02). Omit AI/scoring-only columns from `Edition`: `universe_snapshot_id`, `universe_size`, `eligible_count`, `scored_count`, `excluded_count`, `score_model_version_id`, `score_model_version_label` and `ai_model`. Omit these fields from `Pick`: `why_selected`, `total_score`, `lens_score`, `factor_breakdown`, `score_model_version_label`, `lens_key`, `lens_description` and all `research_*` fields. Keep `Pick.slot_key` and `Pick.pick_type`. Phase 1 adds the omitted fields in its own migration. |
| D-56 | **Public user accounts ship in Phase 0.** D-45 supersedes reference §2; account scope is as set out in D-45 to D-53. |
| D-57 | **Omit the entire market-data section from the stock page.** A manually entered close appears only where used: as a pick's starting price, and inside the derived `market_cap` fact in the Fundamentals table, with its source. |
| D-58 | **The licensed end-of-day price-provider decision is deferred to gate G1** (D-08, O-4), after the verified methodology establishes whether market cap is a denominator and the launch-universe size is known (O-2). |
| D-59 | **D-42 replaces the reference's `array<string>` status reasons.** `status_reasons` is structured `jsonb`, rendered per locale. |
| D-60 | **Email is nullable from Phase 0** (D-35), so later phone-only users require no schema migration. |
| D-61 | **An undisclosed business-activity unknown remains severity `review`** (D-13) until the founder decides otherwise. |
| D-62 | **Store finance and operating lease liabilities separately and exclude both from `interest_bearing_debt` until gate G1 decides their treatment** (D-44). |
| D-63 | **AI explanations are deferred until after launch** (referenced by the founder as D-54); this supersedes D-26's Phase 0 generation timing. Arabic pages show structured evidence only. |
| D-64 | **O-1 remains open:** the founder must supply the verified Al Rajhi / Awaied criteria document. It does not block Steps 1–6. |
| D-65 | **O-2 remains open:** the founder must choose the US launch stocks and universe size. It does not block Steps 1–6. |
| D-66 | **O-3 remains open:** the founder must assign Arabic disclaimer, status-reason and later AI-prompt writing/review. It does not block Steps 1–6. |
| D-67 | **O-4 remains open:** the founder must decide whether a licensed end-of-day price feed is needed and select a provider at gate G1. It does not block Steps 1–6. |
| D-68 | **O-5 remains open:** the founder must confirm the `suhail.sa` domain and Cloudflare readiness. It does not block Steps 1–6. |
| D-69 | **O-6 remains open:** the founder must obtain legal advice on data residency and Saudi PDPL obligations. It does not block Steps 1–6. |
| D-70 | **O-7 remains open:** the founder must supply Arabic-first Terms of Use and Privacy Policy text with legal review. It does not block Steps 1–6. |
| D-71 | **O-8 remains open:** the founder must select the later WhatsApp/SMS OTP provider and arrange sender registration. It does not block Steps 1–6. |
| D-72 | **Methodology approvals:** `methodology_version.approval_id` references `audit_event`, whose event type must be `approval_recorded`, alongside `approved_by` and `approved_at`. |
| D-73 | **Historical ID arrays:** Use `uuid[]` for source_ids and revision picks_added/changed/retained and other actual ID arrays, without FKs. Add GIN indexes on uuid[] columns used in RLS. Validate every referenced ID exists in application code at insert time and test that validation. Key/label arrays remain text arrays, not UUID arrays. |
| D-74 | **Source visibility/privacy:** Public sources must be referenced by a publicly readable fact, segment, period, criterion result, pick or public methodology version. Use column-level grants excluding source.notes and any other internal-only column; document the public source column allowlist. |
| D-75 | **Bilingual editor content:** AR/EN pairs for thesis, why-now, valuation context and conflict disclosure; Arabic required for editor picks and English optional. Evidence is an array of objects `{ claim_ar, claim_en, source_id, value }`. Risks are risks_ar text[] required for editor picks and risks_en text[] optional. Author identity/email remain unlocalized. |
| D-76 | **Deletion without historical mutation:** On all append-only tables and methodology_version/methodology_criterion, user-reference columns (created_by, approver, publisher, actor and similar IDs) are plain UUIDs without FKs, with a comment on each explaining D-50. Mutable tables retain user FKs with ON DELETE SET NULL. Do not weaken immutability triggers. End-user audit events user_registered/consent_recorded/user_account_deleted store user ID only, never email. |
| D-77 | **Public email privacy:** No public SELECT privilege on any email column. Specifically exclude pick.editor_author_email, edition.published_by_email, edition_revision.created_by_email and every other *_email column in public tables. Test each exclusion individually as suhail_public. |
| D-78 | **Integration tests use plain PostgreSQL 17; Supabase compatibility is verified by applying migrations to the real project plus a connection smoke test.** Integration tests run only on disposable plain PostgreSQL 17 locally in the workspace and in the CI service container, never on a Supabase project. Keep the harness's `auth.users` stub logic unchanged. |

## Founder-approved Step 3 clarifications

| ID | Decision |
| --- | --- |
| D-79 | **Zero or negative denominators create a blocking unknown**, with the exact explanation "denominator is zero or negative; ratio undefined; no value assumed". An explicit failure elsewhere still takes precedence. |
| D-80 | **Tied largest primary segments:** if any tied primary segment has a prohibited category, the business-activity result is `unknown` with severity `review` and the exact explanation "primary activity tied between segments", not `fail`. All-permissible primary ties pass. Unclassified primary segments retain D-13's review-unknown handling. This replaces the earlier tied-primary fail choice. |
| D-81 | **Every input segment must supply `confidenceTier`**, used for weakest-tier criterion evidence (Verified > Calculated > Estimated > AI Interpretation). Do not include segment confidence tiers in the hash: reference §7.4's payload field list remains exact. |
| D-82 | **Ignore and untrack `attached_assets/` while retaining all local files.** Remove currently tracked uploads from the Git index without deleting local copies or rewriting Git history. |
| D-83 | **Malformed or contradictory engine contracts throw typed `EngineInputError`, never a screening result.** Reject duplicate fact line items, segment names within a period and criterion IDs; malformed dates; non-finite numbers; non-integer or nonpositive staleness limits; and unknown enum values. Real-world data gaps yield unknowns instead. Step 8 catches this error, records it in `job_run` for that security and inserts no run. Unsupported criterion types retain §7.2's blocking-unknown evaluator fallback. |
| D-84 | **Unknown-state evidence is unavailable regardless of supplied numbers.** For segments, `inputState = unknown` makes both amount and share unavailable; the same rule applies to facts. |
| D-85 | **Never guess the primary segment.** If a missing share cannot be derived because any amount is unavailable or summed amounts are zero or negative, business activity returns `unknown` with severity `review`. |
| D-86 | **Empty evidence:** an empty numerator or denominator line-item list on a ratio criterion throws `EngineInputError` (Step 6 admin also blocks it). Non-permissible revenue with no segments returns `unknown` with severity `review` and explanation "no segment disclosure recorded", never an assumed zero. |
| D-87 | **`requiredInputs` is descriptive metadata only.** Evaluator formulas (line-item lists, segments, staleness) determine used inputs, evaluation and quality. Extra required-input metadata never changes evaluation, adequacy or confidence. Step 6 derives it from line items automatically. |
| D-88 | **Missing versus unknown quality:** retain `missing` in criterion input states, but treat it like `unknown` for adequacy and confidence (at least `adequate_with_estimates`, confidence `Low`). This intentionally reads §7.1's "unknown" as including "missing". A reported, derived or estimated fact with a null value is contradictory and throws `EngineInputError`; ingestion stores absent values as `unknown` with null, so the contradiction signals a bug. |
| D-89 | **Hash completeness overrides D-81's segment-tier exclusion and §7.4's original field allowlist.** Include each segment's `confidence_tier`: displayed criterion tiers are stored evidence, and D-23 must not skip changed evidence. Audit and include every other output-affecting input: `as_of`, resolved `staleness_limit_days`, `financial_period_end`, methodology/period labels, and criterion label, numerator/denominator definitions, source reference and sort order. Hash complete criterion evidence, unknowns and structured status reasons as well as aggregate outputs so evidence-only changes cannot be skipped. Keep canonical numeric precision and prescribed array ordering unchanged; preserve historic payload verification. Regenerate all golden hashes. The expanded hash format advances the engine version to `engine-1.0.1`; calculation rules and `calc-2026.10.1` remain unchanged. |
| D-90 | **Extend EX-A golden coverage with five evidence cases:** prohibited primary activity → fail; estimated input → pass with `adequate_with_estimates` / `Medium`; period age 551 days → `requires_review` / `Medium`; missing numerator → `requires_review` / `Low` (D-88); tied primaries including a prohibited category → `requires_review` (D-80). Retain the existing eight EX-A/EX-B cases and 100% production-engine branch coverage. |

## Founder-approved Step 6 governance

| ID | Decision |
| --- | --- |
| D-97 | **Production enablement is separate from workflow status.** Keep the stored status `approved` and set `production_enabled` separately, with `methodology_version_production_enable` audit evidence and a history entry identifying the enablement operation. This reconciles reference §7.5's final production step with D-93's required approved state; no D-93 prerequisite is relaxed and the default methodology is not changed implicitly. |
| D-98 | **Shared engine regressions and candidate tests are distinct.** Run the unchanged EX-A/EX-B golden fixtures as shared engine regressions alongside saved analyst cases against the candidate's own criteria. Example thresholds and expected outcomes never apply to unrelated methodologies. Shared goldens never satisfy candidate criterion coverage. |
| D-99 | **Impact comparisons use latest annual evidence.** Evaluate baseline and candidate against identical current facts and matching-period segments from each security's latest annual financial period, never quarterly or mixed-period evidence. Missing or unusable evidence and absent baselines are explicit; an empty universe records “no securities”. |
| D-100 | **Mandatory analyst-case criterion coverage.** Across candidate-specific cases, every candidate criterion identity needs matched, successfully executed expected/actual pass and fail outcomes, and a borderline outcome whenever its margin is non-null, including zero. Declared expectations, aggregate status and shared goldens do not count. Empty suites and unreachable outcomes remain blocking gaps, not exemptions. Persist and display uncovered criterion IDs/labels and missing outcomes even when refusing `tests_passed`. |

## Founder-required database connection boundary

| ID | Decision |
| --- | --- |
| D-91 | **Fail closed on every application/public/migration/seed connection; never use Replit Database.** The named URL must exist, be a valid PostgreSQL URL, and contain an explicit username, host and nonzero port. Outside tests, hosts must end with `.pooler.supabase.com`; usernames start with `suhail_app.`, `suhail_public.` or `postgres.` for app, public and migrations respectively. Before the first app/public business query, verify `select current_user` equals `suhail_app` / `suhail_public`; failure closes and permanently refuses that client, including concurrent calls and transactions. Only explicit test scope permits the existing loopback hosts; `DATABASE_URL_TEST` is always loopback-only (D-78). Never inherit connection identity/destination/password/database from generic `DATABASE_URL` or `PG*`. Pass explicit parsed driver options, use an explicit empty password when omitted, and use the explicit username as PostgreSQL's conventional database default when no database path is provided. Reject URI startup/connection overrides; permit only secure `sslmode=require` / `verify-full` declarations without forwarding them. Retain lazy imports/builds, TLS outside disposable tests and unprepared queries. Do not expose credentials in refusal errors. This decision does not authorize provisioning, detaching, deleting, or migrating any external database. |

Test scope relaxes only the destination and disposable-server TLS requirements, never runtime role verification. Reject encoded or whitespace host syntax before URL normalization so the boundary is consistent across Node versions.

## Pre–Step Six security hardening

| ID | Decision |
| --- | --- |
| D-92 | **Fail closed on engine contract and arithmetic errors.** New screening accepts only the implemented engine/calculation versions, at least one criterion, finite nonnegative margins, and finite sums/ratios. Segment shares are fractions in `[0,1]`, never percentages. The founder-approved six-decimal rounding envelope is half a unit at the sixth decimal per disclosed share: complete totals may differ from one only by the accumulated envelope, and a share must agree with a complete positive revenue basis within its own envelope. This permits thirds stored as `0.333333`, not arbitrary contradictory shares. Unknown/missing evidence remains unavailable (D-84/D-85); nonpositive denominators remain blocking unknowns (D-79), and unsupported evaluators retain D-83's unknown fallback. These refusals do not change verification of historical hash payloads. Persisted non-null segment shares also have a `[0,1]` SQL constraint. |
| D-93 | **Enforce production methodology prerequisites in SQL, not just a future admin UI.** Demo/internal EX-A/EX-B methodologies, demo versions, and demo/synthetic/internal sources acquire a permanent `production_blocked` provenance latch; relabelling cannot clear it. Enabled parents/versions require verified non-demo HTTPS source metadata, a matching genuine methodology-document reference, same-version non-demo impact/test reports, and a same-version approval event whose actor matches the recorded approver. Cross-table statement triggers prevent enabling invalid records or removing prerequisites from enabled ones; prerequisite writes are serialized and require READ COMMITTED. **Why:** a REPEATABLE READ snapshot can remain stale after an advisory-lock wait, defeating a cross-table check. The migration refuses invalid pre-existing enabled state rather than silently demoting it. Existing content immutability and audit rules remain; all eight append-only tables additionally refuse owner-level TRUNCATE, including CASCADE. This is a metadata-integrity gate, not proof that a document was genuinely reviewed and not a new approval workflow. |
| D-94 | **Verify Supabase TLS trust and hostname for every non-test database connection.** `SUPABASE_DB_CA_CERT` is an explicit PEM CA bundle, required at connection time for app/public/migration/seed/DrizzleKit credentials. Reject absent, malformed, non-CA, not-yet-valid or expired certificates; require certificate-chain and hostname verification with the parsed URL hostname as SNI. Caller settings cannot downgrade verification. The only TLS exemption is the existing disposable loopback test scope. Imports, schema generation and builds remain credential-free/lazy. D-91's URL/role boundary and Session 5432 versus Transaction 6543 modes remain unchanged. The public CA configuration is not a password, private key or service-role secret; supply it separately in each intended environment and rotate before expiry. |
| D-95 | **Private-path and authorization controls must survive encoded paths and alternate imports.** Decode private roots/locales before classification; malformed escapes fail closed with private no-store/noindex/nonce-CSP headers. Strip spoofed private/nonce/CSP request headers; ordinary public routes stay cookie-free and cacheable. Consent acceptance/decline, recovery and sign-out redirect to configured `authOrigin()`, not Host/forwarded headers. Verified TOTP users entering enrollment go to localized verification with a safe next destination; enrollment remains available only when needed and authorization stays intact. Scan all App Router handlers (including root, JavaScript and route groups) and nested inline server actions for the canonical first guard. Only individually documented authentication-bootstrap handlers have full-source-content-pinned exceptions; a changed handler requires review, never a directory exemption. Public database/job import restrictions cover relative and alias paths and the actual private admin route group. |

D-93 additionally requires `workflow_status = approved` and at least one criterion
before a version qualifies for production. Approval metadata on a mutable draft
or empty version is insufficient. Content and criteria remain immutable after
finalization, with explicit production-enabled checks as defense in depth.
Criterion TRUNCATE cannot bypass finalized-rule immutability; criterion writes
participate in the same serialized production-prerequisite gate.

| ID | Decision |
| --- | --- |
| D-96 | **Founder-approved Arabic UI wording.** The founder approved all wording in the seven-group headings/labels review: sign-in and consent, account/profile, authenticator setup/verification, administration/users, audit/settings, public controls/empty state, and the developer styleguide. The founder additionally approved the three authenticator-enrollment helper texts: the access requirement, manual setup instruction, and QR-unavailable fallback. Apply the exact approved strings, recorded in `src/i18n/approved-arabic.ts`, without review markers. This initial approval does not cover unlisted help/error messages, legal-document bodies, disclaimers, screening explanations, or future-screen labels; D-101 extends approval only to its explicitly selected rows. Keep markers on the remaining unapproved copy and retain the existing Arabic tagline. The deletion confirmation token remains literal `DELETE`. “غير المؤهلة” in the editor-pick setting means ineligible under the selected screening configuration, not a standalone religious verdict. **Founder-approved terminology amendment: Editions → `الأعداد`; weekly edition → `العدد الأسبوعي`.** This refers to editorial publications, not methodology/software versions (`إصدارات`). |

| ID | Decision |
| --- | --- |
| D-101 | **Founder-authorized Phase 2 Arabic copy application.** Apply the 87 approved rows from `docs/ARABIC_REVIEW.md` with the founder's exact edits recorded in its approval section: disclaimer short/full, methodology page note, both banners, all six marked styleguide rows, A-001–A-042, all 27 F-* audit codes, I-forbidden, all six engine templates and all 19 explanation substitutions (including edited `stale_data` and `primary_tied`). Remove markers only for these approved origins. Engine output shows no reason code; blocking/review unknowns render only field plus explanation, without duplicated “no value assumed” prose. Following the founder's formatting clarification, Arabic matches the unchanged English renderer: ratio to 2 decimals, threshold as configured with no forced decimals, `%` only for percent units, Western digits, `غير معروف` / `غير محدد` for null ratio/threshold. Preserve evidence, fixed §7.1 status labels, engine decisions and English output. Keep every J-methodologies-*, J-admin-* and J-nav-screen row marked until separately reviewed; legal bodies retain both markers pending O-7. Unknown future phrases and unapproved dynamic summaries remain marked. Retain literal `DELETE`. Edition audit labels use `إنشاء مسودة عدد`, `نشر عدد`, `مراجعة عدد`, `تغيير حالة عدد`; authenticator reset uses `إعادة تعيين تطبيق المصادقة لمستخدم`. This copy approval is not professional legal/religious approval, production enablement or resolution of O-7. |

| D-102 | **Public on-demand ISR and visibility integrity.** Builds must not require database credentials or database access, consistent with D-78/D-94. The public layout returns `[]` from `generateStaticParams`, keeps `setRequestLocale`, and uses classic ISR (`revalidate = 900`, `force-static`). All public locale pages generate on their first runtime request and cache successful renders; no parent locale enumeration may reintroduce build-time rendering. Public server pages read no request cookies/headers. Database reads throw on failure: failed first renders return uncached errors, and failed revalidation retains the last good page. Runtime public reads use the restricted public database role with verified TLS; CI never connects to Supabase. Production enablement requires a public version. Production-enabled or editorial-default versions cannot be unpublished; choose another default first. Service gates and migration `0007_methodology_visibility` enforce these invariants, including direct SQL and default-pointer writes serialized with D-93's advisory lock. The migration refuses existing visibility violations without editing data. |
