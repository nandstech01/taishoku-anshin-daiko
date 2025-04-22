"use client";

import { useEffect, useRef } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LabelList
} from 'recharts';
import { TrendingUp, Users, Database, AwardIcon, LineChart, Brain, ScrollText, Cpu } from 'lucide-react';
import Image from 'next/image';
import { SalaryData, StatItem } from '../types';

const demandData: SalaryData[] = [
  { name: '全国平均', value: 534.6, color: 'hsl(var(--chart-1))' },
  { name: '東京圏AI', value: 650, color: 'hsl(var(--chart-2))' },
  { name: 'ハイクラス', value: 1050, color: 'hsl(var(--chart-3))' },
];

const stats: StatItem[] = [
  { 
    id: 1,
    // icon: <Brain className="h-5 w-5 text-indigo-500" />,
    label: '全国平均年収', 
    value: '約534.6万円',
    description: 'doda調べ (2025年2月時点)',
    image: "/images/agent-stat-avg-salary.jpg"
  },
  { 
    id: 2,
    // icon: <ScrollText className="h-5 w-5 text-emerald-500" />,
    label: '東京平均月給', 
    value: '約41.9万円',
    badge: '+21%',
    description: '全国比 (月給換算で約503万円/年)',
    image: "/images/agent-stat-tokyo-salary.jpg"
  },
  { 
    id: 3,
    // icon: <AwardIcon className="h-5 w-5 text-[#310076]" />,
    label: 'ハイクラスAI求人', 
    value: '900〜1,200万円',
    description: '上級ポジション・経験者向け',
    image: "/images/agent-stat-high-class.jpg"
  },
  { 
    id: 4,
    // icon: <Cpu className="h-5 w-5 text-orange-500" />,
    label: 'AI人材不足', 
    value: '8.8万人',
    description: '経産省試算 (2025年時点)',
    image: "/images/agent-stat-shortage.jpg"
  },
  { 
    id: 5,
    // icon: <Database className="h-5 w-5 text-blue-500" />,
    label: 'AI市場規模', 
    value: '1,200億円',
    description: '2028年度8,028億円規模へ成長',
    image: "/images/agent-stat-market-size.jpg"
  },
  {
    id: 6,
    // icon: <TrendingUp className="h-5 w-5 text-pink-500" />, 
    label: '高い将来性と需要', 
    value: '継続的な成長予測',
    description: 'DX推進・技術革新で需要拡大',
    image: "/images/agent-stat-future-demand.jpg"
  },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 border rounded-md shadow-md">
        <p className="font-medium">{`${data.name}: ${data.value}万円`}</p>
      </div>
    );
  }
  return null;
};

export default function DemandSalary() {
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
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            急拡大するAIエンジニア<br className="md:hidden" />市場と給与水準
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            2025年に向けて国内外でAI人材需要が急増しています。退職後のキャリアチェンジにAIスキルが強い選択肢である理由をデータで確認しましょう。
          </p>
        </div>
        
        <div>
          <div className="rounded-lg border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 overflow-hidden mb-12">
            <div className="p-6 pb-0">
              <h3 className="text-lg font-semibold leading-none tracking-tight">AI人材年収比較（単位:万円）</h3>
              <p className="text-sm text-muted-foreground pt-1">
                出典: doda・Indeed・経産省データを基に作成
              </p>
            </div>
            <div className="px-6 pt-6 pb-0">
              <div className="w-full">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={demandData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis
                      domain={[0, 1200]}
                      tickFormatter={(tick: number | string) => `${tick}`}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                    <Bar dataKey="value" fill="url(#colorGradient)" radius={[8, 8, 0, 0]}>
                      <LabelList dataKey="value" position="top" formatter={(value: number) => `${value}万円`} />
                    </Bar>
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={1} />
                        <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        
        <div 
          ref={statsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {stats.map((stat) => (
            <div key={stat.id} className="stat-card group transition-all duration-500 rounded-lg border bg-card text-card-foreground shadow-md hover:shadow-lg overflow-hidden relative">
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={stat.image}
                  alt={stat.label}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={stat.id <= 3}
                />
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-lg font-semibold text-center">{stat.label}</p>
                </div>
              </div>
              <div className="p-6 text-center">
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