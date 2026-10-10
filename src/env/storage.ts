import "server-only";
import { z } from "zod";
import { parseEnv } from "./shared";

const storageEnvSchema = z.object({
  STORAGE_S3_ENDPOINT: z.url(),
  STORAGE_S3_REGION: z.string().min(1),
  STORAGE_S3_BUCKET: z.string().min(1),
  STORAGE_S3_ACCESS_KEY_ID: z.string().min(1),
  STORAGE_S3_SECRET_ACCESS_KEY: z.string().min(1),
});

export function getStorageEnv() {
  return parseEnv("Storage", storageEnvSchema);
}
