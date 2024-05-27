import type { ISimpleSelectLocale, ISimpleSelectOption } from "@/library/simpSelect/simpSelect.types";
export interface IPropsSimpSelectTopTitleLocal {
    locale: ISimpleSelectLocale;
    localSelectedFull: ISimpleSelectOption[];
    titleRes: {
        fullString: "";
        result: "";
    };
    countShowSelected?: number;
    isOnlyPlaceholder: boolean;
    sepChars: string;
    options: ISimpleSelectOption[];
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
