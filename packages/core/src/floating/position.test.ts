import { expect, test } from "vitest";
import { computeFloatingPosition } from "./position.ts";

const viewport = { x: 0, y: 0, width: 400, height: 300 };

test("flips to the opposite side and shifts back inside the viewport", () => {
  const flipped = computeFloatingPosition({
    anchor: { x: 180, y: 260, width: 40, height: 20 },
    floating: { width: 80, height: 40 },
    viewport,
    placement: "bottom",
  });
  expect(flipped.placement).toBe("top");
  expect(flipped.y).toBeLessThan(260);

  const shifted = computeFloatingPosition({
    anchor: { x: 370, y: 40, width: 20, height: 20 },
    floating: { width: 100, height: 40 },
    viewport,
    placement: "bottom",
  });
  expect(shifted.x + 100).toBeLessThanOrEqual(400);
  expect(shifted.x).toBeGreaterThanOrEqual(0);
});
