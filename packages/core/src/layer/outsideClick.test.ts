// @vitest-environment jsdom
import { expect, test } from "vitest";
import { bindOutsideClick } from "./outsideClick.ts";

test("pointerdown outside the root calls back and inside does not", () => {
  const root = document.createElement("div");
  const inside = document.createElement("button");
  const outside = document.createElement("button");
  root.append(inside);
  document.body.append(root, outside);
  const hits: string[] = [];
  const stop = bindOutsideClick(root, () => hits.push("out"));
  inside.dispatchEvent(new Event("pointerdown", { bubbles: true }));
  outside.dispatchEvent(new Event("pointerdown", { bubbles: true }));
  expect(hits).toEqual(["out"]);
  stop();
  outside.dispatchEvent(new Event("pointerdown", { bubbles: true }));
  expect(hits).toEqual(["out"]);
  root.remove();
  outside.remove();
});
