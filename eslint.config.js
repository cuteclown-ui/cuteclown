import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/coverage/**",
      "instruct/**",
      "docs/plan/**",
      "**/.astro/**",
      "**/*.vue",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/.stylelintrc.cjs"],
    languageOptions: {
      sourceType: "commonjs",
      globals: { module: "readonly", exports: "readonly" },
    },
  },
);
