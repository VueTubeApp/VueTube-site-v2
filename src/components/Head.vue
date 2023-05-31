<template>
  <header
    class="sticky top-0 z-50 flex w-full flex-wrap items-center justify-between overflow-hidden p-4 backdrop-blur-xl md:h-[5.5rem] lg:px-6"
  >
    <div class="w-1/3 md:w-1/4">
      <a
        class="block h-12 w-12 bg-[url('/favicon.svg')] bg-contain bg-center bg-no-repeat lg:w-36 lg:bg-[url('/logo.svg')]"
        href="/"
      >
      </a>
    </div>

    <div
      class="absolute z-10 rounded-full bg-neutral-300 backdrop-blur-xl"
      id="background"
    ></div>
    <nav
      class="z-20 order-last mt-4 w-full items-end justify-center font-semibold text-neutral-400 md:order-none md:mt-0 md:flex md:w-1/2 md:items-center"
      style="text-shadow: 0 0 0.5rem #0008, 0 0 0.75rem #0008"
      ref="navElement"
    >
      <!-- -mx-4 to make ensure no gaps between :hover hitboxes on scale-90 -->
      <a
        href="/"
        class="-mx-3 block cursor-pointer whitespace-nowrap px-8 py-4 duration-150 hover:scale-90 hover:text-white"
        @mouseenter="moveBackgroundToTarget"
        @mouseleave="onUnhover"
      >
        Home
      </a>
      <a
        href="/features"
        class="-mx-3 block cursor-pointer whitespace-nowrap px-8 py-4 duration-150 hover:scale-90 hover:text-white"
        @mouseenter="moveBackgroundToTarget"
        @mouseleave="onUnhover"
      >
        Features
      </a>
      <a
        href="/contribute"
        class="-mx-3 block cursor-pointer whitespace-nowrap px-8 py-4 duration-150 hover:scale-90 hover:text-white"
        @mouseenter="moveBackgroundToTarget"
        @mouseleave="onUnhover"
        >Contribute</a
      >
      <a
        href="/docs/"
        class="-mx-3 block cursor-pointer whitespace-nowrap px-8 py-4 duration-150 hover:scale-90 hover:text-white"
        @mouseenter="moveBackgroundToTarget"
        @mouseleave="onUnhover"
        >Docs</a
      >
      <a
        href="/about"
        class="-mx-3 block cursor-pointer whitespace-nowrap px-8 py-4 duration-150 hover:scale-90 hover:text-white"
        @mouseenter="moveBackgroundToTarget"
        @mouseleave="onUnhover"
        >About Us</a
      >
    </nav>

    <div class="flex w-2/3 items-center justify-end gap-4 md:w-1/4">
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
      <Interactive
        id="dl"
        class="flex items-center justify-center gap-x-2 overflow-hidden rounded-3xl border border-white bg-white py-2 px-2 font-semibold capitalize text-black duration-75 hover:scale-105 hover:border-neutral-600 hover:bg-transparent hover:text-white active:scale-110 active:rounded-2xl active:duration-150 xl:pl-3 xl:pr-4"
        @mouseenter.capture.stop="hoverAnimate"
        @mouseleave.capture.stop="cancelAnimate"
      >
        <Icon class="h-6 w-6" icon="mdi:download" />
        <span class="hidden xl:block">Download</span>
      </Interactive>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import Interactive from "./Interactive.vue";
import anime from "animejs";

function hoverAnimate(e: Event) {
  anime({
    targets: (e.target as Element).querySelector("svg"),
    keyframes: [
      { translateY: "0rem", easing: "linear" },
      { translateY: "2rem", easing: "linear" },
      { translateY: "-2rem", easing: "steps(1)" },
      { translateY: "2rem", easing: "linear" },
      { translateY: "-2rem", easing: "steps(1)" },
      { translateY: "0rem", easing: "easeOutElastic(10, 1)" },
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

let currentBackground: Element;

// function to resize and move the background element to a given element
function moveBackground(el: Element, teleport = false) {
  const padding = [-20, -10]; // x, y

  currentBackground = el;
  const isActive = el.classList.contains("scale-90");
  const background = document.getElementById("background") as HTMLElement;

  const ease = teleport ? "steps(1)" : "easeOutExpo";

  const scale = isActive ? 0.9 : 1;
  const { width, height, left, top } = el.getBoundingClientRect();
  const adjustedWidth = width / scale;
  const adjustedHeight = height / scale;
  const adjustedLeft = left - (adjustedWidth - width) / 2;
  const adjustedTop = top - (adjustedHeight - height) / 2;

  anime.remove(background);
  anime({
    targets: background,
    opacity: 0.3,
    width: adjustedWidth + padding[0] * 2,
    height: adjustedHeight + padding[1] * 2,
    left: adjustedLeft - padding[0],
    top: adjustedTop - padding[1],
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
  const navElementValue = navElement.value as unknown as Element;
  if (!navElementValue) return;

  const activeNavElement = navElementValue.querySelector(
    `a[href="${window.location.pathname}"]`
  );
  if (!activeNavElement) {
    moveBackground(navElementValue.children[0]);
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
  resetBackground(true);

  // window resize event listener to resize the background element to the current nav element
  window.addEventListener("resize", () => {
    if (!currentBackground) return;
    moveBackground(currentBackground, true);
  });

  const navLinks = Array.from(document.querySelectorAll("nav a"));

  navLinks.forEach((link) => {
    if (!navElement.value) return;
    const activeNavElement = (navElement.value as Element).querySelector(
      `a[href="${window.location.pathname}"]`
    );

    if (link == activeNavElement) {
      link.classList.remove("text-neutral-400");
      link.classList.add("scale-90", "text-white");
    }
  });
});
</script>
