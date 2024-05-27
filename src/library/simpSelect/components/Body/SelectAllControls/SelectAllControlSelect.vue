<script setup lang="ts">
  import { getClass } from "@/library/simpSelect/simpSelect.utils";
  import type { ISimpleSelectLocale } from "@/library/simpSelect/simpSelect.types";

  interface IProps {
    callback: () => void;
    classInit: string;
    locale: ISimpleSelectLocale;
  }
  defineProps<IProps>();
</script>

<template>
  <button :class="[classInit, getClass('select_all', true, classInit)]" @click="callback">
    <span :class="[getClass('select_all__icon')]" />

    {{ locale?.selectAll }}
  </button>
</template>

<style scoped lang="scss"></style>
