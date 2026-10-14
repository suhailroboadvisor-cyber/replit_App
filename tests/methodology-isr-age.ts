import { utimesSync } from "node:fs";

// Test-only cache artifact preparation, never a database or source mutation.
// Age both locale HTML files beyond the real 900-second ISR interval.
const stale = new Date(Date.now() - 901_000);
for (const locale of ["ar", "en"]) {
  utimesSync(`.next/server/app/${locale}/methodology.html`, stale, stale);
}
