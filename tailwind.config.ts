import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["2.75rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-md": ["2rem", { lineHeight: "1.2", letterSpacing: "0em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7", letterSpacing: "0.01em" }],
        "body-md": ["1rem", { lineHeight: "1.65", letterSpacing: "0.01em" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6", letterSpacing: "0.02em" }],
        label: ["0.75rem", { lineHeight: "1", letterSpacing: "0.08em" }],
      },
      colors: {
        cream: {
          50: "#FDFCF8",
          100: "#FAF9F6",
          200: "#F5F0E8",
        },
        gold: {
          300: "#E8CA6A",
          400: "#D4AF37",
          500: "#B8941F",
          600: "#9A7A0A",
        },
        slate: {
          300: "#AEB6BF",
          500: "#5D6D7E",
          700: "#2C3E50",
        },
      },
      spacing: {
        "4.5": "1.125rem",
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
      },
      backdropBlur: {
        xs: "4px",
      },
      boxShadow: {
        card: "0 8px 32px rgba(44, 62, 80, 0.08)",
        "card-hover": "0 16px 48px rgba(44, 62, 80, 0.14)",
        "card-sm": "0 4px 16px rgba(44, 62, 80, 0.06)",
        gold: "0 4px 24px rgba(212, 175, 55, 0.25)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        shimmer: "shimmer 1.5s infinite linear",
      },
    },
  },
  plugins: [],
};

export default config;
