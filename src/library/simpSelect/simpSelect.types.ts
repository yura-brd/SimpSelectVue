// import type { Ref } from "vue";

import type { IPropsSimpSelectTopTitleLocal } from "./components/Top/TopTitle.vue";

export interface ISimpleSelectLocale {
  empty: string;
  noSearch: string;
  searchText: string;
  title: string;
  selected: string;
  all: string;
  ok: string;
  cancel: string;

  resetAll: string;
  selectAll: string;
}

export type optionsItemsType = ISimpleSelectOption[] | ISimpleSelectOptionGroup[];

// export type ISimpleSelectedMulti = Array<string | number>;
// export type ISimpleSelectedSingle = string | number;
// export type ISimpleSelectedOld = ISimpleSelectedMulti | ISimpleSelectedSingle;
export type ISimpleSelected = ISimpleSelectOption[] | ISimpleSelectOption | null;

export interface ISimpleSelectOptionGroup {
  label: string;
  isOptgroupSelect: boolean;
  items: ISimpleSelectOption[];
  disabled?: boolean;
}
export interface ISimpleSelectOption {
  // id: string | number;
  // value: string | number;
  // name: string;
  disabled?: boolean;
  [key: string]: any;
}

export interface ICheckedCountAndInfo {
  countChecked: number;
  countCheckedFull: number;
  isMultiSelectedAll: "no" | "yes";
}

export interface IPropsSimpSelectTopTopTitle extends IPropsSimpSelectTopTitleLocal {}
