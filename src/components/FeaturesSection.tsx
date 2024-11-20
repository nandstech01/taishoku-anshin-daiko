'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Building2, CheckCircle, HeartPulse, Banknote, Users, Sparkles, Scale, Building } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function FeaturesSection() {
  const troubles = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "プライバシーの心配",
      items: [
        "退職代行に依頼したのがバレたくない",
        "親とか同僚に迷惑をかけたくない",
        "退職後に会社とのやりとりが不安"
      ],
      solution: "完全秘密厳守で対応。情報漏洩は一切ありません。会社とのやりとりも全て前に立ち、会社には一切連絡しなくても大丈夫です"
    },
    {
      icon: <Banknote className="w-8 h-8" />,
      title: "給与に関する不満",
      items: [
        "残業代が全く支払われていない",
        "約束された給与より大幅に少ない",
        "昇給の見込みが全くない"
      ],
      solution: "未払い残業代の請求も可能。法サポート付き。"
    },
    {
      icon: <HeartPulse className="w-8 h-8" />,
      title: "職場環境の問題",
      items: [
        "上司からのパワハラで精神的に限界",
        "退職を言い出せない雰囲気がある",
        "毎日の残業で体調を崩している"
      ],
      solution: "即日対応可能。あなたの健康が最優先です。"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "キャリアの悩み",
      items: [
        "もっと高い給与で働きたい",
        "退職を申し出たら脅された",
        "転職で年収を上げたい"
      ],
      solution: "退職後のキャリアプランニングまでサポート。"
    }
  ];

  // キラキラエフェクトの位置を固定値で定義
  const sparklePositions = [
    { top: '20%', left: '10%' },
    { top: '30%', left: '80%' },
    { top: '50%', left: '20%' },
    { top: '70%', left: '90%' },
    { top: '40%', left: '50%' },
    { top: '60%', left: '30%' },
    { top: '80%', left: '70%' },
    { top: '90%', left: '40%' },
    { top: '25%', left: '60%' },
    { top: '75%', left: '15%' }
  ];

  return (
    <section id="features" className="py-20 relative overflow-hidden" style={{ backgroundImage: "url('/images/background-pattern.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50 opacity-90"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* メインビジュアル - あんしんメッセージ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-24"
        >
          {/* 背景の装飾レイヤー */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-amber-600/10 rounded-3xl transform -rotate-1" />
          <div className="absolute inset-0 bg-gradient-to-l from-orange-600/10 to-amber-600/10 rounded-3xl transform rotate-1" />
          
          {/* メインカード */}
          <motion.div
            className="relative bg-white backdrop-blur-lg rounded-3xl border border-orange-100 shadow-[0_0_50px_rgba(251,146,60,0.2)] overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* 装飾的な背景アニメーション */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,146,60,0.1),transparent_50%)]" />
            <motion.div
              animate={{
                background: [
                  'radial-gradient(circle at 0% 0%, rgba(251,146,60,0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 100% 100%, rgba(251,146,60,0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 0% 0%, rgba(251,146,60,0.1) 0%, transparent 50%)'
                ]
              }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute inset-0"
            />

            {/* キラキラエフェクト */}
            <div className="absolute top-0 left-0 w-full h-full">
              {sparklePositions.map((position, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-orange-400/30 rounded-full"
                  style={{
                    top: position.top,
                    left: position.left,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* コンテンツ */}
            <div className="relative p-12">
              <div className="text-center max-w-3xl mx-auto">
                {/* シールドアイコンのアニメーション */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotateY: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  <Shield className="w-24 h-24 text-orange-500 mx-auto mb-6" />
                </motion.div>

                {/* タイトル */}
                <div className="relative">
                  <motion.h2
                    className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent"
                    animate={{ 
                      textShadow: [
                        "0 0 20px rgba(251,146,60,0.2)",
                        "0 0 40px rgba(251,146,60,0.4)",
                        "0 0 20px rgba(251,146,60,0.2)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    あんしんしてください
                  </motion.h2>
                </div>

                {/* サブテキスト */}
                <motion.p
                  className="text-xl text-gray-600 mb-8 relative z-10"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  そんな方のための<br />
                  退職代行サービスです
                </motion.p>

                {/* 絶対安心できる理由 - 追加 */}
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-2xl md:text-3xl font-bold mb-8 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent"
                >
                  絶対安心できる理由
                </motion.h3>

                {/* 特徴ボックス */}
                <div className="flex flex-col space-y-6 max-w-2xl mx-auto">
                  {/* 弁護士・労働組合のボックス */}
                  <div className="flex flex-col md:flex-row justify-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05, rotateX: 10 }}
                      className="flex-1 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg shadow-lg border border-orange-400/20 backdrop-blur-sm transform perspective-1000"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Scale className="w-5 h-5" />
                        <span className="font-bold">弁護士</span>
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05, rotateX: 10 }}
                      className="flex-1 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg shadow-lg border border-orange-400/20 backdrop-blur-sm transform perspective-1000"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Building className="w-5 h-5" />
                        <span className="font-bold">労働組合</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* ダブル対応の説明 */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.03 }}
                    className="text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white p-4 rounded-xl shadow-lg"
                  >
                    <motion.p
                      animate={{ 
                        textShadow: [
                          "0 0 10px rgba(255,255,255,0.5)",
                          "0 0 20px rgba(255,255,255,0.7)",
                          "0 0 10px rgba(255,255,255,0.5)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="font-bold text-lg"
                    >
                      ダブル対応可能だから<br />
                      万一のトラブルにも安心
                    </motion.p>
                  </motion.div>

                  {/* 価格表示を<a>タグでラップ */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative"
                  >
                    <motion.a
                      href="https://lin.ee/h1kk42r"
                      target="_blank"
                      rel="noopener noreferrer"
                      animate={{
                        scale: [1, 1.05, 1],
                        boxShadow: [
                          "0 0 20px rgba(251,146,60,0.3)",
                          "0 0 40px rgba(251,146,60,0.5)",
                          "0 0 20px rgba(251,146,60,0.3)"
                        ]
                      }}
                      whileHover={{ scale: 1.05 }}  // ホバーエフェクトを追加
                      transition={{ duration: 2, repeat: Infinity }}
                      className="block bg-white text-center p-6 rounded-2xl border-2 border-orange-500 cursor-pointer"
                    >
                      <motion.p
                        className="text-gray-700 font-bold mb-2"
                      >
                        安心価格 業界最安値の
                      </motion.p>
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          color: [
                            "rgb(234,88,12)",
                            "rgb(251,146,60)",
                            "rgb(234,88,12)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-4xl font-bold"
                      >
                        2,980円<span className="text-xl">(税込)</span>
                      </motion.div>
                      <motion.p
                        className="text-gray-700 font-bold mt-2"
                      >
                        のみ
                      </motion.p>
                    </motion.a>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 悩みと解決策セクション */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {troubles.map((trouble, index) => (
            <motion.div
              key={trouble.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(251,146,60,0.25)"
              }}
              className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-orange-100 overflow-hidden group"
            >
              {/* デコレーティブな背景アニメーション */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5"
              />
              
              <div className="relative">
                <div className="flex items-center space-x-4 mb-6">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="text-orange-500 p-2 bg-orange-100 rounded-xl"
                  >
                    {trouble.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-800">{trouble.title}</h3>
                </div>
                
                <ul className="space-y-4 mb-6">
                  {trouble.items.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + (i * 0.1) }}
                      className="flex items-start space-x-3 group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        className="flex-shrink-0"
                      >
                        <CheckCircle className="w-5 h-5 text-orange-500 mt-1" />
                      </motion.div>
                      <span className="text-gray-600 group-hover:text-gray-900 transition-colors">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-10 rounded-xl transform -rotate-1" />
                  <div className="relative bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-100">
                    <p className="text-gray-800 font-medium">
                      <span className="text-orange-500 font-bold">解決策：</span> {trouble.solution}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* フッターメッセージ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-10 rounded-3xl transform rotate-1" />
          <div className="absolute inset-0 bg-gradient-to-l from-orange-500 to-amber-500 opacity-10 rounded-3xl transform -rotate-1" />
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-2xl p-10 shadow-2xl overflow-hidden"
          >
            <motion.div
              animate={{
                y: [-10, 10, -10],
                rotate: [-5, 5, -5]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute top-4 right-4"
            >
              <Sparkles className="w-12 h-12 opacity-50" />
            </motion.div>
            
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              新しい一歩を
            </h3>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              一緒に歩み出しましょう
            </h3>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              あなたの状況に合わせた最適な解決策をご提案いたします。
            </p>
            <motion.a
              href="#consultation-form"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-orange-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('consultation-form');
                if (element) {
                  element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                  });
                }
              }}
            >
              まずは無料相談から
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}