---
name: WebKit browser verification
description: Engine-specific executable isolation and native dependency requirements for trustworthy phone checks.
---

Phone compatibility checks must run the actual browser engine, not just a mobile user agent. Keep Chromium and WebKit executable overrides separate, and use a WebKit build matching the installed Playwright version.

**Why:** A global Chromium override can accidentally launch the wrong executable for an iPhone project. Chromium touch emulation is not evidence of Safari compatibility.

**How to apply:** Assert and record the running browser engine in touch tests. Prefer the standard versioned Playwright installation on supported CI hosts. Report physical-device Safari checks separately from automated WebKit results.
