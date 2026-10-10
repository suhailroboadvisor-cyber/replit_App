import "server-only";
import { z } from "zod";
import { parseEnv } from "./shared";

const secEnvSchema = z.object({
  SEC_USER_AGENT: z.string().min(1),
});

export function getSecEnv() {
  return parseEnv("SEC EDGAR", secEnvSchema);
}
