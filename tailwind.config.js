module.exports = {
  mode: 'jit',
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
        'full-band-photo': "url('/src/images/fullBandTransparent.png')",
        'unlit-logo': "url('/src/images/bandNameWhite.png')",
        'lit-logo': "url('/src/images/bandNameLight.png')",
        'brandon-color': "url('/src/images/brandonColor.png')",
        'brandon-bw': "url('/src/images/brandonBW.png')",
        'dave-color': "url('/src/images/daveColor.png')",
        'dave-bw': "url('/src/images/daveBW.png')",
        'mark-color': "url('/src/images/markColor.png')",
        'mark-bw': "url('/src/images/markBW.png')",
        'ronnie-color': "url('/src/images/ronnieColor.png')",
        'ronnie-bw': "url('/src/images/ronnieBW.png')",
        'itm-band-photo': "url('/src/images/ITM-band-photo-alternate.webp')",
        'spiral-soundwave': "url('/src/images/spiralSoundWave.png')",
        'green-soundwave': "url('/src/images/greenSoundWave.png')",
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
