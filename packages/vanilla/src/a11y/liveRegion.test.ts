// @vitest-environment jsdom
import { expect, test } from "vitest";
import { createLiveRegion } from "./liveRegion.ts";

test("vanilla live region announces politely by default", () => {
  const region = createLiveRegion();
  region.announce("Saved");
  expect(document.querySelector("[data-cc-announcer='polite']")?.textContent).toBe("Saved");
  region.dispose();
});
