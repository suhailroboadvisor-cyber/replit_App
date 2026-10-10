import "server-only";
import { z } from "zod";
import { blankToUndefined, parseEnv } from "./shared";

const authEnvSchema = z.object({
  // Required: authentication project URL.
  NEXT_PUBLIC_SUPABASE_URL: z.url(),
  // Required: browser-safe anon key.
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  // Optional for the app; required by workspace CLI only, never deployment (D-48).
  SUPABASE_SECRET_KEY: z.preprocess(
    blankToUndefined,
    z.string().min(1).optional(),
  ),
});

export function getAuthEnv() {
  return parseEnv("Authentication", authEnvSchema);
}
