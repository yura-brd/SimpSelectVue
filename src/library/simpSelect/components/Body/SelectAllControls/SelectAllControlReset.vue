<script setup lang="ts">
  import { getClass } from "@/library/simpSelect/simpSelect.utils";
  import type { ICheckedCountAndInfo, ISimpleSelectLocale } from "@/library/simpSelect/simpSelect.types";

  interface IProps {
    callback: () => void;
    classInit: string;
    locale: ISimpleSelectLocale;
    selectedCount: ICheckedCountAndInfo;
  }
  const props = defineProps<IProps>();

  const callbackHandler = () => {
    // if (props.selectedCount.countChecked === 0) {
    //   return;
    // }
    props.callback();
  };
</script>

<template>
  <button
    :class="[
      classInit,
      getClass('reset_all', true, classInit),
      { [getClass('reset_all-disabled', true, classInit)]: selectedCount.countChecked === 0 },
    ]"
    @click="callbackHandler"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      :class="[getClass('reset_all__icon')]"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>

    {{ locale?.resetAll }}
  </button>
</template>

<style scoped lang="scss"></style>
