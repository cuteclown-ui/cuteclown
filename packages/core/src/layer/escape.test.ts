// @vitest-environment jsdom
import { expect, test } from "vitest";
import { bindEscape } from "./escape.ts";

test("Escape invokes the dismiss callback", () => {
  let hits = 0;
  const stop = bindEscape(() => {
    hits += 1;
  });
  document.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
  document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  expect(hits).toBe(1);
  stop();
  document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  expect(hits).toBe(1);
});
