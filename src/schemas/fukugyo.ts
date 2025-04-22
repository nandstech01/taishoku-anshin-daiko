import { FAQItem } from '@/schemas/types'; // インポートパスをエイリアスに変更

// EducationalOccupationalProgram スキーマ生成関数
export const generateFukugyoProgramSchema = (baseUrl: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name: '退職者向けAI副業スキル習得プログラム',
    description: '退職後のキャリアチェンジを支援。未経験からAIライティング、動画生成などの副業スキルを習得し、月5万円以上の副収入を目指すオンラインプログラム。',
    provider: {
      '@type': 'Organization',
      name: '株式会社エヌアンドエス',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.svg` // メインロゴを使用
      }
    },
    url: `${baseUrl}/fukugyo`,
    occupationalCategory: [
      'AIライティング',
      'AI動画編集',
      'AIデータ入力',
      'No-code開発',
      'SEO'
    ],
    programPrerequisites: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'skill',
      name: '基本的なPC操作スキル'
    },
    timeToComplete: 'P8W', // 平均8週間と仮定 (例: P4W～P12W)
    potentialAction: {
        '@type': 'ApplyAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://lin.ee/w105og9', // LINE相談リンク
          actionPlatform: [
            'https://schema.org/DesktopWebPlatform',
            'https://schema.org/IOSPlatform',
            'https://schema.org/AndroidPlatform'
          ]
        }
      }
  };
};

// FAQPage スキーマ生成関数（事前に処理されたエンティティ配列を受け取る）
export const generateFukugyoFAQSchema = (baseUrl: string, faqEntities: any[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqEntities
  };
}; 