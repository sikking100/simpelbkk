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
                'primary': '#03989E',
                'primary-dark': '#04C8D0',
                'secondary': '#9E0903',
                'secondary-dark': '#D00C04',
                'nav': '#04C8D0',
                'nav-hover': '#9E0903'
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
}

