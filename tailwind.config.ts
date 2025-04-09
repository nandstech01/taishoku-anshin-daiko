import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'print': {'raw': 'print'},
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        wave: {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'reverse-spin': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' }
        },
        'quantum-wave': {
          '0%': { transform: 'translateX(-100%) scale(1)', opacity: '0' },
          '50%': { transform: 'translateX(0%) scale(1.2)', opacity: '0.5' },
          '100%': { transform: 'translateX(100%) scale(1)', opacity: '0' }
        },
        progress: {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(-10%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'quantum-scan': {
          '0%': { transform: 'translateX(-100%)', opacity: '0.5' },
          '50%': { transform: 'translateX(0%)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0.5' }
        },
        'matrix-rain': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        },
        'glitch': {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' }
        },
        'cyber-pulse': {
          '0%, 100%': { 
            transform: 'scale(1)',
            filter: 'brightness(1) blur(0px)'
          },
          '50%': { 
            transform: 'scale(1.05)',
            filter: 'brightness(1.2) blur(1px)'
          }
        },
        'data-stream': {
          '0%': { 
            height: '0%',
            opacity: '0'
          },
          '50%': { 
            height: '100%',
            opacity: '1'
          },
          '100%': { 
            height: '0%',
            opacity: '0'
          }
        },
        'hologram': {
          '0%, 100%': { 
            opacity: '0.5',
            filter: 'hue-rotate(0deg) brightness(1)'
          },
          '50%': { 
            opacity: '1',
            filter: 'hue-rotate(180deg) brightness(1.2)'
          }
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0) rotate(-6deg)'
          },
          '50%': {
            transform: 'translateY(-5px) rotate(-6deg)'
          }
        }
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
        wave: 'wave 3s ease-in-out infinite',
        shimmer: 'shimmer 2s ease-in-out infinite',
        'spin-slow': 'spin-slow 3s linear infinite',
        'reverse-spin': 'reverse-spin 2s linear infinite',
        'quantum-wave': 'quantum-wave 2s ease-in-out infinite',
        progress: 'progress 2s ease-in-out infinite',
        'quantum-scan': 'quantum-scan 2s linear infinite',
        'matrix-rain': 'matrix-rain 2s linear infinite',
        'glitch': 'glitch 0.5s ease-in-out infinite',
        'cyber-pulse': 'cyber-pulse 2s ease-in-out infinite',
        'data-stream': 'data-stream 1.5s ease-in-out infinite',
        'hologram': 'hologram 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config; 