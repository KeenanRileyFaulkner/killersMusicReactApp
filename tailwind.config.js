module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'work-sans': ['Work Sans', 'sans-serif'],
      },

      backgroundImage: {
        'black-static': "url('/src/images/BlackRaisin2.webp')",
        'pm-band-photo': "url('/src/images/The Killers Homepage 1.png')",
        'hf': "url('/src/images/HF Album Photo.png')",
        'st': "url('/src/images/ST Album Photo.png')",
        'sd': "url('/src/images/SD Album Photo.png')",
        'da': "url('/src/images/DA Album Photo.png')",
        'bb': "url('/src/images/BB Album Photo.png')",
        'ww': "url('/src/images/WW Album Photo.png')",
        'itm': "url('/src/images/ITM Album Photo.png')",
        'pm': "url('/src/images/PM Album Photo.png')",
        'logo': "url('/src/images/killersLogo.png')",
      },

      colors: {
        'steel-blue': '#538b90',
        'vegas-yellow': '#d8b666',
        'mocha-brown': '#382417',
        'bb-black': '#1f1c23',
        'pearly-white': '#f8fbfb',
        'amber-wave': '#9f5c0c',
      }
    },
  },
  plugins: [],
}
