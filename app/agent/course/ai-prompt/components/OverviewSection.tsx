import React from 'react';

export default function OverviewSection() {
  return (
    <section id="details" className="w-full py-16 sm:py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 leading-tight text-gray-800">
          高度AI活用・プロンプトエンジニアリング実践講座
        </h2>
        <div className="text-left sm:text-center mb-8 max-w-3xl mx-auto">
          <p className="text-md sm:text-lg md:text-xl mb-4 sm:mb-6 text-gray-700 leading-relaxed">
            AI技術の急速な進歩や生成AI（ChatGPT・大規模言語モデルなど）の登場により、活用できるデジタルソリューションの幅は格段に広がっています。
            特に「プロンプトエンジニアリング」と呼ばれる、AIモデルに対して指示（プロンプト）を最適化する技術が注目を集めています。
          </p>
          <p className="text-md sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-4 sm:mb-6">
            適切なAIモデル選択・統合と高度なプロンプト設計を行うことで、市場分析やペルソナ設定、コンテンツ制作、業務改善など、
            さまざまな場面で飛躍的な成果を期待できます。
          </p>
          <p className="text-md sm:text-lg md:text-xl text-gray-700 leading-relaxed">
            本講座では、最新の生成AI技術動向を組み合わせ、受講後すぐに実践可能なプロンプトエンジニアリング手法を習得していただくことを目的としています。
            AIを活用して個人の生産性を高め、キャリアアップやフリーランス・副業にも役立つ実践的スキルを身につけることができます。
          </p>
        </div>
      </div>
    </section>
  );
} 