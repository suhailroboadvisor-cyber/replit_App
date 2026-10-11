export class AuthError extends Error {
  constructor(public status: 401 | 403 | 409 | 400 | 502 | 503, public code: string) { super(code); }
}
export type ActionResult = {ok: true} | {ok: false; error: string; status: number};
export function actionError(error: unknown): ActionResult {
  if (error instanceof AuthError) return {ok: false, error: error.code, status: error.status};
  // Never expose provider/DB diagnostics to users.
  console.error("Account action failed");
  return {ok: false, error: "operation_failed", status: 500};
}
