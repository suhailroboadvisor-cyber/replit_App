---
name: Supabase connection modes
description: Founder-required pooler routing and plain-PostgreSQL integration boundary.
---

Use Supabase's Session pooler for migrations and connection smoke tests, and its Transaction pooler for the app in this Replit project. Integration tests run only on disposable plain PostgreSQL 17 locally in the workspace and in the CI service container, never on a Supabase project. Keep the harness's `auth.users` stub logic unchanged.

**Why:** The user requested pooler routing because Supabase direct connections are IPv6-only by default, then explicitly restricted integration tests to plain PostgreSQL.

**How to apply:** Follow `docs/DECISIONS.md` and `docs/PHASE_ZERO_DATABASE.md`. Supabase compatibility is verified by applying migrations to the real project plus a connection smoke test, not by altering managed auth tables for integration tests.
