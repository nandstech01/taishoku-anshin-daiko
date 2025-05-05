import React from 'react';

export default function OverviewSection() {
  return (
    <section id="details" className="w-full max-w-5xl mx-auto px-4 py-12 sm:py-16 scroll-mt-20">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">コース概要</h2>
      
      <div className="bg-white p-5 sm:p-8 rounded-xl shadow-md mb-8 sm:mb-12">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 border-b pb-2 sm:pb-3">はじめに</h3>
        <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
          生成AI（大規模言語モデル、AIエージェントなど）の急速な進化に伴い、AIエンジニアへの需要は今後ますます高まっていくと予想されます。特にNext.jsとAIエージェントを組み合わせたモダンなフロントエンド開発と生成AIとの連携は、最新のWEBサービスや自動化プラットフォーム構築のうえで、不可欠なスキルとなりつつあります。
        </p>
        <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
          本講座「AIエキスパート～生成AIエンジニア～」では、最先端のAI技術トレンドを取り入れた研修プログラムを提供します。プログラミング未経験者でも基礎から学べるカリキュラム設計で、短期間で生成AIアプリケーションを開発できるエンジニアを目指せます。
        </p>
      </div>
    </section>
  );
} 