<script setup lang="ts">
  import { getClass } from "@/library/simpSelect/simpSelect.utils";
  import { inject, ref, watch } from "vue";
  import { keyInjectLocalStore, keyInjectPropsAll } from "@/library/simpSelect/simpSelect.keys";
  import type { ISimpleSelectProps } from "@/library/simpSelect/SimpSelect.vue";
  import Search from "@/library/simpSelect/components/Search.vue";
  import type { ILocalStoreStore } from "@/library/simpSelect/simpSelect.local.types";
  import BodyList from "./BodyList.vue";

  const initAllProps = inject<ISimpleSelectProps>(keyInjectPropsAll);

  const localStore = inject<ILocalStoreStore>(keyInjectLocalStore);

  const activePosition = ref<number | null>(null);
  const itemsOption = ref<HTMLElement[]>([]);

  const toggleOpenBodyClass = getClass("body_open", true);

  const closeClickOutside = (e: Event) => {
    const target = e.target as HTMLDivElement;
    if (!localStore?.$wrapper?.value) {
      return;
    }
    if (!localStore.$wrapper.value.contains(target) && target !== localStore.$wrapper.value) {
      localStore?.setIsLocalOpen(false);
      if (initAllProps?.isConfirmInMulti && initAllProps.isConfirmInMultiOkClickOutside) {
        localStore.updateOutsideModels("clickOutside");
      } else {
        localStore.resetSelectedByDontConfirm();
      }
    }
  };
  const closeEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      localStore?.setIsLocalOpen(false);
      localStore?.resetSelectedByDontConfirm();
    }
  };
  const focusOut = (e: FocusEvent) => {
    const target = e.relatedTarget as HTMLElement;
    if (target && !localStore?.$wrapper.value?.contains(target)) {
      localStore?.setIsLocalOpen(false);
    }
  };
  watch(
    () => localStore?.isLocalOpen.value,
    newVal => {
      if (initAllProps?.isFloat) {
        document?.body?.classList.toggle(toggleOpenBodyClass, newVal);
      }
      if (typeof window !== "undefined") {
        if (newVal) {
          document?.addEventListener("click", closeClickOutside);
          document?.addEventListener("keyup", closeEsc);
          document?.addEventListener("focusout", focusOut);
        } else {
          document?.removeEventListener("click", closeClickOutside);
          document?.removeEventListener("keyup", closeEsc);
          document?.removeEventListener("focusout", focusOut);
        }
      }
    },
    {
      immediate: !0,
    },
  );
  watch(activePosition, newVal => {
    if (!newVal && newVal !== 0) {
      return;
    }
    const cur = itemsOption.value[newVal];
    if (cur) {
      cur.focus();
    }
  });

  const buttonControlConfirm = () => {
    localStore?.setIsLocalOpen(false);
    localStore!.updateOutsideModels("ok");
  };
  const buttonControlCancel = () => {
    localStore?.setIsLocalOpen(false);
    localStore?.resetSelectedByDontConfirm();
  };
  const selectAll = () => {
    localStore?.selectAll(!!initAllProps?.selectAllAfterClose);
  };
  const resetAll = () => {
    localStore?.resetAll(!!initAllProps?.resetAllAfterClose);
  };
</script>

<template>
  <div
    :class="[
      getClass('body'),
      {
        [getClass('body-always_open', true)]: initAllProps?.isAlwaysOpen,
      },
    ]"
  >
    <Search
      v-if="initAllProps?.isSearch && initAllProps.isSearchInDropdown"
      :search-type-input="initAllProps?.searchTypeInput"
      :is-dropdown="true"
    />

    <component
      :is="localStore!.componentSelectAllControls"
      v-if="initAllProps?.selectAll || initAllProps?.resetAll"
      :select="selectAll"
      :reset="resetAll"
      :locale="initAllProps!.locale"
    />

    <BodyList />

    <component
      :is="localStore!.componentBottomControl"
      v-if="initAllProps?.isConfirmInMulti"
      :confirm="buttonControlConfirm"
      :cancellation="buttonControlCancel"
      :locale="initAllProps!.locale"
    />
  </div>
</template>

<style scoped lang="scss"></style>
