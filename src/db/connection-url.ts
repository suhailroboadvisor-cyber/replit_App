import { z } from "zod";

export type DatabaseCredential =
  | "DATABASE_URL_PUBLIC"
  | "DATABASE_URL_APP"
  | "DATABASE_URL_MIGRATIONS"
  | "DATABASE_URL_TEST";
// Validate only the requested credential. CLI scripts never require runtime URLs.
export function databaseUrl(key: DatabaseCredential): string {
  const result = z
    .url({ protocol: /^postgres(?:ql)?$/ })
    .safeParse(process.env[key]);
  if (!result.success)
    throw new Error(
      `Database environment validation failed. Check variable name: ${key}`,
    );
  return result.data;
}
