import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fef4ee",
          100: "#fde6d7",
          200: "#fac9ad",
          300: "#f6a57a",
          400: "#f27d45",
          500: "#ee5d24",
          600: "#e85d2c",
          700: "#c44a1c",
          800: "#9c3c1a",
          900: "#7e3419",
          950: "#44180b",
        },
        navy: {
          50: "#f6f6f7",
          100: "#e2e3e7",
          200: "#c5c7cf",
          300: "#a0a4b0",
          400: "#7c8191",
          500: "#616676",
          600: "#4c505f",
          700: "#3f424e",
          800: "#363843",
          900: "#1a1a2e",
          950: "#0f101a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.4s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
