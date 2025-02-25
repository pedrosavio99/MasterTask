const plugin = require('tailwindcss/plugin');

module.exports = plugin(({ addUtilities }) => {
  const scrollbarUtilities = {
    '.scrollbar-styled::-webkit-scrollbar': {
      width: '2px',  // Largura da scrollbar
    },
    '.scrollbar-styled::-webkit-scrollbar-thumb': {
      backgroundColor: '#a7b1d1',  // Cor da thumb (exemplo: cinza escuro)
      borderRadius: '8px',  // Raio da thumb
    },
    '.scrollbar-styled::-webkit-scrollbar-track': {
      backgroundColor: '#F1F1F1',  // Cor da track (exemplo: cinza claro)
      borderRadius: '8px',  // Raio da track
    },
  };

  addUtilities(scrollbarUtilities, ['responsive']);
});