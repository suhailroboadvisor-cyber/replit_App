import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { privateCsp } from "./lib/auth/csp";
import { routing } from "./i18n/routing";
import { privatePath } from "./lib/auth/private-path";

type Stage = (request: NextRequest) => NextResponse | undefined;
const localize = createMiddleware(routing);
// Composable entry point for later D-40/D-51 work. No auth or nonce here.
export function localizationChain(...stages: Stage[]) {
  return (request: NextRequest) => {
    for (const stage of stages) {
      const response = stage(request);
      if (response) return response;
    }
    return localize(request);
  };
}
export default async function proxy(request: NextRequest) {
  // D-51: never refresh or inspect session cookies on public ISR routes.
  request.headers.delete("x-private-path");
  request.headers.delete("x-nonce");
  request.headers.delete("Content-Security-Policy");
  const classified = privatePath(request.nextUrl.pathname);
  if (!classified.private) return localize(request);
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const csp = privateCsp(nonce,url,process.env.NODE_ENV==="development");
  request.headers.set("x-nonce",nonce);
  request.headers.set("Content-Security-Policy",csp);
  // Untrusted inbound x-private-path cannot affect guards.
  request.headers.set("x-private-path", classified.path + request.nextUrl.search);
  let response = classified.malformed ? NextResponse.json({error:"invalid_path"}, {status:400}) : localize(request);
  if (!classified.malformed && url && key) {
    const auth = createServerClient(url,key,{cookies:{
      getAll:()=>request.cookies.getAll(),
      setAll(values) {
        for (const {name,value} of values) request.cookies.set(name,value);
        // Re-run localization against refreshed request, preserving rewrite/redirect headers.
        const refreshed = localize(request);
        for (const cookie of response.cookies.getAll()) refreshed.cookies.set(cookie);
        for (const {name,value,options} of values) refreshed.cookies.set(name,value,options);
        response = refreshed;
      },
    }});
    await auth.auth.getUser();
  }
  // next-intl forwards locale headers; add CSP/nonce to its existing request override.
  for (const [name,value] of [["x-nonce",nonce],["content-security-policy",csp],["x-private-path",request.headers.get("x-private-path")!]]) {
    response.headers.set(`x-middleware-request-${name}`,value);
  }
  const overrides = response.headers.get("x-middleware-override-headers")?.split(",").filter(Boolean) ?? [];
  response.headers.set("x-middleware-override-headers", [...new Set([...overrides,"x-nonce","content-security-policy","x-private-path"])].join(","));
  response.headers.set("Content-Security-Policy",csp);
  response.headers.set("X-Robots-Tag","noindex, nofollow");
  response.headers.set("Cache-Control","private, no-store");
  response.headers.set("CDN-Cache-Control","no-store");
  response.headers.set("Cloudflare-CDN-Cache-Control","no-store");
  return response;
}
export const config = {
  matcher: ["/((?!api|_next|_vercel|icons|brand|favicon\\.ico|robots\\.txt|sitemap\\.xml|manifest\\.webmanifest).*)"],
};
