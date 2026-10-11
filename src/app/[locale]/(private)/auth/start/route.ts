import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { serverAuth } from "../../../../../lib/auth/server";
import { localePath, safeNext } from "../../../../../lib/auth/paths";
import { sameOriginPost } from "../../../../../lib/auth/http";
export async function POST(request: Request, {params}: {params:Promise<{locale:string}>}) {
  const {locale} = await params;
  try {
    sameOriginPost(request);
    const form = await request.formData();
    const next = safeNext(form.get("next"));
    const callback = new URL(localePath(locale,"/auth/callback"),request.url);
    if (next) callback.searchParams.set("next",next);
    // PKCE flow binds provider response; acceptance flag is HttpOnly, temporary, same-site.
    (await cookies()).set("suhail-consent","1",{httpOnly:true,sameSite:"lax",secure:new URL(request.url).protocol==="https:",path:"/",maxAge:600});
    const auth = await serverAuth();
    const {data,error} = await auth.auth.signInWithOAuth({provider:"google",options:{redirectTo:callback.href}});
    if (error || !data.url) throw new Error("oauth_start_failed");
    return NextResponse.redirect(data.url,303);
  } catch { return NextResponse.redirect(new URL(`${localePath(locale,"/auth/sign-in")}?error=provider`,request.url),303); }
}
