"use client";

import { useState, useEffect } from "react";
import DiagnosisHeader from "./components/DiagnosisHeader";
import EligibilitySection from "./components/EligibilitySection";
import FeatureCards from "./components/FeatureCards";
import CaseStudy from "./components/CaseStudy";
import ConcernsSection from "./components/ConcernsSection";
import TimelineSection from "./components/TimelineSection";
import SecurityPoints from "./components/SecurityPoints";
import StepsSection from "./components/StepsSection";
import TestimonialsSection from "./components/TestimonialsSection";

export default function DiagnosisPage() {
  const [slots, setSlots] = useState(["?", "?", "?"]);
  const [isSpinning, setIsSpinning] = useState(true);
  const [isAutoSpinning, setIsAutoSpinning] = useState(true);
  const [glowEffect, setGlowEffect] = useState(false);

  useEffect(() => {
    if (isAutoSpinning) {
      const autoSpinInterval = setInterval(() => {
        setSlots(prev => prev.map(() => 
          (Math.floor(Math.random() * 9) + 1).toString()
        ));
      }, 100);

      return () => clearInterval(autoSpinInterval);
    }
  }, [isAutoSpinning]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowEffect(true);
      setTimeout(() => setGlowEffect(false), 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const spinSlots = () => {
    if (isSpinning) return;
    
    setIsAutoSpinning(false);
    setIsSpinning(true);
    const finalNumbers = Array.from({ length: 3 }, () => 
      Math.floor(Math.random() * 9) + 1
    );
    
    let spins = 0;
    const maxSpins = 30;
    const spinInterval = 50;

    const interval = setInterval(() => {
      setSlots(prev => prev.map((_, index) => {
        if (spins >= maxSpins - (index * 5)) {
          return finalNumbers[index].toString();
        }
        return (Math.floor(Math.random() * 9) + 1).toString();
      }));
      
      spins++;
      
      if (spins >= maxSpins) {
        clearInterval(interval);
        setSlots(finalNumbers.map(n => n.toString()));
        setIsSpinning(false);
        setGlowEffect(true);
        setTimeout(() => {
          setGlowEffect(false);
          setIsAutoSpinning(true);
        }, 3000);
      }
    }, spinInterval);
  };

  return (
    <main className="min-h-screen bg-white">
      <DiagnosisHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#00B900] mb-4">
            失業保険申請サポート
          </h2>
          <div className="text-4xl font-bold text-[#00B900] mb-4">
            最大<span className="text-7xl">200</span>万円受給
          </div>
        </div>

        {/* Start Text with Animated Arrows */}
        <div className="text-center mb-8">
          <div className="
            text-3xl
            font-black
            text-[#00B900]
            mb-4
            animate-pulse-subtle
            relative
            inline-block
          ">
            {/* 左側の縦長スラッシュ */}
            <span className="
              absolute 
              -left-8
              top-[150%]
              bottom-[-150%]
              text-4xl
              leading-[0.7]
              transform
              scale-y-[4]
            ">
              ＼
            </span>

            {/* メインテキスト */}
            <div className="mb-2">
              あなたの受給額を
            </div>
            <div>
              今すぐチェック
            </div>

            {/* 右側の縦長スラッシュ */}
            <span className="
              absolute
              -right-8
              top-[150%]
              bottom-[-150%]
              text-4xl
              leading-[0.7]
              transform
              scale-y-[4]
            ">
              ／
            </span>
          </div>
          <div className="flex justify-center items-center gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`
                  text-5xl
                  text-[#00B900]
                  animate-bounce-arrow
                  font-black
                  transform rotate-90
                  rotate-[90deg]
                  ${i === 0 ? 'animation-delay-0' : ''}
                  ${i === 1 ? 'animation-delay-200' : ''}
                  ${i === 2 ? 'animation-delay-400' : ''}
                `}
                style={{ writingMode: 'vertical-rl' }}
              >
                ≫
              </div>
            ))}
          </div>
        </div>

        {/* Slot Machine Button */}
        <div className="flex justify-center mb-16">
          <button
            onClick={spinSlots}
            disabled={isSpinning}
            className="
              w-full max-w-[800px]
              relative
              group
              transform
              hover:scale-[1.02]
              active:scale-[0.98]
              transition-all
              duration-300
            "
          >
            {/* Outer Glow and Border Effects - 静なエフェクトに変更 */}
            <div className="absolute -inset-[2px] bg-gradient-to-r from-[#00B900] via-yellow-300 to-[#00B900] rounded-[1.7rem] opacity-50"></div>

            {/* Corner Decorations */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`
                  absolute w-8 h-8 border-2 border-[#00B900] bg-white
                  ${i === 0 ? '-top-2 -left-2 rounded-tl-xl' : ''}
                  ${i === 1 ? '-top-2 -right-2 rounded-tr-xl' : ''}
                  ${i === 2 ? '-bottom-2 -left-2 rounded-bl-xl' : ''}
                  ${i === 3 ? '-bottom-2 -right-2 rounded-br-xl' : ''}
                  transform group-hover:scale-110 transition-transform duration-300
                `}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00B900]/20 to-transparent"></div>
              </div>
            ))}

            {/* Main Container */}
            <div className="
              relative
              bg-gradient-to-b from-[#00B900] via-[#00B900] to-[#009900]
              rounded-[1.618rem]
              px-[2rem] py-[1.2rem]
              shadow-[0_1.618rem_3.236rem_rgba(0,185,0,0.3)]
              overflow-hidden
              isolation
              border-4 border-white
            ">
              {/* Dynamic Stripe Pattern */}
              <div className="
                absolute inset-0
                bg-[repeating-linear-gradient(45deg,transparent,transparent_40px,rgba(255,255,255,0.1)_40px,rgba(255,255,255,0.1)_80px)]
                animate-stripe-fast
                mix-blend-overlay
              "></div>

              {/* Floating Particles Effect */}
              <div className="particle-container absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="particle absolute bg-white/30 rounded-full"
                    style={{
                      width: Math.random() * 10 + 'px',
                      height: Math.random() * 10 + 'px',
                      left: Math.random() * 100 + '%',
                      top: Math.random() * 100 + '%',
                      animation: `float ${Math.random() * 3 + 2}s linear infinite`
                    }}
                  ></div>
                ))}
              </div>

              {/* Enhanced Slot Machine */}
              <div className="mt-8 mb-4">
                <div className="
                  flex gap-4 justify-center items-center
                  bg-gradient-to-b from-black via-gray-900 to-black
                  p-6
                  rounded-xl
                  shadow-inner
                  border border-[#00B900]/30
                ">
                  {slots.map((slot, index) => (
                    <div
                      key={index}
                      className="w-20 h-16 bg-black rounded-md overflow-hidden relative"
                    >
                      <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black to-transparent z-10"></div>
                      <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black to-transparent z-10"></div>
                      <div className="absolute inset-0 border-2 border-[#00B900] rounded-md shadow-[inset_0_0_10px_#00B900] z-20"></div>
                      <div className="relative h-full flex items-center justify-center">
                        <span className={`
                          text-4xl font-bold font-digital text-white
                          ${(isSpinning || isAutoSpinning) ? 'animate-digital-change' : ''}
                          ${glowEffect ? 'shadow-[0_0_10px_#00B900]' : ''}
                        `}>
                          {slot}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="text-3xl font-bold text-white ml-2">万円</div>
                </div>
              </div>

              {/* Premium Button Area */}
              <div className="
                bg-white
                rounded-xl
                p-4
                relative
                z-10
                group-hover:shadow-2xl
                transition-all
                duration-500
                overflow-hidden
              ">
                {/* Decorative Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00B900]/5 to-transparent group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-50"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_45%,rgba(0,185,0,0.03)_100%)]"></div>

                {/* Hover Light Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

                {/* Corner Decorations */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#00B900]/30 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#00B900]/30 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#00B900]/30 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#00B900]/30 rounded-br-lg"></div>

                {/* Start Button Content */}
                <div className="
                  relative
                  flex
                  items-center
                  justify-center
                  gap-3
                  px-8
                  py-4
                  z-20
                ">
                  {/* Main Text Container */}
                  <div className="
                    relative
                    flex
                    items-center
                    gap-4
                    group/text
                  ">
                    {/* Text Highlight Effect */}
                    <div className="
                      absolute
                      -inset-x-4
                      -inset-y-2
                      bg-gradient-to-r
                      from-transparent
                      via-[#00B900]/5
                      to-transparent
                      rounded-full
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity
                      duration-500
                    "></div>

                    {/* Main Text */}
                    <span className="
                      relative
                      text-3xl
                      font-black
                      tracking-wide
                      bg-gradient-to-b
                      from-[#00B900]
                      to-[#009900]
                      text-transparent
                      bg-clip-text
                      group-hover:tracking-wider
                      transition-all
                      duration-300
                      z-10
                      [text-shadow:0_2px_4px_rgba(0,185,0,0.2)]
                    ">
                      スタート
                    </span>

                    {/* Arrow Icon with Enhanced Animation */}
                    <span className="
                      relative
                      text-4xl
                      font-black
                      text-[#00B900]
                      transform
                      group-hover:translate-x-2
                      transition-transform
                      duration-300
                      flex
                      items-center
                      animate-pulse-subtle
                      after:content-['']
                      after:absolute
                      after:inset-0
                      after:bg-gradient-to-r
                      after:from-transparent
                      after:via-[#00B900]/10
                      after:to-transparent
                      after:opacity-0
                      after:group-hover:opacity-100
                      after:transition-opacity
                      after:duration-300
                    ">
                      ≫
                    </span>
                  </div>
                </div>

                {/* Interactive Border Effect */}
                <div className="absolute inset-0 border border-[#00B900]/20 rounded-xl group-hover:border-[#00B900]/40 transition-colors duration-300"></div>
                <div className="absolute inset-[1px] border border-[#00B900]/10 rounded-xl group-hover:border-[#00B900]/20 transition-colors duration-300"></div>

                {/* Pulse Effect on Hover */}
                <div className="
                  absolute
                  inset-0
                  bg-[#00B900]/5
                  rounded-xl
                  opacity-0
                  group-hover:opacity-100
                  group-hover:animate-pulse
                  transition-opacity
                  duration-300
                "></div>
              </div>
            </div>
          </button>
        </div>

        <FeatureCards />
        <TimelineSection />
        <SecurityPoints />
        <StepsSection />
        <TestimonialsSection />
        <CaseStudy />
        <EligibilitySection />
        <ConcernsSection />
      </div>
    </main>
  );
} 