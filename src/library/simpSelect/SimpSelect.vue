<script setup lang="ts">
  import { defineModel, provide, readonly, ref, watch, onBeforeMount, nextTick } from "vue";
  import { useSlots } from "vue";
  import type {
    ISimpleSelected,
    ISimpleSelectedMulti,
    ISimpleSelectLocale,
    ISimpleSelectOption,
    ISimpleSelectOptionGroup,
  } from "./simpSelect.types";
  import { simpleSelectLocale } from "@/library/simpSelect/simpSelect.consts";
  import {
    cloneModelValue,
    cloneObj,
    deepEqual,
    getClass,
    transformOptionWithGroup,
  } from "@/library/simpSelect/simpSelect.utils";
  import Top from "@/library/simpSelect/components/Top/Top.vue";
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

  export interface ISimpleSelectProps {
    options: ISimpleSelectOption[] | ISimpleSelectOptionGroup[];

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
    default: "",
  });
  const modelFullSelected = defineModel("fullSelected");
  const $wrapper = ref<HTMLDivElement | null>(null);

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

  const localSelected = ref<ISimpleSelected>(props.multiple ? [] : "");
  const localSelectedFull = ref<ISimpleSelectOption[]>([]);

  // provide(keyInjectLocalSelectedFull, localSelectedFull);

  watch(
    model,
    () => {
      if (!deepEqual(model.value, localSelected.value)) {
        localSelected.value = cloneModelValue(model.value);
      }
    },
    { immediate: true, deep: true },
  );
  watch(
    () => props.options,
    () => {
      const res = updateLocalSelectedFull(model.value);
      if (!res.length) {
        localSelected.value = props.multiple ? [] : "";
      }
      if (modelFullSelected.value && !deepEqual(modelFullSelected.value, localSelectedFull.value)) {
        modelFullSelected.value = cloneObj(localSelectedFull.value);
      }
    },
    { deep: true },
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
    const options = [];
    const target = e.target as HTMLSelectElement;
    if (props.multiple) {
      for (let i = 0; i < target.options.length; i++) {
        const option = target.options[i];
        if (option.selected) {
          options.push(option.value);
        }
      }
      // model.value = options;
      localSelected.value = options;
    } else {
      localSelected.value = target.value;
    }
    nextTick(() => {
      updateOutsideModels("other");
    });
  };
  const setToggleOption: setToggleOptionType = (item: ISimpleSelectOption) => {
    // if select single, set single value
    if (!props.multiple) {
      localSelected.value = item[props.keyValue];
      return;
    }

    // multiselect
    const selectedValues = localSelected.value as ISimpleSelectedMulti;
    // if nothing selected
    if (!selectedValues || !selectedValues.length) {
      localSelected.value = [item[props.keyValue]];
      return;
    }
    if (!Array.isArray(localSelected.value)) {
      localSelected.value = [localSelected.value];
    }

    const index = selectedValues.indexOf(item[props.keyValue]);
    if (index !== -1) {
      (localSelected.value as ISimpleSelectedMulti).splice(index, 1);
    } else {
      (localSelected.value as ISimpleSelectedMulti).push(item[props.keyValue]);
    }
  };

  const updateLocalSelectedFull = (newVal: ISimpleSelected): ISimpleSelectOption[] => {
    // сохраняем полную информацию выбранных
    const isArray = Array.isArray(newVal);
    const transformOptions: ISimpleSelectOption[] = transformOptionWithGroup(props.options);

    localSelectedFull.value = transformOptions.filter(el => {
      if (isArray) {
        return newVal.includes(el[props.keyValue]);
      }
      return newVal.toString() === el[props.keyValue].toString();
    });

    return localSelectedFull.value;
  };

  onBeforeMount(() => {
    updateLocalSelectedFull(localSelected.value);
    updateOutsideModels("onBeforeMount");
  });

  watch(
    localSelected,
    newVal => {
      updateLocalSelectedFull(newVal);
      if (!props.isConfirmInMulti) {
        updateOutsideModels("mainWatch");
      }
    },
    {
      deep: true,
    },
  );

  const updateOutsideModelsFull = () => {
    modelFullSelected.value = cloneObj(localSelectedFull.value);
  };
  const updateOutsideModelsSelected = () => {
    model.value = cloneModelValue(localSelected.value);
  };
  const updateOutsideModels: updateOutsideModelsType = () => {
    updateOutsideModelsSelected();
    updateOutsideModelsFull();
  };
  const resetSelectedByDontConfirm = () => {
    localSelected.value = cloneModelValue(model.value);
    // modelFullSelected.value = cloneObj(localSelectedFull.value);
  };

  const resetAll = (isConfirm: boolean) => {
    localSelected.value = props.multiple ? [] : "";
    if (isConfirm) {
      nextTick(() => {
        updateOutsideModels("other");
        isLocalOpen.value = false;
      });
    }
  };
  const selectAll = (isConfirm: boolean) => {
    localSelected.value = transformOptionWithGroup(props.options).map(el => el[props.keyValue]);
    if (isConfirm) {
      nextTick(() => {
        updateOutsideModels("other");
        isLocalOpen.value = false;
      });
    }
  };

  const getSelected = (item: ISimpleSelectOption): boolean => {
    if (typeof localSelected.value === "object") {
      return localSelected.value.includes(item[props.keyValue]);
    } else {
      return localSelected.value.toString() === item[props.keyValue].toString();
    }
  };

  provide<ILocalStoreStore>(keyInjectLocalStore, {
    isLocalOpen,
    setIsLocalOpen,
    localSelectedFull,
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
    componentItemList: slots.itemList || BodyListItem,
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
