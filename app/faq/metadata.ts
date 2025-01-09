import { Metadata } from 'next';

const baseUrl = 'https://taishoku-anshin-daiko.com';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '退職代行サービスは本当に合法なのですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい、完全に合法です。労働者には退職の自由が憲法で保障されており、その意思表示を代行することは法的に問題ありません。当社は顧問弁護士と連携し、すべての手続きを適法に行っています。'
      }
    },
    {
      '@type': 'Question',
      name: '退職までどのくらいの期間がかかりますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '最短即日での対応が可能です。ただし、円滑な引き継ぎのため通常は2週間程度をお勧めしています。パワハラや体調不良など緊急性の高いケースでは、即日対応も可能です。状況に応じて最適なタイミングをご提案させていただきます。'
      }
    },
    {
      '@type': 'Question',
      name: '会社に直接会って退職を伝える必要はありますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'いいえ、必要ありません。すべての手続きを当社が代行いたしますので、会社に直接会う必要はございません。パワハラなどの被害に遭われている方も、安心して退職手続きを進めることができます。'
      }
    },
    {
      '@type': 'Question',
      name: '退職金や未払い残業代はどうなりますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '退職金や未払い残業代などの権利に関しては、提携している弁護士や労働組合をご紹介させていただきます。専門家のサポートを受けることで、適切な手続きを進めることができます。'
      }
    },
    {
      '@type': 'Question',
      name: '失業保険はもらえますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい、条件を満たせば受給可能です。失業保険の受給要件や手続き方法について、ハローワークに確認の上、必要な情報をご案内させていただきます。'
      }
    },
    {
      '@type': 'Question',
      name: '在職中の退職代行依頼はバレませんか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ご安心ください。当社は厳格な守秘義務を徹底しており、ご依頼の事実は完全に秘密として扱われます。会社側への連絡も慎重に行い、あなたのプライバシーを最大限保護いたします。'
      }
    },
    {
      '@type': 'Question',
      name: '料金はいくらですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '業界最安値の2,980円からご利用いただけます。初回相談は無料です。また、分割払いにも対応しておりますので、ご相談ください。万が一退職が実現できなかった場合は、全額返金保証がございます。'
      }
    },
    {
      '@type': 'Question',
      name: '24時間対応可能ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい、24時間365日対応可能です。夜間・休日でもLINEやメールでのご相談を承っております。緊急の場合は、電話での即時対応も可能です。ご都合の良い時間帯でお気軽にご相談ください。'
      }
    }
  ]
} as const;

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
  },
  other: {
    'script:ld+json': JSON.stringify(faqSchema)
  }
} satisfies Metadata; 