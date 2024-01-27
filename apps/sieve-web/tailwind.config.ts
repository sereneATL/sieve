import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      "sieve-dark-red": "#a20f0f",
      "sieve-red": "#e12323",
      "bubblegum": "#ffd8e1",
      "mono-light-100": "#ffffff",
      "mono-light-200": "#594E60",
      "mono-light-300": "#382a40",
    },
    extend: {
      fontFamily: {
        head: ['var(--font-montserrat)'],
        body: ['var(--font-roboto)'],
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          layout: {
            disabledOpacity: "0.5",
          },
          colors: {
            primary: "#e12323",
            secondary: "#a20f0f"
          },
        }
      },
    }),
  ],
};
export default config;
