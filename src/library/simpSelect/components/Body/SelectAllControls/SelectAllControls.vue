<script setup lang="ts">
  import { getClass } from "@/library/simpSelect/simpSelect.utils";
  import { inject } from "vue";
  import type { ILocalStoreStore } from "@/library/simpSelect/simpSelect.local.types";
  import { keyInjectLocalStore, keyInjectPropsAll } from "@/library/simpSelect/simpSelect.keys";
  import type { ISimpleSelectLocale } from "@/library/simpSelect/simpSelect.types";
  import type { ISimpleSelectProps } from "@/library/simpSelect/SimpSelect.vue";

  interface IProps {
    select: () => void;
    reset: () => void;
    locale: ISimpleSelectLocale;
  }
  defineProps<IProps>();

  const initAllProps = inject<ISimpleSelectProps>(keyInjectPropsAll);
  const localStore = inject<ILocalStoreStore>(keyInjectLocalStore);

  const classInit = getClass("controls");
  const classInitItem = getClass("control");
</script>

<template>
  <div :class="[classInit]">
    <component
      :is="localStore!.componentSelectAllControlsSelect"
      v-if="initAllProps?.selectAll"
      :locale="locale"
      :class-init="classInitItem"
      :callback="select"
    />
    <component
      :is="localStore!.componentSelectAllControlsReset"
      v-if="initAllProps?.resetAll"
      :locale="locale"
      :class-init="classInitItem"
      :callback="reset"
    />
  </div>
</template>

<style scoped lang="scss"></style>
