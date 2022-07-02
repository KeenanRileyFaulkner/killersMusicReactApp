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
        'logo': "url('/src/images/killersLogo.png')",
        'full-band-photo': "url('/src/images/full-band-color.jpg')",
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
        'dave-full-band-color': "url('/src/images/Dave-full-band-color.png')",
        'brandon-full-band-color': "url('/src/images/Brandon-full-band-color.png')",
        'mark-full-band-color': "url('/src/images/Mark-full-band-color.png')",
        'ronnie-full-band-color': "url('/src/images/Ronnie-full-band-color.png')",
        'killer-k': "url('/src/images/killerK.png')",
      },

      colors: {
        'steel-blue': '#538b90',
        'vegas-yellow': '#d8b666',
        'mocha-brown': '#382417',
        'bb-black': '#1f1c23',
        'pearly-white': '#f8fbfb',
        'amber-wave': '#9f5c0c',

        gray: {
          900: '#202225',
          800: '#2f3136',
          700: '#36393f',
          600: '#4f545c',
          400: '#d4d7dc',
          300: '#e3e5e8',
          200: '#ebedef',
          100: '#f2f3f5',
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
