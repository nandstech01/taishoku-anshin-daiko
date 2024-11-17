import { Metadata } from 'next';
import '@/styles/globals.css'; // グローバルスタイルのインポート
import Header from '@/components/common/Header'; // ヘッダーコンポーネントのインポート
import { MenuProvider } from '@/contexts/MenuContext';
import Script from 'next/script';  // Scriptコンポーネントをインポート

// メタデータの設定
export const metadata: Metadata = {
  title: '退職代行サービス｜業界最安値2,980円で即日対応【退職あんしん代行】',
  description: '退職代行なら業界最安値2,980円の退職あんしん代行。弁護士監修で料金も明確、即日対応可能。退職に関する無料相談も24時間365日受付中。',
  keywords: '退職代行,退職代行料金,退職代行とは,退職代行弁護士,退職相談,即日対応,無料相談',
  
  // ファビコンとアプリアイコン
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.png', sizes: '192x192' },
      { url: '/icon-512.png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  
  // OGP設定（Facebook、LINE、その他SNS用）
  openGraph: {
    type: 'website',
    title: '退職あんしん代行 | 業界最安値2,980円・24時間365日対応',
    description: '退職代行サービス「退職あんしん代行」。業界最安値2,980円、24時間365日対応。パワハラ・メンタルヘルス・キャリアアップ相談に対応。',
    siteName: '退職あんしん代行',
    url: 'https://taishoku-anshin-daiko.com',
    images: [
      {
        url: 'https://taishoku-anshin-daiko.com/ogp.jpg', // 作成したOGP画像
        width: 1200,
        height: 630,
        alt: '退職あんしん代行',
      }
    ],
    locale: 'ja_JP',
  },

  // Twitter Card設定
  twitter: {
    card: 'summary_large_image',
    title: '退職あんしん代行 | 業界最安値2,980円・24時間365日対応',
    description: '退職代行サービス「退職あんしん代行」。業界最安値2,980円、24時間365日対応。',
    images: ['https://taishoku-anshin-daiko.com/ogp.jpg'], // 同じOGP画像を使用
    site: '@your_twitter_handle', // あなたのXアカウントのハンドル名
  },

  // その他のメタデータ
  manifest: '/manifest.json',
  verification: {
    google: 'ulg_7YKcUTMvm2fF6N28c0rSN19ZlAyhL8NvC7SCmjE',
  },
  alternates: {
    canonical: 'https://taishoku-anshin-daiko.com',
  },

  // viewportとthemeColorを分離
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },

  // themeColorを別のプロパティとして設定
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
        <meta name="google-site-verification" content="oUTFExqjpK3mJNvyXN1ggW61UkNYBipmSfPj51yorfY" />
      </head>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-X2C6W75QZZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-X2C6W75QZZ');
          `}
        </Script>
        <MenuProvider>
          <Header />
          {children}
        </MenuProvider>
      </body>
    </html>
  );
}