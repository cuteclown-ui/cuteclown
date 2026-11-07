// @vitest-environment jsdom
import { createElement, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { act } from "react";
import { expect, test } from "vitest";
import { FocusScope } from "./FocusScope.tsx";

test("react focus scope moves focus inside and restores it", async () => {
  const opener = document.createElement("button");
  document.body.append(opener);
  opener.focus();
  const host = document.createElement("div");
  document.body.append(host);
  const root = createRoot(host);
  await act(async () => {
    root.render(
      createElement(
        StrictMode,
        null,
        createElement(FocusScope, null, createElement("button", null, "Inside")),
      ),
    );
  });
  expect(document.activeElement?.textContent).toBe("Inside");
  await act(async () => {
    root.unmount();
  });
  expect(document.activeElement).toBe(opener);
  host.remove();
  opener.remove();
});
