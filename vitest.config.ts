import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    // Completion checks run alongside lint/typecheck/coverage. Bound workers
    // instead of weakening assertion timeouts under concurrent cold startup.
    maxWorkers: 2,
    include: ["src/**/*.test.ts", "tests/**/*.test.ts"],
    exclude: ["tests/**/*.integration.test.ts"],
    coverage: {
      provider: "v8",
    },
  },
});
