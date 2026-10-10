import postgres from "postgres";
import { databaseUrl } from "../../src/db/connection-url";
import { LOOPBACK_HOSTS, testDatabaseUrl } from "./test-target";

// Local, disposable PostgreSQL CI has no TLS. This exception never enters
// runtime clients and is restricted to loopback CLI/test hosts.
export function cliConnection(
  key: "DATABASE_URL_MIGRATIONS" | "DATABASE_URL_TEST",
) {
  const url =
    key === "DATABASE_URL_TEST" ? testDatabaseUrl() : databaseUrl(key);
  const hostname = new URL(url).hostname;
  return postgres(url, {
    prepare: false,
    max: 1,
    ssl: LOOPBACK_HOSTS.includes(hostname) ? false : "require",
    connect_timeout: 10,
    idle_timeout: 5,
  });
}
