"use client";

import { useEffect, useRef } from 'react';
import { Quote, Brain, ScrollText, Film, Database } from 'lucide-react';
import Image from 'next/image';

const successStories: any[] = [
  {
    id: 1,
    name: 'Aさん (32歳)',
    background: '会社員 (事務職)',
    monthlyIncomeIncrease: '月+8万円',
    course: 'AIライティング & SEO',
    comment: '残業が多くて副業は無理だと思っていましたが、AIでブログ記事作成を効率化できると知り挑戦。基本的なPCスキルしかなくても、ツール操作とライティングのコツを掴めば、週末だけで安定して稼げるようになりました。',
    avatar: 'A',
    color: 'bg-indigo-100 text-indigo-700',
    image: "/images/fukugyo-story-a.jpg",
    icon: <ScrollText className="h-6 w-6" />
  },
  {
    id: 2,
    name: 'Bさん (28歳)',
    background: '主婦 (育児中)',
    monthlyIncomeIncrease: '月+5万円',
    course: 'AIショート動画制作',
    comment: '育児の合間にできる仕事を探していてAI動画生成に興味を持ちました。スマホアプリのような感覚で楽しく学べて、今ではSNS用の短いPR動画を作って納品しています。在宅で収入が得られるのが嬉しいです。',
    avatar: 'B',
    color: 'bg-pink-100 text-pink-700',
    image: "/images/fukugyo-story-b.jpg",
    icon: <Film className="h-6 w-6" />
  },
  {
    id: 3,
    name: 'Cさん (21歳)',
    background: '大学生',
    monthlyIncomeIncrease: '月+6万円',
    course: 'AIデータ入力 & 分析補助',
    comment: '就活に向けて何かスキルを身につけたくて受講しました。AIを使ったデータ整理や簡単な分析は、思ったより簡単で需要も高いようです。学業と両立しながら、リモートでアルバイト代以上に稼げています。',
    avatar: 'C',
    color: 'bg-emerald-100 text-emerald-700',
    image: "/images/fukugyo-story-c.jpg",
    icon: <Database className="h-6 w-6" />
  },
];

export default function FukugyoSuccessStories() {
  const storiesRef = useRef<HTMLDivElement>(null);

  return (
    <section id="success-stories" className="w-full bg-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            AIスキルで実現！<br className="md:hidden" />副業成功ストーリー
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            未経験からAIスキルを習得し、副業で収入アップや新しい働き方を実現した方々の事例をご紹介します。あなたもきっと、自分に合ったAI副業を見つけられるはずです。
          </p>
        </div>
        
        <div 
          ref={storiesRef}
          className="grid md:grid-cols-3 gap-6"
        >
          {successStories.map((story) => (
            <div 
              key={story.id}
              className="story-card group rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg border-t-4 overflow-hidden transition-all duration-700"
              style={{ borderTopColor: `hsl(var(--chart-${story.id}))` }} 
            >
              <div className="relative h-48">
                <Image
                  src={story.image}
                  alt={`${story.name}のAI副業成功事例`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
              </div>
              
              <div className="relative p-6 pb-0">
                <Quote className="h-10 w-10 text-gray-200 absolute right-4 top-4" />
                <div className="flex items-center gap-3">
                  <span className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${story.color} ring-2 ring-offset-2 ring-indigo-100`}>
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-[#310076] text-white font-medium">
                      {story.avatar}
                    </span>
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold leading-none tracking-tight">{story.name}</h3>
                    <p className="text-sm text-muted-foreground">{story.background}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-4">
                <p className="text-sm leading-relaxed text-gray-600">
                  "{story.comment}"
                </p>
              </div>
              <div className="flex flex-col items-start gap-2 p-6 pt-0">
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                  {story.icon}
                  <span className="text-sm font-medium">{story.course}</span>
                </div>
                <p className="text-lg font-semibold text-emerald-600">
                  副業収入: {story.monthlyIncomeIncrease}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 