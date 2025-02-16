import type { Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { MenuProvider } from '@/contexts/MenuContext';
import { metadata } from './metadata';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="ja">
      <head>
        <meta name="format-detection" content="telephone=no,address=no,email=no" />
        <meta name="google" content="notranslate" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <MenuProvider>
            {children}
          </MenuProvider>
        </AuthProvider>
      </body>
    </html>
  );
}