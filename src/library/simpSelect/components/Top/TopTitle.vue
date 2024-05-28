<script setup lang="ts">
import type {
  ISimpleSelected,
  ISimpleSelectLocale,
  optionsItemsType
} from '@/library/simpSelect/simpSelect.types';
import { getClass, transformOptionWithGroup } from '@/library/simpSelect/simpSelect.utils';
  import { computed } from "vue";


  export interface IPropsSimpSelectTopTitleLocal {
    locale: ISimpleSelectLocale;
    localSelected: ISimpleSelected;
    titleRes: {
      fullString: "";
      result: "";
    };
    countShowSelected?: number;
    isOnlyPlaceholder: boolean;
    sepChars: string;
    options: optionsItemsType;
  }
  const props = defineProps<IPropsSimpSelectTopTitleLocal>();

  const isClasses = computed(() => {
    const res = {
      placeholder: false,
      fill: false,
      full: false,
    }
    const itemsOptions = transformOptionWithGroup(props.options);
    if (!props.localSelected || (Array.isArray(props.localSelected) && !props.localSelected.length)) {
      res.placeholder = true;
      return res;
    }
    res.fill = true;
    if (Array.isArray(props.localSelected) && itemsOptions.length === props.localSelected.length) {
      res.full = true;
    }
    return res;
  })
</script>

<template>
  <div
    :title="titleRes.fullString"
    :class="[
      getClass('title'),
      {
        [getClass('title--placeholder')]: isClasses.placeholder,
        [getClass('title--fill')]: isClasses.fill,
        [getClass('title--full')]: isClasses.full,
      },
    ]"
    v-html="titleRes.result || ''"
  />
</template>

<style scoped lang="scss"></style>
