import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";
import plugin from "tailwindcss/plugin";

export default {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFF0F0",
          100: "#FFDEDE",
          200: "#FFC2C2",
          300: "#FF9898",
          400: "#FF5C5C",
          500: "#FF2A2A",
          600: "#F80D0D",
          700: "#D10404",
          800: "#AC0808",
          900: "#8E0E0E",
          950: "#4E0101",
        },
        secondary: {
          50: "#FDF4F3",
          100: "#FAECE9",
          200: "#F5DAD6",
          300: "#EDBAB4",
          400: "#E39089",
          500: "#D4655F",
          600: "#C24747",
          700: "#A03032",
          800: "#862B30",
          900: "#74272E",
          950: "#401114",
        },
        neutral: {
          50: "#FAFAFA",
          100: "#F4F4F5",
          200: "#E4E4E7",
          300: "#D4D4D8",
          400: "#A1A1AA",
          500: "#71717A",
          600: "#52525B",
          700: "#3F3F46",
          800: "#27272A",
          900: "#18181B",
          950: "#09090B",
        },
        success: {
          50: "#EFFEF2",
          100: "#D9FFE3",
          200: "#B5FDC9",
          300: "#7BFAA0",
          400: "#3BED70",
          500: "#13EC54",
          600: "#07B23A",
          700: "#0A8B31",
          800: "#0E6D2B",
          900: "#0E5927",
          950: "#013212",
        },
        warning: {
          50: "#FFFAED",
          100: "#FFF3D4",
          200: "#FFE3A9",
          300: "#FFCE72",
          400: "#FEAE39",
          500: "#FC9313",
          600: "#EC7709",
          700: "#C45A0A",
          800: "#9C4710",
          900: "#7D3B11",
          950: "#441D06",
        },
        error: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
        },
        highlight: {
          50: "#ECFEFF",
          100: "#CFFAFE",
          200: "#A5F3FC",
          300: "#67E8F9",
          400: "#22D3EE",
          500: "#06B6D4",
          600: "#0891B2",
          700: "#0E7490",
          800: "#155E75",
          900: "#164E63",
          950: "#083344",
        },
      },
      boxShadow: {
        "level-1": "0px 2px 4px rgba(0, 0, 0, 0.16)",
        "level-2": "0px 4px 8px rgba(0, 0, 0, 0.08)",
        "level-3": "0px 8px 24px rgba(0, 0, 0, 0.16)",
        "level-4": "0px 16px 32px rgba(0, 0, 0, 0.16)",
        "level-5": "0px 16px 48px rgba(0, 0, 0, 0.24)",
      },
      fontSize: {
        "2xs": "0.625rem",
      },
      fontFamily: {
        default: "var(--font-default)",
        mono: "var(--font-mono)",
      },
    },
  },
  plugins: [
    animatePlugin,
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".custom-scrollbar": {
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            "background-color": "#9ca3af",
            "border-radius": " 999999px",
          },
        },
        ".scrollbar-hide": {
          /* IE and Edge */
          "-ms-overflow-style": "none",

          /* Firefox */
          "scrollbar-width": "none",

          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
  ],
} satisfies Config;
