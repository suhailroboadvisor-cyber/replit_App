import "server-only";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import { databaseUrl } from "./connection-url";

export const runtimeOptions = {
  prepare: false,
  ssl: "require",
  max: 3,
  idle_timeout: 20,
  connect_timeout: 10,
} as const;
export function lazyRuntimeClient(
  key: "DATABASE_URL_PUBLIC" | "DATABASE_URL_APP",
) {
  const create = () =>
    drizzle(postgres(databaseUrl(key), runtimeOptions), { schema });
  let client: ReturnType<typeof create> | undefined;
  // No environment reads or connections during module import / Next build.
  return new Proxy({} as ReturnType<typeof create>, {
    get(_target, property) {
      client ??= create();
      const value = Reflect.get(client, property);
      return typeof value === "function" ? value.bind(client) : value;
    },
  });
}
