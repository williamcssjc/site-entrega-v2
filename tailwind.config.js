/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        madeira: "#A67C52",
        bege: "#F5F5DC",
        escuro: "#1E1E1E",
        claro: "#FAFAFA",
        vinho: "#8B0000",
        brand: "#A67C52",
        "brand-dark": "#845C3B",
        "brand-light": "#E9DCCF",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        madeira: "#8B5E3C",  // cor personalizada
        bege: "#f5f5dc",     // se quiser usar o bg-bege
      },
    },
  },
  plugins: [],
};
