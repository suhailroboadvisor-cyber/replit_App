#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."

CI=true pnpm install --frozen-lockfile
pnpm typecheck

# Migrations and seeds are intentionally not automatic: their target requires
# explicit verification and authorization, independent of merging code.
