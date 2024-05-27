import { initClass } from "@/library/simpSelect/simpSelect.consts";
import type {
  ISimpleSelected,
  ISimpleSelectOption,
  ISimpleSelectOptionGroup,
} from "@/library/simpSelect/simpSelect.types";

export const getClass = (cls: string, mod = false, classInit = initClass): string => {
  const sep = mod ? "--" : "__";
  return `${classInit}${sep}${cls}`;
};

export const cloneModelValue = (val: ISimpleSelected): ISimpleSelected => {
  if (typeof val === "string" || typeof val === "number") {
    return val;
  }
  return cloneObj(val);
};

export const cloneObj = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const transformOptionWithGroup = (
  options: ISimpleSelectOption[] | ISimpleSelectOptionGroup[],
): ISimpleSelectOption[] => {
  return options[0]?.isOptgroupSelect
    ? [].concat(...options.map(group => group.items.map((item: ISimpleSelectOption) => item)))
    : (cloneObj(options) as ISimpleSelectOption[]);
};

export const deepEqual = (object1: any, object2: any): boolean => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if ((areObjects && !deepEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
      return false;
    }
  }

  return true;
};

function isObject(object: any) {
  return object != null && typeof object === "object";
}
