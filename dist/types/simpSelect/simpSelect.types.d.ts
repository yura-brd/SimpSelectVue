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
export type optionsItemsType = ISimpleSelectOption[] | ISimpleSelectOptionGroup[];
export type ISimpleSelected = ISimpleSelectOption[] | ISimpleSelectOption | null;
export interface ISimpleSelectOptionGroup {
    label: string;
    isOptgroupSelect: boolean;
    items: ISimpleSelectOption[];
    disabled?: boolean;
}
export interface ISimpleSelectOption {
    value: string | number;
    name: string;
    disabled?: boolean;
    [key: string]: any;
}
export interface IPropsSimpSelectTopTopTitle extends IPropsSimpSelectTopTitleLocal {
}
