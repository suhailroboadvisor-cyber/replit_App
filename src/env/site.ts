import "server-only";
import { z } from "zod";
import { blankToUndefined, parseEnv } from "./shared";

const siteEnvSchema = z
  .object({
    // Required: canonical site URL.
    SITE_URL: z.url(),
    // Optional: defaults to preview (D-24).
    SITE_MODE: z.preprocess(
      blankToUndefined,
      z.enum(["preview", "live"]).default("preview"),
    ),
    // Required in preview; optional in live: basic-auth username.
    PREVIEW_BASIC_AUTH_USER: z.preprocess(
      blankToUndefined,
      z.string().min(1).optional(),
    ),
    // Required in preview; optional in live: basic-auth password.
    PREVIEW_BASIC_AUTH_PASSWORD: z.preprocess(
      blankToUndefined,
      z.string().min(1).optional(),
    ),
  })
  .superRefine((env, context) => {
    if (env.SITE_MODE !== "preview") return;
    for (const name of [
      "PREVIEW_BASIC_AUTH_USER",
      "PREVIEW_BASIC_AUTH_PASSWORD",
    ] as const) {
      if (!env[name]) {
        context.addIssue({
          code: "custom",
          path: [name],
          message: "Required in preview mode",
        });
      }
    }
  });

export function getSiteEnv() {
  return parseEnv("Site", siteEnvSchema);
}
