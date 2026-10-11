import { describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { safeNext, localePath } from "../src/lib/auth/paths";
import { CURRENT_TERMS_VERSION, CURRENT_PRIVACY_VERSION } from "../src/lib/auth/policies";
vi.mock("server-only",()=>({}));
describe("safe OAuth destination",()=>{
  it.each(["https://evil.test","//evil.test","/%2fevil.test","/%252f%252fevil.test","/\\evil.test","/a/../admin","/auth/callback","/en/auth/sign-in","/\nevil.test"])("rejects %s",value=>expect(safeNext(value)).toBeNull());
  it.each(["/account","/en/admin/users?query=fixture","/"])("preserves %s",value=>expect(safeNext(value)).toBe(value));
  it("locale paths",()=>{expect(localePath("en","/")).toBe("/en");expect(localePath("ar","/account")).toBe("/account");});
});
it("policy Markdown versions match constants and retain launch blockers",()=>{
  for(const locale of ["ar","en"]) for(const kind of ["terms","privacy"]) {
    const file=readFileSync(`content/legal/${kind}.${locale}.md`,"utf8");
    expect(file).toContain(`version: ${kind==="terms"?CURRENT_TERMS_VERSION:CURRENT_PRIVACY_VERSION}`);
    expect(file.split("---\n")[2].trim()).toMatch(/^⟦LEGAL-REVIEW⟧/);
  }
});
it("runtime auth never parses a workspace secret or imports CLIs",()=>{
  expect(readFileSync("src/env/auth.ts","utf8")).not.toContain("SUPABASE_SECRET_KEY");
  expect(readFileSync("src/lib/auth/browser.ts","utf8")).not.toMatch(/SECRET|SERVICE_ROLE/);
});
