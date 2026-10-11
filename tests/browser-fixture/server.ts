import { build } from "esbuild";
import { createServer } from "node:http";
import { readFile,mkdir } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { privateCsp } from "../../src/lib/auth/csp";
import { THEME_SCRIPT } from "../../src/lib/theme-script";
// This separate test-only process bundles components with auth-module boundary fixtures.
// It never aliases, bypasses or changes authentication in the real Next application.
const out=path.resolve("generated-artifacts/account-fixtures");
await mkdir(out,{recursive:true});
await build({
  entryPoints:["tests/browser-fixture/app.tsx"],outfile:path.join(out,"app.js"),bundle:true,platform:"browser",format:"iife",
  define:{"process.env.NODE_ENV":'"production"',"process.env.NEXT_PUBLIC_SUPABASE_URL":'"https://auth.fixture.test"'},
  alias:{"@/lib/auth/browser":path.resolve("tests/browser-fixture/auth.ts"),"@/i18n/navigation":path.resolve("tests/browser-fixture/navigation.tsx"),"next/image":path.resolve("tests/browser-fixture/image.tsx")},
});
const server=createServer(async(req,res)=>{
  const url=new URL(req.url??"/","http://127.0.0.1:3300");
  if(url.pathname==="/app.js") {res.setHeader("Content-Type","application/javascript");res.end(await readFile(path.join(out,"app.js")));return;}
  if(url.pathname==="/api/account/profile") {
    res.setHeader("Cache-Control","private, no-store");res.setHeader("CDN-Cache-Control","no-store");res.setHeader("Content-Type","application/json");
    const id=/fixture-user=([^;]*)/.exec(req.headers.cookie??"")?.[1];
    if(!id){res.statusCode=401;res.end(JSON.stringify({error:"sign_in_required"}));return;}
    // Delay former-session profile so Playwright can prove it never wins a race.
    if(id==="slow-admin") await new Promise(resolve=>setTimeout(resolve,350));
    res.end(JSON.stringify({id,full_name:id==="user"?"Ordinary User":"Fixture Admin",role:id==="user"?"user":"admin"}));return;
  }
  if(req.method==="POST") {
    const chunks:Buffer[]=[];for await(const chunk of req)chunks.push(Buffer.from(chunk));
    res.setHeader("Content-Type","application/json");res.end(JSON.stringify({ok:true,path:url.pathname,body:Buffer.concat(chunks).toString()}));return;
  }
  const nonce=randomBytes(24).toString("base64"),locale=url.pathname.startsWith("/en")?"en":"ar";
  res.setHeader("Content-Type","text/html");
  res.setHeader("Content-Security-Policy",privateCsp(nonce,"https://auth.fixture.test",false));
  res.end(`<!doctype html><html lang="${locale}" dir="${locale==="ar"?"rtl":"ltr"}" class="dark"><head><meta name="robots" content="noindex,nofollow"><script nonce="${nonce}">${THEME_SCRIPT}</script></head><body><div id="root"></div><script nonce="${nonce}" src="/app.js"></script></body></html>`);
});
server.listen(3300,"127.0.0.1",()=>console.log("Isolated auth-boundary UI fixtures ready"));
