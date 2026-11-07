// @vitest-environment jsdom
import { expect, test } from "vitest";
import { bindFocusScope } from "./focusScope.ts";

test("vanilla focus scope traps Tab and restores focus", () => {
  const opener = document.createElement("button");
  const dialog = document.createElement("div");
  const first = document.createElement("button");
  const last = document.createElement("button");
  dialog.append(first, last);
  document.body.append(opener, dialog);
  opener.focus();
  const scope = bindFocusScope(dialog);
  expect(document.activeElement).toBe(first);
  last.focus();
  last.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab", bubbles: true }));
  expect(document.activeElement).toBe(first);
  scope.dispose();
  expect(document.activeElement).toBe(opener);
  opener.remove();
  dialog.remove();
});
