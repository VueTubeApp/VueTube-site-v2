<template>
  <div
    v-for="contributor in contributors"
    class="h-16 w-16 rounded-full border"
    style="box-shadow: 0 0 1rem -0.1rem #fff8"
    :style="{
      backgroundImage: `url('${contributor}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
  ></div>
</template>
<script lang="ts" setup>
const props = defineProps({
  contributors: {
    type: Array,
    required: true,
  },
});
</script>
