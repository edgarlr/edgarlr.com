/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-serif)'],
      },
      backgroundColor: {
        primary: 'var(--background-primary)',
        secondary: 'var(--background-secondary)',
        tertiary: 'var(--background-tertiary)',
      },
      textColor: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
      },
      borderColor: {
        DEFAULT: 'var(--border-primary)',
        primary: 'var(--border-primary)',
        secondary: 'var(--border-secondary)',
        tertiary: 'var(--border-tertiary)',
      },
      textDecorationColor: {
        primary: 'var(--border-primary)',
        secondary: 'var(--border-secondary)',
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
        slideDownAndFade:
          'slideDownAndFade 250ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade:
          'slideRightAndFade 250ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade:
          'slideLeftAndFade 250ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '70ch',
            color: 'var(--text-primary)',
            '--tw-prose-headings': 'var(--text-primary)',
            '--tw-prose-quotes': 'var(--text-primary)',
            '--tw-prose-pre-code': 'var(--text-primary)',
            pre: {
              backgroundColor: 'var(--background-tertiary)',
              boxShadow: 'inset 0px 0px 0px 0.5px var(--border-tertiary)',
              fontSize: '0.875rem !important',
              lineHeight: '1.25rem',
              padding: '1rem 0',
            },
            'pre [data-line]': {
              padding: '0 1rem',
            },
            'code [data-line] .highlighted,code [data-line].highlighted': {
              borderRadius: '0.125rem',
              background: 'var(--shiki-token-highlight)',
            },

            blockquote: {
              backgroundColor: 'var(--background-tertiary)',
              boxShadow: 'inset 0px 0px 0px 0.5px var(--border-tertiary)',
              border: 'none',
              borderRadius: '6px',
              padding: '2px 24px',
              fontSize: '0.875rem',
              lineHeight: '1.25rem',
            },
            a: {
              color: 'var(--text-primary)',
              fontWeight: '400',
              transition: 'text-decoration-color 100ms',
              textDecorationColor: 'var(--border-primary)',
              textDecorationThickness: '1px',
              textUnderlineOffset: '3px',
              '&:hover': {
                textDecorationColor: 'var(--border-secondary)',
              },
            },
            img: {
              border: '1px solid var(--border-tertiary) ',
              borderRadius: '6px',
              position: 'relative',
              margin: '0 auto',
              objectFit: 'cover',
              marginBottom: '.25rem',
              position: 'relative',
            },
            'p:has(img)': {
              textAlign: 'center',
              color: 'var(--text-secondary)',
            },
            'p:has(img) em': {
              fontSize: '0.75rem',
              lineHeight: '1.25rem',
            },
            video: {
              border: '1px solid var(--border-tertiary) ',
              borderRadius: '6px',
              position: 'relative',
              margin: '0 auto',
              objectFit: 'cover',
              marginBottom: '.25rem',
              position: 'relative',
            },
            h2: {
              fontSize: '1rem',
              lineHeight: '1.5rem',
              fontWeight: '600',
              marginTop: '2rem',
              marginBottom: '.5rem',
            },
            h3: {
              fontSize: '0.875rem',
              lineHeight: '1.25rem',
              fontWeight: '600',
              marginTop: '1.5rem',
            },
            code: {
              color: 'var(--text-primary)',
              backgroundColor: 'var(--background-secondary)',
              fontSize: '0.75rem',
              lineHeight: '1rem',
              fontWeight: '400',
              padding: '4px 6px',
              borderRadius: '4px',
            },
            'code::before': {
              display: 'none',
            },
            'code::after': {
              display: 'none',
            },
          },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}
