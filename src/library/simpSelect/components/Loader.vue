<script setup lang="ts">
  import { getClass } from "@/library/simpSelect/simpSelect.utils";

  const initClassWrap = getClass("loader_wrap");
  const initClass = getClass("loader");
</script>

<template>
  <div :class="[initClassWrap]">
    <div :class="[initClass]" />
  </div>
</template>
