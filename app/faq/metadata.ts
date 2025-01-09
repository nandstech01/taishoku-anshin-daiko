import { Metadata } from 'next';
import { generateFAQSchema } from '@/schemas/faq';

const baseUrl = 'https://taishoku-anshin-daiko.com';

export const metadata: Metadata = {
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
    },
    other: {
        'script:ld+json': JSON.stringify(generateFAQSchema(baseUrl))
    }
}; 