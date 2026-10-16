import { describe, expect, it, vi } from "vitest";
import { input } from "../src/engine/__fixtures__/synthetic";
import { screen } from "../src/engine/screen";
import { hash } from "../src/engine/canonical";
import { inputFromPayload, verifyStoredRun, diff } from "../src/screening/verify";
import type { HashPayload } from "../src/db/schema/types";
vi.mock("server-only", () => ({}));

describe("stored screening payload replay", () => {
  const output = screen(input({ calculationVersion: "calc-2026.10.3" }));
  const stored = () => ({ immutable_hash: output.immutableHash, hash_payload: structuredClone(output.hashPayload) as HashPayload });
  it("roundtrips complete evidence and outputs without current data", () => {
    expect(screen(inputFromPayload(output.hashPayload)).hashPayload).toEqual(output.hashPayload);
    expect(verifyStoredRun(stored())).toMatchObject({ valid: true, hashMatches: true, replayMatches: true, differences: [] });
  });
  it("reports a hash mismatch as well as the changed output path", () => {
    const run = stored();
    run.hash_payload.outputs.status = "insufficient_data";
    expect(verifyStoredRun(run)).toMatchObject({ valid: false, hashMatches: false, replayMatches: false });
    expect(verifyStoredRun(run).differences.some(d => d.path === "$.outputs.status")).toBe(true);
  });
  it("detects a forged output even if the attacker recomputes the outer hash", () => {
    const run = stored();
    run.hash_payload.outputs.confidence = "Low";
    run.immutable_hash = hash(run.hash_payload);
    expect(verifyStoredRun(run)).toMatchObject({ valid: false, hashMatches: true, replayMatches: false });
  });
  it("returns detailed replay failure rather than throwing on malformed input", () => {
    const run = stored();
    run.hash_payload.facts = null as unknown as HashPayload["facts"];
    expect(verifyStoredRun(run).differences.some(d => d.path === "$.replay")).toBe(true);
  });
  it("recurses to the changed array cell and ignores object key order", () => {
    expect(diff({ a: 1, b: [2] }, { b: [3], a: 1 })).toEqual([{ path: "$.b.0", expected: 2, actual: 3 }]);
    expect(diff({ a: 1, b: 2 }, { b: 2, a: 1 })).toEqual([]);
  });
});
