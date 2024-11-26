/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        logo: ['Montserrat Subrayada', 'sans-serif'],
      },
      fontWeight: {
        normal: 400,
        semibold: 400,
        bold: 400, 
        extrabold: 500,
      },
    },
  },
  plugins: [],
}