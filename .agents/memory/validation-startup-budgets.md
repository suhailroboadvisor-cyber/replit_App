---
name: Validation startup budgets
description: Avoid false test failures from cold tooling startup under concurrent validation.
---

Separate heavyweight tooling initialization from behavioral test timeout budgets.

**Why:** Completion validation runs multiple checks concurrently. A cold Next/TypeScript ESLint configuration load exceeded the ordinary five-second assertion budget even though the same boundary suite passed when run independently.

**How to apply:** Initialize expensive lint/test tooling in suite setup with an explicit startup budget; retain normal assertion timeouts. Do not weaken assertions or raise every test's timeout to hide cold-start contention.
