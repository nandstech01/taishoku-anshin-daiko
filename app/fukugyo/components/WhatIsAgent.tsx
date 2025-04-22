"use client";

import { useRef, useEffect, useState } from 'react';
import PixelCard from './PixelCard';
import Image from 'next/image';
import GradientText from '@/components/ui/GradientText';

export default function WhatIsFukugyo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Animate only once
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const features = [
    {
      title: "未経験から\"稼げる\"AIスキルを習得",
      description: "動画生成、ライティング、データ分析、No-code開発など、需要の高いスキルを厳選。実践的なカリキュラムで、副業で通用するレベルを目指します。",
      variant: "blue",
    },
    {
      title: "時間と場所に縛られない新しい収入源",
      description: "PC一つで始められ、好きな時間に作業可能。まずは月+5万円から。スキルアップに応じて更なる収入増も期待できます。",
      variant: "emerald",
    },
    {
      title: "案件獲得まで安心の学習サポート",
      description: "スキル習得だけでなく、案件獲得のノウハウやポートフォリオ作成もサポート。学習仲間との交流でモチベーションも維持できます。",
      variant: "amber",
    },
  ];

  return (
    <section ref={sectionRef} className="w-full relative py-24 px-4 text-white">
      {/* 背景画像 */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/what-is-bg.jpg"
          alt="背景"
          fill
          className="object-cover object-center"
          priority={false}
          quality={85}
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* テクスチャオーバーレイ */}
      <div className="absolute inset-0 opacity-20 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/background-pattern.jpg')] opacity-30"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      <div className={`max-w-6xl mx-auto transition-opacity duration-1000 ease-in ${isVisible ? 'opacity-100' : 'opacity-0'} relative z-10`}>
        <div className="text-center mb-16">
          <h2 className="flex justify-center items-center text-3xl md:text-5xl font-extrabold mb-6 text-center">
            <GradientText 
              colors={["#FDB813", "#FFFACD", "#FFD700", "#DAA520", "#FDB813"]}
              className="mx-auto"
              showBorder={false}
              animationSpeed={5}
            >
              なぜ今、AI副業が選ばれるのか？
            </GradientText>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            「収入を増やしたいけど、時間がない」「将来のためにスキルアップしたい」
            AI副業は、そんな現代のニーズに応える新しい働き方です。<br />
            専門知識は不要。需要が高まるAIスキルを身につけ、<span className="font-semibold text-emerald-400">場所や時間に縛られずに収入を得る</span>チャンスを掴みませんか？<br className="hidden md:block" />
            私たちは<span className="font-semibold text-blue-400">未経験からのスキル習得</span>と、<span className="font-semibold text-amber-400">安定した副収入への道</span>をサポートします。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}
              style={{ transitionDelay: `${100 + index * 150}ms` }}
            >
              <PixelCard
                variant={feature.variant as 'blue' | 'emerald' | 'amber'}
                className="h-full"
              >
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </PixelCard>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
           <p className="text-xl font-semibold text-white">
             特別なスキルや経験は必要ありません。<br />
             AI副業で、あなたの<span className="text-blue-400">「可能性」</span>と<span className="text-emerald-400">「収入」</span>を広げましょう。
           </p>
         </div>
      </div>
    </section>
  );
} 