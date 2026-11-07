import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@cuteclown/motion": fileURLToPath(
        new URL("../../packages/motion/src/index.ts", import.meta.url),
      ),
      "@cuteclown/core/floating": fileURLToPath(
        new URL("../../packages/core/src/floating/index.ts", import.meta.url),
      ),
      "@cuteclown/core": fileURLToPath(
        new URL("../../packages/core/src/index.ts", import.meta.url),
      ),
    },
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
  },
});
