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
        primary: {
          50: "#f0f4f8",
          100: "#d9e2ec",
          200: "#bccddc",
          300: "#94aec8",
          400: "#6d8faf",
          500: "#4d7298",
          600: "#1e3a5f",
          700: "#172e4d",
          800: "#0f223b",
          900: "#0a1729",
          950: "#070f1a",
        },
        accent: {
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
        gold: {
          50: "#fbf7ef",
          100: "#f5ebd3",
          200: "#ead5a3",
          300: "#dfba6f",
          400: "#d4a34a",
          500: "#c4952c",
          600: "#a87a24",
          700: "#865f1f",
          800: "#6c4d1e",
          900: "#5b411d",
          950: "#34230d",
        },
        dark: {
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
        heading: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.4s ease-out forwards",
        "slide-left": "slideLeft 0.6s ease-out forwards",
        "slide-right": "slideRight 0.6s ease-out forwards",
        "wiggle": "wiggle 0.5s ease-in-out",
        "bounce-in": "bounceIn 0.5s ease-out forwards",
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
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-2deg)" },
          "75%": { transform: "rotate(2deg)" },
        },
        bounceIn: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
