/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#16427C',
        'brand-blue-light': '#3A70B7'
      }
    },
  },
  plugins: [],
}