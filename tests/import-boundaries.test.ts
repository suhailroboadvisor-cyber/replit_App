import { ESLint } from "eslint";
import { describe, expect, it } from "vitest";
import path from "node:path";

const eslint = new ESLint();

async function restrictionCount(file: string, importedPath: string) {
  const [result] = await eslint.lintText(
    `import value from "${importedPath}"; export default value;`,
    { filePath: path.resolve(file) },
  );
  return result.messages.filter(
    (message) => message.ruleId === "no-restricted-imports",
  ).length;
}

describe("import boundaries", () => {
  it("rejects the app database client in public routes", async () => {
    expect(
      await restrictionCount(
        "src/app/[locale]/(public)/fixture.ts",
        "@/db/app",
      ),
    ).toBe(1);
  });

  it.each(["@/jobs/weekly", "../../jobs/weekly"])(
    "rejects %s outside jobs and admin",
    async (importedPath) => {
      expect(await restrictionCount("tests/fixture.ts", importedPath)).toBe(1);
      expect(await restrictionCount("src/lib/fixture.ts", importedPath)).toBe(
        1,
      );
      expect(
        await restrictionCount(
          "src/app/[locale]/(public)/fixture.ts",
          importedPath,
        ),
      ).toBe(1);
    },
  );

  it.each(["src/jobs/fixture.ts", "src/app/[locale]/admin/fixture.ts"])(
    "allows job imports in %s",
    async (file) => {
      expect(await restrictionCount(file, "@/jobs/weekly")).toBe(0);
    },
  );
});
