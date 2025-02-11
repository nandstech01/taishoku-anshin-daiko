/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: false,
  trailingSlash: true,
  assetPrefix: process.env.NEXT_PUBLIC_SITE_URL,
  experimental: {
    optimizePackageImports: ['@heroicons/react'],
  },
  images: {
    domains: ['sfdtkxypnfwwjranlnug.supabase.co'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, './src'),
    };
    return config;
  },
  async headers() {
    return [
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig 