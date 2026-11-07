import { expect, test } from "vitest";
import { skipLinkProps } from "./skipLink.ts";

test("the skip link targets main", () => {
  expect(skipLinkProps().href).toBe("#main");
  expect(skipLinkProps("#content").href).toBe("#content");
});
