---
name: Live screening versus example fixtures
description: Founder boundary between local example-based tests and live financial research.
---

Example methodologies are local integration fixtures, not authority for screening
live securities. Preview site mode does not make real data a test dataset.
Until a real production-enabled version exists, live bulk screening must do
nothing and say “No production methodology to screen with”.

**Why:** The founder explicitly distinguished permitted local integration examples
from live screening and required a no-op before production-methodology approval.

**How to apply:** Preserve this boundary when extending screening jobs, defaults
or launch flows. Do not infer production approval from public visibility or
the preview environment.
