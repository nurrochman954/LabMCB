import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#0089AA",
        secondary: "#00AFB9",
        accent: "#FED9B7",
        softaccent: "#FED9B7",
        softsec: "#50BCB8",
      },
      backgroundImage: {
        bannerImg: "url('/assets/borobudur.svg')",
      },
    },
  },
  plugins: [],
} satisfies Config;
