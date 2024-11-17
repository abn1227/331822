/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgba(var(--color-primary-rgb))",
          foreground: "rgba(var(--color-text-rgb))",
        },
        secondary: {
          DEFAULT: "rgba(var(--color-secondary-rgb))",
          foreground: "rgba(var(--color-text-rgb))",
        },
        accent: {
          DEFAULT: "rgba(var(--color-accent-rgb))",
          foreground: "rgba(var(--color-text-rgb))",
        },
        success: {
          DEFAULT: "rgba(var(--color-success-rgb))",
          foreground: "rgba(var(--color-text-rgb))",
        },
        error: {
          DEFAULT: "rgba(var(--color-error-rgb))",
          foreground: "rgba(var(--color-text-rgb))",
        },
        warning: {
          DEFAULT: "rgba(var(--color-warning-rgb))",
          foreground: "rgba(var(--color-text-rgb))",
        },
        contrast: {
          DEFAULT: "rgba(var(--color-info-rgb))",
          foreground: "rgba(var(--color-text-contrast-rgb))",
        },
        background: "rgba(var(--color-background-rgb))",
        foreground: "rgba(var(--color-text-rgb))",
      },
    },
  },
  plugins: [],
};
