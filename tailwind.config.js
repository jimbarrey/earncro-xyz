const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        './public/**/*.html',
        './src/**/*.{js,jsx,ts,tsx,vue,html}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'cream': '#F7EFDE',
                'yel-500': '#FFD54B',
                'yel-400': '#FFDD6F',
                'crim-500': '#DD291F',
                'crim-400': '#E4544C',
                'dark': '#131121',
            }
        },
    },

    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
}