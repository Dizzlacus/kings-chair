/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./privacy.html", "./terms.html", "./js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Cinzel", "Georgia", "serif"],
      },
      colors: {
        salon: {
          white: "#ffffff",
          grey: "#000000",
          orange: "#f46910",
          muted: "rgba(255,255,255,0.65)",
        },
      },
    },
  },
  plugins: [],
};
