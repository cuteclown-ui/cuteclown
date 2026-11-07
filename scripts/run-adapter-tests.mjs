import { readdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const specsDir = join(dirname(fileURLToPath(import.meta.url)), "../packages/core/src/testing/specs");
const adapters = ["vanilla", "react", "vue"];

export function discoverAdapterRuns(dir = specsDir) {
  if (!existsSync(dir)) {
    return [];
  }
  const specs = readdirSync(dir).filter((name) => name.endsWith(".spec.ts"));
  return specs.flatMap((spec) => adapters.map((adapter) => ({ spec, adapter })));
}

const entry = process.argv[1];
if (entry && fileURLToPath(import.meta.url) === entry) {
  const runs = discoverAdapterRuns();
  process.stdout.write(`adapter runs: ${runs.length}\n`);
  for (const run of runs) {
    process.stdout.write(`${run.spec} × ${run.adapter}\n`);
  }
}
