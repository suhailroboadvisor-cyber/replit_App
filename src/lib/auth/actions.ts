import "server-only";
import { eq, sql } from "drizzle-orm";
import { dbApp } from "../../db/app";
import { users } from "../../db/schema/accounts";
import { requireUser, requireRole, type Role } from "./guards";
import { type Tx } from "./audit";
// Recheck DB role inside the same transaction under the role-change serialization lock.
export async function withAdminAction<T>(roles: readonly Role[], work: (tx: Tx, user: typeof users.$inferSelect) => Promise<T>) {
  const verified = await requireRole(roles);
  return dbApp.transaction(async tx => {
    await tx.execute(sql`select pg_advisory_xact_lock(73501947)`);
    const [user] = await tx.select().from(users).where(eq(users.id, verified.identity.id));
    if (!user || !roles.includes(user.role)) {
      const {AuthError} = await import("./errors");
      throw new AuthError(403, "role_required");
    }
    return work(tx, user);
  });
}
export async function withUserAction<T>(work: (tx: Tx, user: typeof users.$inferSelect) => Promise<T>) {
  const verified = await requireUser();
  return dbApp.transaction(async tx => {
    await tx.execute(sql`select pg_advisory_xact_lock(73501947)`);
    const [user] = await tx.select().from(users).where(eq(users.id, verified.identity.id)).for("update");
    if (!user) {
      const {AuthError} = await import("./errors");
      throw new AuthError(401, "recovery_required");
    }
    const {currentConsent} = await import("./policies");
    if (!currentConsent(user)) {
      const {AuthError} = await import("./errors");
      throw new AuthError(403,"consent_required");
    }
    return work(tx, user);
  });
}
