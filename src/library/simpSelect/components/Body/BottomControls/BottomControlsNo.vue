<script setup lang="ts">
  import { getClass } from "@/library/simpSelect/simpSelect.utils";
  import type { ISimpleSelectLocale } from "@/library/simpSelect/simpSelect.types";

  defineEmits(["confirm", "cancellation"]);
  interface IProps {
    callback: () => void;
    classInit: string;
    locale: ISimpleSelectLocale;
  }
  defineProps<IProps>();
</script>

<template>
  <button :class="[classInit, getClass('no', true, classInit)]" @click="callback">
    {{ locale?.cancel }}
  </button>
</template>

<style scoped lang="scss"></style>
