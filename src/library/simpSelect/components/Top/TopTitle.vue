<script setup lang="ts">
  import type { ISimpleSelectLocale, ISimpleSelectOption } from "@/library/simpSelect/simpSelect.types";
  import { getClass } from "@/library/simpSelect/simpSelect.utils";

  export interface IPropsSimpSelectTopTitleLocal {
    locale: ISimpleSelectLocale;
    localSelectedFull: ISimpleSelectOption[];
    titleRes: {
      fullString: "";
      result: "";
    };
    countShowSelected?: number;
    isOnlyPlaceholder: boolean;
    sepChars: string;
    options: ISimpleSelectOption[];
  }
  defineProps<IPropsSimpSelectTopTitleLocal>();
</script>

<template>
  <div
    :title="titleRes.fullString"
    :class="[
      getClass('title'),
      {
        [getClass('title--placeholder')]: !localSelectedFull.length,
        [getClass('title--fill')]: localSelectedFull.length,
        [getClass('title--full')]: localSelectedFull.length === options.length,
      },
    ]"
    v-html="titleRes.result || ''"
  />
</template>

<style scoped lang="scss"></style>
