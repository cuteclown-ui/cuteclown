// @vitest-environment jsdom
import { renderToString } from "@vue/server-renderer";
import { expect, test } from "vitest";
import SkipLink from "./SkipLink.vue";
import VisuallyHidden from "./VisuallyHidden.vue";
import { h } from "vue";

test("vue skip link and visually hidden markup render on the server", async () => {
  const html = await renderToString(h("div", [h(SkipLink), h(VisuallyHidden, null, () => "Status")]));
  expect(html).toContain('href="#main"');
  expect(html).toContain("cc-skip-link");
  expect(html).toContain("cc-visually-hidden");
  expect(html).toContain("Status");
});
