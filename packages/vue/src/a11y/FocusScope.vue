<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { createFocusScope } from "../../../core/src/focus/FocusScope.ts";

const root = ref<HTMLElement | null>(null);
let dispose = () => undefined;

onMounted(() => {
  if (root.value) {
    dispose = createFocusScope(root.value).dispose;
  }
});

onUnmounted(() => dispose());
</script>

<template>
  <div ref="root">
    <slot />
  </div>
</template>
