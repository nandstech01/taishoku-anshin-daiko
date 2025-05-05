import React from 'react';
import Image from 'next/image';
import { FaRobot, FaLightbulb, FaShieldAlt, FaArrowRight } from 'react-icons/fa';
import { SiOpenai } from 'react-icons/si';

interface HeroSectionProps {
  courseTitle: string;
  courseSubtitle: string;
}

export default function HeroSection({ courseTitle, courseSubtitle }: HeroSectionProps) {
  return (
    <section className="w-full relative text-white py-16 sm:py-24 px-4">
      <div className="absolute inset-0">
        <Image
          src="/images/agent-hero-background.jpg"
          alt="Background"
          fill
          className="object-cover object-center hidden md:block"
          priority
        />
        <Image
          src="/images/agent-hero-background-mobile.jpg"
          alt="Background"
          fill
          className="object-cover object-center block md:hidden"
          priority
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className="max-w-5xl mx-auto relative z-10">
        <h1 className="sm:hidden text-center">
          <span className="text-2xl font-bold block leading-tight">AIリテラシー</span>
          <span className="text-2xl font-bold block leading-tight">基礎講座</span>
        </h1>
        
        <h1 className="hidden sm:block text-3xl md:text-5xl font-bold mb-2 sm:mb-4 text-center leading-tight">{courseTitle}</h1>
        
        <h2 className="text-lg sm:text-xl md:text-2xl text-center mb-6 sm:mb-8 text-blue-100 mx-auto max-w-[310px] sm:max-w-none leading-snug mt-2 sm:mt-0">
          {courseSubtitle}
        </h2>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-8 sm:mt-12 mb-6 sm:mb-8">
          <div className="flex items-center bg-black/30 p-3 sm:p-4 rounded-lg backdrop-blur-sm border border-white/20">
            <FaRobot className="text-2xl sm:text-4xl mr-2 sm:mr-3" />
            <span className="text-sm sm:text-lg">AI基礎知識</span>
          </div>
          <div className="flex items-center bg-black/30 p-3 sm:p-4 rounded-lg backdrop-blur-sm border border-white/20">
            <SiOpenai className="text-2xl sm:text-4xl mr-2 sm:mr-3" />
            <span className="text-sm sm:text-lg">生成AI活用</span>
          </div>
          <div className="flex items-center bg-black/30 p-3 sm:p-4 rounded-lg backdrop-blur-sm border border-white/20">
            <FaLightbulb className="text-2xl sm:text-4xl mr-2 sm:mr-3" />
            <span className="text-sm sm:text-lg">活用アイデア</span>
          </div>
          <div className="flex items-center bg-black/30 p-3 sm:p-4 rounded-lg backdrop-blur-sm border border-white/20">
            <FaShieldAlt className="text-2xl sm:text-4xl mr-2 sm:mr-3" />
            <span className="text-sm sm:text-lg">リスクと倫理</span>
          </div>
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <a href="#overview" className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 font-bold text-white overflow-hidden rounded-full border border-white/30 backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl">
            <span className="relative z-10 flex items-center text-base sm:text-lg">
              コース詳細を見る
              <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1.5 sm:ml-2 transition-transform duration-300 ease-out transform group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </a>
        </div>
      </div>
    </section>
  );
} 