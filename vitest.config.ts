import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";
import { workspaceProjects } from "./vitest.workspace.ts";

/** Include a workspace package only when it has its own Vitest project. */
export function packageProjectDirs(repoRoot: string, globs: readonly string[]): string[] {
  const projects: string[] = [];
  for (const glob of globs) {
    const dir = join(repoRoot, glob.replace(/\/\*$/, ""));
    if (!existsSync(dir)) {
      continue;
    }
    for (const name of readdirSync(dir)) {
      if (name.startsWith(".")) {
        continue;
      }
      const pkg = join(dir, name);
      if (existsSync(join(pkg, "vitest.config.ts"))) {
        projects.push(pkg);
      }
    }
  }
  return projects;
}

export default defineConfig({
  test: {
    projects: [
      {
        plugins: [vue()],
        test: {
          name: "root",
          include: ["scripts/**/*.test.ts", "packages/**/*.test.ts", "packages/**/*.test.tsx"],
        },
      },
      ...packageProjectDirs(fileURLToPath(new URL(".", import.meta.url)), workspaceProjects),
    ],
    passWithNoTests: true,
  },
});
