import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { MenuProvider } from '@/contexts/MenuContext';

const inter = Inter({ subsets: ['latin'] });

// metadataBaseの設定
const metadataBase = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : new URL('https://taishoku-anshin-daiko.com');

export const metadata: Metadata = {
  metadataBase,
  title: '退職代行サービス｜業界最安値2,980円で即日対応【退職あんしん代行】',
  description: '退職代行なら業界最安値2,980円の退職あんしん代行。弁護士監修で料金も明確、即日対応可能。退職に関する無料相談も24時間365日受付中。',
  keywords: '退職代行,退職代行料金,退職代行とは,退職代行弁護士,退職相談,即日対応,無料相談',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
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