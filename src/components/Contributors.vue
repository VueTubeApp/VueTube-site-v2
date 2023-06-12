<template>
  <a
    v-for="contributor in contributors"
    class="h-16 w-16 rounded-full border border-neutral-600 duration-300 hover:border-neutral-400"
    style="box-shadow: 0 0 0.5rem -0.1rem #fff8"
    :href="contributor.html_url"
    :aria-label="contributor.login"
    :style="{
      backgroundImage: `url('${contributor.avatar_url}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
  ></a>
</template>
<script lang="ts" setup>
interface ContributorType {
  avatar_url: string;
  html_url: string;
  login: string;
}

interface Props {
  contributors: ContributorType[];
}

defineProps<Props>();
</script>
