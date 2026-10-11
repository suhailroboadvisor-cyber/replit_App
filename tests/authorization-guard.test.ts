import { describe, expect, it } from "vitest";
import { Project } from "ts-morph";
import { authorizationViolations, scanAuthorization } from "../scripts/authorization-guard";
const prefix=`import { requireRole } from "@/lib/auth/guards";`;
function check(code:string) {
  const p=new Project({useInMemoryFileSystem:true});
  return authorizationViolations(p.createSourceFile(`${process.cwd()}/src/app/api/fixture/route.ts`,code));
}
describe("AST authorization guard",()=>{
  it("guards every server action/API handler",()=>expect(scanAuthorization()).toEqual([]),20000);
  it.each([
    `${prefix} export async function GET(){await requireRole(['admin']); return read();}`,
    `${prefix} export async function GET(){try {const user=await requireRole(['admin']);return user;}catch {return null;}}`,
    `import { withUserAction } from "@/lib/auth/actions";export async function save(){return await withUserAction(async tx=>tx);}`,
  ])("accepts canonical first authorization %s",code=>expect(check(code)).toEqual([]));
  it.each([
    `${prefix} export async function GET(){return read();}`,
    `${prefix} export async function GET(){await read();await requireRole();}`,
    `${prefix} export async function GET(){if(true)await requireRole();return read();}`,
    `import { requireRole as guard } from "@/lib/auth/guards";export async function GET(){await guard();}`,
    `import { requireRole } from "@/lib/fake";export async function GET(){await requireRole();}`,
    `${prefix} const wrapper=async()=>requireRole();export async function GET(){await wrapper();}`,
    `${prefix} export const GET=async()=>{await requireRole();};`,
    `export { GET } from './unguarded';`,
    `${prefix} export async function GET(){const wrapper=()=>requireRole();await wrapper();return read();}`,
    `${prefix} export async function GET(requireRole){await requireRole();return read();}`,
    `import type { requireRole } from "@/lib/auth/guards";export async function GET(){await requireRole();}`,
    `${prefix} export async function GET(){try{await requireRole();}catch{}return read();}`,
    `${prefix} export async function GET(){try{await requireRole();}catch{return read();}}`,
    `${prefix} export async function GET(){try{await requireRole();}finally{await write();}}`,
    `${prefix} export async function GET(){await requireRole(await read());return {};}`,
  ])("rejects read/write, alias and wrapper bypass %s",code=>expect(check(code).length).toBeGreaterThan(0));
});
