"use client";

import { useEffect, useRef } from 'react';
import { Quote, Brain, ScrollText, Code } from 'lucide-react';
import Image from 'next/image';
import { SuccessStory } from '../types';

const successStories: SuccessStory[] = [
  {
    id: 1,
    name: 'Sさん (29歳)',
    background: '元販売職',
    offer: '年収950万円',
    course: 'AIエンジニアリング',
    comment: 'AIエキスパート受講後、わずか3ヶ月で自社LLM導入プロジェクトのリードとしてスカウトされ、希望年収をそのまま提示してもらえました。退職から転職まで一体型でサポートしてもらえたおかげで安心して集中できました。',
    avatar: 'S',
    color: 'bg-indigo-100 text-indigo-700',
    image: "/images/agent-story-s.jpg",
    icon: <Brain className="h-6 w-6" />
  },
  {
    id: 2,
    name: 'Tさん (34歳)',
    background: '元事務職',
    offer: '年収720万円',
    course: 'AIプロンプトエンジニア',
    comment: '未経験からのスタートでしたが、プロンプトエンジニアリングに集中して学習したことで、想像以上の年収で内定をいただきました。AIコンテンツ制作の実績が評価され、前職より月収20万円アップという結果に大満足しています。',
    avatar: 'T',
    color: 'bg-[#e9d5ff] text-[#310076]',
    image: "/images/agent-story-t.jpg",
    icon: <ScrollText className="h-6 w-6" /> // Changed Notebook to ScrollText
  },
  {
    id: 3,
    name: 'Kさん (41歳)',
    background: '元ITサポート',
    offer: '年収850万円',
    course: 'AI×SEO専門家',
    comment: '年齢的に転職は厳しいと思っていましたが、SEOとAIの掛け合わせスキルは予想以上に需要がありました。学習と平行して退職交渉を代行してもらえたので精神的な負担が少なく、次のキャリアに集中できました。',
    avatar: 'K',
    color: 'bg-emerald-100 text-emerald-700',
    image: "/images/agent-story-k.jpg",
    icon: <Code className="h-6 w-6" />
  },
];

export default function SuccessStories() {
  const storiesRef = useRef<HTMLDivElement>(null);

  return (
    <section id="success-stories" className="w-full bg-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            受講生の<br className="md:hidden" />"言い値オファー"多数
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            AIスキルを習得した受講生が、市場価値を最大化して転職に成功した事例をご紹介します。
            どの方も未経験や異業種からのキャリアチェンジです。
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
                  alt={`${story.name}の成功事例`}
                  fill
                  sizes="100vw"
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
                  <span className="text-sm font-medium">{story.course} コース受講</span>
                </div>
                <p className="text-lg font-semibold text-indigo-600">
                  内定: {story.offer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 