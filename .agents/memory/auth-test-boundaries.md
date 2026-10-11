---
name: Auth test isolation and legal acceptance
description: Keep privileged browser fixtures out of the runnable app; draft-policy acceptance cannot silently become final consent.
---

Keep mocked authentication in a separate test process or module-boundary test,
never in a runtime bypass flag or route in the actual application.

**Why:** This project requires live server verification and role+AAL2 even when
browser verification needs authenticated-state fixtures without real credentials.

**How to apply:** Test privileged UI states using isolated fixtures; explicitly
distinguish them from manual live Google/TOTP verification.

Approved substantive policies must receive new version identifiers when replacing
accepted draft policies.

**Why:** Legal placeholders are permitted during the build but are not approved
legal text; keeping the draft version would silently treat draft acceptance as
acceptance of different, approved terms.

**How to apply:** Update both locale documents and current constants together,
retain review markers until human approval, and let stale acceptance re-consent.
