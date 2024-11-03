/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // 基本設定
  reactStrictMode: true,
  swcMinify: true,

  // Webpackの設定
  webpack: (config) => {
    // エイリアスの設定
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    
    // フォールバックの設定
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    
    return config;
  },

  // TypeScriptの設定
  typescript: {
    ignoreBuildErrors: false,
  },

  // 画像ドメインの設定
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },

  // 開発インジケーターの設定
  devIndicators: {
    buildActivity: true,
    autoPrerender: false,
  },

  // 環境変数の設定
  env: {
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000',
  },

  // パフォーマンス最適化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // セキュリティヘッダーの設定
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;