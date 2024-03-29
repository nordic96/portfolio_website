/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './public/**/*.html',
    ],
    theme: {
        extend: {
            maxWidth: {
                '1/2': '50%',
                '3/5': '60%',
            },
            colors: {
                hotpink: '#fa256d',
                velvet: '#79096d',
                coolred: '#4f46e5',
                coolblue: '#0891b2',
                coolblack: '#24292f',
            },
        },
    },
    plugins: [],
    darkMode: 'class',
};
