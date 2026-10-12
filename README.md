# Suhail

## Run

```sh
pnpm install
pnpm dev
```

## Test

```sh
pnpm typecheck
pnpm lint
pnpm lint:logical
pnpm test
pnpm test:e2e
```

### Foundation browser checks

Stop the preview workflow before running the self-managed loopback checks.
Do not run a Next build, production server, or another dev server concurrently:
Next's generated state and development lock belong to the repository, not a port.
The runner owns port 3100, refuses to reuse another server, and disables
Turbopack's persisted dev compiler cache only for its own server.

```sh
pnpm exec playwright test e2e/foundation.spec.ts
```

Restart the preview workflow afterward. To compare the **same six tests** against
the running Replit preview (without starting another server):

```sh
PLAYWRIGHT_BASE_URL="https://$REPLIT_DEV_DOMAIN" pnpm exec playwright test e2e/foundation.spec.ts
```

If the workspace uses managed Chromium, prefix either command with
`PLAYWRIGHT_CHROMIUM_EXECUTABLE="$(command -v chromium)"`. No browser install is
needed in that case; CI keeps its versioned Playwright browser.
Failures retain a Playwright trace; all foundation tests attach their origin,
document requests, browser errors and HMR connection metadata. Styleguide checks
also assert hydration and a single document load after the HMR handshake.
Preview and production compiler caching, CSP and authentication are unchanged.

## Build

```sh
pnpm build
pnpm start
```
