import { cliConnection } from "../../scripts/db/connection";

// Migrations intentionally create NOLOGIN roles. This disposable loopback-only
// harness exercises a real public login, rather than bypassing identity checks.
if (process.env.NODE_ENV !== "test") throw new Error("Stock browser setup is test-only");
const client = cliConnection("DATABASE_URL_TEST");
try { await client.unsafe("alter role suhail_public login"); }
finally { await client.end(); }
