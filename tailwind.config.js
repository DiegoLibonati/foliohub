/** @type {import('tailwindcss').Config} */

const config = {
  content: ["./index.html", "./src/**/*.{ts,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#1d2b53",
        secondary: "#7e2553",
        white: "#ffffff",
        black: "#000000",
      },
      fontFamily: {
        primary: ["Roboto", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
