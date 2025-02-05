"use client";
// @ts-nocheck

/*******************************************************************************
 * NandsConfidenceSection.tsx
 * 
 * 「NANDSならあんしん」セクション
 * - FeaturesSectionの次に挟む想定
 * - AI特化・安さの理由・会社の実績を短めにまとめ、強い信頼感を与える
 * - デザインを極め散らかし、他の追随を許さない表現
 ******************************************************************************/

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Users, Award, ShieldCheck } from "lucide-react";

/***************************************************************************
 * NandsConfidenceSection
 *   - メインコンポーネント
 ***************************************************************************/
export default function NandsConfidenceSection() {
  return (
    <section className="relative w-full min-h-[700px] overflow-hidden bg-white">
      {/* 装飾的な背景パターン */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.01] via-transparent to-orange-500/[0.01]" />
      </div>

      {/* 装飾的な円形と企業証明風の装飾 */}
      <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-blue-200/5 to-orange-200/5 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-gradient-to-tl from-orange-200/5 to-blue-200/5 blur-3xl" />
      
      {/* 企業証明風の装飾的な枠 */}
      <div className="absolute inset-8 border-[1px] border-blue-200/30 rounded-2xl" />
      <div className="absolute inset-7 border-[1px] border-orange-200/20 rounded-2xl" />
      <div className="absolute top-6 left-1/2 -translate-x-1/2 px-8 py-1.5 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full whitespace-nowrap">
        <div className="text-white text-xs md:text-sm font-bold tracking-wider">IT × 人材支援のプロフェッショナル</div>
      </div>

      {/* メインコンテンツ */}
      <div className="relative container mx-auto py-20 md:py-28 px-4 flex flex-col items-center justify-center">
        <motion.h2
          className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent text-center max-w-2xl mx-auto relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          NANDSだからこそ、<br/> 2,980円でも安心
        </motion.h2>

        <motion.p
          className="text-gray-600 text-center text-lg mt-4 max-w-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="md:hidden">
            AI分野に特化したノウハウと<br/>
            徹底したコスト削減<br/><br/>
            豊富な法務・労務の連携体制により<br/>
            どこよりも安心して任せられます。
          </span>
          <span className="hidden md:inline">
            AI分野に特化したノウハウと徹底したコスト削減、<br/>
            そして豊富な法務・労務の連携体制があるから<br/>
            どこよりも安心して任せられます。
          </span>
        </motion.p>

        {/* 会社の強みリスト */}
        <CompanyStrengthList />

        {/* CTA */}
        <motion.div
          className="mt-12 text-center relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 via-transparent to-blue-200/20 blur-xl" />
          <a
            href="https://nands.tech/" 
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/10"
          >
            会社概要をもっと見る
          </a>
        </motion.div>

        {/* 装飾的な角の飾り */}
        <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-blue-400/30" />
        <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-blue-400/30" />
        <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-blue-400/30" />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-blue-400/30" />
      </div>
    </section>
  );
}

/***************************************************************************
 * CompanyStrengthList
 *   - 当社が信頼できる理由を端的に
 ***************************************************************************/
function CompanyStrengthList() {
  const strengths = [
    {
      icon: <Cpu className="w-6 h-6 text-blue-500" />,
      title: "AI特化の独自ノウハウ",
      desc: "2008年創業から培った技術力に加え、独自のAI活用により人件費＆広告費を大幅カット。"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
      title: "労務・法務連携",
      desc: "弁護士・社労士との連携で万全のサポート体制。万が一の場合もすぐ対応。"
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: "実績多数",
      desc: "多くの個人・法人のキャリア支援、退職代行を成功。顧客満足度98％以上。"
    },
    {
      icon: <Award className="w-6 h-6 text-blue-500" />,
      title: "創業から15年超",
      desc: "2008年からIT・人材支援事業を手がけ、着実に信頼を積み上げてきました。"
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 max-w-4xl mx-auto relative z-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {strengths.map((s, i) => (
        <motion.div
          key={i}
          className="relative bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100/50 overflow-hidden group"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/50 to-white opacity-20 group-hover:opacity-30 transition-opacity duration-300 -z-10" />
          <div className="flex items-center space-x-3 mb-4">
            {s.icon}
            <h4 className="text-lg font-bold text-gray-800">{s.title}</h4>
          </div>
          <p className="text-gray-600">{s.desc}</p>
          {/* 装飾的な角の装飾 */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-blue-200" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-blue-200" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-blue-200" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-blue-200" />
        </motion.div>
      ))}
    </motion.div>
  );
} 