<script setup lang="ts"></script>

<template>
  <div class="loader_wrap">
    <div class="loader" />
  </div>
</template>

<style scoped lang="scss">
  .loader_wrap {
    width: var(--simpS_height_top);
    height: var(--simpS_height_top);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loader {
    width: 60%;
    height: 60%;
    border-radius: 50%;
    background: conic-gradient(#0000 10%, var(--simpS_color));
    -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 4px), #000 0);
    animation: s3 1s infinite linear;
  }
  .loader:after {
    content: "";
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: inherit;
    animation: inherit;
    animation-duration: 2s;
  }
  @keyframes s3 {
    to {
      transform: rotate(1turn);
    }
  }
</style>
