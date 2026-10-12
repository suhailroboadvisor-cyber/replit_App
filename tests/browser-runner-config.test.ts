import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("browser runner isolation", () => {
  it("owns a fresh loopback server instead of reusing an unknown one", async () => {
    vi.stubEnv("PLAYWRIGHT_BASE_URL", "");
    const { default: config } = await import("../playwright.config");
    expect(config.use?.baseURL).toBe("http://127.0.0.1:3100");
    expect(config.webServer).toMatchObject({
      reuseExistingServer: false,
      env: { PORT: "3100", PLAYWRIGHT_TEST_SERVER: "1" },
    });
  });

  it("runs the identical suite against an explicit preview without another server", async () => {
    vi.stubEnv("PLAYWRIGHT_BASE_URL", "https://preview.example.test");
    const { default: config } = await import("../playwright.config");
    expect(config.use?.baseURL).toBe("https://preview.example.test");
    expect(config.webServer).toBeUndefined();
    expect(config.use?.trace).toBe("retain-on-failure");
  });

  it("disables persisted compiler state only for the self-managed test server", async () => {
    vi.stubEnv("PLAYWRIGHT_TEST_SERVER", "1");
    const { default: testConfig } = await import("../next.config");
    expect(testConfig.experimental?.turbopackFileSystemCacheForDev).toBe(false);
    expect(testConfig.experimental?.authInterrupts).toBe(true);
    vi.resetModules();
    vi.stubEnv("PLAYWRIGHT_TEST_SERVER", "");
    const { default: previewConfig } = await import("../next.config");
    expect(previewConfig.experimental?.turbopackFileSystemCacheForDev).toBeUndefined();
    expect(previewConfig.experimental?.authInterrupts).toBe(true);
    expect(previewConfig.allowedDevOrigins).toEqual(testConfig.allowedDevOrigins);
  });
});
