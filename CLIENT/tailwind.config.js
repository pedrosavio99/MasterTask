/** @type {import('tailwindcss').Config} */
const scrollbarPlugin = require('./src/styles/scrollbar');
module.exports = {
  content: [],
  theme: {
    extend: {
      backgroundImage: {
        'leftlogin': "url('https://leitepeu.com.br/images/article/2021/artigo_leitepeu_18fev21.jpg')",
        // 'footer-texture': "url('/img/footer-texture.png')",
       }
    },
  },
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  plugins: [ 
    scrollbarPlugin,  // Adicione o seu plugin customizado
  ],
}

