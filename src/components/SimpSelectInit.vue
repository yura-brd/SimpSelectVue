<script lang="ts" setup>
  import { SimpSelect } from "@/library";
  import { ref, watch } from "vue";
  import SettingToggleItem from "./SettingToggleItem.vue";

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type { ISimpleSelectOption } from "@/library/simpSelect/simpSelect.types";

  const initIsMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };
  const isFloatSet = () => {
    return window.matchMedia(`screen and (max-width: 760px)`).matches;
  };
  const modelFull = ref();

  const model = ref<string[] | string>(["1"]);
  const options = ref<any>([
    { value: "1", name: "11" },
    { value: "2", name: "22" },
    { value: "3", name: "33" },
    { value: "4", name: "44" },
    { value: "5", name: "55" },
    { value: "6", name: "66" },
  ]);

  const optionsCustomKeys = ref<any>([
    { value_id: "1", name_title: "11" },
    { value_id: "2", name_title: "22" },
    { value_id: "3", name_title: "33" },
  ]);

  const settingMultiple = ref(false);
  watch(settingMultiple, newVal => {
    if (!newVal) {
      alert("model was reset");
      model.value = ["1"];
    }
  });
  const settingDisabled = ref(false);
  // const setting_ = ref(false);
  const setting_countShowSelected = ref(3);
  const isNative = ref(initIsMobile());
  const isFloat = ref(isFloatSet());
  const isRemoveTop = ref(false);
  const isAlwaysOpen = ref(false);
  watch(isRemoveTop, val => {
    if (val) {
      alert(`isAlwaysOpen was set true`);
      isAlwaysOpen.value = true;
    }
  });
  const isLoading = ref(false);
  const isConfirmInMulti = ref(false);
  watch(isConfirmInMulti, val => {
    if (val) {
      alert(`settingMultiple was set true`);
      settingMultiple.value = true;
    }
  });
  const isUp = ref(false);
  const isSelectAll = ref(false);
  const isResetAll = ref(false);
  const isSearch = ref(true);
  const isSearchInDropdown = ref(false);
  const isCloneTitleToSearch = ref(false);

  const updateOptions = () => {
    options.value = [
      { value: "1 val", name: "new 11" },
      { value: "2 val", name: "new 22" },
      { value: "3 val", name: "new 33" },
      { value: "4 val", name: "new 44" },
      { value: "5 val", name: "new 55", disabled: true },
      { value: "6 val", name: "new 66" },
    ];
    model.value = "3 val";
  };
  const updateGroupOptions = () => {
    options.value = [
      {
        label: "text label1",
        isOptgroupSelect: true,
        items: [
          { value: "1 new_val", name: "11" },
          { value: "2 new_val", name: "22" },
          { value: "3 new_val", name: "33" },
          { value: "4 new_val", name: "44", disabled: true },
          { value: "5 new_val", name: "55" },
          { value: "6 new_val", name: "66" },
        ],
      },
      {
        label: "text label2",
        isOptgroupSelect: true,
        disabled: true,
        items: [
          { value: "1_1 val", name: "11 - second" },
          { value: "2_1 val", name: "22 - second" },
          { value: "3_1 val", name: "33 - second" },
          { value: "4_1 val", name: "44 - second" },
          { value: "5_1 val", name: "55 - second" },
          { value: "6_1 val", name: "66 - second" },
        ],
      },
    ];
    // @ts-ignore
    model.value = "1112 new_val";
  };

  const childComponent = ref();
</script>

<template>
  <div class="wrapper">
    <div>
      <h2>Setting</h2>
      <div>
        <p>
          <SettingToggleItem v-model="settingMultiple" title="multiple" />
        </p>
        <p>
          <SettingToggleItem v-model="settingDisabled" title="Disabled" />
        </p>
        <p>
          <SettingToggleItem v-model="isFloat" title="isFloat" />
        </p>
        <p>
          <SettingToggleItem v-model="isNative" title="is Native" />
        </p>
        <p>
          <SettingToggleItem v-model="isAlwaysOpen" title="isAlwaysOpen" />
        </p>
        <p>
          <SettingToggleItem v-model="isRemoveTop" title="remove top" />
        </p>
        <p>countShowSelected <input v-model="setting_countShowSelected" type="number" min="1" max="99" /></p>
        <p><SettingToggleItem v-model="isLoading" title="loading" /></p>
        <p><SettingToggleItem v-model="isConfirmInMulti" title="isConfirmInMulti" /></p>
        <p><SettingToggleItem v-model="isUp" title="isUp" /></p>
        <p>
          <SettingToggleItem v-model="isSelectAll" title="isSelectAll" />
          <SettingToggleItem v-model="isResetAll" title="isResetAll" />
        </p>
        <p>
          <SettingToggleItem v-model="isSearch" title="isSearch" />
          <SettingToggleItem v-model="isSearchInDropdown" title="isSearchInDropdown" />
          <SettingToggleItem v-model="isCloneTitleToSearch" title="isCloneTitleToSearch" />
        </p>

        <p>
          <button @click="updateOptions">Set new Options</button>
        </p>
        <p>
          <button @click="updateGroupOptions">Set new Options (Group)</button>
        </p>
      </div>
    </div>
    <div style="margin: 50px 0">
      <h2>Result</h2>
      <SimpSelect
        v-model="model"
        v-model:fullSelected="modelFull"
        :disabled="settingDisabled"
        :count-show-selected="setting_countShowSelected"
        :is-confirm-in-multi="isConfirmInMulti"
        :is-float="isFloat"
        :multiple="settingMultiple"
        :options="options"
        :is-search="isSearch"
        ref="childComponent"
        :is-search-in-dropdown="isSearchInDropdown"
        :is-clone-title-to-search="isCloneTitleToSearch"
        :is-always-open="isAlwaysOpen"
        :is-remove-top="isRemoveTop"
        :is-native="isNative"
        :is-up="isUp"
        :select-all="isSelectAll"
        :reset-all="isResetAll"
        class="select"
        :is-loading="isLoading"
        @callback-close="
          () => {
            console.log('close');
          }
        "
        @callback-open="
          () => {
            console.log('open');
          }
        "
      />
    </div>
    <div>
      <p>Selected values: {{ model }}</p>
      <p>Selected values full objects: {{ modelFull }}</p>
      <p><button @click.stop.prevent="childComponent.setIsLocalOpen()">toggle open</button></p>
    </div>

    <div>
      <h3>Custom keys</h3>
      <pre
        >{{ optionsCustomKeys }}

:key-value="'value_id'"
:key-title="'name_title'"</pre
      >
      <SimpSelect :options="optionsCustomKeys" :key-value="'value_id'" :key-title="'name_title'" :is-up="true" />
    </div>
  </div>
</template>

<style lang="scss">
  @import "../library/simpSelect/simpSelect-styles";

  .wrapper {
    display: flex;
    flex-direction: column;
    margin: 50px auto;
    width: 100%;
    max-width: 800px;
  }
  .select {
    width: 100%;
  }
</style>
