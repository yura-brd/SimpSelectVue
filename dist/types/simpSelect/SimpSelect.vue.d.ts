import type { ISimpleSelectLocale, optionsItemsType } from "./simpSelect.types";
import type { setIsLocalOpenType } from "@/library/simpSelect/simpSelect.local.types";
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
declare const _default: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<ISimpleSelectProps>, {
    multiple: boolean;
    disabled: boolean;
    sepChars: string;
    countShowSelected: number;
    isRemoveTop: boolean;
    isOnlyPlaceholder: boolean;
    isCloneTitleToSearch: boolean;
    isAlwaysOpen: boolean;
    isConfirmInMulti: boolean;
    isConfirmInMultiOkClickOutside: boolean;
    isSimpleShowCheckbox: boolean;
    isLoading: boolean;
    titleMain: string;
    locale: () => ISimpleSelectLocale;
    isNative: boolean;
    isUp: boolean;
    selectAll: boolean;
    selectAllAfterClose: boolean;
    resetAll: boolean;
    resetAllAfterClose: boolean;
    searchTypeInput: string;
    isSearch: boolean;
    isSearchInDropdown: boolean;
    isFloat: boolean;
    keyValue: string;
    keyTitle: string;
    searchFieldsKeys: () => string[];
}>, {
    setIsLocalOpen: setIsLocalOpenType;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("callbackOpen" | "callbackClose")[], "callbackOpen" | "callbackClose", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<ISimpleSelectProps>, {
    multiple: boolean;
    disabled: boolean;
    sepChars: string;
    countShowSelected: number;
    isRemoveTop: boolean;
    isOnlyPlaceholder: boolean;
    isCloneTitleToSearch: boolean;
    isAlwaysOpen: boolean;
    isConfirmInMulti: boolean;
    isConfirmInMultiOkClickOutside: boolean;
    isSimpleShowCheckbox: boolean;
    isLoading: boolean;
    titleMain: string;
    locale: () => ISimpleSelectLocale;
    isNative: boolean;
    isUp: boolean;
    selectAll: boolean;
    selectAllAfterClose: boolean;
    resetAll: boolean;
    resetAllAfterClose: boolean;
    searchTypeInput: string;
    isSearch: boolean;
    isSearchInDropdown: boolean;
    isFloat: boolean;
    keyValue: string;
    keyTitle: string;
    searchFieldsKeys: () => string[];
}>>> & {
    onCallbackOpen?: ((...args: any[]) => any) | undefined;
    onCallbackClose?: ((...args: any[]) => any) | undefined;
}, {
    locale: ISimpleSelectLocale;
    countShowSelected: number | null;
    isOnlyPlaceholder: boolean;
    sepChars: string;
    disabled: boolean;
    searchTypeInput: string;
    titleMain: string;
    isAlwaysOpen: boolean;
    isRemoveTop: boolean;
    isLoading: boolean;
    isSearch: boolean;
    isSearchInDropdown: boolean;
    isFloat: boolean;
    isConfirmInMulti: boolean;
    selectAll: boolean;
    resetAll: boolean;
    multiple: boolean;
    isSimpleShowCheckbox: boolean;
    isCloneTitleToSearch: boolean;
    searchFieldsKeys: string[];
    isConfirmInMultiOkClickOutside: boolean;
    keyValue: string;
    keyTitle: string;
    selectAllAfterClose: boolean;
    resetAllAfterClose: boolean;
    isUp: boolean;
    isNative: boolean;
}, {}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof P]: K extends keyof D ? P[K] & {
        default: D[K];
    } : P[K];
};
