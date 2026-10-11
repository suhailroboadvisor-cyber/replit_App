---
name: Next dev test locks
description: Why the preview workflow and Playwright's self-managed server cannot run concurrently.
---

Pause the preview workflow before running Playwright with its self-managed Next.js development server, then restore the workflow afterward.

**Why:** Next.js 16's development-server lock is scoped to the project directory, not to the port. A preview server and a Playwright server in the same repository conflict even when they use different ports.

**How to apply:** When running the existing end-to-end configuration, stop the main workflow, execute the smoke tests, and restart the workflow afterward. Do not interpret the development lock error as an application failure or change product code to work around it.

Also serialize production builds and development-browser runs in this repository.

**Why:** Although development output lives under `.next/dev`, a simultaneous production build can replace shared Next metadata while the dev server reads it, causing transient JSON parse failures and error pages.

**How to apply:** Finish `pnpm build` before starting Playwright's dev server. Unit tests and lints can run independently, but Next build and Next dev are not independent.
