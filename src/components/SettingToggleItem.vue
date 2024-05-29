<script lang="ts" setup>
  interface IPops {
    title: string;
  }
  defineProps<IPops>();

  const model = defineModel<boolean>({
    default: false,
  });

  const toggle = () => {
    model.value = !model.value;
  };
</script>

<template>
  <button @click="toggle">{{ title }}: {{ model ? "YES" : "NO" }}</button>
</template>

<style lang="scss"></style>
