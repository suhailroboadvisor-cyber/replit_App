import { expect, test, type Locator, type Page } from "@playwright/test";
import { approvedArabicCopy } from "../src/i18n/approved-arabic";

// Real components in the separate test process, not live signed-in/OAuth evidence.
async function headings(page: Page, names: string[]) {
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1,h2,h3,h4,h5,h6")).toHaveText(names);
}

async function associated(control: Locator, name: string) {
  await expect(control).toHaveAccessibleName(name);
  expect(await control.evaluate((element) =>
    (element as HTMLInputElement).labels?.length ?? 0,
  )).toBeGreaterThan(0);
}

async function tab(page: Page, target: Locator, key = "Tab") {
  await page.keyboard.press(key);
  await expect(target).toBeFocused();
}

for (const locale of ["ar", "en"] as const) {
  const prefix = locale === "en" ? "/en" : "";
  const text = (english: string) => locale === "ar" ? approvedArabicCopy[english] : english;
  const screen = (mode: string, extra = "") => `${prefix}/?screen=${mode}${extra}`;

  test(`${locale} account headings, associated labels and keyboard actions`, async ({ page }) => {
    await page.goto(screen("account", locale === "ar" ? "&pref=en" : ""));
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("html")).toHaveAttribute("dir", locale === "ar" ? "rtl" : "ltr");
    await headings(page, ["Your account", "Profile", "Interface language", "Policy acceptance", "Delete account"].map(text));
    const language = page.getByRole("combobox", { name: text("Interface language"), exact: true });
    const confirmation = page.getByRole("textbox", { name: text('Type "DELETE" to confirm'), exact: true });
    await associated(language, text("Interface language"));
    await associated(confirmation, text('Type "DELETE" to confirm'));
    await expect(language.locator("option")).toHaveText([text("Arabic"), text("English")]);
    const save = page.getByRole("button", { name: text("Save language"), exact: true });
    const remove = page.getByRole("button", { name: text("Delete my account"), exact: true });
    await expect(save).toBeDisabled();
    await expect(remove).toBeDisabled();
    await tab(page, language);
    // Change the preference with the keyboard; keep this save on the current locale.
    await page.keyboard.press(locale === "ar" ? "ArrowUp" : "ArrowDown");
    await tab(page, save);
    await page.keyboard.press("Enter");
    await expect(page.getByRole("status")).toContainText("Language saved");
    if (locale === "ar") await expect(page.getByRole("status")).toContainText("⟦AR-REVIEW⟧");
    expect(await page.evaluate(() => window.accountFixture.calls)).toEqual([
      { action: "updateLocale", args: [locale] },
    ]);
    const terms = page.getByRole("link", { name: new RegExp(text("Terms of Use")) });
    const privacy = page.getByRole("link", { name: new RegExp(text("Privacy Policy")) });
    await expect(terms).toHaveAttribute("href", `${prefix}/terms`);
    await expect(privacy).toHaveAttribute("href", `${prefix}/privacy`);
    // Starting from the field gives an explicit keyboard order including policy links.
    await language.focus();
    if (await save.isEnabled()) await tab(page, save);
    await tab(page, terms);
    await tab(page, privacy);
    await tab(page, confirmation);
    await page.keyboard.type("delete");
    await expect(remove).toBeDisabled();
    await confirmation.fill("DELETE");
    await tab(page, remove);
    await page.evaluate(() => { window.accountFixture.fail = true; });
    await page.keyboard.press("Enter");
    await expect(page.getByRole("alert")).toContainText("Account deletion could not be completed");
    if (locale === "ar") await expect(page.getByRole("alert")).toContainText("⟦AR-REVIEW⟧");
    expect(await page.evaluate(() => window.accountFixture.calls.at(-1))).toEqual({
      action: "deleteAccount", args: ["DELETE"],
    });
    for (const role of ["admin", "editor"]) {
      await page.goto(screen("account", `&role=${role}`));
      await expect(page.getByText(/Ask another admin/)).toBeVisible();
      await expect(page.getByRole("textbox")).toHaveCount(0);
      await expect(remove).toHaveCount(0);
    }
  });

  test(`${locale} language change follows localized fixture destination`, async ({ page }) => {
    await page.goto(screen("account"));
    await page.getByRole("combobox", { name: text("Interface language") }).selectOption("en");
    await page.getByRole("button", { name: text("Save language") }).click();
    if (locale === "ar") {
      await expect(page).toHaveURL(/\/en\/account$/);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("Your account");
    } else {
      await expect(page.getByRole("status")).toContainText("Language saved");
    }
  });

  test(`${locale} users and role dialog support keyboard-only change, cancel and focus return`, async ({ page }) => {
    await page.goto(screen("users"));
    await headings(page, [text("Users")]);
    const nav = page.getByRole("navigation", { name: text("Admin navigation"), exact: true });
    await expect(nav.getByRole("link", { name: text("Users"), exact: true })).toHaveAttribute("aria-current", "page");
    const search = page.getByRole("textbox", { name: text("Search by name or email"), exact: true });
    await associated(search, text("Search by name or email"));
    await search.focus();
    await tab(page, page.getByRole("button", { name: text("Search"), exact: true }));
    const opener = page.getByRole("button", { name: text("Change role"), exact: true });
    await tab(page, opener);
    await page.keyboard.press("Enter");
    const dialog = page.getByRole("dialog", { name: text("Change account role"), exact: true });
    await expect(dialog).toBeVisible();
    await headings(page, [text("Users"), text("Change account role")]);
    const close = dialog.getByRole("button", { name: text("Close"), exact: true });
    await expect(close).toBeFocused();
    const role = dialog.getByRole("combobox", { name: text("New role"), exact: true });
    const reason = dialog.getByRole("textbox", { name: text("Reason (required)"), exact: true });
    await associated(role, text("New role"));
    await associated(reason, text("Reason (required)"));
    await expect(role.locator("option")).toHaveText(["user", "editor", "admin"].map(text));
    const confirm = dialog.getByRole("button", { name: text("Confirm role change"), exact: true });
    const cancel = dialog.getByRole("button", { name: text("Cancel"), exact: true });
    await expect(confirm).toBeDisabled();
    await tab(page, role);
    await page.keyboard.press("ArrowDown");
    await expect(role).toHaveValue("admin");
    await tab(page, reason);
    await page.keyboard.type("Keyboard fixture reason");
    await tab(page, cancel);
    await tab(page, confirm);
    await tab(page, close); // Modal traps forward and reverse keyboard navigation.
    await tab(page, confirm, "Shift+Tab");
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(opener).toBeFocused();
    await page.keyboard.press("Enter");
    await dialog.getByRole("button", { name: text("Cancel"), exact: true }).press("Enter");
    await expect(opener).toBeFocused();
    await page.keyboard.press("Enter");
    await close.press("Enter");
    await expect(opener).toBeFocused();
    await page.keyboard.press("Enter");
    await role.selectOption("admin");
    await reason.fill("Keyboard fixture reason");
    await page.evaluate(() => { window.accountFixture.fail = true; });
    await confirm.press("Enter");
    await expect(page.getByRole("status")).toContainText("Role could not be updated");
    if (locale === "ar") await expect(page.getByRole("status")).toContainText("⟦AR-REVIEW⟧");
    await expect(dialog).toBeVisible();
    await page.evaluate(() => { window.accountFixture.fail = false; });
    await confirm.press("Enter");
    await expect(dialog).toHaveCount(0);
    await expect(opener).toBeFocused();
    expect(await page.evaluate(() => window.accountFixture.calls.at(-1))).toEqual({
      action: "changeRole", args: ["fixture-user", "admin", "Keyboard fixture reason"],
    });
    await search.fill("Fixture");
    await search.press("Enter");
    await expect(page).toHaveURL(`${prefix}/admin/users?q=Fixture`);
    await expect(page.getByRole("button", { name: text("Previous page") })).toBeDisabled();
    await page.getByRole("button", { name: text("Next page") }).press("Enter");
    await expect(page).toHaveURL(`${prefix}/admin/users?q=Fixture&page=2`);
    await page.goto(screen("users", "&empty"));
    await expect(page.getByRole("cell", { name: text("No users found."), exact: true })).toBeVisible();
  });

  test(`${locale} audit filters have exact associated labels and keyboard expansion`, async ({ page }) => {
    await page.goto(screen("audit"));
    await headings(page, [text("Audit trail")]);
    const fields = ["Event type", "Entity", "From", "To"].map((name) => page.getByLabel(text(name), { exact: true }));
    for (let index = 0; index < fields.length; index++) {
      await associated(fields[index], text(["Event type", "Entity", "From", "To"][index]));
    }
    await fields[0].focus();
    await page.keyboard.type("user_role_change");
    await tab(page, fields[1]);
    await page.keyboard.type("users");
    await tab(page, fields[2]);
    await fields[2].fill("2026-10-01");
    await fields[3].fill("2026-10-12");
    // Date inputs have multiple native keyboard segments. Move from the last field
    // via its final segment to the submit button rather than assuming one Tab.
    const apply = page.getByRole("button", { name: text("Apply filters"), exact: true });
    for (let i = 0; i < 5 && !(await apply.evaluate((el) => el === document.activeElement)); i++) {
      await page.keyboard.press("Tab");
    }
    await expect(apply).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(`${prefix}/admin/audit?event=user_role_change&entity=users&from=2026-10-01&to=2026-10-12`);
    await page.getByRole("button", { name: text("Next page") }).press("Enter");
    await expect(page).toHaveURL(/&page=2$/);
    const summary = page.locator("summary");
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("details")).toHaveAttribute("open", "");
    await expect(page.getByText(text("Entity ID"), { exact: true })).toBeVisible();
    await expect(page.getByText(text("Event ID"), { exact: true })).toBeVisible();
    await page.keyboard.press("Space");
    await expect(page.locator("details")).not.toHaveAttribute("open", "");
    await page.goto(screen("audit", "&empty"));
    await expect(page.getByText(text("No events match these filters."), { exact: true })).toBeVisible();
  });

  test(`${locale} settings separate approved labels from help and save by keyboard`, async ({ page }) => {
    await page.goto(screen("settings"));
    await headings(page, [text("Settings")]);
    const version = page.getByRole("combobox", { name: text("Default methodology version"), exact: true });
    const allow = page.getByRole("checkbox", { name: text("Allow editor picks for ineligible securities"), exact: true });
    await associated(version, text("Default methodology version"));
    await associated(allow, text("Allow editor picks for ineligible securities"));
    await expect(version).toHaveAccessibleDescription(/Only public, eligible versions are listed/);
    await expect(allow).toHaveAccessibleDescription(/selected screening configuration/);
    if (locale === "ar") {
      await expect(version).toHaveAccessibleDescription(/⟦AR-REVIEW⟧/);
      await expect(allow).toHaveAccessibleDescription(/⟦AR-REVIEW⟧/);
    }
    await expect(version.locator("option").first()).toHaveText(text("No default"));
    await version.focus();
    await page.keyboard.press("ArrowDown");
    await expect(version).toHaveValue("fixture-version");
    await tab(page, allow);
    await page.keyboard.press("Space");
    await expect(allow).toBeChecked();
    await tab(page, page.getByRole("button", { name: text("Save settings"), exact: true }));
    await page.keyboard.press("Enter");
    await expect(page.getByRole("status")).toContainText("Settings saved.");
    expect(await page.evaluate(() => window.accountFixture.calls)).toEqual([
      { action: "saveSettings", args: ["fixture-version", true] },
    ]);
    await page.evaluate(() => { window.accountFixture.fail = true; });
    await page.keyboard.press("Enter");
    await expect(page.getByRole("status")).toContainText("Settings could not be saved");
    if (locale === "ar") await expect(page.getByRole("status")).toContainText("⟦AR-REVIEW⟧");
    await page.goto(screen("deferred", "&role=editor"));
    await headings(page, [text("Methodologies"), text("This section is not available yet")]);
    const nav = page.getByRole("navigation", { name: text("Admin navigation") });
    for (const restricted of ["Users", "Audit trail", "Settings"]) {
      await expect(nav.getByRole("link", { name: text(restricted), exact: true })).toHaveCount(0);
    }
  });

  for (const mode of ["enroll", "verify"] as const) {
    test(`${locale} MFA ${mode} exact headings/code labels and keyboard verification`, async ({ page }) => {
      await page.goto(screen(mode));
      await headings(page, [text(mode === "enroll" ? "Set up an authenticator" : "Verify your identity")]);
      if (mode === "enroll") {
        await expect(page.getByText(text("Admin access requires a time-based authenticator. Your role alone does not grant access."), { exact: true })).toBeVisible();
        const begin = page.getByRole("button", { name: text("Begin setup"), exact: true });
        await page.getByRole("link").focus();
        await tab(page, begin);
        await page.keyboard.press("Enter");
        await expect(page.getByRole("img", { name: text("Authenticator setup QR code"), exact: true })).toBeVisible();
        await page.getByRole("img", { name: text("Authenticator setup QR code"), exact: true })
          .evaluate((element) => (element as HTMLImageElement).decode());
        await headings(page, [text("Set up an authenticator"), text("Scan with your authenticator app")]);
        await expect(page.getByText(text("If scanning is unavailable, enter this key manually."), { exact: true })).toBeVisible();
        await expect(page.locator("code")).toHaveAttribute("dir", "ltr");
        await expect(page.locator("code")).toHaveText("FIXTURESETUPKEY");
        await page.getByRole("link").focus();
        await tab(page, page.getByRole("button", { name: text("Copy setup key"), exact: true }));
      } else {
        await page.getByRole("link").focus();
      }
      const codeName = text(mode === "enroll" ? "Enter the six-digit code" : "Authenticator code");
      const code = page.getByRole("textbox", { name: codeName, exact: true });
      await associated(code, codeName);
      await expect(code).toHaveAttribute("dir", "ltr");
      await expect(code).toHaveAttribute("inputmode", "numeric");
      await expect(code).toHaveAttribute("autocomplete", "one-time-code");
      await tab(page, code);
      const verify = page.getByRole("button", { name: text("Verify and continue"), exact: true });
      await page.keyboard.type("12345");
      await expect(verify).toBeDisabled();
      await page.keyboard.type("0");
      await tab(page, verify);
      await page.keyboard.press("Enter");
      await expect(page.getByRole("alert")).toContainText("That code could not be verified");
      if (locale === "ar") await expect(page.getByRole("alert")).toContainText("⟦AR-REVIEW⟧");
      await code.focus();
      await code.fill("123456");
      await tab(page, verify);
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(/\/done$/);
    });
  }

  test(`${locale} MFA enrollment approved helper text when QR is unavailable`, async ({ page }) => {
    await page.goto(screen("enroll"));
    await page.evaluate(() => { window.fixture.mfa.qrCode = null; });
    await page.getByRole("button", { name: text("Begin setup"), exact: true }).click();
    await expect(page.getByText(text("QR code unavailable. Use the setup key instead."), { exact: true })).toBeVisible();
    await expect(page.getByText(text("If scanning is unavailable, enter this key manually."), { exact: true })).toBeVisible();
    await expect(page.locator("code")).toHaveText("FIXTURESETUPKEY");
    await expect(page.getByText(/⟦AR-REVIEW⟧/)).toHaveCount(0);
  });
}
