import type { ISimpleSelected, ISimpleSelectOption, ISimpleSelectOptionGroup } from "@/library/simpSelect/simpSelect.types";
export declare const getClass: (cls: string, mod?: boolean, classInit?: string) => string;
export declare const cloneModelValue: (val: ISimpleSelected) => ISimpleSelected;
export declare const cloneObj: <T>(obj: T) => T;
export declare const transformOptionWithGroup: (options: ISimpleSelectOption[] | ISimpleSelectOptionGroup[]) => ISimpleSelectOption[];
export declare const equalModels: (model1: ISimpleSelected, model2: ISimpleSelected, key: string) => boolean;
export declare const deepEqual: (object1: Record<string, any>, object2: Record<string, any>) => boolean;
