import React from 'react';
import Image from 'next/image';
import { SiNextdotjs, SiOpenai, SiPython } from 'react-icons/si';
import { FaRobot } from 'react-icons/fa';

interface HeroSectionProps {
  courseTitle: string;
  courseSubtitle: string;
}

export default function HeroSection({ courseTitle, courseSubtitle }: HeroSectionProps) {
  return (
    <section className="w-full relative text-white py-16 sm:py-24 px-4">
      {/* 背景画像とオーバーレイ */}
      <div className="absolute inset-0">
        {/* PC用背景画像 */}
        <Image
          src="/images/agent-hero-background.jpg"
          alt="Background"
          fill
          className="object-cover object-center hidden md:block"
          priority
        />
        {/* スマホ用背景画像 */}
        <Image
          src="/images/agent-hero-background-mobile.jpg"
          alt="Background"
          fill
          className="object-cover object-center block md:hidden"
          priority
        />
        {/* 黒の半透明オーバーレイ */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* スマホ用のタイトル (タイトルを2行に分割して表示) */}
        <h1 className="sm:hidden text-center">
          <span className="text-2xl font-bold block leading-tight">AIエキスパート</span>
          <span className="text-2xl font-bold block leading-tight">～生成AIエンジニア～</span>
        </h1>
        
        {/* PC用のタイトル */}
        <h1 className="hidden sm:block text-3xl md:text-5xl font-bold mb-2 sm:mb-4 text-center leading-tight">{courseTitle}</h1>
        
        <h2 className="text-lg sm:text-xl md:text-2xl text-center mb-6 sm:mb-8 text-blue-100 mx-auto max-w-[310px] sm:max-w-none leading-snug mt-2 sm:mt-0">
          {courseSubtitle}
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-8 sm:mt-12 mb-6 sm:mb-8">
          <div className="flex items-center bg-black/30 p-3 sm:p-4 rounded-lg backdrop-blur-sm border border-white/20">
            <SiNextdotjs className="text-2xl sm:text-4xl mr-2 sm:mr-3" />
            <span className="text-sm sm:text-lg">Next.js</span>
          </div>
          <div className="flex items-center bg-black/30 p-3 sm:p-4 rounded-lg backdrop-blur-sm border border-white/20">
            <SiOpenai className="text-2xl sm:text-4xl mr-2 sm:mr-3" />
            <span className="text-sm sm:text-lg">OpenAI API</span>
          </div>
          <div className="flex items-center bg-black/30 p-3 sm:p-4 rounded-lg backdrop-blur-sm border border-white/20">
            <SiPython className="text-2xl sm:text-4xl mr-2 sm:mr-3" />
            <span className="text-sm sm:text-lg">Python</span>
          </div>
          <div className="flex items-center bg-black/30 p-3 sm:p-4 rounded-lg backdrop-blur-sm border border-white/20">
            <FaRobot className="text-2xl sm:text-4xl mr-2 sm:mr-3" />
            <span className="text-sm sm:text-lg">AIエージェント</span>
          </div>
        </div>
        
        <div className="text-center mt-8 sm:mt-12">
          <a href="#details" className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 font-bold text-white overflow-hidden rounded-full border border-white/30 backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl">
            <span className="relative z-10 flex items-center text-base sm:text-lg">
              詳細を見る
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-1.5 sm:ml-2 -mr-1 transition-transform duration-300 ease-out transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </a>
        </div>
      </div>
    </section>
  );
} 