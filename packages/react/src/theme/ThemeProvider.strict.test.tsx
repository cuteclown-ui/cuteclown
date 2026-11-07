// @vitest-environment jsdom
import { createElement, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { act } from "react";
import { expect, test } from "vitest";
import { ThemeProvider } from "./ThemeProvider.tsx";

test("theme attributes survive StrictMode remount and clear on unmount", async () => {
  const host = document.createElement("div");
  document.body.append(host);
  const root = createRoot(host);
  await act(async () => {
    root.render(createElement(StrictMode, null, createElement(ThemeProvider, { theme: "dark", motion: "full" })));
  });
  expect(document.documentElement.dataset.ccTheme).toBe("dark");
  expect(document.documentElement.dataset.ccMotion).toBe("full");
  await act(async () => {
    root.unmount();
  });
  expect(document.documentElement.dataset.ccTheme).toBeUndefined();
  expect(document.documentElement.hasAttribute("dir")).toBe(false);
  host.remove();
});
