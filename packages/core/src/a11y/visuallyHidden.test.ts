import { expect, test } from "vitest";
import { visuallyHiddenStyle } from "./visuallyHidden.ts";

test("visually hidden styles clip the box", () => {
  expect(visuallyHiddenStyle.clip).toBe("rect(0, 0, 0, 0)");
  expect(visuallyHiddenStyle.overflow).toBe("hidden");
  expect(visuallyHiddenStyle.width).toBe("1px");
});
