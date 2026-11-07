// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import LiveRegion from "./LiveRegion.vue";

test("vue live region announces politely by default", () => {
  const wrapper = mount(LiveRegion, { props: { message: "Saved" } });
  expect(document.querySelector("[data-cc-announcer='polite']")?.textContent).toBe("Saved");
  wrapper.unmount();
  expect(document.querySelector("[data-cc-announcer]")).toBeNull();
});
