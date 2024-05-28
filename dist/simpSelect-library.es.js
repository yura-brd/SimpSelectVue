import { defineComponent, ref, inject, computed, watch, withDirectives, openBlock, createElementBlock, normalizeClass, unref, vModelDynamic, withKeys, withModifiers, createBlock, resolveDynamicComponent, createCommentVNode, Fragment, renderList, createElementVNode, toDisplayString, createVNode, createTextVNode, mergeModels, useModel, vModelSelect, pushScopeId, popScopeId, useSlots, provide, readonly, onBeforeMount, nextTick } from "vue";
const simpleSelectLocale = {
  noSearch: "No matches for",
  searchText: "Search",
  title: "Select",
  selected: "Selected:",
  all: "all",
  ok: "Ok",
  cancel: "Cancel",
  selectAll: "Select all",
  resetAll: "Reset all"
};
const initClass = "SimpleSel";
const getClass = (cls, mod = false, classInit = initClass) => {
  const sep = mod ? "--" : "__";
  return `${classInit}${sep}${cls}`;
};
const cloneModelValue = (val) => {
  if (typeof val === "string" || typeof val === "number") {
    return val;
  }
  return cloneObj(val);
};
const cloneObj = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};
const transformOptionWithGroup = (options) => {
  var _a;
  return ((_a = options[0]) == null ? void 0 : _a.isOptgroupSelect) ? [].concat(...options.map((group) => group.items.map((item) => item))) : cloneObj(options);
};
const deepEqual = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (areObjects && !deepEqual(val1, val2) || !areObjects && val1 !== val2) {
      return false;
    }
  }
  return true;
};
function isObject(object) {
  return object != null && typeof object === "object";
}
const keyInjectPropsAll = Symbol();
const keyInjectLocalStore = Symbol();
const _hoisted_1$5 = ["type", "tabindex", "placeholder"];
const _sfc_main$f = defineComponent({
  __name: "Search",
  props: {
    searchTypeInput: { default: "search" },
    isDropdown: { type: Boolean, default: false }
  },
  emits: [""],
  setup(__props) {
    const textInput = ref("");
    const initAllProps = inject(keyInjectPropsAll);
    const localStore = inject(keyInjectLocalStore);
    const $input = ref(null);
    const initClass2 = getClass("search");
    const tabIndex = computed(() => {
      return (localStore == null ? void 0 : localStore.isLocalOpen.value) ? 0 : -1;
    });
    watch(textInput, (newVal) => {
      localStore == null ? void 0 : localStore.setSearchText(newVal);
    });
    watch(
      () => localStore == null ? void 0 : localStore.isLocalOpen.value,
      (newVal) => {
        if (!newVal) {
          textInput.value = "";
        }
      }
    );
    watch(
      () => localStore == null ? void 0 : localStore.isLocalOpen.value,
      (newVal) => {
        if (newVal) {
          setTimeout(() => {
            var _a;
            (_a = $input.value) == null ? void 0 : _a.focus();
          }, 20);
        }
      }
    );
    const placeholder = computed(() => {
      var _a;
      let res = ((_a = initAllProps == null ? void 0 : initAllProps.locale) == null ? void 0 : _a.searchText) || "";
      if ((initAllProps == null ? void 0 : initAllProps.isCloneTitleToSearch) && (localStore == null ? void 0 : localStore.localSelectedFull.value.length)) {
        res = localStore.titleText.value.fullString;
      }
      return res;
    });
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock("input", {
        ref_key: "$input",
        ref: $input,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => textInput.value = $event),
        class: normalizeClass([
          unref(initClass2),
          {
            [unref(getClass)("top", true, unref(initClass2))]: !_ctx.isDropdown,
            [unref(getClass)("dropdown", true, unref(initClass2))]: _ctx.isDropdown
          }
        ]),
        type: _ctx.searchTypeInput,
        tabindex: tabIndex.value,
        placeholder: placeholder.value,
        autocomplete: "off",
        "aria-autocomplete": "none",
        inputmode: "none"
      }, null, 10, _hoisted_1$5)), [
        [vModelDynamic, textInput.value]
      ]);
    };
  }
});
const _hoisted_1$4 = ["tabindex", "onKeydown"];
const _sfc_main$e = defineComponent({
  __name: "Top",
  emits: ["setIsLocalOpen"],
  setup(__props) {
    const initAllProps = inject(keyInjectPropsAll);
    const localStore = inject(keyInjectLocalStore);
    const tabIndex = computed(() => {
      if (initAllProps == null ? void 0 : initAllProps.disabled) {
        return -1;
      }
      return (localStore == null ? void 0 : localStore.isLocalOpen.value) ? -1 : 0;
    });
    const keyOpen = () => {
      localStore == null ? void 0 : localStore.setIsLocalOpen();
    };
    const titleRes = computed(() => {
      if (!(localStore == null ? void 0 : localStore.localSelectedFull.value)) {
        return {
          fullString: "",
          result: ""
        };
      }
      const resTitle = {
        fullString: (initAllProps == null ? void 0 : initAllProps.titleMain) || (initAllProps == null ? void 0 : initAllProps.locale.title) || "",
        result: (initAllProps == null ? void 0 : initAllProps.titleMain) || (initAllProps == null ? void 0 : initAllProps.locale.title) || ""
      };
      const selectedLength = localStore == null ? void 0 : localStore.localSelectedFull.value.length;
      if ((localStore == null ? void 0 : localStore.localSelectedFull.value.length) && !(initAllProps == null ? void 0 : initAllProps.isOnlyPlaceholder)) {
        const arrNames = localStore == null ? void 0 : localStore.localSelectedFull.value.map((el) => el.name);
        resTitle.fullString = arrNames.join(initAllProps == null ? void 0 : initAllProps.sepChars);
        if ((initAllProps == null ? void 0 : initAllProps.countShowSelected) && initAllProps.countShowSelected < selectedLength) {
          resTitle.result = `${initAllProps == null ? void 0 : initAllProps.locale.selected} ${selectedLength}`;
        } else {
          resTitle.result = arrNames.join(initAllProps == null ? void 0 : initAllProps.sepChars);
        }
      }
      if (selectedLength === (initAllProps == null ? void 0 : initAllProps.options.length)) {
        resTitle.result += ` <span >(${initAllProps == null ? void 0 : initAllProps.locale.all})<span>`;
      }
      localStore == null ? void 0 : localStore.setTitleText(resTitle);
      return resTitle;
    });
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([unref(getClass)("top")])
      }, [
        !((_a = unref(initAllProps)) == null ? void 0 : _a.isAlwaysOpen) && !((_b = unref(initAllProps)) == null ? void 0 : _b.isRemoveTop) ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass([unref(getClass)("top_body")]),
          tabindex: tabIndex.value,
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("setIsLocalOpen")),
          onKeydown: withKeys(withModifiers(keyOpen, ["stop", "prevent"]), ["enter"])
        }, [
          (openBlock(), createBlock(resolveDynamicComponent(unref(localStore).componentTitle), {
            locale: unref(initAllProps).locale,
            "local-selected-full": (_c = unref(localStore)) == null ? void 0 : _c.localSelectedFull.value,
            titleRes: titleRes.value,
            "count-show-selected": (_d = unref(initAllProps)) == null ? void 0 : _d.countShowSelected,
            "is-only-placeholder": (_e = unref(initAllProps)) == null ? void 0 : _e.isOnlyPlaceholder,
            "sep-chars": (_f = unref(initAllProps)) == null ? void 0 : _f.sepChars,
            options: (_g = unref(initAllProps)) == null ? void 0 : _g.options
          }, null, 8, ["locale", "local-selected-full", "titleRes", "count-show-selected", "is-only-placeholder", "sep-chars", "options"])),
          !((_h = unref(initAllProps)) == null ? void 0 : _h.isLoading) ? (openBlock(), createBlock(resolveDynamicComponent(unref(localStore).componentArrowIcon), { key: 0 })) : createCommentVNode("", true),
          ((_i = unref(initAllProps)) == null ? void 0 : _i.isLoading) ? (openBlock(), createBlock(resolveDynamicComponent(unref(localStore).componentLoading), { key: 1 })) : createCommentVNode("", true)
        ], 42, _hoisted_1$4)) : createCommentVNode("", true),
        ((_j = unref(initAllProps)) == null ? void 0 : _j.isSearch) && !unref(initAllProps).isSearchInDropdown && !((_k = unref(initAllProps)) == null ? void 0 : _k.isFloat) ? (openBlock(), createBlock(_sfc_main$f, {
          key: 1,
          "search-type-input": (_l = unref(initAllProps)) == null ? void 0 : _l.searchTypeInput,
          "is-dropdown": false
        }, null, 8, ["search-type-input"])) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const _hoisted_1$3 = {
  key: 0,
  class: "SimpleSel__group_items"
};
const _hoisted_2$2 = { class: "SimpleSel__group_title" };
const _hoisted_3$2 = { class: "SimpleSel__group" };
const _hoisted_4$1 = ["tabindex", "onKeyup", "onClick"];
const _hoisted_5 = ["tabindex", "onKeyup", "onClick"];
const _sfc_main$d = defineComponent({
  __name: "BodyList",
  setup(__props) {
    const initAllProps = inject(keyInjectPropsAll);
    const localStore = inject(keyInjectLocalStore);
    const localOptionItems = ref(transformOptionWithGroup(initAllProps.options));
    const activePosition = ref(null);
    const itemsOption = ref([]);
    const keyUpList = (e) => {
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
    watch(activePosition, (newVal) => {
      if (!newVal && newVal !== 0) {
        return;
      }
      const cur = itemsOption.value[newVal];
      if (cur) {
        cur.focus();
      }
    });
    const changeItemHandler = (e, item) => {
      if (!(initAllProps == null ? void 0 : initAllProps.multiple)) {
        localStore == null ? void 0 : localStore.setIsLocalOpen(false);
      }
      localStore.setToggleOption(item);
    };
    const itemFilter = computed(() => {
      var _a, _b;
      const searchText = ((_a = localStore == null ? void 0 : localStore.searchText) == null ? void 0 : _a.value.trim()) || "";
      if (!searchText) {
        return initAllProps.options;
      }
      const funFilter = (item) => {
        var _a2;
        let res = false;
        (_a2 = initAllProps.searchFieldsKeys) == null ? void 0 : _a2.forEach((key) => {
          if (!(key in item)) {
            return;
          }
          if (item[key].includes(searchText)) {
            res = true;
          }
        });
        return res;
      };
      if ((_b = initAllProps == null ? void 0 : initAllProps.options[0]) == null ? void 0 : _b.isOptgroupSelect) {
        return initAllProps.options.map((group) => {
          const items = group.items.filter(funFilter);
          return { ...group, items };
        });
      }
      return initAllProps.options.filter(funFilter);
    });
    const selectedItem = (e, item, group) => {
      if (item.disabled || group && group.disabled) {
        return;
      }
      changeItemHandler(e, item);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("ul", {
        class: normalizeClass([unref(getClass)("list")]),
        tabindex: 0,
        onKeydown: keyUpList,
        onKeyup: withKeys(keyUpListEnter, ["enter"])
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(itemFilter.value, (group, index) => {
          var _a;
          return openBlock(), createElementBlock(Fragment, { key: index }, [
            group.isOptgroupSelect ? (openBlock(), createElementBlock("li", _hoisted_1$3, [
              createElementVNode("div", _hoisted_2$2, toDisplayString(group.label), 1),
              createElementVNode("ul", _hoisted_3$2, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(group.items, (item, ind) => {
                  var _a2;
                  return openBlock(), createElementBlock("li", {
                    key: item.valueOf() + "_" + ind,
                    ref_for: true,
                    ref_key: "itemsOption",
                    ref: itemsOption,
                    tabindex: index === activePosition.value ? 0 : -1,
                    class: normalizeClass([
                      ["SimpleSel__list_item"],
                      {
                        "SimpleSel__list_item--disabled": item.disabled || group.disabled,
                        "SimpleSel__list_item--checked": (_a2 = unref(localStore)) == null ? void 0 : _a2.getSelected(item)
                      }
                    ]),
                    onKeyup: withKeys(withModifiers(($event) => selectedItem($event, item, group), ["prevent", "stop"]), ["enter"]),
                    onClick: withModifiers(($event) => selectedItem($event, item, group), ["prevent"])
                  }, [
                    unref(initAllProps) ? (openBlock(), createBlock(resolveDynamicComponent(unref(localStore).componentItemList), {
                      key: 0,
                      item
                    }, null, 8, ["item"])) : createCommentVNode("", true)
                  ], 42, _hoisted_4$1);
                }), 128))
              ])
            ])) : (openBlock(), createElementBlock("li", {
              key: group.valueOf() + "_" + group,
              ref_for: true,
              ref_key: "itemsOption",
              ref: itemsOption,
              tabindex: index === activePosition.value ? 0 : -1,
              class: normalizeClass([
                ["SimpleSel__list_item"],
                {
                  "SimpleSel__list_item--checked": (_a = unref(localStore)) == null ? void 0 : _a.getSelected(group),
                  "SimpleSel__list_item--disabled": group.disabled
                }
              ]),
              onKeyup: withKeys(withModifiers(($event) => selectedItem($event, group), ["prevent", "stop"]), ["enter"]),
              onClick: withModifiers(($event) => selectedItem($event, group), ["prevent"])
            }, [
              unref(initAllProps) ? (openBlock(), createBlock(resolveDynamicComponent(unref(localStore).componentItemList), {
                key: 0,
                item: group
              }, null, 8, ["item"])) : createCommentVNode("", true)
            ], 42, _hoisted_5))
          ], 64);
        }), 128))
      ], 34);
    };
  }
});
const _sfc_main$c = defineComponent({
  __name: "Body",
  setup(__props) {
    const initAllProps = inject(keyInjectPropsAll);
    const localStore = inject(keyInjectLocalStore);
    const activePosition = ref(null);
    const itemsOption = ref([]);
    const toggleOpenBodyClass = getClass("body_open", true);
    const closeClickOutside = (e) => {
      var _a;
      const target = e.target;
      if (!((_a = localStore == null ? void 0 : localStore.$wrapper) == null ? void 0 : _a.value)) {
        return;
      }
      if (!localStore.$wrapper.value.contains(target) && target !== localStore.$wrapper.value) {
        localStore == null ? void 0 : localStore.setIsLocalOpen(false);
        if ((initAllProps == null ? void 0 : initAllProps.isConfirmInMulti) && initAllProps.isConfirmInMultiOkClickOutside) {
          localStore.updateOutsideModels("clickOutside");
        } else {
          localStore.resetSelectedByDontConfirm();
        }
      }
    };
    const closeEsc = (e) => {
      if (e.key === "Escape") {
        localStore == null ? void 0 : localStore.setIsLocalOpen(false);
        localStore == null ? void 0 : localStore.resetSelectedByDontConfirm();
      }
    };
    const focusOut = (e) => {
      var _a;
      const target = e.relatedTarget;
      if (target && !((_a = localStore == null ? void 0 : localStore.$wrapper.value) == null ? void 0 : _a.contains(target))) {
        localStore == null ? void 0 : localStore.setIsLocalOpen(false);
      }
    };
    watch(
      () => localStore == null ? void 0 : localStore.isLocalOpen.value,
      (newVal) => {
        var _a;
        if (initAllProps == null ? void 0 : initAllProps.isFloat) {
          (_a = document == null ? void 0 : document.body) == null ? void 0 : _a.classList.toggle(toggleOpenBodyClass, newVal);
        }
        if (typeof window !== "undefined") {
          if (newVal) {
            document == null ? void 0 : document.addEventListener("click", closeClickOutside);
            document == null ? void 0 : document.addEventListener("keyup", closeEsc);
            document == null ? void 0 : document.addEventListener("focusout", focusOut);
          } else {
            document == null ? void 0 : document.removeEventListener("click", closeClickOutside);
            document == null ? void 0 : document.removeEventListener("keyup", closeEsc);
            document == null ? void 0 : document.removeEventListener("focusout", focusOut);
          }
        }
      },
      {
        immediate: true
      }
    );
    watch(activePosition, (newVal) => {
      if (!newVal && newVal !== 0) {
        return;
      }
      const cur = itemsOption.value[newVal];
      if (cur) {
        cur.focus();
      }
    });
    const buttonControlConfirm = () => {
      localStore == null ? void 0 : localStore.setIsLocalOpen(false);
      localStore.updateOutsideModels("ok");
    };
    const buttonControlCancel = () => {
      localStore == null ? void 0 : localStore.setIsLocalOpen(false);
      localStore == null ? void 0 : localStore.resetSelectedByDontConfirm();
    };
    const selectAll = () => {
      localStore == null ? void 0 : localStore.selectAll(!!(initAllProps == null ? void 0 : initAllProps.selectAllAfterClose));
    };
    const resetAll = () => {
      localStore == null ? void 0 : localStore.resetAll(!!(initAllProps == null ? void 0 : initAllProps.resetAllAfterClose));
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          unref(getClass)("body"),
          {
            [unref(getClass)("body-always_open", true)]: (_a = unref(initAllProps)) == null ? void 0 : _a.isAlwaysOpen
          }
        ])
      }, [
        ((_b = unref(initAllProps)) == null ? void 0 : _b.isSearch) && unref(initAllProps).isSearchInDropdown ? (openBlock(), createBlock(_sfc_main$f, {
          key: 0,
          "search-type-input": (_c = unref(initAllProps)) == null ? void 0 : _c.searchTypeInput,
          "is-dropdown": true
        }, null, 8, ["search-type-input"])) : createCommentVNode("", true),
        ((_d = unref(initAllProps)) == null ? void 0 : _d.selectAll) || ((_e = unref(initAllProps)) == null ? void 0 : _e.resetAll) ? (openBlock(), createBlock(resolveDynamicComponent(unref(localStore).componentSelectAllControls), {
          key: 1,
          select: selectAll,
          reset: resetAll,
          locale: unref(initAllProps).locale
        }, null, 8, ["locale"])) : createCommentVNode("", true),
        createVNode(_sfc_main$d),
        ((_f = unref(initAllProps)) == null ? void 0 : _f.isConfirmInMulti) ? (openBlock(), createBlock(resolveDynamicComponent(unref(localStore).componentBottomControl), {
          key: 2,
          confirm: buttonControlConfirm,
          cancellation: buttonControlCancel,
          locale: unref(initAllProps).locale
        }, null, 8, ["locale"])) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const _sfc_main$b = defineComponent({
  __name: "BodyListItem",
  props: {
    item: {}
  },
  setup(__props) {
    const initClas = getClass("list_item_body");
    const initAllProps = inject(keyInjectPropsAll);
    return (_ctx, _cache) => {
      var _a, _b;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([unref(initClas)])
      }, [
        ((_a = unref(initAllProps)) == null ? void 0 : _a.multiple) || ((_b = unref(initAllProps)) == null ? void 0 : _b.isSimpleShowCheckbox) ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: normalizeClass([unref(getClass)("list_item_icon")])
        }, null, 2)) : createCommentVNode("", true),
        createTextVNode(" " + toDisplayString(_ctx.item[unref(initAllProps).keyTitle] || ""), 1)
      ], 2);
    };
  }
});
const _hoisted_1$2 = ["title", "innerHTML"];
const _sfc_main$a = defineComponent({
  __name: "TopTitle",
  props: {
    locale: {},
    localSelectedFull: {},
    titleRes: {},
    countShowSelected: {},
    isOnlyPlaceholder: { type: Boolean },
    sepChars: {},
    options: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        title: _ctx.titleRes.fullString,
        class: normalizeClass([
          unref(getClass)("title"),
          {
            [unref(getClass)("title--placeholder")]: !_ctx.localSelectedFull.length,
            [unref(getClass)("title--fill")]: _ctx.localSelectedFull.length,
            [unref(getClass)("title--full")]: _ctx.localSelectedFull.length === _ctx.options.length
          }
        ]),
        innerHTML: _ctx.titleRes.result || ""
      }, null, 10, _hoisted_1$2);
    };
  }
});
const _sfc_main$9 = defineComponent({
  __name: "BottomControls",
  props: {
    confirm: { type: Function },
    cancellation: { type: Function },
    locale: {}
  },
  setup(__props) {
    const localStore = inject(keyInjectLocalStore);
    const classInit = getClass("bottom_controls");
    const classInitItem = getClass("bottom_control");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createTextVNode(" asdas "),
        createElementVNode("div", {
          class: normalizeClass([unref(classInit)])
        }, [
          (openBlock(), createBlock(resolveDynamicComponent(unref(localStore).componentBottomControlOk), {
            "class-init": unref(classInitItem),
            callback: _ctx.confirm,
            locale: _ctx.locale
          }, null, 8, ["class-init", "callback", "locale"])),
          (openBlock(), createBlock(resolveDynamicComponent(unref(localStore).componentBottomControlNo), {
            "class-init": unref(classInitItem),
            callback: _ctx.cancellation,
            locale: _ctx.locale
          }, null, 8, ["class-init", "callback", "locale"]))
        ], 2)
      ], 64);
    };
  }
});
const _sfc_main$8 = defineComponent({
  __name: "BottomControlsOk",
  props: {
    callback: { type: Function },
    classInit: {},
    locale: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock("button", {
        class: normalizeClass([_ctx.classInit, unref(getClass)("ok", true, _ctx.classInit)]),
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.callback && _ctx.callback(...args))
      }, toDisplayString((_a = _ctx.locale) == null ? void 0 : _a.ok), 3);
    };
  }
});
const _sfc_main$7 = defineComponent({
  __name: "BottomControlsNo",
  props: {
    callback: { type: Function },
    classInit: {},
    locale: {}
  },
  emits: ["confirm", "cancellation"],
  setup(__props) {
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock("button", {
        class: normalizeClass([_ctx.classInit, unref(getClass)("no", true, _ctx.classInit)]),
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.callback && _ctx.callback(...args))
      }, toDisplayString((_a = _ctx.locale) == null ? void 0 : _a.cancel), 3);
    };
  }
});
const _sfc_main$6 = defineComponent({
  __name: "SelectAllControls",
  props: {
    select: { type: Function },
    reset: { type: Function },
    locale: {}
  },
  setup(__props) {
    const initAllProps = inject(keyInjectPropsAll);
    const localStore = inject(keyInjectLocalStore);
    const classInit = getClass("controls");
    const classInitItem = getClass("control");
    return (_ctx, _cache) => {
      var _a, _b;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([unref(classInit)])
      }, [
        ((_a = unref(initAllProps)) == null ? void 0 : _a.selectAll) ? (openBlock(), createBlock(resolveDynamicComponent(unref(localStore).componentSelectAllControlsSelect), {
          key: 0,
          locale: _ctx.locale,
          "class-init": unref(classInitItem),
          callback: _ctx.select
        }, null, 8, ["locale", "class-init", "callback"])) : createCommentVNode("", true),
        ((_b = unref(initAllProps)) == null ? void 0 : _b.resetAll) ? (openBlock(), createBlock(resolveDynamicComponent(unref(localStore).componentSelectAllControlsReset), {
          key: 1,
          locale: _ctx.locale,
          "class-init": unref(classInitItem),
          callback: _ctx.reset
        }, null, 8, ["locale", "class-init", "callback"])) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const _sfc_main$5 = defineComponent({
  __name: "SelectAllControlSelect",
  props: {
    callback: { type: Function },
    classInit: {},
    locale: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock("button", {
        class: normalizeClass([_ctx.classInit, unref(getClass)("select_all", true, _ctx.classInit)]),
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.callback && _ctx.callback(...args))
      }, [
        createElementVNode("span", {
          class: normalizeClass([unref(getClass)("select_all__icon")])
        }, null, 2),
        createTextVNode(" " + toDisplayString((_a = _ctx.locale) == null ? void 0 : _a.selectAll), 1)
      ], 2);
    };
  }
});
const _sfc_main$4 = defineComponent({
  __name: "SelectAllControlReset",
  props: {
    callback: { type: Function },
    classInit: {},
    locale: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock("button", {
        class: normalizeClass([_ctx.classInit, unref(getClass)("reset_all", true, _ctx.classInit)]),
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.callback && _ctx.callback(...args))
      }, [
        createElementVNode("span", {
          class: normalizeClass([unref(getClass)("reset_all__icon")])
        }, null, 2),
        createTextVNode(" " + toDisplayString((_a = _ctx.locale) == null ? void 0 : _a.resetAll), 1)
      ], 2);
    };
  }
});
const _hoisted_1$1 = ["disabled", "multiple"];
const _hoisted_2$1 = ["label", "disabled"];
const _hoisted_3$1 = ["selected", "disabled", "value"];
const _hoisted_4 = ["selected", "disabled", "value"];
const _sfc_main$3 = defineComponent({
  __name: "NativeSelect",
  props: {
    "modelValue": {
      default: ""
    },
    "modelModifiers": {}
  },
  emits: /* @__PURE__ */ mergeModels(["changeHandler"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const initAllProps = inject(keyInjectPropsAll);
    const localStore = inject(keyInjectLocalStore);
    const model = useModel(__props, "modelValue");
    const changeHandler = (e) => {
      emits("changeHandler", e);
    };
    const initClass2 = getClass("select_init");
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock("select", {
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => model.value = $event),
        tabindex: -1,
        disabled: unref(initAllProps).disabled,
        class: normalizeClass([unref(initClass2), unref(getClass)("native", true, unref(initClass2))]),
        multiple: unref(initAllProps).multiple,
        onChange: withModifiers(changeHandler, ["prevent"])
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(initAllProps).options, (group, index) => {
          return openBlock(), createElementBlock(Fragment, { key: index }, [
            group.isOptgroupSelect ? (openBlock(), createElementBlock("optgroup", {
              key: 0,
              label: group.label,
              disabled: group.disabled
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(group.items, (item, ind) => {
                return openBlock(), createElementBlock("option", {
                  key: item.valueOf() + "_" + ind,
                  selected: unref(localStore).getSelected(item),
                  disabled: item.disabled,
                  value: item.value
                }, toDisplayString(item[unref(initAllProps).keyTitle]), 9, _hoisted_3$1);
              }), 128))
            ], 8, _hoisted_2$1)) : (openBlock(), createElementBlock("option", {
              key: group.valueOf() + "_" + index,
              selected: unref(localStore).getSelected(group),
              disabled: group.disabled,
              value: group.value
            }, toDisplayString(group[unref(initAllProps).keyTitle]), 9, _hoisted_4))
          ], 64);
        }), 128))
      ], 42, _hoisted_1$1)), [
        [vModelSelect, model.value]
      ]);
    };
  }
});
const _sfc_main$2 = defineComponent({
  __name: "TopIconArrow",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("span", {
        class: normalizeClass([unref(getClass)("icon")])
      }, null, 2);
    };
  }
});
var Loader_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$1 = {};
const _withScopeId = (n) => (pushScopeId("data-v-6a1d5d1b"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "loader_wrap" };
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("div", { class: "loader" }, null, -1));
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1, _hoisted_3);
}
var Loader = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-6a1d5d1b"]]);
const _sfc_main = defineComponent({
  __name: "SimpSelect",
  props: /* @__PURE__ */ mergeModels({
    options: {},
    disabled: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    countShowSelected: { default: 2 },
    sepChars: { default: "," },
    isRemoveTop: { type: Boolean, default: false },
    locale: { default: () => simpleSelectLocale },
    titleMain: { default: "" },
    isOnlyPlaceholder: { type: Boolean, default: false },
    isAlwaysOpen: { type: Boolean, default: false },
    isSearch: { type: Boolean, default: true },
    isCloneTitleToSearch: { type: Boolean, default: true },
    searchTypeInput: { default: "search" },
    isSearchInDropdown: { type: Boolean, default: false },
    searchFieldsKeys: { default: () => ["name"] },
    isConfirmInMulti: { type: Boolean, default: false },
    isConfirmInMultiOkClickOutside: { type: Boolean, default: false },
    keyValue: { default: "value" },
    keyTitle: { default: "name" },
    isSimpleShowCheckbox: { type: Boolean, default: false },
    selectAll: { type: Boolean, default: false },
    selectAllAfterClose: { type: Boolean, default: true },
    resetAll: { type: Boolean, default: false },
    resetAllAfterClose: { type: Boolean, default: true },
    isUp: { type: Boolean, default: false },
    isLoading: { type: Boolean, default: false },
    isNative: { type: Boolean, default: false },
    isFloat: { type: Boolean, default: false }
  }, {
    "modelValue": {
      default: ""
    },
    "modelModifiers": {},
    "fullSelected": {},
    "fullSelectedModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["callbackOpen", "callbackClose"], ["update:modelValue", "update:fullSelected"]),
  setup(__props, { expose: __expose, emit: __emit }) {
    const slots = useSlots();
    const props = __props;
    provide(keyInjectPropsAll, readonly(props));
    const emits = __emit;
    const model = useModel(__props, "modelValue");
    const modelFullSelected = useModel(__props, "fullSelected");
    const $wrapper = ref(null);
    const searchText = ref("");
    const setSearchText = (str) => {
      searchText.value = str || "";
    };
    const titleText = ref({
      fullString: props.titleMain,
      result: props.titleMain
    });
    const setTitleText = (data) => {
      titleText.value = data;
    };
    const isLocalOpen = ref(false);
    const setIsLocalOpen = (isOpen) => {
      if (props.disabled) {
        return;
      }
      if (isOpen === true || isOpen === false) {
        isLocalOpen.value = isOpen;
      } else {
        isLocalOpen.value = !isLocalOpen.value;
      }
    };
    watch(isLocalOpen, (newVal) => {
      if (newVal) {
        emits("callbackOpen");
      } else {
        emits("callbackClose");
      }
    });
    const localSelected = ref(props.multiple ? [] : "");
    const localSelectedFull = ref([]);
    watch(
      model,
      () => {
        if (!deepEqual(model.value, localSelected.value)) {
          localSelected.value = cloneModelValue(model.value);
        }
      },
      { immediate: true, deep: true }
    );
    watch(
      () => props.options,
      () => {
        const res = updateLocalSelectedFull(model.value);
        if (!res.length) {
          localSelected.value = props.multiple ? [] : "";
        }
        if (modelFullSelected.value && !deepEqual(modelFullSelected.value, localSelectedFull.value)) {
          modelFullSelected.value = cloneObj(localSelectedFull.value);
        }
      },
      { deep: true }
    );
    const changeHandler = (e) => {
      const options = [];
      const target = e.target;
      if (props.multiple) {
        for (let i = 0; i < target.options.length; i++) {
          const option = target.options[i];
          if (option.selected) {
            options.push(option.value);
          }
        }
        localSelected.value = options;
      } else {
        localSelected.value = target.value;
      }
      nextTick(() => {
        updateOutsideModels();
      });
    };
    const setToggleOption = (item) => {
      if (!props.multiple) {
        localSelected.value = item[props.keyValue];
        return;
      }
      const selectedValues = localSelected.value;
      if (!selectedValues || !selectedValues.length) {
        localSelected.value = [item[props.keyValue]];
        return;
      }
      if (!Array.isArray(localSelected.value)) {
        localSelected.value = [localSelected.value];
      }
      const index = selectedValues.indexOf(item[props.keyValue]);
      if (index !== -1) {
        localSelected.value.splice(index, 1);
      } else {
        localSelected.value.push(item[props.keyValue]);
      }
    };
    const updateLocalSelectedFull = (newVal) => {
      const isArray = Array.isArray(newVal);
      const transformOptions = transformOptionWithGroup(props.options);
      localSelectedFull.value = transformOptions.filter((el) => {
        if (isArray) {
          return newVal.includes(el[props.keyValue]);
        }
        return newVal.toString() === el[props.keyValue].toString();
      });
      return localSelectedFull.value;
    };
    onBeforeMount(() => {
      updateLocalSelectedFull(localSelected.value);
      updateOutsideModels();
    });
    watch(
      localSelected,
      (newVal) => {
        updateLocalSelectedFull(newVal);
        if (!props.isConfirmInMulti) {
          updateOutsideModels();
        }
      },
      {
        deep: true
      }
    );
    const updateOutsideModelsFull = () => {
      modelFullSelected.value = cloneObj(localSelectedFull.value);
    };
    const updateOutsideModelsSelected = () => {
      model.value = cloneModelValue(localSelected.value);
    };
    const updateOutsideModels = () => {
      updateOutsideModelsSelected();
      updateOutsideModelsFull();
    };
    const resetSelectedByDontConfirm = () => {
      localSelected.value = cloneModelValue(model.value);
    };
    const resetAll = (isConfirm) => {
      localSelected.value = props.multiple ? [] : "";
      if (isConfirm) {
        nextTick(() => {
          updateOutsideModels();
          isLocalOpen.value = false;
        });
      }
    };
    const selectAll = (isConfirm) => {
      localSelected.value = transformOptionWithGroup(props.options).map((el) => el[props.keyValue]);
      if (isConfirm) {
        nextTick(() => {
          updateOutsideModels();
          isLocalOpen.value = false;
        });
      }
    };
    const getSelected = (item) => {
      if (typeof localSelected.value === "object") {
        return localSelected.value.includes(item[props.keyValue]);
      } else {
        return localSelected.value.toString() === item[props.keyValue].toString();
      }
    };
    provide(keyInjectLocalStore, {
      isLocalOpen,
      setIsLocalOpen,
      localSelectedFull,
      $wrapper,
      searchText,
      setSearchText,
      titleText,
      setTitleText,
      getSelected,
      setToggleOption,
      updateOutsideModels,
      resetSelectedByDontConfirm,
      resetAll,
      selectAll,
      componentItemList: slots.itemList || _sfc_main$b,
      componentTitle: slots.title || _sfc_main$a,
      componentBottomControl: slots.bottomControl || _sfc_main$9,
      componentBottomControlOk: slots.bottomControlOk || _sfc_main$8,
      componentBottomControlNo: slots.bottomControlNo || _sfc_main$7,
      componentSelectAllControls: slots.selectControls || _sfc_main$6,
      componentSelectAllControlsSelect: slots.selectControlsSelect || _sfc_main$5,
      componentSelectAllControlsReset: slots.selectControlsReset || _sfc_main$4,
      componentArrowIcon: slots.arrowIcon || _sfc_main$2,
      componentLoading: slots.loading || Loader
    });
    __expose({
      setIsLocalOpen
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "$wrapper",
        ref: $wrapper,
        class: normalizeClass([
          ["SimpleSel"],
          {
            [unref(getClass)("multi", true)]: _ctx.multiple,
            [unref(getClass)("single", true)]: !_ctx.multiple,
            [unref(getClass)("body-always_open", true)]: _ctx.isAlwaysOpen,
            [unref(getClass)("float", true)]: _ctx.isFloat,
            [unref(getClass)("disabled", true)]: _ctx.disabled,
            [unref(getClass)("open", true)]: isLocalOpen.value,
            [unref(getClass)("up", true)]: _ctx.isUp,
            [unref(getClass)("loading", true)]: _ctx.isLoading
          }
        ])
      }, [
        props.isNative ? (openBlock(), createBlock(_sfc_main$3, {
          key: 0,
          modelValue: model.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => model.value = $event),
          onChangeHandler: changeHandler
        }, null, 8, ["modelValue"])) : createCommentVNode("", true),
        createVNode(_sfc_main$e, { onSetIsLocalOpen: setIsLocalOpen }),
        !props.isNative ? (openBlock(), createBlock(_sfc_main$c, { key: 1 })) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const useSelect = {
  install: function(app) {
    app.component("SimpSelect", _sfc_main);
  }
};
export { _sfc_main as SimpSelect, useSelect };
