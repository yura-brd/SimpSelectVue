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
  <button :class="[classInit, getClass('reset_all', true, classInit)]" @click="callback">
    <span :class="[getClass('reset_all__icon')]" />
    {{ locale?.resetAll }}
  </button>
</template>

<style scoped lang="scss"></style>
