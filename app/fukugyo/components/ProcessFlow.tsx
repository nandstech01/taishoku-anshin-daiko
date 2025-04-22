"use client";

import { useEffect, useRef } from 'react';
import { MessageSquare, GraduationCap, PencilLine, TrendingUp, BarChartHorizontalIcon } from 'lucide-react';

// AI副業向けのプロセスデータ (型は一旦any)
const processSteps: any[] = [
  {
    id: 1,
    title: '円満退職サポート',
    description: '安心して次のステップへ',
    icon: <MessageSquare className="h-6 w-6 text-indigo-600" />,
    features: [
      'LINEで気軽に退職相談',
      '面倒な手続きや連絡を代行',
      '円満退職に向けたプランニング',
      '失業保険等の手続きサポート',
      '24時間相談受付'
    ]
  },
  {
    id: 2,
    title: 'AI副業スキル習得',
    description: '5種類以上のコースから選択',
    icon: <GraduationCap className="h-6 w-6 text-purple-600" />,
    features: [
      'AIライティング & SEO基礎',
      'AIショート動画制作 実践',
      'AIデータ入力 & 分析補助',
      'No-Code AIアプリ開発入門',
      '自分に合ったコースを選択'
    ]
  },
  {
    id: 3,
    title: '実践 & ポートフォリオ作成',
    description: '"稼げる"スキルを証明',
    icon: <PencilLine className="h-6 w-6 text-emerald-600" />,
    features: [
      '模擬案件で実践トレーニング',
      '作成した成果物を実績に',
      '講師によるフィードバック',
      '魅力的なポートフォリオ作成支援',
      'クラウドソーシング活用準備'
    ]
  },
  {
    id: 4,
    title: '副業スタート & 収入UP',
    description: '案件獲得から継続まで支援',
    icon: <TrendingUp className="h-6 w-6 text-amber-600" />,
    features: [
      '案件探しのコツを伝授',
      '提案文作成のサポート',
      'クライアントとの交渉術',
      '継続的なスキルアップ支援',
      '月+5万円以上の収入を目指す'
    ]
  },
];

export default function FukugyoProcessFlow() {
  const processRef = useRef<HTMLDivElement>(null);

  return (
    <section className="w-full bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            退職から始めるAI副業 4ステップ
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            退職の不安を解消し、AI副業で新しい収入源を確立するまでの流れを分かりやすくご紹介。
            未経験でも安心してスタートできる、伴走型のサポートプログラムです。
          </p>
        </div>
        
        <div 
          ref={processRef}
          className="relative"
        >
          {/* Progress Line (Desktop) - 4ステップ用に調整 */}
          <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-1 bg-gradient-to-r from-indigo-500 via-purple-500 via-emerald-500 to-amber-500 z-0"></div>
          
          {/* グリッドを4カラムに変更 */}
          <div className="grid md:grid-cols-4 gap-6"> 
            {processSteps.map((step, index) => (
              <div 
                key={step.id} 
                className="process-card transition-all duration-700 flex flex-col"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-6 relative z-10">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg border-2 border-gray-200">
                    <span className={`text-2xl font-bold bg-gradient-to-br ${step.id === 1 ? 'from-indigo-600 to-blue-500' : step.id === 2 ? 'from-purple-600 to-pink-500' : step.id === 3 ? 'from-emerald-600 to-teal-500' : 'from-amber-600 to-orange-500'} text-transparent bg-clip-text`}>
                      {step.id}
                    </span>
                  </div>
                </div>
                
                {/* カードコンテンツ (flex-grow追加で高さを揃える) */}
                <div className="flex-1 flex flex-col rounded-lg border bg-card text-card-foreground shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6 pb-2">
                    <div className="flex justify-center mb-4">
                      {step.icon}
                    </div>
                    <h3 className="text-xl text-center font-semibold leading-none tracking-tight">{step.title}</h3>
                    <p className="text-center text-sm text-muted-foreground pt-1">{step.description}</p>
                  </div>
                  <div className="p-6 pt-4 flex-grow">
                    <ul className="space-y-2">
                      {step.features.map((feature: any, i: any) => (
                        <li key={i} className="flex items-start gap-2">
                          <BarChartHorizontalIcon className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 