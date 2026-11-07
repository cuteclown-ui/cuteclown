import { expect, test } from "vitest";
import * as core from "./index.ts";

test("core exports machines, focus, floating, and layer helpers", () => {
  expect(Object.keys(core).sort()).toEqual(
    [
      "bindChild",
      "bindEscape",
      "bindOutsideClick",
      "bindStateEffects",
      "createAnnouncer",
      "createFocusScope",
      "createId",
      "createLayerStack",
      "createMachine",
      "createRovingTabIndex",
      "createSnapshot",
      "mergeProps",
      "resetIds",
      "setInert",
      "skipLinkProps",
      "startTimer",
      "visuallyHiddenStyle",
    ].sort(),
  );
});
