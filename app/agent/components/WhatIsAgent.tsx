"use client";

import { useRef, useEffect, useState } from 'react';
import PixelCard from './PixelCard';
import Image from 'next/image';
import GradientText from '@/components/ui/GradientText';

export default function WhatIsAgent() {
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
      title: "円満かつ確実な退職サポート",
      description: "ストレスの多い退職交渉や手続きは全てお任せ。あなたの権利を守り、スムーズな門出をサポートします。",
      variant: "blue",
    },
    {
      title: "市場価値を高めるAIスキル習得",
      description: "未経験でも安心。需要急増中のAI分野で活躍するための実践的スキルを、最適なコースで効率的に習得できます。",
      variant: "emerald",
    },
    {
      title: "年収アップを実現する転職支援",
      description: "厳選された高年収AI求人をご紹介。あなたのスキルと希望に合う、理想のキャリア実現を強力に後押しします。",
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
        <div className="absolute inset-0 bg-black/30"></div>
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
              退職エージェントとは？
            </GradientText>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            「今の仕事、もう限界かも…でも、辞めた後の生活や収入が不安…」
            そんなジレンマを抱えていませんか？<br />
            私たちの退職エージェントサービスは、単なる退職代行ではありません。<br className="hidden md:block" />
            <span className="font-semibold text-blue-400">円満な退職の実現</span>と、<span className="font-semibold text-emerald-400">将来性豊かなAIキャリアへの転身による<span className="text-amber-400 font-bold">大幅な収入アップ</span></span>を同時に叶える、あなたのためのパートナーです。
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
             退職のストレスから解放され、AIスキルで未来を切り拓きませんか？<br />
             私たちは、あなたが自信を持って次のステップへ進むための<span className="text-blue-400">「安心」</span>と<span className="text-emerald-400">「成長」</span>をお約束します。
           </p>
         </div>
      </div>
    </section>
  );
} 