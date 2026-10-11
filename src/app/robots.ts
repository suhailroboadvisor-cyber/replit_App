import type { MetadataRoute } from "next";
// D-51. Preview-wide and general launch robots policy belong to Step 13.
export default function robots(): MetadataRoute.Robots {
  return {rules:{userAgent:"*", allow:"/", disallow:["/auth","/account","/admin","/en/auth","/en/account","/en/admin","/api/account"]}};
}
