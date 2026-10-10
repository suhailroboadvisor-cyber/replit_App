import { databaseUrl } from "../../src/db/connection-url";

export const LOCAL_TEST_DATABASE_URL =
  "postgresql://postgres@127.0.0.1:55432/suhail_test";
export const LOOPBACK_HOSTS = ["localhost", "127.0.0.1", "[::1]"];

export function testDatabaseUrl(): string {
  const url =
    process.env.DATABASE_URL_TEST === undefined
      ? LOCAL_TEST_DATABASE_URL
      : databaseUrl("DATABASE_URL_TEST");
  // D-78: integration tests never run on a Supabase project.
  if (!LOOPBACK_HOSTS.includes(new URL(url).hostname))
    throw new Error(
      "DATABASE_URL_TEST must use loopback and disposable plain PostgreSQL 17, never Supabase. " +
        "Start pnpm db:test:up and unset DATABASE_URL_TEST to use its local default.",
    );
  return url;
}
