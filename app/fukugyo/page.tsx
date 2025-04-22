import { Metadata } from 'next'; // コメント解除
import FukugyoHero from './components/AgentHero'; // コンポーネント名変更 (ファイル名は一旦そのまま)
import WhatIsFukugyo from './components/WhatIsAgent'; // コンポーネント名変更
import FukugyoIncomePotential from './components/DemandSalary'; // コンポーネント名変更
import FukugyoSuccessStories from './components/SuccessStories'; // コンポーネント名変更
import FukugyoProcessFlow from './components/ProcessFlow'; // コンポーネント名変更
import FukugyoFAQ from './components/FAQ'; // faqsをインポートしない
import CallToAction from './components/CallToAction'; // CallToActionは一旦そのまま
import Header from '@/components/common/Header';
import { generateFukugyoProgramSchema, generateFukugyoFAQSchema } from '@/schemas/fukugyo'; // fukugyo用スキーマをインポート

// FAQデータを静的に定義（サーバーサイドで処理するため）
const faqData = [
  {
    question: '退職エージェントでAI副業も学べるのですか？',
    answer: 'はい、当社の退職エージェントサービスでは、円満な退職サポートに加え、AIスキルを習得して副収入を得るための「AI副業コース」も提供しています。退職後の新しいキャリアパスとしてご活用いただけます。'
  },
  {
    question: '全くの未経験でもAI副業は可能ですか？',
    answer: 'はい、可能です。基本的なPC操作ができれば問題ありません。コースは未経験者向けに設計されており、AIの基礎から実践的なスキルまで段階的に学べます。サポート体制も充実していますのでご安心ください。'
  },
  {
    question: 'どのくらいの期間で副収入を得られますか？',
    answer: '学習ペースや取り組む時間によりますが、多くの方は学習開始から2～3ヶ月で最初の案件を獲得し、月数万円の副収入を得られています。まずは月5万円を目標とし、スキルや実績に応じて更なる収入増を目指せます。'
  },
  {
    question: 'どのようなAI副業スキルを学べますか？',
    answer: 'AIライティング、AIショート動画制作、AIデータ入力・分析補助、No-Code AIアプリ開発など、現在の副業市場で需要の高い5種類以上のコースをご用意しています。無料相談にて、あなたに合ったコースをご提案することも可能です。'
  },
  {
    question: '退職手続きと並行して学習できますか？',
    answer: 'はい、可能です。学習はオンラインでご自身のペースで進められます。退職に関する手続きは当社がサポートしますので、安心して学習と副業準備に集中いただけます。'
  },
  {
    question: '学習後のサポートはありますか？',
    answer: 'はい、スキル習得後もサポートいたします。ポートフォリオの作成支援や、クラウドソーシングサイトでの案件獲得方法、クライアントとのやり取りのコツなどをアドバイスし、スムーズな副業スタートを後押しします。'
  }
];

// FAQエンティティを事前に作成（サーバーサイドでの処理）
const faqEntities = faqData.map(faq => ({
  '@type': 'Question',
  name: faq.question,
  acceptedAnswer: {
    '@type': 'Answer',
    text: faq.answer
  }
}));

// baseUrlの取得
const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://taishoku-anshin-daiko.com').replace(/\/$/, '');

// Fukugyoページのメタデータ
export const metadata: Metadata = {
  title: 'AI副業コース | 退職エージェント | 未経験OK・月5万円以上', // タイトル修正
  description: '退職エージェントが提供するAI副業コース。未経験から動画生成、ライティング等のスキルを習得し、月5万円以上の副収入を目指せます。退職後の新しいキャリアをサポート。', // 説明修正
  keywords: 'AI副業, 退職エージェント, 副業支援, 在宅ワーク, スキルアップ, 副収入, 動画生成, AIライティング, 未経験, リモートワーク', // キーワードに「退職エージェント」追加
  alternates: {
    canonical: `${baseUrl}/fukugyo`,
  },
  openGraph: {
    title: 'AI副業コース | 退職エージェント | 未経験OK・月5万円以上', // タイトル修正
    description: '退職エージェントが提供するAI副業コース。未経験から月5万円以上の副収入！場所を選ばず働ける新しいキャリアをサポート。', // 説明修正
    url: `${baseUrl}/fukugyo`,
    siteName: '退職あんしん代行',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: `${baseUrl}/images/agent-ogp.jpg`, // OGP画像をagentと同じに変更
        width: 1200,
        height: 630,
        alt: '退職エージェント AI副業コース', // alt変更
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI副業コース | 退職エージェント | 未経験OK・月5万円以上', // タイトル修正
    description: '退職エージェントが提供するAI副業コース。未経験から月5万円以上の副収入！場所を選ばず働ける新しいキャリアをサポート。', // 説明修正
    site: '@taishoku_anshin',
    creator: '@taishoku_anshin',
    images: [`${baseUrl}/images/agent-ogp.jpg`], // OGP画像をagentと同じに変更
  },
  other: {
    // 構造化データを設定
    'application/ld+json': [
      JSON.stringify(generateFukugyoProgramSchema(baseUrl)),
      JSON.stringify(generateFukugyoFAQSchema(baseUrl, faqEntities))
    ].join('\n')
  }
};

// ページコンポーネント名をFukugyoPageに変更 (任意)
export default function FukugyoPage() { 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-4 bg-gray-50">
      <Header logoSrc="/images/agent-logo.svg" /> {/* ロゴパスをagentページと同じに変更 */}
      <FukugyoHero /> {/* コンポーネント名変更 */}
      <WhatIsFukugyo /> {/* コンポーネント名変更 */}
      <FukugyoIncomePotential /> {/* コンポーネント名変更 */}
      <FukugyoSuccessStories /> {/* コンポーネント名変更 */}
      <FukugyoProcessFlow /> {/* コンポーネント名変更 */}
      <FukugyoFAQ /> {/* コンポーネント名変更 */}
      <CallToAction /> {/* CallToActionは一旦そのまま */}
    </main>
  );
} 