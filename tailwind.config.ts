import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0A7D45", // UES Green
          dark: "#075A32",
          light: "#149E5A",
          50: "#E6F4ED",
          100: "#CCE9DB",
          500: "#0A7D45",
          600: "#086638",
          700: "#064E2B",
        },
        accent: {
          DEFAULT: "#92D050", // UES Lime Accent
          dark: "#76AD3B",
          light: "#A8DD68",
          50: "#F4FBEC",
          500: "#92D050",
          600: "#7ABC3A",
        },
        dark: {
          bg: "#080C14",
          surface: "#111827",
          card: "#182235",
          border: "#23314D",
        },
        light: {
          bg: "#F8FAFC",
          surface: "#FFFFFF",
          card: "#FFFFFF",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        heading: ["var(--font-outfit)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        premium: "0 10px 30px -10px rgba(10, 125, 69, 0.2)",
        glow: "0 0 25px rgba(146, 208, 80, 0.4)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.15)",
        "glass-lg": "0 15px 35px 0 rgba(0, 0, 0, 0.25)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-glow": "radial-gradient(circle at 50% 20%, rgba(10, 125, 69, 0.15) 0%, transparent 60%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
