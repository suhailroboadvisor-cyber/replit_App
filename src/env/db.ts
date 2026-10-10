import "server-only";
import { z } from "zod";
import { parseEnv } from "./shared";

const dbEnvSchema = z.object({
  DATABASE_URL_PUBLIC: z.string().min(1),
  DATABASE_URL_APP: z.string().min(1),
  DATABASE_URL_MIGRATIONS: z.string().min(1),
});

export function getDbEnv() {
  return parseEnv("Database", dbEnvSchema);
}
