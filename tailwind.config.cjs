/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.{html,js,ts}", "./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#1d2b53",
        secondary: "#7e2553",
        white: "#ffffff",
        black: "#000000",
      },
    },
  },
  plugins: [],
};
