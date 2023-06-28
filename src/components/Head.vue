<template>
  <header
    id="nav"
    :class="
      menu
        ? 'max-h-[20rem] rounded-b-3xl bg-neutral-800 bg-opacity-30 duration-300'
        : 'max-h-[5.5rem] overflow-hidden rounded-b-none bg-transparent duration-300'
    "
    class="fixed top-0 z-50 flex w-full flex-wrap items-center justify-between p-4 backdrop-blur-xl lg:px-6"
  >
    <div class="w-1/5 md:w-auto lg:w-1/4">
      <a
        :style="
          menu
            ? 'scale: 2.5; rotate: 120deg; translate: 5rem 6rem; opacity: 0.5'
            : 'scale: 1; translate: 0 0;'
        "
        :class="
          menu ? `bg-[url('/logomark120.svg')]` : `bg-[url('/logomark.svg')]`
        "
        class="block h-12 w-12 bg-contain bg-center bg-no-repeat duration-300 focus:scale-105 md:duration-200 md:hover:scale-105 lg:w-36 lg:bg-[url('/logo.svg')]"
        href="/"
        tabindex="2"
      >
      </a>
    </div>

    <div
      class="absolute rounded-full bg-neutral-300 backdrop-blur-xl md:block"
      id="background"
    ></div>
    <nav
      class="order-last mt-4 flex w-full flex-col items-end justify-center font-semibold text-neutral-400 md:order-none md:mt-0 md:flex md:w-1/2 md:flex-row md:items-center"
      style="text-shadow: 0 0 0.5rem #0008, 0 0 0.75rem #0008"
      ref="navElement"
    >
      <!-- md:-mx-3 to make ensure no gaps between :hover hitboxes on scale-90 -->
      <a
        href="/"
        class="-mr-5 block cursor-pointer whitespace-nowrap px-8 py-4 transition duration-150 hover:scale-90 hover:text-white focus:scale-90 focus:text-white focus:outline-none md:-mx-3"
        @mouseenter="moveBackgroundToTarget"
        @mouseleave="onUnhover"
        @focusin="moveBackgroundToTarget"
        @focusout="onUnhover"
      >
        Home
      </a>
      <!-- <a
        href="/features"
        class="-mr-5 block cursor-pointer whitespace-nowrap px-8 py-4 transition duration-150 hover:scale-90 hover:text-white focus:scale-90 focus:text-white focus:outline-none md:-mx-3"
        @mouseenter="moveBackgroundToTarget"
        @mouseleave="onUnhover"
        @focusin="moveBackgroundToTarget"
        @focusout="onUnhover"
      >
        Features
      </a> -->
      <!-- <a
        href="/contribute"
        class="-mr-5 block cursor-pointer whitespace-nowrap px-8 py-4 transition duration-150 hover:scale-90 hover:text-white focus:scale-90 focus:text-white focus:outline-none md:-mx-3"
        @mouseenter="moveBackgroundToTarget"
        @mouseleave="onUnhover"
        @focusin="moveBackgroundToTarget"
        @focusout="onUnhover"
      >
        Contribute
      </a> -->
      <a
        href="/docs"
        class="-mr-5 block cursor-pointer whitespace-nowrap px-8 py-4 transition duration-150 hover:scale-90 hover:text-white focus:scale-90 focus:text-white focus:outline-none md:-mx-3"
        @mouseenter="moveBackgroundToTarget"
        @mouseleave="onUnhover"
        @focusin="moveBackgroundToTarget"
        @focusout="onUnhover"
      >
        Docs
      </a>
      <!-- <a
        href="/about"
        class="-mr-5 block cursor-pointer whitespace-nowrap px-8 py-4 transition duration-150 hover:scale-90 hover:text-white focus:scale-90 focus:text-white focus:outline-none md:-mx-3"
        @mouseenter="moveBackgroundToTarget"
        @mouseleave="onUnhover"
        @focusin="moveBackgroundToTarget"
        @focusout="onUnhover"
      >
        About Us
      </a> -->
    </nav>

    <div
      class="flex flex-grow items-center justify-end gap-4 text-white sm:w-2/3 sm:flex-initial md:w-auto lg:w-1/4"
    >
      <a
        class="grid h-10 w-10 place-items-center rounded-2xl transition duration-300 hover:scale-105 hover:bg-[#5865F2] focus:scale-105 focus:bg-[#5865F2] focus:outline-none focus:ring focus:ring-neutral-300 active:scale-90 active:duration-0"
        href="https://vuetube.app/discord"
        target="_blank"
      >
        <Icon class="h-6 w-6" icon="fa-brands:discord" />
      </a>
      <a
        class="grid h-10 w-10 place-items-center rounded-2xl transition duration-300 hover:scale-105 hover:bg-white hover:text-black focus:scale-105 focus:bg-white focus:text-black focus:outline-none focus:ring focus:ring-neutral-300 active:scale-90 active:duration-0"
        href="https://github.com/VueTubeApp/"
        target="_blank"
      >
        <Icon class="h-6 w-6" icon="fa-brands:github" />
      </a>
      <a
        id="dl"
        class="flex items-center justify-center gap-x-2 overflow-hidden rounded-3xl px-1 py-1 font-semibold capitalize text-white transition duration-75 hover:scale-105 hover:border-neutral-600 hover:bg-transparent hover:text-white focus:scale-105 focus:border-neutral-600 focus:bg-transparent focus:text-white focus:outline-none focus:ring focus:ring-neutral-300 active:scale-110 active:rounded-2xl active:duration-150 sm:px-2 sm:py-2 md:border md:border-white md:bg-white md:text-black xl:pl-3 xl:pr-4"
        @mouseenter="hoverAnimate"
        @mouseleave="cancelAnimate"
        @focusin="hoverAnimate"
        @focusout="cancelAnimate"
        url="/#download"
      >
        <Icon class="h-6 w-6" icon="mdi:download" />
        <span class="hidden xl:block">Download</span>
      </a>
      <button
        @click="menu = !menu"
        class="-mr-4 rounded-l-full bg-neutral-600 bg-opacity-30 p-2 pl-3 md:hidden"
      >
        <Icon
          class="h-6 w-6 duration-300"
          :class="menu ? 'rotate-90' : 'rotate-0'"
          :icon="menu ? 'mdi:close' : 'mdi:menu'"
        />
      </button>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import Interactive from "./Interactive.vue";
import anime from "animejs";

const menu = ref(false);

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
    duration: 600,
  });
}

function cancelAnimate(e: Event) {
  anime.remove((e.target as Element).querySelector("svg"));
  anime({
    targets: (e.target as Element).querySelector("svg"),
    translateY: "0rem",
    duration: 300,
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

  const pathname = window.location.pathname.replace(/\/$/, "") || "/";
  const activeNavElement = navElementValue.querySelector(
    `a[href="${pathname}"]`
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

function updateNav() {
  if (!navElement.value) return;
  const navLinks = Array.from(document.querySelectorAll("nav a"));
  const pathname = window.location.pathname.replace(/\/$/, "") || "/";
  const activeNavElement = (navElement.value as Element).querySelector(
    `a[href="${pathname}"]`
  );
  navLinks.forEach((link) => {
    link.classList.remove("scale-90", "text-white");
    link.classList.add("text-neutral-400");
  });
  activeNavElement?.classList.add("scale-90", "text-white");
  activeNavElement?.classList.remove("text-neutral-400");
}

const navElement = ref(null);

onMounted(() => {
  resetBackground(true);
  // window resize event listener to resize the background element to the current nav element
  window.addEventListener("resize", (e: Event) => {
    if (!currentBackground) return;
    if (window.innerWidth >= 768) {
      menu.value = false;
    }
    moveBackground(currentBackground, true);
  });

  updateNav();
});
</script>
