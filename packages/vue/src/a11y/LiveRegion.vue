<script setup lang="ts">
import { onUnmounted, watch } from "vue";
import { createAnnouncer, type Politeness } from "../../../core/src/live/announcer.ts";

const props = withDefaults(defineProps<{ message: string; politeness?: Politeness }>(), { politeness: "polite" });
const announcer = typeof document === "undefined" ? undefined : createAnnouncer();

watch(
  () => [props.message, props.politeness] as const,
  ([message, politeness]) => announcer?.announce(message, politeness),
  { immediate: true },
);

onUnmounted(() => announcer?.dispose());
</script>

<template><span hidden /></template>
