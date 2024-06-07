import type { ISimpleSelected, ISimpleSelectLocale, optionsItemsType } from "../../simpSelect.types";
export interface IPropsSimpSelectTopTitleLocal {
    locale: ISimpleSelectLocale;
    localSelected: ISimpleSelected;
    titleRes: {
        fullString: "";
        result: "";
    };
    countShowSelected?: number;
    isOnlyPlaceholder: boolean;
    sepChars: string;
    options: optionsItemsType;
}
declare const _default: import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<IPropsSimpSelectTopTitleLocal>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<IPropsSimpSelectTopTitleLocal>>>, {}, {}>;
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
