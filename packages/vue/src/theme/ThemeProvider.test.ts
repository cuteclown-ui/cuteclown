// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import ThemeProvider from "./ThemeProvider.vue";

test("vue theme provider writes document attributes", () => {
  const wrapper = mount(ThemeProvider, { props: { theme: "dark", density: "compact", motion: "off", dir: "rtl" } });
  expect(document.documentElement.dataset.ccTheme).toBe("dark");
  expect(document.documentElement.dataset.ccDensity).toBe("compact");
  expect(document.documentElement.dataset.ccMotion).toBe("off");
  expect(document.documentElement.getAttribute("dir")).toBe("rtl");
  wrapper.unmount();
  expect(document.documentElement.dataset.ccTheme).toBeUndefined();
});
