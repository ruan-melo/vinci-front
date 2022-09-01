/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', ...defaultTheme.fontFamily.sans],
        'logo': ['Comfortaa', ...defaultTheme.fontFamily.serif]
      },
    },
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
    require('flowbite/plugin'),
    // require("daisyui"),
  ],
}