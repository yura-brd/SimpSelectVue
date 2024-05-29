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
    // if (props.selectedCount.isMultiSelectedAll === "yes") {
    //   return;
    // }
    props.callback();
  };
</script>

<template>
  <button
    :class="[
      classInit,
      getClass('select_all', true, classInit),
      { [getClass('select_all-disabled', true, classInit)]: selectedCount.isMultiSelectedAll === 'yes' },
    ]"
    @click="callbackHandler"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      :class="[getClass('select_all__icon')]"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
    {{ locale?.selectAll }}
  </button>
</template>

<style scoped lang="scss"></style>
