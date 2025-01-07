import { Metadata } from 'next';
import { generateFAQSchema } from '@/schemas/faq';

export const generateMetadata = async (): Promise<Metadata> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://taishoku-anshin-daiko.com';

  return {
    title: 'よくあるご質問 | タイショクアンシン',
    description: '退職代行サービスに関するよくある質問をまとめています。サービスの合法性、料金、プライバシー保護、キャリア支援など、お客様からよくいただく質問に詳しくお答えします。',
    openGraph: {
      title: 'よくあるご質問 | タイショクアンシン',
      description: '退職代行サービスに関するよくある質問をまとめています。サービスの合法性、料金、プライバシー保護、キャリア支援など、お客様からよくいただく質問に詳しくお答えします。',
      url: `${baseUrl}/faq`,
      siteName: 'タイショクアンシン',
      locale: 'ja_JP',
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/faq`,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'よくあるご質問 | タイショクアンシン',
      description: '退職代行サービスに関するよくある質問をまとめています。サービスの合法性、料金、プライバシー保護、キャリア支援など、お客様からよくいただく質問に詳しくお答えします。',
    },
    other: {
      'script:ld+json': JSON.stringify(generateFAQSchema(baseUrl)),
    },
  };
}; 