const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.{jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'primary': '#A5F1E9',
        'primary-dark': '#7FE9DE',
        'secondary': '#FFF6BF',
        'secondary-dark': '#FFEBAD',
        'nav': '#F1A5AD',
        'nav-hover': '#EA7985'
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

