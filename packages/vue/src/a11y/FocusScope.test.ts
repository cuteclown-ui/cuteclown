// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { h } from "vue";
import { expect, test } from "vitest";
import FocusScope from "./FocusScope.vue";

test("vue focus scope traps focus and restores it", () => {
  const opener = document.createElement("button");
  document.body.append(opener);
  opener.focus();
  const wrapper = mount(FocusScope, {
    attachTo: document.body,
    slots: { default: () => h("button", "Inside") },
  });
  expect(document.activeElement?.textContent).toBe("Inside");
  wrapper.unmount();
  expect(document.activeElement).toBe(opener);
  opener.remove();
});
