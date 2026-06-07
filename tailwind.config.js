/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,mdx}",
    "./components/**/*.{js,jsx,mdx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#03040a",
        abyss: "#070b18",
        ice: "#7fd4ff",
        glacier: "#3a7bd5",
        ember: "#ff7a3d",
        dust: "#e8c79b",
        signal: "#9af0ff",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        flicker: {
          "0%,100%": { opacity: "1" },
          "45%": { opacity: "0.82" },
          "50%": { opacity: "0.6" },
          "55%": { opacity: "0.9" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        flicker: "flicker 5s linear infinite",
        scan: "scan 7s linear infinite",
      },
    },
  },
  plugins: [],
};
