import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      bgPrimary: "var(--bg-primary)",
      bgSecondary: "var(--bg-secondary)",
      red: "red",
    },
    extend: {
      padding: {
        general: "1rem",
      },
    },
  },

  plugins: [],
} satisfies Config;
