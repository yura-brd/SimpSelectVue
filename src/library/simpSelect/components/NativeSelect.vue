<script setup lang="ts">
  import { inject, onMounted, ref, defineModel } from "vue";
  import { keyInjectLocalStore, keyInjectPropsAll } from "@/library/simpSelect/simpSelect.keys";
  import type { ILocalStoreStore } from "../simpSelect.local.types";
  import type { ISimpleSelectProps } from "@/library/simpSelect/SimpSelect.vue";
  import type { ISimpleSelected, ISimpleSelectOption } from "../simpSelect.types";
  import { getClass } from "@/library/simpSelect/simpSelect.utils";

  const emits = defineEmits(["changeHandler", "changeSelectHandler"]);
  const initAllProps = inject<ISimpleSelectProps>(keyInjectPropsAll);

  const localStore = inject<ILocalStoreStore>(keyInjectLocalStore);
  const selectElem = ref<HTMLSelectElement | null>(null);

  const model = defineModel<ISimpleSelected>({
    default: null,
  });
  const changeHandler = (e: Event) => {
    emits("changeHandler", e);
  };
  const initClass = getClass("select_init");

  onMounted(() => {
    if (!selectElem.value) {
      return;
    }
    if (selectElem.value.value && !model.value) {
      emits("changeSelectHandler", selectElem.value);
      console.error("Value native select not matches with model");
    }
  });
</script>

<template>
  <select
    ref="selectElem"
    :tabindex="-1"
    :disabled="initAllProps!.disabled"
    :class="[initClass, getClass('native', true, initClass)]"
    :multiple="initAllProps!.multiple"
    @change.prevent="changeHandler"
  >
    <template v-for="(group, index) in initAllProps!.options" :key="index">
      <optgroup v-if="group.isOptgroupSelect" :label="group.label" :disabled="group.disabled">
        <option
          v-for="(item, ind) in group.items"
          :key="item.valueOf() + '_' + ind"
          :selected="localStore!.getSelected(item)"
          :disabled="item.disabled"
          :value="item.value"
        >
          {{ item[initAllProps!.keyTitle as string] }}
        </option>
      </optgroup>
      <template v-else>
        <option
          :key="group.valueOf() + '_' + index"
          :selected="localStore!.getSelected(group as ISimpleSelectOption)"
          :disabled="group.disabled"
          :value="(group as ISimpleSelectOption).value"
        >
          {{ (group as ISimpleSelectOption)[initAllProps!.keyTitle as string] }}
        </option>
      </template>
    </template>
  </select>
</template>

<style scoped lang="scss"></style>
