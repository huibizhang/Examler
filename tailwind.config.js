const colors = require('tailwindcss/colors')
const flagger = require('tailwind-flagger')

module.exports = {
  mode: 'jit',
  purge: ['index.html','./src/**/*.{js,jsx,ts,tsx,vue,html}'],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan
      },
      backgroundImage: {
        check: `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e")`,
        "check-dark": `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='#6B7280' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e")`
      }
    },
  },
  plugins: [
    flagger
  ],
}