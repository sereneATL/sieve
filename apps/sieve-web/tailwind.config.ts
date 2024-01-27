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
    fontFamily: {
      head: ["Montserrat", "sans-serif"],
      body: ["Roboto-mono", "sans"],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      layout: {
        disabledOpacity: "0.3", // opacity-[0.3]
        radius: {
          small: "2px", // rounded-small
          medium: "4px", // rounded-medium
          large: "6px", // rounded-large
        },
        borderWidth: {
          small: "1px", // border-small
          medium: "1px", // border-medium
          large: "2px", // border-large
        },
      },
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#e12323",
            },
            secondary: {
              DEFAULT: "#a20f0f",
            },
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#e12323",
            },
          },
        },
      },
    }),
  ],
};
export default config;
