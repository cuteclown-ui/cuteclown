import { expect, test } from "vitest";
import { clampArrow, computeFloatingPosition, resolveResponsivePlacement } from "./index.ts";

test("the floating entry exposes placement, arrow, and sheet helpers", () => {
  expect(clampArrow(40, 100, 8)).toBe(40);
  expect(resolveResponsivePlacement(320, "top").sheet).toBe(true);
  expect(computeFloatingPosition({
    anchor: { x: 10, y: 10, width: 20, height: 20 },
    floating: { width: 40, height: 20 },
    viewport: { x: 0, y: 0, width: 200, height: 200 },
    placement: "bottom",
  }).placement).toBe("bottom");
});
