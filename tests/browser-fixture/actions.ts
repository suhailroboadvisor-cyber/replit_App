import type { ActionResult } from "../../src/components/accounts/types";

// Test-process state only. No database, provider or runtime server actions.
export const accountFixture = {
  calls: [] as { action: string; args: unknown[] }[],
  fail: false,
  async action(action: string, ...args: unknown[]): Promise<ActionResult> {
    this.calls.push({ action, args });
    return this.fail ? { ok: false, error: "fixture_failure" } : { ok: true };
  },
};

declare global {
  interface Window {
    accountFixture: typeof accountFixture;
  }
}
