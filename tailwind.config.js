/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily:{
        sora:['Sora','sans-serif'],
      },
      backgroundColor:{
        lGray: '#dadada',
      },
      textColor: {
        lGray : '#dadada',
      }
    },
  },
  plugins: [],
}

