import { cookies } from "next/headers";
import { serverAuth, requireGoogleProvider } from "../../../../../lib/auth/server";
import { localePath, safeNext } from "../../../../../lib/auth/paths";
import { sameOriginPost, privateJson, httpError } from "../../../../../lib/auth/http";
import { authOrigin } from "../../../../../lib/auth/origin";
import { googleOAuthUrl } from "../../../../../lib/auth/oauth-url";
import { AuthError } from "../../../../../lib/auth/errors";
export async function POST(request: Request, {params}: {params:Promise<{locale:string}>}) {
  const {locale} = await params;
  try {
    sameOriginPost(request);
    const form = await request.formData();
    const next = safeNext(form.get("next"));
    const origin = authOrigin(request);
    const callback = new URL(localePath(locale,"/auth/callback"),origin);
    if (next) callback.searchParams.set("next",next);
    // PKCE flow binds provider response; acceptance flag is HttpOnly, temporary, same-site.
    await requireGoogleProvider();
    const auth = await serverAuth();
    const {data,error} = await auth.auth.signInWithOAuth({provider:"google",options:{redirectTo:callback.href,skipBrowserRedirect:true}});
    if (error || !data.url) throw new AuthError(502,"oauth_start_failed");
    const destination = googleOAuthUrl(data.url, process.env.NEXT_PUBLIC_SUPABASE_URL);
    (await cookies()).set("suhail-consent","1",{httpOnly:true,sameSite:"lax",secure:new URL(origin).protocol==="https:",path:"/",maxAge:600});
    // Fetch remains same-origin; document navigation is not an external form-action chain.
    return privateJson({url:destination});
  } catch (error) { return httpError(error); }
}
