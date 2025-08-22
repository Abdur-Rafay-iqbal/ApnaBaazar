
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: "#0E9F6E",
        darkbg: "#071320"
      }
    },
  },
  plugins: [],
};
