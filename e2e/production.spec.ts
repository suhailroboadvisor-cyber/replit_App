import { expect, test } from "@playwright/test";

test("styleguide excluded in production in both locales; shell is static and health unchanged", async ({
  request,
}) => {
  for (const url of ["/styleguide", "/en/styleguide"])
    expect((await request.get(url)).status()).toBe(404);
  for (const [url, locale, dir] of [
    ["/", "ar", "rtl"],
    ["/en", "en", "ltr"],
  ]) {
    const response = await request.get(url);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["set-cookie"]).toBeUndefined();
    expect(await response.text()).toContain(`lang="${locale}" dir="${dir}"`);
  }
  expect(await (await request.get("/api/health")).json()).toMatchObject({
    status: "ok",
  });
  expect((await request.get("/manifest.webmanifest")).ok()).toBeTruthy();
});
