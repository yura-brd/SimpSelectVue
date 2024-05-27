<script setup lang="ts">
  import type { ISimpleSelectLocale } from "@/library/simpSelect/simpSelect.types";
  import { getClass } from "@/library/simpSelect/simpSelect.utils";

  interface IProps {
    callback: () => void;
    classInit: string;
    locale: ISimpleSelectLocale;
  }
  defineProps<IProps>();
</script>

<template>
  <button :class="[classInit, getClass('ok', true, classInit)]" @click="callback">{{ locale?.ok }}</button>
</template>

<style scoped lang="scss"></style>
