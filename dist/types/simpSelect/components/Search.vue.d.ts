export interface IProps {
    searchTypeInput?: string;
    isDropdown?: boolean;
}
declare const _default: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<IProps>, {
    searchTypeInput: string;
    isDropdown: boolean;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ""[], "", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<IProps>, {
    searchTypeInput: string;
    isDropdown: boolean;
}>>> & {
    on?: ((...args: any[]) => any) | undefined;
}, {
    searchTypeInput: string;
    isDropdown: boolean;
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
