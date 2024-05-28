<script setup lang="ts">
  import { getClass } from "@/library/simpSelect/simpSelect.utils";

  import { computed, inject } from "vue";
  import { keyInjectLocalStore, keyInjectPropsAll } from "@/library/simpSelect/simpSelect.keys";
  import type { ISimpleSelectProps } from "@/library/simpSelect/SimpSelect.vue";
  import Search from "../Search.vue";
  import type { ILocalStoreStore, ITitleResult } from "@/library/simpSelect/simpSelect.local.types";
  // export interface IProps {}

  defineEmits(["setIsLocalOpen"]);

  // withDefaults(defineProps<IProps>(), {
  //   createComponentTitle: TopTitle,
  // });

  const initAllProps = inject<ISimpleSelectProps>(keyInjectPropsAll);
  const localStore = inject<ILocalStoreStore>(keyInjectLocalStore);

  const tabIndex = computed(() => {
    if (initAllProps?.disabled) {
      return -1;
    }
    return localStore?.isLocalOpen.value ? -1 : 0;
  });

  const keyOpen = () => {
    localStore?.setIsLocalOpen();
  };

  const titleRes = computed(() => {
    if (!localStore?.localSelectedFull.value) {
      return {
        fullString: "",
        result: "",
      };
    }

    const resTitle: ITitleResult = {
      fullString: initAllProps?.titleMain || initAllProps?.locale!.title || "",
      result: initAllProps?.titleMain || initAllProps?.locale!.title || "",
    };

    const selectedLength = localStore?.localSelectedFull.value.length;
    if (localStore?.localSelectedFull.value.length && !initAllProps?.isOnlyPlaceholder) {
      const arrNames = localStore?.localSelectedFull.value.map(el => el.name);
      resTitle.fullString = arrNames.join(initAllProps?.sepChars);
      if (initAllProps?.countShowSelected && initAllProps.countShowSelected < selectedLength) {
        resTitle.result = `${initAllProps?.locale!.selected} ${selectedLength}`;
      } else {
        resTitle.result = arrNames.join(initAllProps?.sepChars);
      }
    }
    if (initAllProps!.options.length && selectedLength === initAllProps.options.length) {
      resTitle.result += ` <span >(${initAllProps?.locale!.all})<span>`;
    }

    localStore?.setTitleText(resTitle);
    return resTitle;
  });
</script>

<template>
  <div :class="[getClass('top')]">
    <div
      v-if="!initAllProps?.isAlwaysOpen && !initAllProps?.isRemoveTop"
      :class="[getClass('top_body')]"
      :tabindex="tabIndex"
      @click="$emit('setIsLocalOpen')"
      @keydown.stop.prevent.enter="keyOpen"
    >
      <component
        :is="localStore!.componentTitle"
        :locale="initAllProps!.locale"
        :local-selected-full="localStore?.localSelectedFull.value"
        :titleRes="titleRes"
        :count-show-selected="initAllProps?.countShowSelected"
        :is-only-placeholder="initAllProps?.isOnlyPlaceholder"
        :sep-chars="initAllProps?.sepChars"
        :options="initAllProps?.options"
      />

      <component :is="localStore!.componentArrowIcon" v-if="!initAllProps?.isLoading" />
      <component :is="localStore!.componentLoading" v-if="initAllProps?.isLoading" />
    </div>

    <Search
      v-if="initAllProps?.isSearch && !initAllProps.isSearchInDropdown && !initAllProps?.isFloat"
      :search-type-input="initAllProps?.searchTypeInput"
      :is-dropdown="false"
    />
  </div>
</template>

<style scoped lang="scss"></style>
