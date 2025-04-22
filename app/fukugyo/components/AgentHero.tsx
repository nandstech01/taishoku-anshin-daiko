"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MoveRight, Sparkles, CheckCircle2, ArrowUpRight, TrendingUp, Film, Edit3, BarChart3 } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';

export default function FukugyoHero() {
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
      <div className="absolute inset-0">
        {/* PC用背景画像 */}
        <Image
          src="/images/fukugyo-hero-background.jpg"
          alt="AI副業 背景"
          fill
          className="object-cover object-center hidden md:block"
          priority
        />
        {/* モバイル用背景画像 */}
        <Image
          src="/images/fukugyo-hero-background-mobile.jpg"
          alt="AI副業 背景"
          fill
          className="object-cover object-center block md:hidden"
          priority
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto z-10">
        <div className="text-center mb-12">
          <h1 
            ref={headingRef}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
          >
            <span className="block mb-2 md:mb-4">退職後</span>
            <GradientText 
              colors={["#FDB813", "#FFFACD", "#FFD700", "#DAA520", "#FDB813"]}
              className="block mx-auto"
              showBorder={false}
              animationSpeed={6}
            >
              AI副業
            </GradientText>
            <span className="block mt-2 md:mt-4">で新たな収入源に変える</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            未経験からでも大丈夫。月+5万円を目指せる実践スキルを習得し、時間と場所に縛られない働き方を実現。退職エージェントがあなたの副業スタートをフルサポート。
          </p>
        </div>

        <div 
          ref={containerRef}
          className="grid md:grid-cols-2 gap-16 items-start"
        >
          <div className="animate-item translate-y-4 transition-all duration-700 opacity-0" style={{ transitionDelay: '600ms' }}>
            <div className="space-y-4 mb-8">
              <div className="group flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-xl p-5 transform hover:scale-102 transition-all duration-300 border border-white/20 hover:border-white/40 hover:bg-white/20 cursor-pointer">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-white transition-colors text-white">多様なAI副業スキル</h3>
                  <p className="text-white/80 group-hover:text-white/95 text-sm">動画生成、ライティング、データ分析など、5種類以上の需要が高いコースから選択可能。</p> 
                </div>
                <ArrowUpRight className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="group flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-xl p-5 transform hover:scale-102 transition-all duration-300 border border-white/20 hover:border-white/40 hover:bg-white/20 cursor-pointer">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-white transition-colors text-white">実践重視カリキュラム</h3>
                  <p className="text-white/80 group-hover:text-white/95 text-sm">実際の案件を想定したトレーニングで、"稼げる"スキルを効率的に習得。</p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="group flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-xl p-5 transform hover:scale-102 transition-all duration-300 border border-white/20 hover:border-white/40 hover:bg-white/20 cursor-pointer">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                  <CheckCircle2 className="h-6 w-6 text-white" /> 
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-white transition-colors text-white">安心の伴走サポート</h3>
                  <p className="text-white/80 group-hover:text-white/95 text-sm">退職手続きから案件獲得のコツまで、専門家がしっかりサポート。</p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="https://lin.ee/w105og9"
                className="inline-flex items-center justify-center rounded-md px-8 py-4 text-lg font-semibold bg-white text-gray-900 hover:bg-gray-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-14"
              >
                まずは退職相談する <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="#courses"
                className="inline-flex items-center justify-center rounded-md px-8 py-4 text-lg font-semibold bg-transparent border-2 border-white/50 text-white hover:bg-white/10 hover:border-white transition-all duration-300 h-14"
              >
                AI副業コース詳細 <MoveRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="relative hidden md:block animate-item transition-all duration-700 opacity-0" style={{ transitionDelay: '800ms' }}>
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative bg-black/20 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-gradient-to-br from-white/15 to-transparent backdrop-blur-md rounded-xl p-6 text-center transform hover:scale-105 transition-transform border border-white/15">
                  <h3 className="text-4xl font-bold text-white">月5万円〜</h3>
                  <p className="text-base mt-2 font-medium text-white">場所を選ばない働き方</p>
                  <p className="text-sm text-white/80 mt-1">在宅・リモートで収入をプラス</p>
                </div>
                <div className="bg-gradient-to-br from-white/15 to-transparent backdrop-blur-md rounded-xl p-6 text-center transform hover:scale-105 transition-transform border border-white/15">
                  <h3 className="text-4xl font-bold text-white">将来性の高いスキル</h3>
                  <p className="text-base mt-2 font-medium text-white">AI市場の成長に乗る</p>
                  <p className="text-sm text-white/80 mt-1">需要拡大中の技術を習得</p>
                </div>
                <div className="bg-gradient-to-br from-white/15 to-transparent backdrop-blur-md rounded-xl p-6 text-center transform hover:scale-105 transition-transform border border-white/15">
                  <h3 className="text-4xl font-bold text-white">5種以上のコース</h3>
                  <p className="text-base mt-2 font-medium text-white">多様な働き方に対応</p>
                  <p className="text-sm text-white/80 mt-1">あなたに合った副業が見つかる</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 