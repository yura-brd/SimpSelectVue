<script lang="ts" setup>
  import { SimpSelect } from "@/library";
  import { ref, watch } from "vue";
  import SettingToggleItem from "./SettingToggleItem.vue";

  const initIsMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };
  const isFloatSet = () => {
    return window.matchMedia(`screen and (max-width: 760px)`).matches;
  };
  // const modelFull = ref();

  const model = ref<any>({
    name: "Выбрать",
    value: "",
    code: "",
    disabled: true,
    selected: true,
  });
  // const model = ref<any>();
  const options = ref<any>([
    // {
    //   name: "Выбрать",
    //   value: "",
    //   code: "",
    //   disabled: true,
    //   selected: true,
    // },
    // { value: "1", name: "First" },
    // { value: "2", name: "SeConD" },
    // { value: "3", name: "33" },
    // { value: "4", name: "44" },
    // { value: "5", name: "55" },
    // { value: "6", name: "66" },
    // { value: "7", name: "77" },
    // { value: "8", name: "88" },
    // { value: "9", name: "99" },
    // { value: "10", name: "10" },
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
      // model.value = [{ value_id: "2", name_title: "22" }];
      model.value = null;
    }
  });
  const settingDisabled = ref(true);
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
  const isOnlyPlaceholder = ref(false);

  const updateOptions = () => {
    options.value = [
      { value: "1 val", name: "new 11" },
      { value: "2 val", name: "new 22" },
      { value: "3 val", name: "new 33" },
      { value: "4 val", name: "new 44" },
      { value: "5 val", name: "new 55", disabled: true },
      { value: "6 val", name: "new 66" },
    ];
    model.value = { value: "2 val", name: "new 22" };
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
    model.value = null;
  };

  const childComponent = ref();
</script>

<template>
  <div class="wrapper">
    <div>
      <h2>Setting</h2>
      <div class="items">
        <p class="group">
          <SettingToggleItem v-model="settingMultiple" title="Toggle multiple" />
        </p>
        <p class="group">
          <SettingToggleItem v-model="settingDisabled" title="Toggle disabled" />
        </p>
        <p class="group">
          <SettingToggleItem v-model="isFloat" title="Toggle is Float" />
        </p>
        <p class="group">
          <SettingToggleItem v-model="isNative" title="Toggle is Native" />
        </p>
        <p class="group">
          <SettingToggleItem v-model="isAlwaysOpen" title="Toggle is Always Open" />
        </p>
        <p class="group">
          <SettingToggleItem v-model="isRemoveTop" title="Toggle remove top" />
        </p>
        <p>countShowSelected <input v-model="setting_countShowSelected" type="number" min="1" max="99" /></p>
        <p class="group"><SettingToggleItem v-model="isLoading" title="Toggle loading" /></p>
        <p class="group"><SettingToggleItem v-model="isConfirmInMulti" title="Toggle  is Confirm In Multi" /></p>
        <p class="group"><SettingToggleItem v-model="isUp" title="Toggle  is Up" /></p>
        <p class="group">
          <SettingToggleItem v-model="isSelectAll" title="Toggle is Select All" />
          <SettingToggleItem v-model="isResetAll" title="Toggle  is Reset All" />
        </p>
        <p class="group">
          <SettingToggleItem v-model="isSearch" title="Toggle  is Search" />
          <SettingToggleItem v-model="isSearchInDropdown" title="Toggle is Search In Dropdown" />
          <SettingToggleItem v-model="isCloneTitleToSearch" title="Toggle is Clone Title To Search" />
        </p>
        <p class="group"><SettingToggleItem v-model="isOnlyPlaceholder" title="Toggle is Only Placeholder" /></p>

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
        ref="childComponent"
        v-model="model"
        :options="options"
        :disabled="settingDisabled"
        :count-show-selected="setting_countShowSelected"
        :is-confirm-in-multi="isConfirmInMulti"
        :is-float="isFloat"
        :multiple="settingMultiple"
        :is-search="isSearch"
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
        :is-only-placeholder="isOnlyPlaceholder"
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

  .items {
    display: flex;
    flex-direction: column;
    gap: 20px 10px;

    & > p {
      margin: 0;
    }
  }
  .group {
    display: flex;
    gap: 5px;
  }
</style>
