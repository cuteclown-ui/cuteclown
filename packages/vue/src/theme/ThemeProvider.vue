<script setup lang="ts">
import { computed, provide, watchEffect } from "vue";
import { themeKey, type ThemeState } from "./useTheme.ts";

const props = withDefaults(
  defineProps<{
    theme?: string;
    density?: string;
    motion?: ThemeState["motion"];
    dir?: ThemeState["dir"];
  }>(),
  { theme: "light", density: "comfortable", motion: "system", dir: "ltr" },
);

const state = computed<ThemeState>(() => ({
  theme: props.theme,
  density: props.density,
  motion: props.motion,
  dir: props.dir,
}));

provide(themeKey, state);

watchEffect((onCleanup) => {
  if (typeof document === "undefined") {
    return;
  }
  const root = document.documentElement;
  root.dataset.ccTheme = state.value.theme;
  root.dataset.ccDensity = state.value.density;
  root.dataset.ccMotion = state.value.motion;
  root.setAttribute("dir", state.value.dir);
  onCleanup(() => {
    delete root.dataset.ccTheme;
    delete root.dataset.ccDensity;
    delete root.dataset.ccMotion;
    root.removeAttribute("dir");
  });
});
</script>

<template>
  <slot />
</template>
