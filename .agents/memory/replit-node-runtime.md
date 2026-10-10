---
name: Replit Node runtime
description: Why selecting the Node 22 Replit module alone may not pin pnpm-run scripts.
---

Keep the pnpm project runtime on Node 22 and verify it independently of the shell's Node runtime.

**Why:** In this environment, selecting the Node 22 module made `node --version` report Node 22, while the pnpm executable still used a bundled Node 24 and reported an engine mismatch. Pinning pnpm's project runtime resolved the mismatch.

**How to apply:** When changing the Node module or package-manager configuration, check both `node --version` and `pnpm exec node --version`. Do not assume that matching the Replit module and package engines is sufficient for scripts.
