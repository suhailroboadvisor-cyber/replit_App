import "server-only";
import { z } from "zod";
import { parseEnv } from "./shared";

const dbEnvSchema = z.object({
  DATABASE_URL_PUBLIC: z.url({ protocol: /^postgres(?:ql)?$/ }),
  DATABASE_URL_APP: z.url({ protocol: /^postgres(?:ql)?$/ }),
  DATABASE_URL_MIGRATIONS: z.url({ protocol: /^postgres(?:ql)?$/ }),
});

export function getDbEnv() {
  return parseEnv("Database", dbEnvSchema);
}
