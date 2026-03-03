// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        back: "#EADFD7",
        jaune: "#F9BC50",
        ter: "#BE7D61",
        vert: "#AAA491",
      },
    },
  },
  plugins: [],
};
