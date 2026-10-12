---
name: Next route type caches
description: Distinguishing stale generated validator failures from application type errors after route changes.
---

Check generated route validators before changing source code to fix post-merge missing-page or missing-layout errors.

**Why:** Next.js maintains separate build and development route types. Both can be included in TypeScript checking, and generating fresh build types alone does not remove stale development validators. Moving routes under locale layouts can therefore leave references to removed root routes.

**How to apply:** When the missing imports originate in generated validators, refresh both generated type directories and run Next's type generation before checking TypeScript. Keep strict checking enabled; do not exclude route validators to hide stale-cache failures.
