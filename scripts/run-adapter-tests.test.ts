import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vitest";
import { discoverAdapterRuns } from "./run-adapter-tests.mjs";

test("discovers a spec once per adapter", () => {
  const dir = mkdtempSync(join(tmpdir(), "cuteclown-specs-"));
  writeFileSync(join(dir, "Example.spec.ts"), "export {}\n");
  expect(discoverAdapterRuns(dir)).toEqual([
    { spec: "Example.spec.ts", adapter: "vanilla" },
    { spec: "Example.spec.ts", adapter: "react" },
    { spec: "Example.spec.ts", adapter: "vue" },
  ]);
});
