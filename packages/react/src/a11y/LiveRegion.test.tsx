// @vitest-environment jsdom
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { act } from "react";
import { expect, test } from "vitest";
import { LiveRegion } from "./LiveRegion.tsx";

test("react live region announces the polite message", async () => {
  const host = document.createElement("div");
  document.body.append(host);
  const root = createRoot(host);
  await act(async () => {
    root.render(createElement(LiveRegion, { message: "Saved" }));
  });
  expect(document.querySelector("[data-cc-announcer='polite']")?.textContent).toBe("Saved");
  await act(async () => root.unmount());
  host.remove();
});
