import type { Config } from "tailwindcss";
import preset from "./src/preset";

export default {
  presets: [preset],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
} satisfies Config;
