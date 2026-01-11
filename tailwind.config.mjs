/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#8d7c5e',
            },
            typography: {
                DEFAULT: {
                    css: {
                        color: '#333',
                        h1: { color: '#1a1a1a' },
                        h2: { color: '#1a1a1a' },
                        h3: { color: '#1a1a1a' },
                        strong: { color: '#1a1a1a' },
                        a: { color: '#8d7c5e' },
                    },
                },
                invert: {
                    css: {
                        color: '#d1d5db',
                        h1: { color: '#ffffff' },
                        h2: { color: '#ffffff' },
                        h3: { color: '#ffffff' },
                        strong: { color: '#ffffff' },
                        a: { color: '#8d7c5e' },
                    },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}