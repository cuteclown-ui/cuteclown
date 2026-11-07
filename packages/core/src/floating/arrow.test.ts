import { expect, test } from "vitest";
import { clampArrow } from "./arrow.ts";

test("arrow offset stays inside the floating edge", () => {
  expect(clampArrow(-20, 100, 8)).toBe(8);
  expect(clampArrow(200, 100, 8)).toBe(92);
  expect(clampArrow(40, 100, 8)).toBe(40);
});
