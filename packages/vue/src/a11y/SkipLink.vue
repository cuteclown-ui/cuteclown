<script setup lang="ts">
import { skipLinkProps } from "../../../core/src/a11y/skipLink.ts";

const props = withDefaults(defineProps<{ href?: string }>(), { href: "#main" });
const link = skipLinkProps(props.href);
</script>

<template>
  <a :class="link.className" :href="link.href">Skip to main content</a>
</template>
