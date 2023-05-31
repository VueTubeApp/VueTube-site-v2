<template>
  <button
    v-if="!disabled && !url"
    class="flex items-center justify-center gap-x-2"
  >
    <slot></slot>
  </button>
  <button
    v-else-if="disabled"
    class="text-grey-500 pointer-events-none flex items-center justify-center gap-x-2 overflow-hidden rounded-3xl bg-gray-300 px-4 py-2 font-semibold capitalize"
  >
    <slot></slot>
  </button>
  <a
    v-else
    :href="url"
    target="_blank"
    class="flex items-center justify-center gap-x-2"
  >
    <slot></slot>
  </a>
</template>

<script lang="ts">
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      default: undefined,
    },
  },
};
</script>
