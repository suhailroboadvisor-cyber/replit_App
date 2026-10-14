import { defineConfig } from "@playwright/test";

// Build first with the read-only public database available. Age only generated
// cache artifacts, then run with all database URLs absent to force read failures.
// This test server cannot connect to Supabase.
export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/methodology-isr.spec.ts",
  outputDir: "generated-artifacts/playwright-methodology-isr",
  timeout: 30000,
  workers: 1,
  use: { baseURL: "http://127.0.0.1:3400" },
  webServer: {
    command: "pnpm exec tsx tests/methodology-isr-age.ts && env -u DATABASE_URL_PUBLIC -u DATABASE_URL_APP -u DATABASE_URL_MIGRATIONS pnpm start",
    env: { PORT: "3400" },
    url: "http://127.0.0.1:3400/api/health",
    timeout: 60000,
    reuseExistingServer: false,
  },
});
