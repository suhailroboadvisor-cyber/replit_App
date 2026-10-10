import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
import { getDbEnv } from "../src/env/db";

afterEach(() => vi.unstubAllEnvs());

describe("lazy environment validation", () => {
  it("reports missing variable names only when the getter is called", () => {
    vi.stubEnv("DATABASE_URL_PUBLIC", undefined);
    vi.stubEnv("DATABASE_URL_APP", undefined);
    vi.stubEnv("DATABASE_URL_MIGRATIONS", undefined);
    expect(() => getDbEnv()).toThrow("DATABASE_URL_PUBLIC");
    expect(() => getDbEnv()).toThrow("DATABASE_URL_APP");
    expect(() => getDbEnv()).toThrow("DATABASE_URL_MIGRATIONS");
  });

  it("does not include rejected values in validation errors", () => {
    const rejectedValue = "invalid-private-value-fixture";
    vi.stubEnv("DATABASE_URL_PUBLIC", rejectedValue);
    vi.stubEnv("DATABASE_URL_APP", undefined);
    vi.stubEnv("DATABASE_URL_MIGRATIONS", undefined);
    try {
      getDbEnv();
      throw new Error("Expected environment validation to fail");
    } catch (error) {
      expect((error as Error).message).toContain("DATABASE_URL_PUBLIC");
      expect((error as Error).message).not.toContain(rejectedValue);
    }
  });
});
