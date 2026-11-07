// @vitest-environment jsdom
import { expect, test } from "vitest";
import { createLayout } from "./index.ts";

test("layout primitives choose the element and class", () => {
  const stack = createLayout("stack", "section");
  expect(stack.tagName).toBe("SECTION");
  expect(stack.className).toBe("cc-stack");
  expect(createLayout("container").className).toBe("cc-container");
});
