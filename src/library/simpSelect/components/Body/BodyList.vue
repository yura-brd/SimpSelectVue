<script setup lang="ts">
  import { getClass, transformOptionWithGroup } from "@/library/simpSelect/simpSelect.utils";
  import { computed, type ComputedRef, inject, ref, watch } from "vue";
  import { keyInjectLocalStore, keyInjectPropsAll } from "@/library/simpSelect/simpSelect.keys";
  import type { ISimpleSelectOption, ISimpleSelectOptionGroup } from "../../simpSelect.types";
  import type { ISimpleSelectProps } from "../../SimpSelect.vue";
  import type { ILocalStoreStore } from "../../simpSelect.local.types";

  const initAllProps = inject<ISimpleSelectProps>(keyInjectPropsAll);

  const localStore = inject<ILocalStoreStore>(keyInjectLocalStore);

  const localOptionItems = ref<ISimpleSelectOption[]>(transformOptionWithGroup(initAllProps!.options));

  const activePosition = ref<number | null>(null);
  const itemsOption = ref<HTMLElement[]>([]);

  const keyUpList = (e: KeyboardEvent) => {
    const optionsLength = localOptionItems.value.length;
    if (e.key === "ArrowUp") {
      if (activePosition.value === null) {
        activePosition.value = optionsLength - 1;
        return;
      }
      activePosition.value = activePosition.value - 1 >= 0 ? activePosition.value - 1 : optionsLength - 1;
      return;
    }
    if (e.key === "ArrowDown") {
      if (activePosition.value === null) {
        activePosition.value = 0;
        return;
      }
      activePosition.value = activePosition.value + 1 < optionsLength ? activePosition.value + 1 : 0;
      return;
    }
  };
  const keyUpListEnter = () => {
    if (activePosition.value === null) {
      activePosition.value = 0;
    }
  };

  watch(activePosition, newVal => {
    if (!newVal && newVal !== 0) {
      return;
    }
    const cur = itemsOption.value[newVal];
    if (cur) {
      cur.focus();
    }
  });

  const changeItemHandler = (e: any, item: ISimpleSelectOption) => {
    if (!initAllProps?.multiple) {
      localStore?.setIsLocalOpen(false);
    }
    localStore!.setToggleOption(item);
  };

  const itemFilter: ComputedRef<ISimpleSelectOption[] | ISimpleSelectOptionGroup[]> = computed(() => {
    const searchText = localStore?.searchText?.value.trim() || "";
    if (!searchText) {
      return initAllProps!.options;
    }
    const funFilter = (item: ISimpleSelectOption): boolean => {
      let res = false;
      initAllProps!.searchFieldsKeys?.forEach(key => {
        if (!(key in item)) {
          return;
        }
        if (item[key].includes(searchText)) {
          res = true;
        }
      });
      return res;
    };

    // filtering if group
    if (initAllProps?.options[0]?.isOptgroupSelect) {
      return (initAllProps.options as ISimpleSelectOptionGroup[]).map((group: ISimpleSelectOptionGroup) => {
        const items = group.items.filter(funFilter);
        return { ...group, items };
      });
    }

    // filtering if NOT group
    return (initAllProps!.options as ISimpleSelectOption[]).filter(funFilter);
  });

  const selectedItem = (e: Event, item: ISimpleSelectOption, group?: ISimpleSelectOptionGroup) => {
    if (item.disabled || (group && group.disabled)) {
      return;
    }
    changeItemHandler(e, item);
  };

  const initClass = getClass("group_items");
</script>

<template>
  <ul :class="[getClass('list')]" :tabindex="0" @keydown="keyUpList" @keyup.enter="keyUpListEnter">
    <template v-if="!itemFilter.length">
      <li :class="[initClass]">
        <component :is="localStore!.componentItemListItemEmpty" />
      </li>
    </template>
    <template v-for="(group, index) in itemFilter" v-else :key="index">
      <li v-if="group.isOptgroupSelect" :class="[initClass]">
        <div class="SimpleSel__group_title">{{ group.label }}</div>
        <ul class="SimpleSel__group">
          <li
            v-for="(item, ind) in group.items"
            :key="item.valueOf() + '_' + ind"
            ref="itemsOption"
            :tabindex="index === activePosition ? 0 : -1"
            :class="[
              ['SimpleSel__list_item'],
              {
                'SimpleSel__list_item--disabled': item.disabled || group.disabled,
                'SimpleSel__list_item--checked': localStore?.getSelected(item),
              },
            ]"
            @keyup.prevent.stop.enter="selectedItem($event, item, group as ISimpleSelectOptionGroup)"
            @click.prevent="selectedItem($event, item, group as ISimpleSelectOptionGroup)"
          >
            <component :is="localStore!.componentItemListItem" v-if="initAllProps" :item="item" />
          </li>
        </ul>
      </li>
      <template v-else>
        <li
          :key="group.valueOf() + '_' + group"
          ref="itemsOption"
          :tabindex="index === activePosition ? 0 : -1"
          :class="[
            ['SimpleSel__list_item'],
            {
              'SimpleSel__list_item--checked': localStore?.getSelected(group as ISimpleSelectOption),
              'SimpleSel__list_item--disabled': group.disabled,
            },
          ]"
          @keyup.prevent.stop.enter="selectedItem($event, group as ISimpleSelectOption)"
          @click.prevent="selectedItem($event, group as ISimpleSelectOption)"
        >
          <!-- <component :is="initAllProps.createComponentListItem" v-if="initAllProps" :item-option="item" />-->
          <component :is="localStore!.componentItemListItem" v-if="initAllProps" :item="group" />
        </li>
      </template>
    </template>
  </ul>
</template>

<style scoped lang="scss"></style>
