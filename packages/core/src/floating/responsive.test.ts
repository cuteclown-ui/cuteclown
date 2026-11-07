import { expect, test } from "vitest";
import { resolveResponsivePlacement } from "./responsive.ts";

test("a narrow viewport becomes a bottom sheet", () => {
  expect(resolveResponsivePlacement(320, "top")).toEqual({ placement: "bottom", sheet: true });
  expect(resolveResponsivePlacement(960, "top")).toEqual({ placement: "top", sheet: false });
});
