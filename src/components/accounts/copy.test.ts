import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { accountCopyDictionary } from "./types";

describe("account UI copy locale parity", () => {
  it("has an English and Arabic review entry for every static account phrase", () => {
    expect(Object.keys(accountCopyDictionary).length).toBeGreaterThan(0);
    for (const [key, translations] of Object.entries(accountCopyDictionary)) {
      expect(translations.en, `${key} English`).toBe(key);
      expect(translations.ar, `${key} Arabic`).toMatch(/^⟦AR-REVIEW⟧ .+/);
    }
  });

  it("routes every literal reviewText phrase through the paired dictionary", () => {
    const directory = join(process.cwd(), "src/components/accounts");
    const missing: string[] = [];
    for (const file of readdirSync(directory).filter((entry) => entry.endsWith(".tsx"))) {
      const source = readFileSync(join(directory, file), "utf8");
      const literalCalls = source.matchAll(/reviewText\(locale,\s*(?:"([^"]+)"|'([^']+)')/g);
      for (const match of literalCalls) {
        const phrase = match[1] ?? match[2];
        if (!accountCopyDictionary[phrase]) missing.push(`${file}: ${phrase}`);
      }
    }
    expect(missing).toEqual([]);
  });
});
