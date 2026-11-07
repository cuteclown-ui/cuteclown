<script setup lang="ts">
import { visuallyHiddenStyle } from "../../../core/src/a11y/visuallyHidden.ts";
</script>

<template>
  <span class="cc-visually-hidden" :style="visuallyHiddenStyle">
    <slot />
  </span>
</template>
