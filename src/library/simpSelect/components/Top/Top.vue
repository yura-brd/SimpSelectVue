<script setup lang="ts">
  import { getClass } from "@/library/simpSelect/simpSelect.utils";

  import { computed, inject } from "vue";
  import { keyInjectLocalStore, keyInjectPropsAll } from "@/library/simpSelect/simpSelect.keys";
  import type { ISimpleSelectProps } from "../../SimpSelect.vue";
  import Search from "../Search.vue";
  import type { ILocalStoreStore, ITitleResult } from "../../simpSelect.local.types";
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
    const resTitle: ITitleResult = {
      fullString: initAllProps?.titleMain || initAllProps?.locale!.title || "",
      result: initAllProps?.titleMain || initAllProps?.locale!.title || "",
    };
    if (!localStore?.localSelected.value) {
      return resTitle;
    }

    if (Array.isArray(localStore.localSelected.value)) {
      const selectedLength = localStore.localSelected.value.length;
      if (selectedLength && !initAllProps?.isOnlyPlaceholder) {
        const arrNames = localStore.localSelected.value.map(el => el[initAllProps!.keyTitle as string]);
        resTitle.fullString = arrNames.join(initAllProps?.sepChars);
        if (initAllProps?.countShowSelected && initAllProps.countShowSelected < selectedLength) {
          resTitle.result = `${initAllProps?.locale!.selected} ${selectedLength}`;
        } else {
          resTitle.result = arrNames.join(initAllProps?.sepChars);
        }
      }
      if (initAllProps!.options.length && selectedLength === initAllProps!.options.length) {
        resTitle.result += ` <span >(${initAllProps?.locale!.all})<span>`;
      }
    } else {
      resTitle.fullString = localStore.localSelected.value[initAllProps!.keyTitle as string];
      resTitle.result = localStore.localSelected.value[initAllProps!.keyTitle as string];
    }

    localStore.setTitleText(resTitle);
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
        :local-selected="localStore!.localSelected.value"
        :title-res="titleRes"
        :count-show-selected="initAllProps?.countShowSelected"
        :is-only-placeholder="initAllProps?.isOnlyPlaceholder"
        :sep-chars="initAllProps!.sepChars"
        :options="initAllProps!.options"
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
