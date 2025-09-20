import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./*.{html,js,ts,jsx,tsx}", "./src/**/*.{html,js,ts,jsx,tsx}"],
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

export default config;
