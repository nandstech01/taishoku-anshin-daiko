'use client';

import React, { useState } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

type FaqItem = {
  question: string;
  answer: string;
};

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs: FaqItem[] = [
    {
      question: "AIライティングの品質が不安なのですが？",
      answer: "AIライティングはあくまで補助ツールのため、人間の最終チェックや編集が重要です。本講座では、AIと人間のコラボで質を高める最適フローを学習します。AIの特性や限界を理解した上で、どのような活用法が最適か、具体的なノウハウを習得することで、品質を維持・向上させることが可能です。"
    },
    {
      question: "すでに一部AI活用をしている場合でも受講は意味がありますか？",
      answer: "はい。既存の使い方をさらに発展させる具体的ノウハウや事例を学ぶことで、より効率的で質の高いコンテンツ制作が可能になります。多くの方が基礎的な活用法のみを実践していますが、本講座では高度なプロンプト設計やキーワード分析との連携、効果測定サイクルの確立など、より専門的かつ実践的な内容を網羅しています。"
    },
    {
      question: "リアルタイムでZoom講義に参加できるか分からないのですが？",
      answer: "録画配信も可能です。演習やディスカッションはリアルタイム参加が望ましいですが、難しい場合は個別サポートの検討も可能です。また、eラーニング部分は自分のペースで進められるため、仕事や生活の状況に合わせて柔軟に学習を進めることができます。"
    },
    {
      question: "WEB制作知識が少なくても問題ありませんか？",
      answer: "問題ありません。コンテンツライティングとAI活用を中心にしており、難解なプログラミングは不要です。基礎的なWEB知識については講座内で解説し、AIツールの使い方も初歩から丁寧に説明します。実務に直結した内容で、すぐに活用できるスキルの習得を目指しています。"
    },
  ];
  
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section id="faq" className="w-full py-16 sm:py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 leading-tight text-gray-800 text-center">
          よくある質問
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
            >
              <button
                className="flex justify-between items-center w-full p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-lg text-gray-800">{faq.question}</span>
                {openIndex === index ? (
                  <HiChevronUp className="flex-shrink-0 ml-2 text-blue-500 text-xl" />
                ) : (
                  <HiChevronDown className="flex-shrink-0 ml-2 text-gray-400 text-xl" />
                )}
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 pt-0 border-t border-gray-100">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 