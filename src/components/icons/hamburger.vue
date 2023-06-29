<template>
  <svg
    class="hamburger"
    stroke="currentColor"
    viewBox="-4 6 100 100"
    fill="none"
  >
    <path
      class="line"
      stroke-width="10"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m 20 40 h 60 a 1 1 0 0 1 0 20 h -60 a 1 1 0 0 1 0 -40 h 30 v 70"
    ></path>
  </svg>
</template>

<style>
.hamburger {
  transition: translate 0.25s ease-in-out, rotate 0.25s ease-in-out;
  translate: 0 2px;
  scale: 1.2;
}

.hamburger.active {
  cursor: pointer;
  rotate: 45deg;
  translate: 0 -1px;
}

.hamburger .line {
  stroke-dasharray: 60 31 60 300;
  transition: stroke-dashoffset 0.4s ease-in-out,
    stroke-dasharray 0.4s ease-in-out;
}
.hamburger.active .line {
  stroke-dasharray: 60 105 60 300;
  stroke-dashoffset: -90;
}
</style>
