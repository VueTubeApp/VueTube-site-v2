<template>
  <header
    class="sticky top-0 z-50 flex h-[5.5rem] w-full items-center justify-between overflow-hidden p-4 backdrop-blur-xl"
  >
    <div class="w-1/4">
      <a
        class="hidden h-12 w-36 bg-[url('/logo.svg')] bg-contain bg-center bg-no-repeat md:block"
        href="/"
      >
      </a>
    </div>

    <nav
      class="top-0 hidden w-1/2 justify-center gap-4 md:flex"
      style="text-shadow: 0 0 0.25rem #000, 0 0 0.5rem #000, 0 0 0.75rem #000"
    >
      <a
        href="/features"
        class="block cursor-pointer rounded-2xl bg-neutral-500 bg-opacity-25 p-2 backdrop-blur-md"
      >
        Features
      </a>
      <a href="/contribute" class="block cursor-pointer p-2">Contribute</a>
      <a href="/docs/" class="block cursor-pointer p-2">Docs</a>
      <a href="/about" class="block cursor-pointer p-2">About Us</a>
    </nav>

    <div class="flex w-1/4 items-center justify-end gap-4">
      <a
        class="grid h-10 w-10 place-items-center rounded-2xl duration-300 hover:scale-105 hover:bg-[#5865F2] active:scale-90 active:duration-0"
        href="https://vuetube.app/discord"
        target="_blank"
      >
        <Icon class="h-6 w-6" icon="fa-brands:discord" />
      </a>
      <a
        class="grid h-10 w-10 place-items-center rounded-2xl duration-300 hover:scale-105 hover:bg-white hover:text-black active:scale-90 active:duration-0"
        href="https://github.com/VueTubeApp/"
        target="_blank"
      >
        <Icon class="h-6 w-6" icon="fa-brands:github" />
      </a>
      <VButton
        id="dl"
        class="flex items-center justify-center gap-x-2 overflow-hidden rounded-3xl border border-white bg-white px-4 py-2 font-semibold capitalize text-black duration-75 hover:scale-105 hover:border-neutral-600 hover:bg-transparent hover:text-white active:scale-110 active:rounded-2xl active:duration-150"
        @mouseenter.capture.stop="hoverAnimate"
        @mouseleave.capture.stop="cancelAnimate"
      >
        <Icon class="h-6 w-6" icon="mdi:download" />
        Download
      </VButton>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import anime from "animejs";
import VButton from "./v-button.vue";

function hoverAnimate(e: Event) {
  anime({
    targets: (e.target as Element).querySelector("svg"),
    keyframes: [
      { translateY: "0rem", easing: "easeInOutExpo" },
      { translateY: "2rem", easing: "easeInOutExpo" },
      { translateY: "-2rem", easing: "steps(1)" },
      { translateY: "2rem", easing: "easeInOutExpo" },
      { translateY: "-2rem", easing: "steps(1)" },
      { translateY: "0rem", easing: "easeInOutExpo" },
    ],
    duration: 800,
  });
}

function cancelAnimate(e: Event) {
  anime.remove((e.target as Element).querySelector("svg"));
  anime({
    targets: (e.target as Element).querySelector("svg"),
    translateY: "0rem",
    duration: 0,
  });
}
</script>
