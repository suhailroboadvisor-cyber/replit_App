import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/production.spec.ts",
  outputDir: "generated-artifacts/playwright-production",
  use: { baseURL: "http://127.0.0.1:3200",launchOptions:{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE} },
  webServer: {
    command: "pnpm start",
    url: "http://127.0.0.1:3200/api/health",
    env: { PORT: "3200" },
    timeout: 120_000,
    reuseExistingServer: false,
  },
});
