/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      'blue': '#3F73F8',
      'red': '#FB3640',
      'blue-green': '#006C67',
      'white': '#fff',
      'grey': '#D3D3D3',
      'yellow': '#FFB100',
      'dark': '#090C08'
    },
    extend: {},
  },
  plugins: [],
}
