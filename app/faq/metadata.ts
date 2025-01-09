import { Metadata } from 'next';

const baseUrl = 'https://taishoku-anshin-daiko.com';

export const metadata = {
  title: 'よくあるご質問 | 退職あんしん代行',
  description: '退職代行サービスに関するよくある質問をまとめています。サービスの合法性、料金、プライバシー保護、キャリア支援など、お客様からよくいただく質問に詳しくお答えします。',
  alternates: {
    canonical: `${baseUrl}/faq`
  },
  openGraph: {
    title: 'よくあるご質問 | 退職あんしん代行',
    description: '退職代行サービスに関するよくある質問をまとめています。',
    url: `${baseUrl}/faq`,
    siteName: '退職あんしん代行',
    locale: 'ja_JP',
    type: 'website',
  }
} satisfies Metadata; 