import preset from "@talent-hub/ui/preset";
import type { Config } from "tailwindcss";
export default {
  darkMode: ["class"],
  presets: [preset],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@talent-hub/ui/dist/**/*.js",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
