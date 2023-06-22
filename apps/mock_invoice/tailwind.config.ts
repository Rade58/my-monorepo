import type { Config } from "tailwindcss";
import themes from "./themes/list";
export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,

    themes: themes,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: themes[1],
  },
  darkMode: "media",
} satisfies Config;
