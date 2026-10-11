import { expect,test } from "@playwright/test";
test("AR/EN Google-only sign-in, linked consent, friendly provider errors and private noindex",async({page,request})=>{
  test.setTimeout(240000);
  for(const [prefix,lang,dir] of [["","ar","rtl"],["/en","en","ltr"]]) {
    const response=await page.goto(`${prefix}/auth/sign-in?next=${encodeURIComponent(prefix+"/account")}`);
    await expect(page.locator("html")).toHaveAttribute("lang",lang);
    await expect(page.locator("html")).toHaveAttribute("dir",dir);
    await expect(page.getByRole("button",{name:/Continue with Google/})).toHaveCount(1);
    await expect(page.locator('input[type="email"],input[type="password"]')).toHaveCount(0);
    await expect(page.locator('form input[name="next"]')).toHaveValue(prefix+"/account");
    const consent=page.locator("form").locator("..");
    await expect(consent.getByRole("link",{name:/Terms of Use/})).toBeVisible();
    await expect(consent.getByRole("link",{name:/Privacy Policy/})).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content",/noindex/);
    expect(response?.headers()["content-security-policy"]).toContain("'nonce-");
    expect(response?.headers()["x-robots-tag"]).toContain("noindex");
    for(const route of ["/account","/admin","/admin/users","/admin/settings","/admin/audit","/admin/mfa/enroll","/admin/mfa/verify"]) {
      const result=await request.get(`${prefix}${route}`,{maxRedirects:0});
      expect(result.status()).toBe(307);
      expect(result.headers().location).toContain(`${prefix}/auth/sign-in?next=`);
      expect(result.headers()["x-robots-tag"]).toContain("noindex");
    }
  }
});
test("cookie-free public/legal pages and unauthorized profile are never shared cached",async({page,request})=>{
  let profiles=0;page.on("request",req=>{if(req.url().endsWith("/api/account/profile"))profiles++;});
  await page.goto("/");
  await expect(page.getByRole("link",{name:/Sign in/})).toBeVisible({timeout:30000});
  expect(profiles).toBe(0);
  for(const route of ["/","/en","/terms","/privacy","/en/terms","/en/privacy"]) {
    const response=await request.get(route);
    expect(response.ok()).toBe(true);
    expect(response.headers()["set-cookie"]).toBeUndefined();
    expect(response.headers()["content-security-policy"]).toBeUndefined();
  }
  const response=await request.get("/api/account/profile");
  expect(response.status()).toBe(401);
  expect(response.headers()["cache-control"]).toBe("private, no-store");
  expect(response.headers()["cloudflare-cdn-cache-control"]).toBe("no-store");
  expect(await (await request.get("/robots.txt")).text()).toContain("Disallow: /en/admin");
});
