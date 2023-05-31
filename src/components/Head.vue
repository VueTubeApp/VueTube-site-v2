<template>
  <header
    class="sticky top-0 z-50 flex h-[5.5rem] w-full items-center justify-between overflow-hidden px-10 py-4 backdrop-blur-xl"
  >
    <div class="w-1/4">
      <a
        class="hidden h-12 w-36 bg-[url('/logo.svg')] bg-contain bg-center bg-no-repeat md:block"
        href="/"
      >
      </a>
    </div>

    <div
      class="absolute z-10 rounded-full bg-neutral-300 backdrop-blur-xl"
      id="background"
    ></div>
    <nav
      class="top-0 z-20 hidden w-1/2 justify-center font-semibold md:flex"
      style="text-shadow: 0 0 0.5rem #0008, 0 0 0.75rem #0008"
      ref="navElement"
    >
      <!-- -mx-4 to make ensure no gaps between :hover hitboxes on scale-90 -->
      <a
        href="/"
        :class="isActive('/') ? 'scale-90 text-white' : 'text-neutral-500'"
        class="-mx-4 block cursor-pointer px-8 py-4 duration-150 hover:scale-90 hover:text-white"
        @mouseenter="moveBackgroundToTarget"
        @mouseleave="onUnhover"
      >
        Home
      </a>
      <a
        href="/features"
        :class="
          isActive('/features') ? 'scale-90 text-white' : 'text-neutral-500'
        "
        class="-mx-4 block cursor-pointer px-8 py-4 duration-150 hover:scale-90 hover:text-white"
        @mouseenter="moveBackgroundToTarget"
        @mouseleave="onUnhover"
      >
        Features
      </a>
      <a
        href="/contribute"
        :class="
          isActive('/contribute') ? 'scale-90 text-white' : 'text-neutral-500'
        "
        class="-mx-4 block cursor-pointer px-8 py-4 duration-150 hover:scale-90 hover:text-white"
        @mouseenter="moveBackgroundToTarget"
        @mouseleave="onUnhover"
        >Contribute</a
      >
      <a
        href="/docs/"
        :class="isActive('/docs/') ? 'scale-90 text-white' : 'text-neutral-500'"
        class="-mx-4 block cursor-pointer px-8 py-4 duration-150 hover:scale-90 hover:text-white"
        @mouseenter="moveBackgroundToTarget"
        @mouseleave="onUnhover"
        >Docs</a
      >
      <a
        href="/about"
        :class="isActive('/about') ? 'scale-90 text-white' : 'text-neutral-500'"
        class="-mx-4 block cursor-pointer px-8 py-4 duration-150 hover:scale-90 hover:text-white"
        @mouseenter="moveBackgroundToTarget"
        @mouseleave="onUnhover"
        >About Us</a
      >
    </nav>

    <div class="flex w-1/4 items-center justify-end gap-4">
      <a
        class="active:duration-0 grid h-10 w-10 place-items-center rounded-2xl duration-300 hover:scale-105 hover:bg-[#5865F2] active:scale-90"
        href="https://vuetube.app/discord"
        target="_blank"
      >
        <Icon class="h-6 w-6" icon="fa-brands:discord" />
      </a>
      <a
        class="active:duration-0 grid h-10 w-10 place-items-center rounded-2xl duration-300 hover:scale-105 hover:bg-white hover:text-black active:scale-90"
        href="https://github.com/VueTubeApp/"
        target="_blank"
      >
        <Icon class="h-6 w-6" icon="fa-brands:github" />
      </a>
      <Butt
        id="dl"
        class="flex items-center justify-center gap-x-2 overflow-hidden rounded-3xl border border-white bg-white py-2 pl-3 pr-4 font-semibold capitalize text-black duration-75 hover:scale-105 hover:border-neutral-600 hover:bg-transparent hover:text-white active:scale-110 active:rounded-2xl active:duration-150"
        @mouseenter.capture.stop="hoverAnimate"
        @mouseleave.capture.stop="cancelAnimate"
      >
        <Icon class="h-6 w-6" icon="mdi:download" />
        Download
      </Butt>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import Butt from "./butt.vue";
import anime from "animejs";

function isActive(path: string) {
  return window.location.pathname === path;
}

function hoverAnimate(e: Event) {
  anime({
    targets: (e.target as Element).querySelector("svg"),
    keyframes: [
      { translateY: "0rem", easing: "easeInOutExpo" },
      { translateY: "2rem", easing: "easeInOutExpo" },
      { translateY: "-2rem", easing: "steps(1)" },
      { translateY: "2rem", easing: "easeInOutExpo" },
      { translateY: "-2rem", easing: "steps(1)" },
      { translateY: "0rem", easing: "easeOutElastic" },
    ],
    duration: 750,
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

let currentBackground: Element;

// function to resize and move the background element to a given element
function moveBackground(el: Element, teleport = false) {
  currentBackground = el;
  let isActive = el.classList.contains("scale-90");
  const background = document.getElementById("background") as HTMLElement;
  const rect = el.getBoundingClientRect();
  let padding = [-20, -10]; // x, y
  anime.remove(background);
  let ease: string;
  if (teleport) {
    ease = "steps(1)";
  } else {
    ease = "easeOutExpo";
  }
  anime({
    targets: background,
    opacity: 0.3,
    width: (isActive ? (rect.width / 9) * 10 : rect.width) + padding[0] * 2,
    height: (isActive ? (rect.height / 9) * 10 : rect.height) + padding[1] * 2,
    left: (isActive ? rect.left - rect.width / 18 : rect.left) - padding[0],
    top: (isActive ? rect.top - rect.height / 18 : rect.top) - padding[1],
    duration: 500,
    easing: ease,
  });
}

// event handler function to move the background element to the target of the event
function moveBackgroundToTarget(e: Event) {
  moveBackground(e.target as Element);
}

function resetBackground(teleport = false) {
  // find the current active nav element corresponding to the current page
  if (!navElement.value) return;
  const activeNavElement = (navElement.value as Element).querySelector(
    `a[href="${window.location.pathname}"]`
  );
  if (!activeNavElement) {
    moveBackground((navElement.value as Element).children[0]);
    anime({
      targets: "#background",
      opacity: 0,
      width: 0,
      duration: 500,
      easing: "easeInOutExpo",
    });
    return;
  }
  moveBackground(activeNavElement, teleport);
}

function onUnhover() {
  resetBackground();
}

const navElement = ref(null);

onMounted(() => {
  if (!navElement.value) return;
  resetBackground(true);

  // window resize event listener to resize the background element to the current nav element
  window.addEventListener("resize", () => {
    if (!currentBackground) return;
    moveBackground(currentBackground, true);
  });
});
</script>
