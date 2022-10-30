/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './public/**/*.html',
    ],
    theme: {
        extend: {
            colors: {
                hotpink: '#fa256d',
                velvet: '#79096d',
            },
        },
    },
    plugins: [],
};
