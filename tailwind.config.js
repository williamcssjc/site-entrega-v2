// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'wood': "url('/bg-madeira.jpg')", // Caminho para a imagem de fundo
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'], // Definindo a fonte Playfair Display
      },
    },
  },
  plugins: [],
}
