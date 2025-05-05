import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

const faqItems = [
  { 
    q: "AIやプログラミングの知識が全くなくても大丈夫ですか？", 
    a: "はい、全く問題ありません。本講座はAIに関する予備知識がない方を対象に、基礎の基礎から解説します。専門用語もわかりやすく説明します。" 
  },
  { 
    q: "学習時間はどのくらい必要ですか？", 
    a: "eラーニングは約6時間、ライブセッションが約4時間の合計約10時間の内容です。eラーニングはご自身のペースで進められますので、数週間かけて少しずつ学ぶことも可能です。" 
  },
  { 
    q: "ライブセッションに参加できない場合はどうなりますか？", 
    a: "ライブセッションは録画され、後日アーカイブとして視聴可能ですのでご安心ください。質問は別途チャット等でも受け付けています。" 
  },
  { 
    q: "どのようなツールを使いますか？", 
    a: "学習は主にウェブブラウザを通じて行います。特別なソフトウェアのインストールは基本的に不要です。ライブセッションにはZoomを使用します。" 
  },
  { 
    q: "受講費用はかかりますか？", 
    a: "本講座の受講費用については、ご相談ページにてご確認ください。" 
 }
];

export default function FaqSection() {
  return (
    <section id="faq" className="w-full max-w-5xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">よくある質問</h2>
      <div className="space-y-6">
        {faqItems.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <h3 className="font-semibold text-lg mb-2 flex items-start">
              <FaQuestionCircle className="text-blue-500 mr-2 mt-1 flex-shrink-0"/>
              <span>{item.q}</span>
            </h3>
            <p className="text-gray-700 pl-8">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 