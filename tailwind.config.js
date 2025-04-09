/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './public/**/*.html',
    ],
    theme: {
        extend: {
            animation: {
                marquee: 'marquee 25s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
            },
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
