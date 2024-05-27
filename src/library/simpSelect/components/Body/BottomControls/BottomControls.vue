<script setup lang="ts">
  import { getClass } from "@/library/simpSelect/simpSelect.utils";
  import type { ISimpleSelectLocale } from "@/library/simpSelect/simpSelect.types";
  import { inject } from "vue";
  import type { ILocalStoreStore } from "@/library/simpSelect/simpSelect.local.types";
  import { keyInjectLocalStore } from "@/library/simpSelect/simpSelect.keys";

  interface IProps {
    confirm: () => void;
    cancellation: () => void;
    locale: ISimpleSelectLocale;
  }
  defineProps<IProps>();

  const localStore = inject<ILocalStoreStore>(keyInjectLocalStore);

  const classInit = getClass("bottom_controls");
  const classInitItem = getClass("bottom_control");
</script>

<template>
  asdas
  <div :class="[classInit]">
    <component
      :is="localStore!.componentBottomControlOk"
      :class-init="classInitItem"
      :callback="confirm"
      :locale="locale"
    />
    <component
      :is="localStore!.componentBottomControlNo"
      :class-init="classInitItem"
      :callback="cancellation"
      :locale="locale"
    />
  </div>
</template>

<style scoped lang="scss"></style>
