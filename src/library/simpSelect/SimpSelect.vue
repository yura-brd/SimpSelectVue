<script setup lang="ts">
  import { defineModel, provide, readonly, ref, watch, onBeforeMount, nextTick, computed } from "vue";
  import { useSlots } from "vue";
  import type {
    ICheckedCountAndInfo,
    ISimpleSelected,
    ISimpleSelectLocale,
    ISimpleSelectOption,
    optionsItemsType,
  } from "./simpSelect.types";
  import { simpleSelectLocale } from "./simpSelect.consts";
  import { equalModels, getClass, transformOptionWithGroup } from "./simpSelect.utils";
  import Top from "./components/Top/Top.vue";
  import type {
    ILocalStoreStore,
    ITitleResult,
    setIsLocalOpenType,
    setToggleOptionType,
    updateOutsideModelsType,
  } from "@/library/simpSelect/simpSelect.local.types";
  import { keyInjectLocalStore, keyInjectPropsAll } from "@/library/simpSelect/simpSelect.keys";
  import Body from "@/library/simpSelect/components/Body/Body.vue";
  import BodyListItem from "@/library/simpSelect/components/Body/BodyListItem.vue";
  import TopTitle from "@/library/simpSelect/components/Top/TopTitle.vue";
  import BottomControls from "@/library/simpSelect/components/Body/BottomControls/BottomControls.vue";
  import BottomControlsOk from "@/library/simpSelect/components/Body/BottomControls/BottomControlsOk.vue";
  import BottomControlsNo from "@/library/simpSelect/components/Body/BottomControls/BottomControlsNo.vue";
  import SelectAllControls from "@/library/simpSelect/components/Body/SelectAllControls/SelectAllControls.vue";
  import SelectAllControlSelect from "@/library/simpSelect/components/Body/SelectAllControls/SelectAllControlSelect.vue";
  import SelectAllControlReset from "@/library/simpSelect/components/Body/SelectAllControls/SelectAllControlReset.vue";
  import NativeSelect from "@/library/simpSelect/components/NativeSelect.vue";
  import TopIconArrow from "@/library/simpSelect/components/Top/TopIconArrow.vue";
  import Loader from "@/library/simpSelect/components/Loader.vue";
  import BodyListItemEmpty from "@/library/simpSelect/components/Body/BodyListItemEmpty.vue";

  export interface ISimpleSelectProps {
    options: optionsItemsType;

    disabled?: boolean;
    multiple?: boolean;
    countShowSelected?: number | null;
    sepChars?: string;
    isRemoveTop?: boolean;
    locale?: ISimpleSelectLocale;
    titleMain?: string;
    isOnlyPlaceholder?: boolean;
    isAlwaysOpen?: boolean;

    isSearch?: boolean;
    isCloneTitleToSearch?: boolean;
    searchTypeInput?: string;
    isSearchInDropdown?: boolean;
    searchFieldsKeys?: string[];

    isConfirmInMulti?: boolean;
    isConfirmInMultiOkClickOutside?: boolean;

    keyValue?: string;
    keyTitle?: string;

    isSimpleShowCheckbox?: boolean;

    selectAll?: boolean;
    selectAllAfterClose?: boolean;
    resetAll?: boolean;
    resetAllAfterClose?: boolean;
    isUp?: boolean;

    isLoading?: boolean;

    isNative?: boolean;
    isFloat?: boolean;
  }
  const slots = useSlots();

  const props = withDefaults(defineProps<ISimpleSelectProps>(), {
    multiple: false,
    disabled: false,
    sepChars: ",",
    countShowSelected: 2,
    isRemoveTop: false,
    isOnlyPlaceholder: false,
    isCloneTitleToSearch: true,
    isAlwaysOpen: false,
    isConfirmInMulti: false,
    isConfirmInMultiOkClickOutside: false,
    isSimpleShowCheckbox: false,
    isLoading: false,
    titleMain: "",
    locale: () => simpleSelectLocale,

    isNative: false,
    isUp: false,

    selectAll: false,
    selectAllAfterClose: true,
    resetAll: false,
    resetAllAfterClose: true,

    searchTypeInput: "search",
    isSearch: true,
    isSearchInDropdown: false,

    isFloat: false,

    keyValue: "value",
    keyTitle: "name",

    searchFieldsKeys: () => ["name"],
  });
  provide(keyInjectPropsAll, readonly(props));

  const emits = defineEmits(["callbackOpen", "callbackClose"]);

  const model = defineModel<ISimpleSelected>({
    default: null,
  });
  // const modelFullSelected = defineModel("fullSelected");
  const $wrapper = ref<HTMLDivElement | null>(null);

  const optionsTransform = computed(() => transformOptionWithGroup(props.options));
  const selectedCount = computed<ICheckedCountAndInfo>(() => {
    const result = {
      countChecked: 0,
      countCheckedFull: 0, // only if value not empty
      isMultiSelectedAll: "no",
    };

    if (!localSelected.value) {
      return result;
    }
    if (!Array.isArray(localSelected.value)) {
      result.countChecked = 1;
      if (localSelected.value[props.keyValue]) {
        result.countCheckedFull = 1;
      }
      return result;
    } else {
      result.countChecked = localSelected.value.length;
      result.countCheckedFull = localSelected.value.filter(el => el[props.keyValue]).length;
      if (localSelected.value.length === optionsTransform.value.length) {
        result.isMultiSelectedAll = "yes";
      }
    }

    return result;
  });

  const searchText = ref<string>("");
  const setSearchText = (str?: string) => {
    searchText.value = str || "";
  };

  const titleText = ref<ITitleResult>({
    fullString: props.titleMain,
    result: props.titleMain,
  });
  const setTitleText = (data: ITitleResult) => {
    titleText.value = data;
  };

  const isLocalOpen = ref(false);
  const setIsLocalOpen: setIsLocalOpenType = (isOpen?: boolean) => {
    if (props.disabled) {
      return;
    }
    if (isOpen === true || isOpen === false) {
      isLocalOpen.value = isOpen;
    } else {
      isLocalOpen.value = !isLocalOpen.value;
    }
  };
  watch(isLocalOpen, newVal => {
    if (newVal) {
      emits("callbackOpen");
    } else {
      emits("callbackClose");
    }
  });

  const localSelected = ref<ISimpleSelected>(null);
  // const localSelectedFull = ref<ISimpleSelectOption[]>([]);

  // provide(keyInjectLocalSelectedFull, localSelectedFull);

  watch(
    model,
    () => {
      if (!equalModels(model.value, localSelected.value, props.keyValue)) {
        localSelected.value = model.value;
      }
    },
    { immediate: true, deep: true },
  );
  // TODO сделать сравнение, выбранных. Если не совпадают, обновить
  // watch(
  //   () => [localSelected, localSelectedFull],
  //   ([localSelectedNew, localSelectedFullNew]) => {
  //     const isArray = Array.isArray(localSelectedNew.value);
  //
  //     localSelectedFull.value.forEach(el => {
  //       let wrong = true;
  //       if (isArray) {
  //         wrong = (localSelectedNew.value as ISimpleSelectedMulti).includes(el.value);
  //       }
  //       wrong = localSelectedNew.value.toString() === el.value.toString();
  //     });
  //   },
  //   { deep: true },
  // );

  const changeHandler = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    if (props.multiple) {
      const optionsRes: string[] = [];
      for (let i = 0; i < target.options.length; i++) {
        const option = target.options[i];
        if (option.selected) {
          optionsRes.push(option.value);
        }
      }
      localSelected.value = transformOptionWithGroup(props.options).filter(optionItem =>
        optionsRes.includes(optionItem[props.keyValue]),
      );
    } else {
      localSelected.value = transformOptionWithGroup(props.options).filter(
        optionItem => optionItem[props.keyValue] === target.value,
      );
    }
    nextTick(() => {
      updateOutsideModels("other");
    });
  };
  const setToggleOption: setToggleOptionType = (item: ISimpleSelectOption) => {
    // if select single, set single value
    if (!props.multiple) {
      localSelected.value = item;
      return;
    }

    // multiselect
    // if nothing selected
    if (!localSelected.value || (Array.isArray(localSelected.value) && !localSelected.value.length)) {
      localSelected.value = [item];
      return;
    }
    if (!Array.isArray(localSelected.value)) {
      if (localSelected.value) {
        localSelected.value = [localSelected.value];
      } else {
        localSelected.value = [];
      }
    }

    const index: boolean = localSelected.value.some(
      (itemOption: ISimpleSelectOption) => item[props.keyValue] === itemOption[props.keyValue],
    );

    if (index) {
      (localSelected.value as ISimpleSelectOption[]) = localSelected.value.filter(
        (itemOption: ISimpleSelectOption) => item[props.keyValue] !== itemOption[props.keyValue],
      );
    } else {
      (localSelected.value as ISimpleSelectOption[]).push(item);
    }
  };

  onBeforeMount(() => {
    // updateLocalSelectedFull(localSelected.value);
    updateOutsideModels("onBeforeMount");
  });

  watch(
    localSelected,
    newVal => {
      // updateLocalSelectedFull(newVal);
      if (!props.isConfirmInMulti) {
        updateOutsideModels("mainWatch");
      }
    },
    {
      deep: true,
    },
  );

  const updateOutsideModelsSelected = () => {
    if (!equalModels(model.value, localSelected.value, props.keyValue)) {
      model.value = localSelected.value;
    }
  };
  const updateOutsideModels: updateOutsideModelsType = () => {
    updateOutsideModelsSelected();
  };
  const resetSelectedByDontConfirm = () => {
    localSelected.value = model.value;
  };

  const resetAll = (isConfirm: boolean) => {
    localSelected.value = props.multiple ? [] : null;
    if (isConfirm) {
      nextTick(() => {
        updateOutsideModels("other");
        isLocalOpen.value = false;
      });
    }
  };
  const selectAll = (isConfirm: boolean) => {
    localSelected.value = transformOptionWithGroup(props.options);
    if (isConfirm) {
      nextTick(() => {
        updateOutsideModels("other");
        isLocalOpen.value = false;
      });
    }
  };

  const getSelected = (item: ISimpleSelectOption): boolean => {
    if (!localSelected.value) {
      return false;
    }
    if (Array.isArray(localSelected.value)) {
      return localSelected.value.some(itemOption => item[props.keyValue] === itemOption[props.keyValue]);
    }
    return localSelected.value[props.keyValue].toString() === item[props.keyValue].toString();
  };

  provide<ILocalStoreStore>(keyInjectLocalStore, {
    isLocalOpen,
    setIsLocalOpen,
    localSelected,
    $wrapper,
    searchText,
    setSearchText,
    titleText,
    setTitleText,
    getSelected,
    setToggleOption,
    updateOutsideModels,
    resetSelectedByDontConfirm,
    resetAll,
    selectAll,
    selectedCount,
    componentItemListItem: slots.itemListItem || BodyListItem,
    componentItemListItemEmpty: slots.itemListItemEmpty || BodyListItemEmpty,
    componentTitle: slots.title || TopTitle,

    componentBottomControl: slots.bottomControl || BottomControls,
    componentBottomControlOk: slots.bottomControlOk || BottomControlsOk,
    componentBottomControlNo: slots.bottomControlNo || BottomControlsNo,

    componentSelectAllControls: slots.selectControls || SelectAllControls,
    componentSelectAllControlsSelect: slots.selectControlsSelect || SelectAllControlSelect,
    componentSelectAllControlsReset: slots.selectControlsReset || SelectAllControlReset,

    componentArrowIcon: slots.arrowIcon || TopIconArrow,
    componentLoading: slots.loading || Loader,
  });

  defineExpose({
    setIsLocalOpen,
  });
</script>

<template>
  <div
    ref="$wrapper"
    :data-count-all="optionsTransform.length"
    :data-count-checked="selectedCount.countChecked"
    :data-count-checked-full="selectedCount.countCheckedFull"
    :data-check-all-multi="selectedCount.isMultiSelectedAll"
    :class="[
      ['SimpleSel'],
      {
        [getClass('multi', true)]: multiple,
        [getClass('single', true)]: !multiple,
        [getClass('body-always_open', true)]: isAlwaysOpen,
        [getClass('float', true)]: isFloat,
        [getClass('disabled', true)]: disabled,
        [getClass('open', true)]: isLocalOpen,
        [getClass('up', true)]: isUp,
        [getClass('loading', true)]: isLoading,
      },
    ]"
  >
    <NativeSelect v-if="props.isNative" v-model="model" @change-handler="changeHandler" />

    <Top @set-is-local-open="setIsLocalOpen" />
    <Body v-if="!props.isNative" />
  </div>
</template>
