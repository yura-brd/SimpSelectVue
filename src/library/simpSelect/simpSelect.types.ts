// import type { Ref } from "vue";

import type { IPropsSimpSelectTopTitleLocal } from "@/library/simpSelect/components/Top/TopTitle.vue";

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

export type ISimpleSelectedMulti = Array<string | number>;
export type ISimpleSelectedSingle = string | number;
export type ISimpleSelected = ISimpleSelectedMulti | ISimpleSelectedSingle;

export interface ISimpleSelectOptionGroup {
  label: string;
  isOptgroupSelect: boolean;
  items: ISimpleSelectOption[];
  disabled?: boolean;
}
export interface ISimpleSelectOption {
  // id: string | number;
  value: string | number;
  name: string;
  disabled?: boolean;
  [key: string]: any;
}

export interface IPropsSimpSelectTopTopTitle extends IPropsSimpSelectTopTitleLocal {}
