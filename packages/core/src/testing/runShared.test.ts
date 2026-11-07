import { expect, test } from "vitest";
import { adapterMatrix } from "./runShared.ts";

test("each spec is planned for vanilla, react, and vue", () => {
  expect(adapterMatrix(["ThemeProvider"])).toEqual([
    { spec: "ThemeProvider", adapter: "vanilla" },
    { spec: "ThemeProvider", adapter: "react" },
    { spec: "ThemeProvider", adapter: "vue" },
  ]);
});
