// @vitest-environment jsdom
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import { Layout } from "./index.tsx";

test("react layout renders the polymorphic element", () => {
  const html = renderToStaticMarkup(createElement(Layout, { kind: "stack", as: "section" }, "Cards"));
  expect(html).toBe('<section class="cc-stack">Cards</section>');
});
