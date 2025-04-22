"use client";

import { useEffect, useRef } from 'react';
import { SendIcon, BookOpenCheck, UserCog, BriefcaseIcon, BarChartHorizontalIcon, ShieldCheck, GraduationCap } from 'lucide-react';
import { ProcessStep } from '../types';

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: '退職あんしん代行',
    description: '即日でストレスなく退職',
    icon: <ShieldCheck className="h-6 w-6 text-indigo-600" />,
    features: [
      '企業との退職を2,980円で完全代行',
      '必要に応じて労働組合ルート確保',
      '必要に応じて社会保険労務士ルート確保',
      '退職届や手続きの準備',
      '24時間年中無休、即日退職'
    ]
  },
  {
    id: 2,
    title: 'AIリスキリング (5コース)',
    description: '最短3ヶ月でAIスキルを習得',
    icon: <GraduationCap className="h-6 w-6 text-[#310076]" />,
    features: [
      'AIエンジニアリング基礎',
      'AIコンテンツ制作実践',
      'プロンプトエンジニアリング',
      'AI×SEO戦略立案',
      'AI活用ビジネス戦略'
    ]
  },
  {
    id: 3,
    title: 'ハイクラス転職支援',
    description: 'AI案件のハイクラス求人をマッチング',
    icon: <BriefcaseIcon className="h-6 w-6 text-emerald-600" />,
    features: [
      '非公開AIプロジェクトの紹介',
      '履歴書・職務経歴書の添削',
      '面接対策と模擬面接実施',
      '条件交渉のサポート',
      '入社後のキャリア相談'
    ]
  },
];

export default function ProcessFlow() {
  const processRef = useRef<HTMLDivElement>(null);

  return (
    <section className="w-full bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            退職からAIキャリアまでの3ステップ
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            退職の不安解消からAIスキル習得、転職成功まで、一気通貫でサポート。
            あなたの市場価値を最大化する完全一体型プログラムです。
          </p>
        </div>
        
        <div 
          ref={processRef}
          className="relative"
        >
          {/* Progress Line (Desktop) */}
          <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-1 bg-gradient-to-r from-indigo-500 via-[#310076] to-emerald-500 z-0"></div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div 
                key={step.id} 
                className="process-card transition-all duration-700"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-6 relative z-10">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg border-2 border-indigo-100">
                    <span className="text-2xl font-bold bg-gradient-to-br from-indigo-600 to-[#310076] text-transparent bg-clip-text">
                      {step.id}
                    </span>
                  </div>
                </div>
                
                <div className="rounded-lg border bg-card text-card-foreground shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6 pb-2">
                    <div className="flex justify-center mb-4">
                      {step.icon}
                    </div>
                    <h3 className="text-xl text-center font-semibold leading-none tracking-tight">{step.title}</h3>
                    <p className="text-center text-sm text-muted-foreground pt-1">{step.description}</p>
                  </div>
                  <div className="p-6 pt-4">
                    <ul className="space-y-2">
                      {step.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <BarChartHorizontalIcon className="h-4 w-4 text-indigo-500 mt-1 flex-shrink-0" />
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