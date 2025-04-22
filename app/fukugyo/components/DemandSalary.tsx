"use client";

import { useEffect, useRef } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts'; // グラフ関連をコメントアウト
import { TrendingUp, Laptop, DollarSign, Brain, Clock, Users } from 'lucide-react'; // アイコンを変更
import Image from 'next/image';
// import { SalaryData, StatItem } from '../types'; // 型定義もコメントアウト (必要なら別途定義)

// AI副業向けの統計データ (StatItem型は一旦仮で定義するか、anyを使う)
const stats: any[] = [
  { 
    id: 1,
    icon: <DollarSign className="h-5 w-5 text-emerald-500" />,
    label: '目標月収', 
    value: '月+5万円〜',
    description: 'スキルと時間次第で10万円以上も',
    image: "/images/fukugyo-income.jpg" // 仮の画像パス
  },
  { 
    id: 2,
    icon: <Laptop className="h-5 w-5 text-blue-500" />,
    label: '必要なもの', 
    value: 'PC1台から',
    description: '特別な機材は不要で始めやすい',
    image: "/images/fukugyo-pc.jpg" // 仮の画像パス
  },
  { 
    id: 3,
    icon: <TrendingUp className="h-5 w-5 text-amber-500" />,
    label: '収入アップ', 
    value: 'スキル次第',
    description: '高単価案件や継続依頼も',
    image: "/images/fukugyo-skillup.jpg" // 仮の画像パス
  },
  { 
    id: 4,
    icon: <Clock className="h-5 w-5 text-indigo-500" />,
    label: '働き方', 
    value: '自由な時間に',
    description: '在宅・リモートで柔軟に対応',
    image: "/images/fukugyo-remote.jpg" // 仮の画像パス
  },
  { 
    id: 5,
    icon: <Brain className="h-5 w-5 text-pink-500" />,
    label: '将来性', 
    value: '需要拡大中',
    description: 'AIスキルは今後も市場価値が高い',
    image: "/images/fukugyo-future.jpg" // 仮の画像パス
  },
  {
    id: 6,
    icon: <Users className="h-5 w-5 text-cyan-500" />, 
    label: '選べるコース', 
    value: '5種類以上',
    description: '興味や適性に合った分野を選べる',
    image: "/images/fukugyo-courses.jpg" // 仮の画像パス
  },
];

// const CustomTooltip = ({ active, payload }: any) => { ... }; // グラフ関連をコメントアウト

export default function FukugyoIncomePotential() { // コンポーネント名変更
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const statsElements = statsRef.current?.querySelectorAll('.stat-card');
            statsElements?.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('animate-in');
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          {/* タイトルと説明文をAI副業向けに */}
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            AI副業で広がる<br className="md:hidden" />収入の可能性
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            AIスキルを活かした副業は、場所に縛られず収入を得る新しい選択肢です。未経験からでも、月5万円以上の副収入は十分可能。ライティング、動画生成、データ入力補助など、あなたに合った仕事で収入アップを目指しましょう。
          </p>
        </div>
        
        {/* グラフエリアをコメントアウト */}
        {/* 
        <div>
          <div className="rounded-lg border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 overflow-hidden mb-12">
            <div className="p-6 pb-0">
              <h3 className="text-lg font-semibold leading-none tracking-tight">AI副業 収入例</h3>
              <p className="text-sm text-muted-foreground pt-1">
                ※スキルや作業時間により変動します
              </p>
            </div>
            <div className="px-6 pt-6 pb-0">
              <div className="w-full h-[200px] flex items-center justify-center text-gray-400">
                ここに収入例グラフやコース概要を表示予定
              </div>
            </div>
          </div>
        </div>
        */}
        
        {/* 統計カードをAI副業向けに */}
        <div 
          ref={statsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {stats.map((stat) => (
            <div key={stat.id} className="stat-card group transition-all duration-500 rounded-lg border bg-card text-card-foreground shadow-md hover:shadow-lg overflow-hidden relative">
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={stat.image} // 仮のパスを設定
                  alt={stat.label}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  // priority={stat.id <= 3} // priorityは調整
                />
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-lg font-semibold text-center">{stat.label}</p>
                </div>
              </div>
              <div className="p-6 text-center">
                {/* stat.icon を表示する場合 */}
                {/* <div className="mb-2 flex justify-center">{stat.icon}</div> */}
                <h3 className="text-2xl font-semibold leading-none tracking-tight mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground mb-3">{stat.label}</p>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 