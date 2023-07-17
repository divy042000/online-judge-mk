/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      'monocode': ['Roboto Mono', 'monospace']
    },
    extend: {
      textColor: {
        'gold': '#FFD700', // Replace with your desired color value
      },
    },
  },
  plugins: [],
}