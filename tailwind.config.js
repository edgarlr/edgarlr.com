/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      textColor: {
        primary: '#131414',
        secondary: '#717272',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-serif)'],
      },
      textDecorationColor: {
        primary: '#717272',
        secondary: '#D0D0D0',
      }
    },
  },
  plugins: [],
}