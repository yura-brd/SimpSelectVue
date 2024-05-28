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

export const equalModels = (model1:ISimpleSelected, model2: ISimpleSelected, key: string): boolean => {
  if (!model1 && !model2) {
    return true;
  }
  if (!model1 && model2 || model1 && !model2) {
    return false;
  }
  if (!model1 || !model2) {
    return false;
  }
  const firstIsArray = Array.isArray(model1);
  const secondIsArray = Array.isArray(model2);
  if (!firstIsArray && secondIsArray || firstIsArray && !secondIsArray) {
    return false;
  }

  if (firstIsArray && secondIsArray) {
    return compareArrays(model1, model2, key)
  }
  if (!firstIsArray && !secondIsArray) {
    return deepEqual(model1, model2);
  }

  return false;

}
function compareArrays(arr1:ISimpleSelectOption[], arr2:ISimpleSelectOption[], key: string) {
  // Сортируем массивы по id
  const sortedArr1 = arr1.slice().sort((a, b) => a[key].localeCompare(b[key]));
  const sortedArr2 = arr2.slice().sort((a, b) => a[key].localeCompare(b[key]));

  // Сравниваем отсортированные массивы
  if (sortedArr1.length !== sortedArr2.length) {
    return false;
  }

  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i].id !== sortedArr2[i].id) {
      return false;
    }
  }

  return true;
}
export const deepEqual = (object1: Record<string, any>, object2:  Record<string, any>): boolean => {
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
