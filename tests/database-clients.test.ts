import { afterEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { databaseUrl } from "../src/db/connection-url";
import { cliConnection } from "../scripts/db/connection";
vi.mock("server-only", () => ({}));
const mocks = vi.hoisted(() => ({
  postgres: vi.fn(() => ({ fixture: true })),
  drizzle: vi.fn(() => ({ select: vi.fn(), execute: vi.fn() })),
}));
vi.mock("postgres", () => ({ default: mocks.postgres }));
vi.mock("drizzle-orm/postgres-js", () => ({ drizzle: mocks.drizzle }));
import { lazyRuntimeClient, runtimeOptions } from "../src/db/runtime-client";
import { dbPublic } from "../src/db/public";
import { dbApp } from "../src/db/app";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.clearAllMocks();
});
describe("database credential separation", () => {
  it("imports both server-only clients without requiring credentials or connecting", () => {
    expect(dbPublic).toBeDefined();
    expect(dbApp).toBeDefined();
    expect(mocks.postgres).not.toHaveBeenCalled();
    for (const file of [
      "src/db/public.ts",
      "src/db/app.ts",
      "src/db/runtime-client.ts",
    ])
      expect(readFileSync(file, "utf8")).toContain('import "server-only"');
  });
  it.each(["DATABASE_URL_PUBLIC", "DATABASE_URL_APP"] as const)(
    "lazily validates only %s, with TLS and small unprepared pool",
    (key) => {
      for (const other of [
        "DATABASE_URL_PUBLIC",
        "DATABASE_URL_APP",
        "DATABASE_URL_MIGRATIONS",
        "DATABASE_URL_TEST",
      ])
        vi.stubEnv(other, undefined);
      const db = lazyRuntimeClient(key);
      expect(mocks.postgres).not.toHaveBeenCalled();
      expect(() => db.select).toThrow(key);
      const fixtureUrl = "postgresql://role.example.test/database";
      vi.stubEnv(key, fixtureUrl);
      db.select();
      db.select();
      expect(mocks.postgres).toHaveBeenCalledExactlyOnceWith(
        fixtureUrl,
        runtimeOptions,
      );
      expect(runtimeOptions).toMatchObject({
        ssl: "require",
        prepare: false,
        max: 3,
      });
    },
  );
  it.each(["DATABASE_URL_MIGRATIONS", "DATABASE_URL_TEST"] as const)(
    "CLI %s requires no runtime credentials",
    (key) => {
      vi.stubEnv("DATABASE_URL_PUBLIC", undefined);
      vi.stubEnv("DATABASE_URL_APP", undefined);
      vi.stubEnv(key, "postgresql://postgres@127.0.0.1:5432/fixture");
      cliConnection(key);
      expect(mocks.postgres).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ ssl: false, max: 1, prepare: false }),
      );
      vi.stubEnv(key, "postgresql://remote.example.test/fixture");
      if (key === "DATABASE_URL_TEST") {
        mocks.postgres.mockClear();
        expect(() => cliConnection(key)).toThrow("never Supabase");
        expect(mocks.postgres).not.toHaveBeenCalled();
      } else {
        cliConnection(key);
        expect(mocks.postgres).toHaveBeenLastCalledWith(
          expect.any(String),
          expect.objectContaining({ ssl: "require" }),
        );
      }
    },
  );
  it("does not expose rejected credentials in validation errors", () => {
    vi.stubEnv("DATABASE_URL_APP", "private-invalid-fixture");
    expect(() => databaseUrl("DATABASE_URL_APP")).toThrow("DATABASE_URL_APP");
    expect(() => databaseUrl("DATABASE_URL_APP")).not.toThrow(
      "private-invalid-fixture",
    );
  });
  it("uses the local test default without migrations credentials", () => {
    vi.stubEnv("DATABASE_URL_TEST", undefined);
    vi.stubEnv("DATABASE_URL_MIGRATIONS", undefined);
    cliConnection("DATABASE_URL_TEST");
    expect(mocks.postgres).toHaveBeenCalledExactlyOnceWith(
      "postgresql://postgres@127.0.0.1:55432/suhail_test",
      expect.objectContaining({ ssl: false, max: 1, prepare: false }),
    );
  });
});
