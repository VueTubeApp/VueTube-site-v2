<template>
  <button
    v-if="!disabled && !url"
    class="flex items-center justify-center gap-x-2 rounded-3xl px-4 py-3 duration-300 md:py-2"
  >
    <slot></slot>
  </button>
  <button
    v-else-if="disabled"
    class="text-grey-500 pointer-events-none flex items-center justify-center gap-x-2 overflow-hidden rounded-3xl bg-gray-300 px-4 py-3 font-semibold capitalize md:py-2"
  >
    <slot></slot>
  </button>
  <a
    v-else
    :href="url"
    :target="isExternal ? '_blank' : '_self'"
    class="flex items-center justify-center gap-x-2 rounded-3xl px-4 py-3 duration-300 md:py-2"
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
    isExternal: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
