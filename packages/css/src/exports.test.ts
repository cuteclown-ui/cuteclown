import { readFileSync } from "node:fs";
import { expect, test } from "vitest";

test("package exports cover the bundle and Phase 1 component styles", () => {
  const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8")) as {
    exports: Record<string, string>;
  };
  expect(Object.keys(pkg.exports).sort()).toEqual(
    [
      ".",
      "./accordion.css",
      "./bento.css",
      "./button.css",
      "./card.css",
      "./chip.css",
      "./layout.css",
      "./progress.css",
      "./stale-badge.css",
      "./stat-tile.css",
      "./tooltip.css",
    ].sort(),
  );
});
