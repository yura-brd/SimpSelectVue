<script setup lang="ts">
  import type { ISimpleSelectOption } from "@/library/simpSelect/simpSelect.types";
  import { getClass } from "@/library/simpSelect/simpSelect.utils";
  import { inject } from "vue";
  import { keyInjectPropsAll } from "@/library/simpSelect/simpSelect.keys";
  import type { ISimpleSelectProps } from "../../SimpSelect.vue";

  interface IProps {
    item: ISimpleSelectOption;
  }
  // const emits = defineEmits(["setIsLocalOpen", "optionClick"]);

  defineProps<IProps>();

  const initClas = getClass("list_item_body");
  const initAllProps = inject<ISimpleSelectProps>(keyInjectPropsAll);
</script>

<template>
  <div :class="[initClas]">
    <span v-if="initAllProps?.multiple || initAllProps?.isSimpleShowCheckbox" :class="[getClass('list_item_icon')]" />
    {{ item[initAllProps!.keyTitle as string] || "" }}
  </div>
</template>

<style scoped lang="scss"></style>
