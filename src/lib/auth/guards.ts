import "server-only";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { dbApp } from "../../db/app";
import { users } from "../../db/schema/accounts";
import { serverAuth } from "./server";
import { AuthError } from "./errors";
import { currentConsent } from "./policies";
import { localePath, safeNext } from "./paths";
export type Role = "user" | "editor" | "admin";
export async function verifiedIdentity() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) throw new AuthError(401,"sign_in_required");
  const auth = await serverAuth();
  const {data, error} = await auth.auth.getUser();
  if (error || !data.user) throw new AuthError(401, "sign_in_required");
  return {auth, identity: data.user};
}
export async function requireUser(options: {consent?: boolean} = {}) {
  const verified = await verifiedIdentity();
  const [user] = await dbApp.select().from(users).where(eq(users.id, verified.identity.id));
  if (!user) throw new AuthError(401, "recovery_required");
  if (options.consent !== false && !currentConsent(user)) throw new AuthError(403, "consent_required");
  return {...verified, user};
}
export async function requireMfaBootstrap() {
  const context = await requireUser();
  if (context.user.role === "user") throw new AuthError(403, "role_required");
  return context;
}
export async function requireRole(roles: readonly Role[] = ["admin", "editor"]) {
  const context = await requireUser();
  if (!roles.includes(context.user.role) || context.user.role === "user") throw new AuthError(403, "role_required");
  const factors = await context.auth.auth.mfa.listFactors();
  if (factors.error || !factors.data.totp.some(f => f.status === "verified")) throw new AuthError(403, "mfa_enroll_required");
  const assurance = await context.auth.auth.mfa.getAuthenticatorAssuranceLevel();
  if (assurance.error || assurance.data.currentLevel !== "aal2") throw new AuthError(403, "mfa_verify_required");
  return context;
}
async function pageGuard<T>(locale: string, next: string, check: () => Promise<T>): Promise<T> {
  try { return await check(); } catch (error) {
    if (!(error instanceof AuthError)) throw error;
    const destinations: Record<string,string> = {
      sign_in_required: "/auth/sign-in", recovery_required: "/auth/recover",
      consent_required: "/auth/consent", mfa_enroll_required: "/admin/mfa/enroll", mfa_verify_required: "/admin/mfa/verify",
    };
    const destination = destinations[error.code];
    if (destination) redirect(`${localePath(locale, destination)}?next=${encodeURIComponent(safeNext(next) ?? localePath(locale, "/"))}`);
    // A real 403 page rather than giving ordinary users an MFA bootstrap.
    const { forbidden } = await import("next/navigation");
    return forbidden();
  }
}
export async function requirePageUser(locale: string, next: string) {
  return pageGuard(locale, safeNext((await headers()).get("x-private-path"))??next, () => requireUser());
}
export async function requirePageRole(locale: string, next: string, roles: readonly Role[] = ["admin", "editor"]) {
  return pageGuard(locale, safeNext((await headers()).get("x-private-path"))??next, () => requireRole(roles));
}
export function requireMfaUser(locale: string, next: string) {
  return pageGuard(locale, next, requireMfaBootstrap);
}
export function requireConsentUser(locale: string, next: string) {
  return pageGuard(locale,next,()=>requireUser({consent:false}));
}
