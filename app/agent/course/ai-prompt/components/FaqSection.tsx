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
      question: "AIに関する事前知識がなくても大丈夫でしょうか？",
      answer: "はい。AIの基礎からわかりやすく解説し、初心者の方でもスムーズに学べる構成です。"
    },
    {
      question: "コーディングをする場面はあるのでしょうか？",
      answer: "コーディング必須ではありません。API連携やツール設定の概要は説明しますが、プログラミング未経験者でも問題なく理解できます。"
    },
    {
      question: "講座修了後のサポートはありますか？",
      answer: "はい。講座終了後も質問対応や学習フォローアップを行います。また、コミュニティへの参加で継続的な学習環境を提供しています。"
    },
    {
      question: "Zoom講義に参加できない場合、録画だけで受講可能でしょうか？",
      answer: "録画配信は行いますが、演習や参加型ワークはリアルタイム参加のほうが効果的です。スケジュール調整が難しい場合は個別サポートなども検討可能です。"
    },
    {
      question: "学んだ内容を仕事や活動に取り入れるサポートはありますか？",
      answer: "受講中の課題で実際の活用シナリオを作成し、個別フィードバックを提供します。実践的な活用方法について具体的なアドバイスも行いますので、お気軽にご相談ください。"
    },
    {
      question: "他のAI関連コースとの違いは何ですか？",
      answer: "本コースは特にプロンプトエンジニアリングに焦点を当て、AIモデルに対する効果的な指示出しの技術を専門的に学びます。AIリテラシー基礎講座よりも応用的な内容で、実践的な課題解決への具体的な活用法を習得できます。"
   }
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
                  <HiChevronUp className="flex-shrink-0 ml-2 text-purple-500 text-xl" />
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