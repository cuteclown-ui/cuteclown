// @vitest-environment jsdom
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import { SkipLink } from "./SkipLink.tsx";
import { VisuallyHidden } from "./VisuallyHidden.tsx";

test("react skip link and visually hidden markup render on the server", () => {
  const html = renderToStaticMarkup(
    createElement("div", null, createElement(SkipLink), createElement(VisuallyHidden, null, "Status")),
  );
  expect(html).toContain('href="#main"');
  expect(html).toContain("cc-skip-link");
  expect(html).toContain("cc-visually-hidden");
  expect(html).toContain("clip:rect(0, 0, 0, 0)");
  expect(html).toContain("Status");
});
