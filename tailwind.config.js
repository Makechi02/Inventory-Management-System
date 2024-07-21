/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                figtree: ['var(--font-figtree), sans-serif'],
                gfs_didot: ['var(--font-gfs_didot), serif']
            }
        },
    },
    plugins: [],
};
