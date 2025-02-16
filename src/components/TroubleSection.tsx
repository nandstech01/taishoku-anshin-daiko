"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

/******************************************************************************
 * Export default: TroubleSection
 *  - 全面刷新した、トラブルお悩みセクション
 ******************************************************************************/
export default function TroubleSection() {
  return (
    <section id="troubles" className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      {/* シンプルな背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-80" />

      {/* メインコンテンツ */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <ContentWrapper />
      </div>
    </section>
  );
}

function ContentWrapper() {
  const troubles = [
    ["退職代行に依頼したのがバレたくない", "親とか同僚に迷惑をかけたくない", "退職後に会社とのやりとりが不安"],
    ["残業代請求は可能？", "引き継ぎはどうする？", "退職金はもらえる？"],
    ["上司からのパワハラで精神的に限界？", "退職を言い出せない雰囲気がある？", "もっと高い給与で働きたい？"],
    ["メンタルケアは必要？", "労働組合に相談？", "弁護士に相談すべき？"]
  ];

  return (
    <div className="max-w-4xl mx-auto text-white">
      <motion.h2 
        className="text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        ひとりで悩まないでください
        <br />
        退職を検討される方の
      </motion.h2>

      <motion.h3 
        className="text-2xl font-semibold text-center mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        よくある心配事
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {troubles.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-4">
            {group.map((trouble, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3 bg-gray-800/50 p-4 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Check className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                <span>{trouble}</span>
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      <motion.div 
        className="text-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-xl font-semibold mb-4">ひとりで悩まないでください</p>
        <p className="text-gray-300">
          経験豊富な専門アドバイザーが、あなたの状況に合わせた最適な解決策をご提案いたします
        </p>
      </motion.div>
    </div>
  );
}
