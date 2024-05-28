<script setup lang="ts">
  import { getClass } from "@/library/simpSelect/simpSelect.utils";
  import { computed, type ComputedRef, inject, ref, watch } from "vue";
  import { keyInjectLocalStore, keyInjectPropsAll } from "@/library/simpSelect/simpSelect.keys";
  import type { ILocalStoreStore } from "@/library/simpSelect/simpSelect.local.types";
  import type { ISimpleSelectProps } from "@/library/simpSelect/SimpSelect.vue";

  export interface IProps {
    searchTypeInput?: string;
    isDropdown?: boolean;
  }

  withDefaults(defineProps<IProps>(), {
    searchTypeInput: "search",
    isDropdown: false,
  });
  defineEmits([""]);

  const textInput = ref("");

  const initAllProps = inject<ISimpleSelectProps>(keyInjectPropsAll);
  const localStore = inject<ILocalStoreStore>(keyInjectLocalStore);

  const $input = ref<HTMLInputElement | null>(null);

  const initClass = getClass("search");

  const tabIndex = computed(() => {
    return localStore?.isLocalOpen.value ? 0 : -1;
  });

  watch(textInput, newVal => {
    localStore?.setSearchText(newVal);
  });
  watch(
    () => localStore?.isLocalOpen.value,
    newVal => {
      if (!newVal) {
        textInput.value = "";
      }
    },
  );
  watch(
    () => localStore?.isLocalOpen.value,
    newVal => {
      if (newVal) {
        setTimeout(() => {
          $input.value?.focus();
        }, 20);
      }
    },
  );

  const placeholder: ComputedRef<string> = computed(() => {
    let res = initAllProps?.locale?.searchText || "";
    if (initAllProps?.isCloneTitleToSearch && localStore?.localSelected.value) {
      if (Array.isArray(localStore.localSelected.value) && !localStore.localSelected.value.length) {
        return res;
      }
      res = localStore.titleText.value.fullString;
    }
    return res;
  });
</script>

<template>
  <input
    ref="$input"
    v-model="textInput"
    :class="[
      initClass,
      {
        [getClass('top', true, initClass)]: !isDropdown,
        [getClass('dropdown', true, initClass)]: isDropdown,
      },
    ]"
    :type="searchTypeInput"
    :tabindex="tabIndex"
    :placeholder="placeholder"
    autocomplete="off"
    aria-autocomplete="none"
    inputmode="none"
  />
</template>

<style scoped lang="scss"></style>
