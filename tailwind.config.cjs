/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["montserrat", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          navy: "#213547",
          green: "#3D9076",
          blue: "#B3E5FC",
          yellow: "#FFC300",
          red: "#DF5252",
          purple: "#BAA5D5",
          grey: "#1A1A1A",
        },
      },
    },
  },
  plugins: [],
};
