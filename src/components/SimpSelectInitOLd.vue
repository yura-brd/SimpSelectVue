<script lang="ts" setup>
  import { SimpSelect } from "@/library";
  import { ref } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type { ISimpleSelectOption } from "@/library/simpSelect/simpSelect.types";

  const initIsMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };
  const isFloatSet = () => {
    return window.matchMedia(`screen and (max-width: 2000px)`).matches;
  };

  const model = ref(["1"]);
  const options = ref([
    { value: "1", name: "11" },
    { value: "2", name: "22" },
    { value: "3", name: "33" },
    { value: "4", name: "44" },
    { value: "5", name: "55" },
    { value: "6", name: "66" },
  ]);

  const updataOptions = () => {
    options.value = [
      {
        label: "text label1",
        isOptgroupSelect: true,
        items: [
          { value: "1 val", name: "11" },
          { value: "2 val", name: "22" },
          { value: "3 val", name: "33" },
          { value: "4 val", name: "44", disabled: true },
          { value: "5 val", name: "55" },
          { value: "6 val", name: "66" },
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
    model.value = "2";
  };

  const model2 = ref(1);
  const options2 = ref([
    { value: "1 val", name: "11" },
    { value: "2 val", name: "22" },
    { value: "3 val", name: "33" },
    { value: "4 val", name: "44" },
    { value: "5 val", name: "55" },
    { value: "6 val", name: "66" },
  ]);

  const model1Full = ref();

  const isNative = ref(initIsMobile());
  const isFloat = ref(isFloatSet());
</script>

<template>
  <div class="wrapper">
    <div>
      <hr />
      <p>model1Full - {{ model1Full }}</p>
      <button @click="model = ['1']">set first</button>
      <button @click="updataOptions()">update options</button>
      <p>model - {{ model }}</p>
      <p><button @click="isNative = !isNative">toggle native</button></p>
      <p><button @click="isFloat = !isFloat">toggle is float</button></p>
      <hr />
      <SimpSelect
        v-model="model"
        v-model:fullSelected="model1Full"
        :is-confirm-in-multi="isFloat"
        :multiple="!0"
        :options="options"
        :is-native="isNative"
        :is-float="isFloat"
        :is-up="!isFloat"
        class="custom_class"
        :is-loading="false"
        @callback-close="() => {console.log('close')}"
        @callback-open="() => {console.log('open')}"
      >
        <!--
<template #arrowIcon> arrowIcon </template>
        <template #loading> loading </template>
        -->
        <!--
        <template #selectControlsSelect="props">
          <button @click="props.callback">select all</button>
        </template>
        <template #selectControlsReset="props">
          <button @click="props.callback">reset all</button>
        </template>
        <template #selectControls="props">
          <div>
            <button @click="props.select">select all</button>
            <button @click="props.reset">reset all</button>
          </div>
        </template>
        -->
        <!--
         <template #bottomControlOk="props">
          <button @click="props.callback">ok</button>
        </template>
        <template #bottomControlNo="props">
          <button @click="props.callback">no</button>
        </template>
      <template #bottomControl="props">
          <div >
            <button @click="props.confirm">ok</button>
            <button @click="props.cancellation">no</button>
          </div>
        </template>
        -->
      </SimpSelect>
    </div>
    <div style="margin-bottom: 50px">
      <p>remove top and always show body</p>
      <SimpSelect
        :is-remove-top="true"
        :is-always-open="true"
        :is-search="true"
        :is-search-in-dropdown="true"
        :multiple="true"
        :options="[
          {
            label: 'text label1',
            isOptgroupSelect: true,
            items: [
              { value: '1 val', name: '11' },
              { value: '2 val', name: '22' },
              { value: '3 val', name: '33' },
              { value: '4 val', name: '44', disabled: true },
              { value: '5 val', name: '55' },
              { value: '6 val', name: '66' },
            ],
          },
          {
            label: 'text label2',
            isOptgroupSelect: true,
            disabled: true,
            items: [
              { value: '1_1 val', name: '11 - second' },
              { value: '2_1 val', name: '22 - second' },
              { value: '3_1 val', name: '33 - second' },
              { value: '4_1 val', name: '44 - second' },
              { value: '5_1 val', name: '55 - second' },
              { value: '6_1 val', name: '66 - second' },
            ],
          },
        ]"
      />
    </div>
    <div style="margin-top: 50px">
      <SimpSelect v-model="model" :multiple="!0" :options="options" :is-search="false" :count-show-selected="null" />
    </div>
    <div style="margin-top: 50px">
      <SimpSelect
        v-model="model2"
        :options="options2"
        :is-search-in-dropdown="true"
        :search-fields-keys="['name', 'value']"
      >
        <template #title="{ titleRes, ...props }: { titleRes: any }">
          <div>~~ {{ titleRes?.result }}~~</div>
        </template>
        <template #itemList="{ item, ...props }: { item: ISimpleSelectOption }">
          <div v-bind="props">
            <strong>
              {{ item.name }}
            </strong>
          </div>
        </template>
      </SimpSelect>
    </div>
    <div style="margin-top: 50px">
      <p>group</p>
      <SimpSelect
        :multiple="false"
        :options="[
          {
            label: 'text label1',
            isOptgroupSelect: true,
            items: [
              { value: '1 val', name: '11' },
              { value: '2 val', name: '22' },
              { value: '3 val', name: '33' },
              { value: '4 val', name: '44' },
              { value: '5 val', name: '55' },
              { value: '6 val', name: '66' },
            ],
          },
          {
            disabled: true,
            label: 'text label2',
            isOptgroupSelect: true,
            items: [
              { value: '1_1 val', name: '11 - second' },
              { value: '2_1 val', name: '22 - second' },
              { value: '3_1 val', name: '33 - second' },
              { value: '4_1 val', name: '44 - second' },
              { value: '5_1 val', name: '55 - second' },
              { value: '6_1 val', name: '66 - second' },
            ],
          },
        ]"
      />
    </div>
  </div>
</template>

<style lang="scss">
  @import "../library/simpSelect/simpSelect-styles";

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 50px 0;
  }
</style>
