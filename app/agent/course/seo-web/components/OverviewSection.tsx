import React from 'react';

export default function OverviewSection() {
  return (
    <section id="details" className="w-full max-w-5xl mx-auto px-4 py-12 sm:py-16 scroll-mt-20">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">コース概要</h2>
      
      <div className="bg-white p-5 sm:p-8 rounded-xl shadow-md mb-8 sm:mb-12">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 border-b pb-2 sm:pb-3">はじめに</h3>
        <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
          デジタルマーケティングの成功には、WEBサイトの分析とデータに基づいた意思決定が不可欠です。Google AnalyticsやGoogle Search Consoleなどのツールを効果的に活用することで、ユーザー行動を理解し、SEO（検索エンジン最適化）を通じてウェブサイトのパフォーマンスを大幅に向上させることができます。
        </p>
        <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
          本講座「WEBサイトのデジタル分析技術習得講座」では、デジタル分析の基礎からSEO実践まで、現場で即戦力となるスキルを体系的に学べます。未経験者でも実務レベルの知識とノウハウを修得できるカリキュラム設計で、データに基づいたウェブサイト改善策を自信を持って提案できるようになります。
        </p>
      </div>
    </section>
  );
} 