<template>
  <button
    v-if="!disabled"
    class="flex items-center justify-center gap-x-2 overflow-hidden rounded-3xl px-4 py-2 font-semibold capitalize text-black"
    @click="handleClick"
  >
    <slot></slot>
  </button>
  <button
    v-else
    class="text-grey-500 pointer-events-none flex items-center justify-center gap-x-2 overflow-hidden rounded-3xl bg-gray-300 px-4 py-2 font-semibold capitalize"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  handleClick: {
    type: Function,
    default: () => {},
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
});
</script>
