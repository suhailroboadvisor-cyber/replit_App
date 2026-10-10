import { defineConfig } from "drizzle-kit";
import { databaseUrl } from "./src/db/connection-url";

const needsConnection = process.argv.some((arg) =>
  ["studio", "migrate", "push", "pull"].includes(arg),
);
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/*.ts",
  out: "./drizzle",
  schemaFilter: ["app"],
  ...(needsConnection
    ? { dbCredentials: { url: databaseUrl("DATABASE_URL_MIGRATIONS") } }
    : {}),
});
