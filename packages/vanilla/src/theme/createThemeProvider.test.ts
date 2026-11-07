// @vitest-environment jsdom
import { expect, test } from "vitest";
import { createThemeProvider } from "./createThemeProvider.ts";

test("sets theme, density, motion, and direction attributes", () => {
  const root = document.createElement("div");
  const provider = createThemeProvider(root, { theme: "dark", density: "compact", motion: "off", dir: "rtl" });
  expect(root.dataset.ccTheme).toBe("dark");
  expect(root.dataset.ccDensity).toBe("compact");
  expect(root.dataset.ccMotion).toBe("off");
  expect(root.getAttribute("dir")).toBe("rtl");
  provider.set({ motion: "full" });
  expect(root.dataset.ccMotion).toBe("full");
  provider.destroy();
  expect(root.dataset.ccTheme).toBeUndefined();
  expect(root.hasAttribute("dir")).toBe(false);
});
