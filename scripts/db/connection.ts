import { connectDatabase } from "../../src/db/connect";
import { testDatabaseUrl } from "./test-target";

// Local, disposable PostgreSQL CI has no TLS. This exception never enters
// runtime clients and is restricted to loopback CLI/test hosts.
export function cliConnection(
  key: "DATABASE_URL_MIGRATIONS" | "DATABASE_URL_TEST",
) {
  return connectDatabase(
    key,
    {
      prepare: false,
      max: 1,
      connect_timeout: 10,
      idle_timeout: 5,
    },
    key === "DATABASE_URL_TEST" ? testDatabaseUrl() : undefined,
  );
}
