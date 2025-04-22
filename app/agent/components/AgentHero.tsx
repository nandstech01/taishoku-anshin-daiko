"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MoveRight, Sparkles, CheckCircle2, ArrowUpRight, TrendingUp } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';

export default function AgentHero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            const elements = entry.target.querySelectorAll('.animate-item');
            elements.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('opacity-100', 'translate-y-0');
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <section className="relative w-full text-white pt-16 pb-24 px-4 overflow-hidden min-h-screen flex">
      {/* Adjusted background gradient for potentially better contrast */}
      <div className="absolute inset-0">
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div> */}
        {/* --- PC用背景画像 --- */}
        <Image
          src="/images/agent-hero-background.jpg"
          alt="Background"
          fill
          className="object-cover object-center hidden md:block" // PC表示 (md以上で表示)
          priority
        />
        {/* --- スマホ用背景画像 --- */}
        <Image
          src="/images/agent-hero-background-mobile.jpg"
          alt="Background"
          fill
          className="object-cover object-center block md:hidden" // スマホ表示 (md未満で表示)
          priority
        />
        {/* <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 via-teal-500/10 to-transparent mix-blend-overlay"></div> */}
        
        {/* <div className="absolute inset-0 opacity-15"> */}
          {/* <div className="absolute top-0 left-0 w-96 h-96 bg-white/15 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div> */}
          {/* <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300/15 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div> */}
        {/* </div> */}
      </div>
      
      <div className="relative max-w-7xl mx-auto z-10">
        {/* メタリックロゴの表示部分を削除 */}
        {/* <div className="flex justify-center mb-8">
          <div className="relative w-48 h-48">
            {mounted && <MetallicLogo className="w-full h-full" />}
          </div>
        </div> */}

        <div className="text-center mb-12">
          {/* サーバーとクライアントで一貫性のあるスタイルに修正 */}
          {/* <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-wider" style={{ color: 'rgb(229, 231, 235)' }}>
            退職エージェント
          </h2> */}
          
          {/* アニメーション関連クラスを整理 */}
          {/* <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/15 backdrop-blur-md mb-8 border border-white/25">
            <TrendingUp className="h-5 w-5 text-white" />
            <span className="text-base font-medium text-white">2025年 AI人材需要 <span className="text-white font-bold">8.8万人</span> 規模に</span>
          </div> */}
          <p className="text-sm text-white/80 mb-2">
            2025年 AI人材需要 <span className="font-bold">8.8万人</span> 規模に
          </p>
          
          {/* 一貫性のあるスタイルに修正 */}
          <h1 
            ref={headingRef}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight"
          >
            <span className="block mb-2 md:mb-4" style={{ color: 'white' }}>退職エージェントが導く</span>
            <span className="relative inline-block">
              <span className="relative z-10" style={{ color: 'white' }}>AI時代の</span>
              <span className="relative z-10" style={{ color: 'white', fontWeight: 'bold' }}>新キャリア</span>
              {/* <span className="absolute -bottom-2 left-0 w-full h-3 rounded-full -z-0 transform -skew-x-12 bg-gradient-to-r from-yellow-300 via-amber-500 to-yellow-600"></span> */}
            </span>
          </h1>
        </div>

        <div 
          ref={containerRef}
          className="grid md:grid-cols-2 gap-16 items-start"
        >
          <div className="animate-item translate-y-4 transition-all duration-700" style={{ transitionDelay: '600ms' }}>
            <div className="text-base md:text-lg mb-4 leading-relaxed text-white/90">
              退職支援、そしてAIスキル習得まで。
              <GradientText 
                colors={["#FDB813", "#FFFACD", "#FFD700", "#DAA520", "#FDB813"]}
                className="block mt-3 text-3xl font-bold"
                showBorder={false}
                animationSpeed={5}
              >
                退職後の年収1.5倍以上
              </GradientText>
              を実現した実績多数。
            </div>

            <div className="space-y-2 md:space-y-4 mb-8">
              {/* Adjusted card styles for better contrast */}
              <div className="group flex items-center gap-4 bg-black/10 backdrop-blur-md rounded-xl px-5 py-2 md:p-5 transform hover:scale-102 transition-all duration-300 border border-white/20 hover:border-white/40 hover:bg-black/20 cursor-pointer">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <CheckCircle2 className="h-6 w-6 text-white" /> 
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-lg mb-1 group-hover:text-white transition-colors text-white">退職をフルサポート</h3>
                  <p className="text-white/80 group-hover:text-white/95">退職手続きを徹底サポート</p> {/* Increased hover opacity */} 
                </div>
                <ArrowUpRight className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="group flex items-center gap-4 bg-black/10 backdrop-blur-md rounded-xl px-5 py-2 md:p-5 transform hover:scale-102 transition-all duration-300 border border-white/20 hover:border-white/40 hover:bg-black/20 cursor-pointer">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <CheckCircle2 className="h-6 w-6 text-white" /> 
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-lg mb-1 group-hover:text-white transition-colors text-white">AIスキル習得支援</h3>
                  <p className="text-white/80 group-hover:text-white/95">5つのコースでAIスキル最大化</p>
                </div>
                <ArrowUpRight className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="group flex items-center gap-4 bg-black/10 backdrop-blur-md rounded-xl px-5 py-2 md:p-5 transform hover:scale-102 transition-all duration-300 border border-white/20 hover:border-white/40 hover:bg-black/20 cursor-pointer">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <CheckCircle2 className="h-6 w-6 text-white" /> 
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-lg mb-1 group-hover:text-white transition-colors text-white">ハイクラスAI求人紹介</h3>
                  <p className="text-white/80 group-hover:text-white/95">非公開の厳選AI案件をご紹介</p>
                </div>
                <ArrowUpRight className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Adjusted button styles */}
              <Link 
                href="https://lin.ee/w105og9" 
                className="inline-flex items-center justify-center rounded-md px-8 py-4 text-lg font-bold bg-white text-indigo-900 hover:bg-emerald-50 hover:text-indigo-700 border-0 shadow-lg shadow-emerald-900/30 hover:shadow-xl hover:shadow-emerald-900/40 transition-all duration-300 h-14"
              >
                まずは退職相談する <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="#success-stories" 
                className="inline-flex items-center justify-center rounded-md px-8 py-4 text-lg font-bold bg-transparent border-2 border-white/50 text-white hover:bg-white/15 h-14 hover:border-white transition-all duration-300"
              >
                成功事例を見る <MoveRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Adjusted stats card styles */}
          <div className="relative hidden md:block animate-item transition-all duration-700" style={{ transitionDelay: '800ms' }}>
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/15 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/15 rounded-full blur-3xl"></div>
            <div className="relative bg-black/15 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20"> {/* Adjusted bg/border */} 
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-white/15 to-transparent backdrop-blur-md rounded-xl p-6 text-center transform hover:scale-105 transition-transform border border-white/15"> {/* Adjusted bg/border */} 
                  <h3 className="text-4xl font-bold text-white">8.8万人</h3>
                  <p className="text-base mt-2 font-medium text-white">AI人材不足</p>
                  <p className="text-sm text-white/80 mt-1">2025年予測</p>
                </div>
                <div className="bg-gradient-to-br from-white/15 to-transparent backdrop-blur-md rounded-xl p-6 text-center transform hover:scale-105 transition-transform border border-white/15"> {/* Adjusted bg/border */} 
                  <h3 className="text-4xl font-bold text-white">1,200億円</h3>
                  <p className="text-base mt-2 font-medium text-white">AI市場規模</p>
                  <p className="text-sm text-white/80 mt-1">2025年度予測</p>
                </div>
                <div className="col-span-2 bg-gradient-to-br from-white/15 to-transparent backdrop-blur-md rounded-xl p-6 text-center transform hover:scale-105 transition-transform border border-white/15"> {/* Adjusted bg/border */} 
                  <h3 className="text-4xl font-bold text-white">534.6万円</h3>
                  <p className="text-base mt-2 font-medium text-white">AI人材平均年収</p>
                  <p className="text-sm text-white/80 mt-1">全国平均 (2025年2月時点)</p>
                </div>
              </div>
              <div className="mt-8 bg-white/10 rounded-xl p-6 border border-white/25"> {/* Changed final info box styles: removed emerald/cyan gradient and border */} 
                <p className="text-lg font-medium text-center leading-relaxed text-white"> 
                  「退職代行+AIスキル習得」で<br />
                  <span className="text-2xl font-bold text-white">年収1.5倍以上</span>
                  <span className="block mt-1">も夢ではありません</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 