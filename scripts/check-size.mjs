import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gzipSync } from "node:zlib";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const budgetKeys = [
  "tokensAndBaseCssGzip",
  "motionGzip",
  "coreGzip",
  "componentJsGzip",
  "componentCssGzip",
  "adapterOverheadGzip",
];

/** @param {string} raw */
export function loadBudgets(raw) {
  const data = JSON.parse(raw);
  for (const key of budgetKeys) {
    if (typeof data[key] !== "number" || data[key] <= 0) {
      throw new Error(`size budget ${key} must be a positive number of gzip bytes`);
    }
  }
  return data;
}

/** @param {Buffer | string} bytes */
export function gzipByteLength(bytes) {
  return gzipSync(bytes).length;
}

export function findDistDirs(repoRoot = root) {
  /** @type {string[]} */
  const dirs = [];
  const rootDist = join(repoRoot, "dist");
  if (existsSync(rootDist)) {
    dirs.push(rootDist);
  }
  for (const group of ["packages", "apps"]) {
    const abs = join(repoRoot, group);
    if (!existsSync(abs)) {
      continue;
    }
    for (const name of readdirSync(abs)) {
      const dist = join(abs, name, "dist");
      if (existsSync(dist)) {
        dirs.push(dist);
      }
    }
  }
  return dirs;
}

/** @param {number} size @param {number} limit @param {string} name */
export function budgetFailure(size, limit, name) {
  if (size <= limit) {
    return "";
  }
  return `${name} gzip ${size} exceeds ${limit}`;
}

function checkSizes() {
  const budgets = loadBudgets(readFileSync(join(root, "scripts/size-budgets.json"), "utf8"));
  const dists = findDistDirs();
  if (dists.length === 0) {
    process.stdout.write("size check: no dist output, skipping\n");
    return;
  }
  const bundles = [
    ["packages/motion/dist/index.js", budgets.motionGzip, "motion"],
    ["packages/core/dist/index.js", budgets.coreGzip, "core"],
    ["packages/core/dist/floating.js", budgets.coreGzip, "core floating"],
  ];
  const failures = [];
  let checked = 0;
  for (const [rel, limit, name] of bundles) {
    const file = join(root, rel);
    if (!existsSync(file)) {
      continue;
    }
    checked += 1;
    const size = gzipByteLength(readFileSync(file));
    const failure = budgetFailure(size, limit, name);
    if (failure) {
      failures.push(failure);
    } else {
      process.stdout.write(`size check: ${name} gzip ${size} within ${limit}\n`);
    }
  }
  if (checked === 0) {
    process.stdout.write(`size check: dist present (${dists.length}), bundles not built\n`);
    return;
  }
  if (failures.length > 0) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exitCode = 1;
  }
}

const entry = process.argv[1];
if (entry && import.meta.url === pathToFileURL(entry).href) {
  checkSizes();
}
