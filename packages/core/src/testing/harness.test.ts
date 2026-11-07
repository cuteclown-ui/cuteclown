// @vitest-environment jsdom
import { expect, test } from "vitest";
import type { AdapterHarness } from "./harness.ts";

test("a harness can mount, interact, and clean up", () => {
  const events: string[] = [];
  const harness: AdapterHarness = {
    mount: () => {
      events.push("mount");
      return document.createElement("div");
    },
    interact: (name) => events.push(name),
    cleanup: () => events.push("cleanup"),
  };
  harness.mount();
  harness.interact("press");
  harness.cleanup();
  expect(events).toEqual(["mount", "press", "cleanup"]);
});
