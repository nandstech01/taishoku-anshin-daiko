import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

const faqItems = [
  {
    q: "WEBデジタル分析の学習に専門知識は必要ですか？",
    a: "いいえ、特別な前提知識は必要ありません。基本的なパソコン操作ができれば、ゼロからでも学習いただけるカリキュラムになっています。"
  },
  {
    q: "学習期間はどのくらいですか？",
    a: "基本コースは3ヶ月間です。週10時間程度の学習で修了を目指せます。学習進捗に合わせて期間延長も可能です。"
  },
  {
    q: "学習サポートはありますか？",
    a: "はい。専属メンターによる質問対応や定期的なオンライン質問会、課題レビューなど、充実したサポート体制を整えています。"
  },
  {
    q: "受講後のキャリアサポートはありますか？",
    a: "あります。履歴書・職務経歴書の添削、面接対策、キャリア相談など、転職や副業獲得に向けたサポートを行っています。卒業生専用の求人紹介も行っています。"
  },
  {
    q: "WEBデジタル分析を学んでどんな仕事ができますか？",
    a: "WEB解析士、デジタルマーケター、SEOコンサルタント、データアナリストなど様々な道があります。大企業からベンチャー企業まで幅広い需要があります。"
  }
];

export default function FaqSection() {
  return (
    <section id="faq" className="w-full max-w-5xl mx-auto px-4 py-12 sm:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">よくある質問</h2>
      <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto">
        {faqItems.map((item, index) => (
          <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <h3 className="font-semibold text-base sm:text-lg mb-1.5 sm:mb-2 flex items-start">
              <FaQuestionCircle className="text-blue-500 mr-2 mt-0.5 flex-shrink-0 text-base sm:text-lg"/>
              <span className="leading-tight">{item.q}</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 pl-6 sm:pl-8 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 