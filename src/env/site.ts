import "server-only";
import { z } from "zod";
import { parseEnv } from "./shared";

const siteEnvSchema = z.object({
  SITE_MODE: z.enum(["preview", "live"]),
  SITE_URL: z.url(),
  REVALIDATE_SECRET: z.string().min(1),
  PREVIEW_AUTH_USERNAME: z.string().min(1),
  PREVIEW_AUTH_PASSWORD: z.string().min(1),
});

export function getSiteEnv() {
  return parseEnv("Site", siteEnvSchema);
}
