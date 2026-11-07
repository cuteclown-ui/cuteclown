// @vitest-environment jsdom
import { expect, test } from "vitest";
import { setInert } from "./inert.ts";

test("inert backgrounds are marked inert and hidden from the accessibility tree", () => {
  const background = document.createElement("div");
  setInert(background, true);
  expect(background.hasAttribute("inert")).toBe(true);
  expect(background.getAttribute("aria-hidden")).toBe("true");
  setInert(background, false);
  expect(background.hasAttribute("inert")).toBe(false);
  expect(background.hasAttribute("aria-hidden")).toBe(false);
});
