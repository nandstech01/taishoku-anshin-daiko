/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        'shimmer': 'shimmer 2s infinite linear'
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            h2: {
              marginTop: '2em',
              marginBottom: '1em',
            },
            h3: {
              marginTop: '1.5em',
              marginBottom: '0.75em',
            },
            strong: {
              fontWeight: '600',
              background: 'linear-gradient(transparent 60%, rgba(255, 107, 43, 0.2) 40%)',
              paddingLeft: '2px',
              paddingRight: '2px',
            },
          },
        },
        lg: {
          css: {
            strong: {
              fontWeight: '600',
              background: 'linear-gradient(transparent 60%, rgba(255, 107, 43, 0.2) 40%)',
              paddingLeft: '2px',
              paddingRight: '2px',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}