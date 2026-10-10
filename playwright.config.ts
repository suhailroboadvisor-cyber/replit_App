import { defineConfig, devices } from "@playwright/test";

// Playwright honors PLAYWRIGHT_BROWSERS_PATH automatically; browser installation
// is managed by the environment and must not be triggered by this project.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3100",
    ...devices["Desktop Chrome"],
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "pnpm dev",
    url: "http://127.0.0.1:3100/api/health",
    env: { PORT: "3100" },
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
