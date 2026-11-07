// @vitest-environment jsdom
import { expect, test } from "vitest";
import { createSkipLink } from "./SkipLink.ts";
import { createVisuallyHidden } from "./VisuallyHidden.ts";

test("skip link points at main and hidden text keeps the clip style", () => {
  const link = createSkipLink();
  const hidden = createVisuallyHidden("Status");
  expect(link.getAttribute("href")).toBe("#main");
  expect(link.className).toBe("cc-skip-link");
  expect(hidden.style.clip).toContain("rect(");
  expect(hidden.textContent).toBe("Status");
});
