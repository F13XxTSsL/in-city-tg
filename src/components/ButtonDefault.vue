<script setup>
  import Loader from "@/components/Loader.vue";

  defineProps({
    text: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loader: {
      type: Boolean,
      default: false
    }
  })
</script>

<template>
<button class="btn-default body_16_bold" :disabled="disabled" :class="{'is-loader': loader}">
  <Loader v-if="loader" />
  <template v-else>  {{ text }} </template>

</button>
</template>

<style scoped lang="scss">
  .btn-default {
    padding: 20px 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--light-main-gray-700);
    border-radius: 10px;
    outline: none;
    border: 0;
    color: var(--white);
    transition: 0.3s background-color, 0.1s box-shadow;
    &:active {
      box-shadow: rgba(227,229,237, 1) 0 0 0 8px;
    }
    &:disabled {
      color: var(--light-main-gray-500);
      background: var(--light-main-gray-300);
      pointer-events: none;
    }
    &.is-loader {
      pointer-events: none;
    }
  }
</style>