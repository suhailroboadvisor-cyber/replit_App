import "server-only";
import { z } from "zod";
import { parseEnv } from "./shared";

const authEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

export function getAuthEnv() {
  return parseEnv("Authentication", authEnvSchema);
}
