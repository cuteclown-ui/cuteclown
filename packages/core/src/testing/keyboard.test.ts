// @vitest-environment jsdom
import { expect, test } from "vitest";
import { shiftTab, tab } from "./keyboard.ts";

test("tab helpers dispatch keydown with the shift flag", () => {
  const button = document.createElement("button");
  const keys: boolean[] = [];
  button.addEventListener("keydown", (event) => keys.push(event.shiftKey));
  tab(button);
  shiftTab(button);
  expect(keys).toEqual([false, true]);
});
