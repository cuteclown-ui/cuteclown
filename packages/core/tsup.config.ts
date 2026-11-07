import { defineConfig } from "tsup";
import { tsupPreset } from "../../scripts/tsup-preset.ts";

export default defineConfig({
  entry: { index: "src/index.ts", floating: "src/floating/index.ts" },
  ...tsupPreset,
  sourcemap: false,
  minify: true,
});
