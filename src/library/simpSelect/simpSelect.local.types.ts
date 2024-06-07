import type { ICheckedCountAndInfo, ISimpleSelected, ISimpleSelectOption } from "./simpSelect.types";
import type { Component, ComputedRef, Ref } from "vue";

export type setIsLocalOpenType = (isOpen?: boolean) => void;

export type setToggleOptionType = (item: ISimpleSelectOption) => void;

type updateOutsideModelsTypeProps = "ok" | "clickOutside" | "onBeforeMount" | "mainWatch" | "other";
export type updateOutsideModelsType = (type: updateOutsideModelsTypeProps) => void;
export interface ILocalStoreStore {
  isLocalOpen: Ref<boolean>;
  setIsLocalOpen: setIsLocalOpenType;
  localSelected: Ref<ISimpleSelected>;
  // localSelectedFull: Ref<ISimpleSelectOption[]>;
  $wrapper: Ref<HTMLDivElement | null>;
  searchText: Ref<string>;
  setSearchText: (str?: string) => void;
  titleText: Ref<ITitleResult>;
  setTitleText: (data: ITitleResult) => void;
  getSelected: (item: ISimpleSelectOption) => boolean;
  setToggleOption: setToggleOptionType;
  updateOutsideModels: updateOutsideModelsType;
  resetSelectedByDontConfirm: () => void;

  isFirstOpened: Ref<boolean>;

  resetAll: (isConfirm: boolean) => void;
  selectAll: (isConfirm: boolean) => void;

  selectedCount: ComputedRef<ICheckedCountAndInfo>;

  componentItemListItem: Component;
  componentItemListItemEmpty: Component;
  componentTitle: Component;
  componentBottomControl: Component;
  componentBottomControlOk: Component;
  componentBottomControlNo: Component;
  componentSelectAllControls: Component;
  componentSelectAllControlsSelect: Component;
  componentSelectAllControlsReset: Component;

  componentArrowIcon: Component;
  componentLoading: Component;
}

export interface ITitleResult {
  fullString: string;
  result: string;
}
