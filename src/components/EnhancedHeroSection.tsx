'use client';

/***********************************************************************
 * EnhancedHeroSection.tsx
 * 
 * 最適化されたコンポーネント
 * - 3D要素なし
 * - 高速表示とUXを両立
 * - PC・スマホ両方で最適化
 ***********************************************************************/

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const EnhancedHeroSection = () => (
  <>
    <style jsx>{`
      @keyframes marquee {
        from { transform: translateX(100%); }
        to { transform: translateX(-100%); }
      }
      .marquee-animation {
        animation: marquee 20s linear infinite;
      }
    `}</style>
    <div className="fixed top-16 left-0 right-0 h-8 bg-orange-500 overflow-hidden z-50">
      <div className="relative flex overflow-x-hidden">
        <div className="marquee-animation whitespace-nowrap text-white text-sm font-semibold leading-8">
          退職代行サービス 業界最安値2,980円で即日対応!!退職のノウハウから、キャリアプランまであなたの新しい一歩を、私たちがサポートします!!&nbsp;
        </div>
        <div className="marquee-animation whitespace-nowrap text-white text-sm font-semibold leading-8" style={{ animationDelay: "-10s" }} aria-hidden="true">
          退職代行サービス 業界最安値2,980円で即日対応!!退職のノウハウから、キャリアプランまであなたの新しい一歩を、私たちがサポートします!!&nbsp;
        </div>
      </div>
    </div>
    <div className="w-full mt-24">
      <div className="relative w-full">
        {/* モバイル用の画像 */}
        <div className="md:hidden">
          <Image
            src="/images/hero/hero-bg-mobile.webp"
            alt=""
            width={1170}
            height={585}
            priority
            quality={90}
            className="w-full object-cover"
            sizes="100vw"
          />
        </div>
        {/* PC用の背景画像 - オーバーレイなしで全体表示 */}
        <div className="hidden md:block w-full h-[585px] relative overflow-hidden">
          <Image
            src="/images/hero/hero-bg-desktop.webp"
            alt=""
            fill
            priority
            quality={85}
            className="object-contain object-center"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 flex z-30">
          <div className="w-full px-8 mt-[19rem] md:pl-24 md:mt-0 md:pt-[14rem]" style={{ paddingLeft: '4rem' }}>
            <h1 className="text-xl font-bold mb-4 text-black relative md:text-black md:text-3xl">
              退職代行サービス
              <span className="block mt-2">
                <span className="block text-2xl text-black md:text-black md:text-4xl">業界最安値</span>
                <span className="block text-7xl font-bold mt-1 [color:_#ffff00] [text-shadow:_-2px_-2px_0_#ff0000,_2px_-2px_0_#ff0000,_-2px_2px_0_#ff0000,_2px_2px_0_#ff0000] md:[text-shadow:_-2px_-2px_0_#000000,_2px_-2px_0_#000000,_-2px_2px_0_#000000,_2px_2px_0_#000000] md:text-9xl">2,980円</span>
                <span className="block text-2xl mt-1 text-black md:text-black md:text-4xl">で即日対応</span>
              </span>
            </h1>
            <p className="text-sm mt-1 text-black relative md:text-lg">
              <span className="bg-red-600 text-white px-2 py-1 inline-block md:px-4 md:py-2">弁護士監修・あんしん退職サポート</span>
            </p>
          </div>
        </div>
        <div className="absolute bottom-2 left-0 right-0 z-[45] px-4 mx-auto max-w-3xl">
          <a
            href="https://lin.ee/h1kk42r"
            target="_blank"
            rel="noopener noreferrer"
            className="
              block w-full py-4 px-8
              text-center text-white text-xl font-bold
              bg-gradient-to-r from-[#ff8210] to-[#f59e0b]
              rounded-full shadow-lg
              hover:shadow-2xl hover:scale-105
              transform transition-all duration-300
              relative overflow-hidden
              md:hidden
              border-2 border-white/20
            "
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0"
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(255,130,16,0.5)',
                  '0 0 40px rgba(245,158,11,0.8)',
                  '0 0 20px rgba(255,130,16,0.5)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span className="relative flex items-center justify-center gap-2">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z"/>
              </svg>
              まずはLINEで無料相談
            </span>
          </a>
        </div>
      </div>
    </div>
  </>
);

export default EnhancedHeroSection;
