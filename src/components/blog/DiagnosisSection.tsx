"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Users, Star, MessageCircle } from 'lucide-react';

const Modal = dynamic(() => import('../Modal'), { ssr: false });
const MultiStepQuestions = dynamic(() => import('../MultiStepQuestions'), { ssr: false });

export default function DiagnosisSection() {
  const [showDiagnosisModal, setShowDiagnosisModal] = useState(false);

  return (
    <div className="mt-12 relative bg-gradient-to-br from-blue-50/80 to-white/90 backdrop-blur-sm shadow-sm">
      <div className="relative">
        {/* 背景パターン */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/10 mix-blend-overlay"></div>
        
        {/* 背景画像 */}
        <div className="absolute inset-0 opacity-10 z-0">
          <Image
            src="/images/diagnosis-bg.jpg"
            alt="診断背景"
            layout="fill"
            objectFit="cover"
            quality={85}
          />
        </div>
        
        <div className="relative z-10 p-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* 左側：イラストと説明 */}
            <div className="w-full md:w-1/2 -mt-4">
              <div className="relative w-full pt-[100%]">
                <Image
                  src="/images/diagnosis/ai-diagnosis-square.png"
                  alt="AI診断"
                  fill
                  style={{ objectFit: 'cover' }}
                  quality={100}
                  priority
                  className="absolute top-0 left-0"
                />
              </div>
            </div>

            {/* 右側：テキストとボタン */}
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                総合退職後診断で<br />あなたの可能性を発見
              </h2>
              
              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed">
                  24問の簡単な質問であなたの性格特性や職業興味、
                  退職理由を分析。パーソナリティと職業適性の両面から、
                  あなたの新しいキャリアへの一歩をサポートします。
                </p>
                
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span>所要時間 約5分</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-blue-500" />
                    <span>AIによる詳細分析</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-blue-500" />
                    <span>具体的アドバイス</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowDiagnosisModal(true)}
                className="mt-6 w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                無料で診断を受ける
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 診断モーダル */}
      {showDiagnosisModal && (
        <Modal onClose={() => setShowDiagnosisModal(false)}>
          <MultiStepQuestions onClose={() => setShowDiagnosisModal(false)} />
        </Modal>
      )}
    </div>
  );
} 