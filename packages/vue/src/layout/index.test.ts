import { renderToString } from "@vue/server-renderer";
import { expect, test } from "vitest";
import { h } from "vue";
import { Layout } from "./index.ts";

test("vue layout renders the polymorphic element on the server", async () => {
  const html = await renderToString(h(Layout, { kind: "stack", as: "section" }, () => "Cards"));
  expect(html).toBe("<section class=\"cc-stack\">Cards</section>");
});
