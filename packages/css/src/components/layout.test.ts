import { readFileSync } from "node:fs";
import { expect, test } from "vitest";

test("layout primitives and the skip link focus rule are present", () => {
  const css = readFileSync(new URL("./layout.css", import.meta.url), "utf8");
  for (const name of [".cc-box", ".cc-stack", ".cc-inline", ".cc-grid", ".cc-container"]) {
    expect(css).toContain(name);
  }
  expect(css).toContain(".cc-skip-link:focus");
  expect(css).toContain("clip: auto");
});
