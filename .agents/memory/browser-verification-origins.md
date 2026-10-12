---
name: Browser verification origins
description: Keep loopback-runner results separate from the proxied preview when diagnosing browser hydration failures.
---

Compare the browser origin before attributing hydration or repeated-reload failures to a UI change.

**Why:** loopback development browser checks repeatedly reloaded and left client controls disabled, while the same UI in the proxied Replit preview hydrated and worked. Reducing concurrency did not resolve the loopback failure; its cause was not established.

**How to apply:** record which origin each check exercised. Verify the actual preview independently when the runner fails, and report both results honestly. A passing proxied check does not mean the separate loopback suite passed. Investigate the runner without weakening authentication or CSP to make it green.
