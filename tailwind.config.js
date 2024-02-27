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
      },
      keyframes: {
        slideUpAndFade: {
          '0%': { opacity: '0', transform: 'scaleY(0.95) translateY(-2px)' },
          '100%': { opacity: '1', transform: 'scaleY(1) translateY(0)' },
        },
        slideRightAndFade: {
          '0%': { opacity: '0', transform: 'scaleX(0.95) translateX(2px)' },
          '100%': { opacity: '1', transform: 'scaleX(1) translateX(0)' },
        },
        slideDownAndFade: {
          '0%': { opacity: '0', transform: 'scaleY(0.95) translateY(2px)' },
          '100%': { opacity: '1', transform: 'scaleY(1) translateY(0)' },
        },
        slideLeftAndFade: {
          '0%': { opacity: '0', transform: 'scaleX(0.95) translateX(-2px)' },
          '100%': { opacity: '1', transform: 'scaleX(1) translateX(0)' },
        },
      },
      animation: {
        slideUpAndFade: 'slideUpAndFade 250ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideDownAndFade: 'slideDownAndFade 250ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade: 'slideRightAndFade 250ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade: 'slideLeftAndFade 250ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate"),],
}

