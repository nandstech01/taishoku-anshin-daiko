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
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
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
  // 未使用のスタイルを削減して最終的なCSSバンドルサイズを最小化
  future: {
    hoverOnlyWhenSupported: true,
    respectDefaultRingColorOpacity: true,
    disableColorOpacityUtilitiesByDefault: true,
    relativeContentPathsByDefault: true,
  },
  // パフォーマンス最適化のための追加設定
  safelist: [
    // 動的に生成されるクラスで、必ず保持する必要があるもの
    'bg-orange-500',
    'bg-blue-500',
    'text-white',
    'rounded-full',
  ],
  // 未使用のバリアントを削除
  corePlugins: {
    // 使用していないプラグインを無効化
    container: false,
    accessibility: false,
    backdropBlur: false,
    backdropBrightness: false,
    backdropContrast: false,
    backdropGrayscale: false,
    backdropHueRotate: false,
    backdropInvert: false,
    backdropOpacity: false,
    backdropSaturate: false,
    backdropSepia: false,
  },
}