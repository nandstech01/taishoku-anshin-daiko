import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

const faqItems = [
  {
    q: "プログラミング未経験でも受講できますか？",
    a: "はい、可能です。本コースはプログラミング初心者からでも学べるカリキュラムになっています。基礎から丁寧に解説しますのでご安心ください。"
  },
  {
    q: "学習に必要な時間の目安は？",
    a: "週10〜15時間程度の学習時間を推奨しています。ただし、個々の進捗に合わせて調整可能です。"
  },
  {
    q: "PCのスペックはどの程度必要ですか？",
    a: "一般的なスペックのPC（メモリ8GB以上推奨）があれば問題ありません。特別な環境は不要です。もし不明な点があれば、お気軽にご相談ください。"
  },
  {
    q: "キャリア相談は可能ですか？",
    a: "はい、可能です。コース修了後だけでなく、受講中からキャリアに関する相談を受け付けています。AIエンジニアとしてのキャリアパスについて一緒に考えましょう。"
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