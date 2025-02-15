import type { Metadata } from 'next';
import { generateServiceSchema } from '@/schemas/service';
import { generateWebsiteSchema } from '@/schemas/website';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://taishoku-anshin-daiko.com';

// メインページのメタデータを定義
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: '退職代行サービス｜業界最安値2,980円で即日対応【退職あんしん代行】',
  description: '退職代行なら業界最安値2,980円の退職あんしん代行。弁護士監修で料金も明確、即日対応可能。退職に関する無料相談も24時間365日受付中。',
  keywords: '退職代行,退職代行料金,退職代行とは,退職代行弁護士,退職相談,即日対応,無料相談',
  alternates: {
    canonical: baseUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: '退職代行サービス｜業界最安値2,980円で即日対応【退職あんしん代行】',
    description: '退職代行なら業界最安値2,980円の退職あんしん代行。弁護士監修で料金も明確、即日対応可能。退職に関する無料相談も24時間365日受付中。',
    url: baseUrl,
    siteName: '退職あんしん代行',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: `${baseUrl}/ogp.jpg`,
        width: 1200,
        height: 630,
        alt: '退職あんしん代行',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '退職代行サービス｜業界最安値2,980円で即日対応【退職あんしん代行】',
    description: '退職代行なら業界最安値2,980円の退職あんしん代行。弁護士監修で料金も明確、即日対応可能。退職に関する無料相談も24時間365日受付中。',
    site: '@taishoku_anshin',
    creator: '@taishoku_anshin',
    images: [`${baseUrl}/ogp.jpg`],
  },
  other: {
    'application/ld+json': [
      JSON.stringify(generateWebsiteSchema(baseUrl)),
      JSON.stringify(generateServiceSchema(baseUrl))
    ].join('\n')
  }
}; 