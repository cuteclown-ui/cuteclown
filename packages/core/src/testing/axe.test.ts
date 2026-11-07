// @vitest-environment jsdom
import { expect, test } from "vitest";
import { runAxe } from "./axe.ts";

test("runAxe returns the violations from the injected runner", async () => {
  const container = document.createElement("div");
  const result = await runAxe(container, {
    run: () => Promise.resolve({ violations: [{ id: "button-name" }] }),
  });
  expect(result.violations.map((item) => item.id)).toEqual(["button-name"]);
});
