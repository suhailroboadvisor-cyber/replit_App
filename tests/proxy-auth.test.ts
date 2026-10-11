import { beforeEach, afterEach, expect, it, vi } from "vitest";
import { NextRequest,NextResponse } from "next/server";
const fixtures=vi.hoisted(()=>({getUser:vi.fn(),createClient:vi.fn(),localize:vi.fn()}));
vi.mock("next-intl/middleware",()=>({default:()=>fixtures.localize}));
vi.mock("@supabase/ssr",()=>({createServerClient:fixtures.createClient}));
import proxy from "../src/proxy";
beforeEach(()=>{
  fixtures.localize.mockImplementation((request:NextRequest)=>NextResponse.rewrite(new URL("/ar"+request.nextUrl.pathname,request.url),{request:{headers:request.headers}}));
  fixtures.createClient.mockReset();
  fixtures.getUser.mockReset();
});
afterEach(()=>vi.unstubAllEnvs());
it("public localization never creates an auth client or cookies/CSP",async()=>{
  const response=await proxy(new NextRequest("https://fixture.test/terms",{headers:{cookie:"ignored-fixture-cookie"}}));
  expect(fixtures.createClient).not.toHaveBeenCalled();
  expect(response.headers.get("content-security-policy")).toBeNull();
  expect(response.cookies.getAll()).toEqual([]);
  expect(response.headers.get("x-middleware-rewrite")).toContain("/ar/terms");
});
it("private refresh retains localization rewrites, forwarded nonce and all refreshed cookies",async()=>{
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL","https://auth.fixture.test");
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY","public-fixture-anon");
  fixtures.createClient.mockImplementation((_url,_key,options)=>({auth:{getUser:async()=>{
    options.cookies.setAll([{name:"session-fixture",value:"fresh",options:{path:"/",sameSite:"lax"}}]);
    return {data:{user:null},error:null};
  }}}));
  const response=await proxy(new NextRequest("https://fixture.test/en/account"));
  expect(response.headers.get("x-middleware-rewrite")).toContain("/ar/en/account");
  expect(response.cookies.get("session-fixture")?.value).toBe("fresh");
  const nonce=response.headers.get("x-middleware-request-x-nonce");
  expect(nonce).toBeTruthy();
  expect(response.headers.get("content-security-policy")).toContain(`'nonce-${nonce}'`);
  expect(response.headers.get("content-security-policy")).toContain("https://auth.fixture.test");
  expect(response.headers.get("cache-control")).toBe("private, no-store");
  expect(response.headers.get("x-middleware-request-cookie")).toContain("session-fixture=fresh");
});
it("locale redirects survive refresh instead of becoming NextResponse.next",async()=>{
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL","https://auth.fixture.test");
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY","public-fixture-anon");
  fixtures.localize.mockImplementation(()=>NextResponse.redirect("https://fixture.test/account"));
  fixtures.createClient.mockImplementation((_url,_key,options)=>({auth:{getUser:async()=>{
    options.cookies.setAll([{name:"session-fixture",value:"fresh",options:{path:"/"}}]);
  }}}));
  const response=await proxy(new NextRequest("https://fixture.test/ar/account"));
  expect(response.status).toBe(307);
  expect(response.headers.get("location")).toBe("https://fixture.test/account");
  expect(response.cookies.get("session-fixture")?.value).toBe("fresh");
});
