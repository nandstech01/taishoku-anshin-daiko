"use client";

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

// 構造化データと同じFAQ内容を使用
const faqs = [
  {
    question: '退職エージェントはどのようなサービスですか？',
    answer: '退職エージェントは、退職支援からAIスキル習得、高年収求人紹介まで一貫してサポートする総合キャリア支援サービスです。AI時代の新しいキャリアを構築するためのロードマップを提供し、平均年収1.5倍以上の実績があります。'
  },
  {
    question: 'AIに関する知識がなくても利用できますか？',
    answer: 'はい、AIの予備知識がなくても問題ありません。初心者からプロフェッショナルまで、レベルに合わせた5つのコースを用意しており、それぞれの目標や経験に合わせたカリキュラムを提供しています。'
  },
  {
    question: 'どのようなAIスキルを習得できますか？',
    answer: 'プロンプトエンジニアリング、データ分析、AI開発基礎、AI活用戦略立案など、現在のAI市場で最も需要の高いスキルを習得できます。実践的なプロジェクトを通じて、すぐにビジネスで活用できる能力を身につけられます。'
  },
  {
    question: '退職から転職までどのくらいの期間がかかりますか？',
    answer: '個人の状況やスキルレベル、目標によって異なりますが、退職手続きは最短即日対応、AIスキル習得コースは4週間から12週間、その後の転職活動を含めると平均2〜4ヶ月程度で完了するケースが多いです。'
  },
  {
    question: 'AIキャリアへの転職でどのくらい年収がアップしますか？',
    answer: '当サービス利用者の平均で年収1.5倍以上の実績があります。AI人材の平均年収は534.6万円（2025年2月時点）で、スキルレベルやポジションによってはさらに高い年収も期待できます。'
  },
  {
    question: '現在の仕事と並行してサービスを利用できますか？',
    answer: 'はい、可能です。オンラインコースは自分のペースで進められるよう設計されており、週末や夜間に学習を進めることも可能です。ただし、退職支援と新しいキャリアへの集中のためには、ある程度の時間的余裕を持たれることをお勧めします。'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = faqRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section className="w-full bg-gray-50 py-20 px-4" id="faq">
      <div 
        ref={faqRef}
        className={`max-w-4xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 mb-4">
            <HelpCircle className="h-4 w-4 text-indigo-700" />
            <span className="text-sm font-medium text-indigo-700">よくある質問</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            退職エージェントに関するFAQ
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            サービスに関してよくいただく質問をまとめました。さらに詳しい情報は、お気軽にお問い合わせください。
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'shadow-lg' : ''
              }`}
              style={{ 
                transitionDelay: `${index * 50}ms`,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                opacity: isVisible ? 1 : 0
              }}
            >
              <button
                className="flex justify-between items-center w-full p-5 text-left"
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
              >
                <h3 className="text-lg font-semibold pr-8">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="p-5 pt-0 text-gray-600">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 