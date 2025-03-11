import type { Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { MenuProvider } from '@/contexts/MenuContext';
import { metadata } from './metadata';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
  adjustFontFallback: false,
  variable: '--font-inter',
  weight: ['400', '500', '700']
});

export { metadata };

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f97316' },
    { media: '(prefers-color-scheme: dark)', color: '#f97316' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${inter.className} ${inter.variable} h-full bg-gray-50`}>
      <head>
        <meta name="format-detection" content="telephone=no,address=no,email=no" />
        <meta name="google" content="notranslate" />
        <meta name="color-scheme" content="light only" />
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />
        
        {/* LLM対応のためのリンク */}
        <link rel="llms" href="/llms.txt" type="text/markdown" />
        <link rel="llms-full" href="/llms-full.txt" type="text/markdown" />
        
        <link 
          rel="preload" 
          href="/images/logo.svg" 
          as="image" 
          type="image/svg+xml"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          as="style"
          fetchPriority="high"
        />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="h-full">
        <AuthProvider>
          <MenuProvider>
            {children}
          </MenuProvider>
        </AuthProvider>
        
        {/* パフォーマンスモニタリングスクリプトを本番環境でのみ読み込む */}
        {process.env.NODE_ENV === 'production' && (
          <Script
            src="/scripts/performance-monitor.js"
            strategy="afterInteractive"
            id="performance-monitor"
          />
        )}
      </body>
    </html>
  );
}