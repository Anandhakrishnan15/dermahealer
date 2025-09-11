/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class", // This enables class-based dark mode
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                nav: "946px", // ✅ custom breakpoint for navbar
            },
            fontFamily: {
                elegant: ['"Playfair Display"', 'serif'],
            },
        },
    },
    plugins: [],
};
