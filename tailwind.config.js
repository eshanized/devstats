/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'github-dark': '#0d1117',
        'github-dark-secondary': '#161b22',
        'github-border': '#30363d',
        'github-text': '#c9d1d9'
      }
    },
  },
  plugins: [],
}