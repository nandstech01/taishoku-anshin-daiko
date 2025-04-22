"use client";

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

// AI副業向けのFAQデータ (エクスポートする)
export const faqs = [
  {
    question: '退職エージェントでAI副業も学べるのですか？',
    answer: 'はい、当社の退職エージェントサービスでは、円満な退職サポートに加え、AIスキルを習得して副収入を得るための「AI副業コース」も提供しています。退職後の新しいキャリアパスとしてご活用いただけます。'
  },
  {
    question: '全くの未経験でもAI副業は可能ですか？',
    answer: 'はい、可能です。基本的なPC操作ができれば問題ありません。コースは未経験者向けに設計されており、AIの基礎から実践的なスキルまで段階的に学べます。サポート体制も充実していますのでご安心ください。'
  },
  {
    question: 'どのくらいの期間で副収入を得られますか？',
    answer: '学習ペースや取り組む時間によりますが、多くの方は学習開始から2～3ヶ月で最初の案件を獲得し、月数万円の副収入を得られています。まずは月5万円を目標とし、スキルや実績に応じて更なる収入増を目指せます。'
  },
  {
    question: 'どのようなAI副業スキルを学べますか？',
    answer: 'AIライティング、AIショート動画制作、AIデータ入力・分析補助、No-Code AIアプリ開発など、現在の副業市場で需要の高い5種類以上のコースをご用意しています。無料相談にて、あなたに合ったコースをご提案することも可能です。'
  },
  {
    question: '退職手続きと並行して学習できますか？',
    answer: 'はい、可能です。学習はオンラインでご自身のペースで進められます。退職に関する手続きは当社がサポートしますので、安心して学習と副業準備に集中いただけます。'
  },
  {
    question: '学習後のサポートはありますか？',
    answer: 'はい、スキル習得後もサポートいたします。ポートフォリオの作成支援や、クラウドソーシングサイトでの案件獲得方法、クライアントとのやり取りのコツなどをアドバイスし、スムーズな副業スタートを後押しします。'
  }
];

export default function FukugyoFAQ() {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 mb-4">
            <HelpCircle className="h-4 w-4 text-emerald-700" />
            <span className="text-sm font-medium text-emerald-700">よくある質問</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            AI副業コースに関するFAQ
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            AI副業コースに関してよくいただく質問をまとめました。ご不明な点があれば、お気軽にお問い合わせください。
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
                  <ChevronUp className="h-5 w-5 text-emerald-600 flex-shrink-0" />
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