import { Metadata } from 'next';
import AgentHero from './components/AgentHero';
import WhatIsAgent from './components/WhatIsAgent';
import DemandSalary from './components/DemandSalary';
import SuccessStories from './components/SuccessStories';
import ProcessFlow from './components/ProcessFlow';
import FAQ from './components/FAQ';
import CallToAction from './components/CallToAction';
import Header from '@/components/common/Header';
import { generateAgentSchema, generateAgentFAQSchema } from '@/schemas/agent';

// baseUrlの取得（ファイル内で再利用するため）
const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://taishoku-anshin-daiko.com').replace(/\/$/, '');

export const metadata: Metadata = {
  title: '退職エージェント | 退職から高年収AIキャリアへの最短ルート',
  description: '退職サポートからAIスキル習得まで一貫対応。2025年AI人材不足8.8万人時代に備え、未経験から平均年収534.6万円のAI人材へ。年収1.5倍以上を実現した実績多数。',
  keywords: '退職エージェント,退職代行,AIスキル習得,AI転職,年収アップ,キャリアチェンジ,AI人材育成,プロンプトエンジニア,高収入職種',
  alternates: {
    canonical: `${baseUrl}/agent`,
  },
  openGraph: {
    title: '退職エージェント | 退職から高年収AIキャリアへの最短ルート',
    description: '退職サポートからAIスキル習得まで一貫対応。2025年AI人材不足8.8万人時代に備え、未経験から平均年収534.6万円のAI人材へ。年収1.5倍以上を実現した実績多数。',
    url: `${baseUrl}/agent`,
    siteName: '退職あんしん代行',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: `${baseUrl}/images/agent-ogp.jpg`,
        width: 1200,
        height: 630,
        alt: '退職エージェント',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '退職エージェント | 退職から高年収AIキャリアへの最短ルート',
    description: '退職サポートからAIスキル習得まで一貫対応。未経験から平均年収534.6万円のAI人材へ。年収1.5倍以上実績多数。',
    site: '@taishoku_anshin',
    creator: '@taishoku_anshin',
    images: [`${baseUrl}/images/agent-ogp.jpg`],
  },
  other: {
    'application/ld+json': [
      JSON.stringify(generateAgentSchema(baseUrl)),
      JSON.stringify(generateAgentFAQSchema(baseUrl))
    ].join('\n')
  }
};

export default function AgentPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-4 bg-gray-50">
      <Header logoSrc="/images/agent-logo.svg" />
      <AgentHero />
      <WhatIsAgent />
      <DemandSalary />
      <SuccessStories />
      <ProcessFlow />
      <FAQ />
      <CallToAction />
    </main>
  );
} 