import React from 'react';

export default function OverviewSection() {
  return (
    <section id="overview" className="w-full max-w-5xl mx-auto px-4 py-12 sm:py-16 scroll-mt-20">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">AIリテラシーとは？ なぜ今学ぶべきか</h2>
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md mb-8 sm:mb-12">
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 text-center sm:text-left">
          AI（人工知能）は、私たちの仕事や生活に急速に浸透しています。ChatGPTのような生成AIの登場により、文章作成、情報収集、アイデア出しなど、これまで人間が行ってきた作業をAIがサポートする場面が増えています。
        </p>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 text-center sm:text-left">
          このような時代において、「AIリテラシー」は、もはや特別なスキルではなく、誰もが身につけるべき基礎知識となりつつあります。AIリテラシーとは、AIが何であり、何ができて何ができないのかを理解し、そのメリット・デメリットを踏まえて適切に活用する能力のことです。
        </p>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-center sm:text-left">
          本講座「AIリテラシー基礎講座」では、AIの基本から最新の生成AIの活用法、そしてAIを使う上での注意点まで、AI時代を賢く生き抜くために必要な知識を体系的に学びます。AIを「使う側」として、あなたの可能性を広げる第一歩を踏み出しましょう。
        </p>
      </div>
    </section>
  );
} 