// @vitest-environment jsdom
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { act } from "react";
import { expect, test } from "vitest";
import { ThemeProvider } from "./ThemeProvider.tsx";

test("react theme provider writes document attributes", async () => {
  const host = document.createElement("div");
  document.body.append(host);
  const root = createRoot(host);
  await act(async () => {
    root.render(createElement(ThemeProvider, { theme: "dark", density: "compact", motion: "off", dir: "rtl" }));
  });
  expect(document.documentElement.dataset.ccTheme).toBe("dark");
  expect(document.documentElement.dataset.ccDensity).toBe("compact");
  expect(document.documentElement.dataset.ccMotion).toBe("off");
  expect(document.documentElement.getAttribute("dir")).toBe("rtl");
  await act(async () => {
    root.unmount();
  });
  expect(document.documentElement.dataset.ccTheme).toBeUndefined();
  host.remove();
});
