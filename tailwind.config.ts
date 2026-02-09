import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f6fbff",
          100: "#ecf5ff",
          200: "#cfe6ff",
          300: "#b2d7ff",
          400: "#7fb6ff",
          500: "#4e95ff",
          600: "#3c6ddb",
          700: "#2c4c9f",
          800: "#1d2f6a",
          900: "#111a3b"
        }
      },
      boxShadow: {
        premium: "0 20px 45px rgba(8, 8, 25, 0.45)"
      },
      fontFamily: {
        display: ["Clash Display", "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"]
      }
    }
  }
};

export default config;
