'use client';

/***********************************************************************
 * EnhancedHeroSection.tsx
 * 
 * 最適化されたコンポーネント
 * - 3D要素なし
 * - 高速表示とUXを両立
 * - PC・スマホ両方で最適化
 ***********************************************************************/

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// 診断モーダルのダイナミックインポート（遅延ロード）
const Modal = dynamic(() => import('./Modal'), { ssr: false });
const MultiStepQuestions = dynamic(() => import('./MultiStepQuestions'), { ssr: false });

// マーキーのスタイル - クリティカルCSSとして残す
const marqueeStyles = `
  .blog-marquee {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    width: 100%;
    height: 32px;
    overflow: hidden;
    background: #ff8400;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    z-index: 999;
    contain: content;
  }

  .blog-marquee-text {
    position: absolute;
    white-space: nowrap;
    will-change: transform;
    animation: marquee 25s linear infinite;
    color: #ffffff;
    font-size: 0.9rem;
    font-weight: 600;
    line-height: 32px;
    padding: 0 1rem;
    width: max-content;
    letter-spacing: 0.02em;
    transform: translateZ(0);
  }

  @keyframes marquee {
    0% { transform: translateX(100%) }
    100% { transform: translateX(-100%) }
  }
`;

// メインメッセージコンポーネント
const MainMessages = () => {
  return (
    <div className="blog-marquee">
      <h2 className="blog-marquee-text" style={{ margin: 0 }}>
        退職代行サービス 業界最安値2,980円で即日対応!!退職のノウハウから、キャリアプランまであなたの新しい一歩を、私たちがサポートします!!
      </h2>
    </div>
  );
};

// ソーシャルプルーフコンポーネント
const socialMessages = [
  "もう何の不安もありません！",
  "意外と簡単に退職できました！",
  "親身になって相談に乗ってくれました！",
  "こんなに安くて本当に助かりました！",
  "退職後の生活まで考えてくれて安心でした！",
  "すぐに対応してもらえて助かりました！",
  "上司との交渉も全て任せられて楽でした！"
];

// 初期値を設定して、APIが遅くても表示できるようにする
const INITIAL_DIAGNOSIS_COUNTS = { totalCount: 1931, recentCount: 165 };

const SocialProofSection = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [diagnosisCounts, setDiagnosisCounts] = useState(INITIAL_DIAGNOSIS_COUNTS);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    // シンプルなアニメーション
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % socialMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // APIからのデータ取得を有効化
        // すでに初期値を設定しているので、バックグラウンドで非同期に取得
        const response = await fetch('/api/diagnosis/counts', {
          cache: 'no-store',
          headers: {
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setDiagnosisCounts(data);
        setError(null);
      } catch (error) {
        console.error('[SocialProof] Error fetching diagnosis counts:', error);
        setError(error instanceof Error ? error : new Error('Failed to fetch counts'));
      }
    };

    // 初回レンダリング時にはAPIを即時実行
    fetchCounts();
    
    // 更新間隔を10分に設定
    const interval = setInterval(fetchCounts, 10 * 60 * 1000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="text-center transform -translate-y-8">
      <div className="mb-3 space-y-2">
        <div>
          <span className="text-xl font-bold text-gray-900">
            全国で {diagnosisCounts.totalCount.toLocaleString()}
          </span>
          <span className="text-sm ml-2 text-gray-900">名が退職を決意</span>
        </div>
        <div>
          <span className="text-xl font-bold text-gray-900">
            本日 {diagnosisCounts.recentCount.toLocaleString()}
          </span>
          <span className="text-sm ml-2 text-gray-900">名が退職に向けて準備中</span>
        </div>
      </div>
      <p className="text-sm md:text-base font-medium text-gray-900">
        {socialMessages[messageIndex]}
      </p>
    </div>
  );
};

// メインヒーローコンテンツ
const HeroContent = () => (
  <div className="text-white text-center max-w-4xl mx-auto px-4">
    <h1 className="text-4xl md:text-5xl font-bold mb-4">
      退職代行サービス
      <span className="block text-2xl md:text-3xl mt-2">
        業界最安値2,980円で即日対応
      </span>
    </h1>
    <p className="text-xl mt-4">
      弁護士監修・あんしん退職サポート
    </p>
    <div className="mt-8 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 justify-center">
      <button
        className="bg-white text-orange-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-100 transition-all duration-200"
        onClick={() => window.open('https://lin.ee/h1kk42r', '_blank')}
      >
        退職をはじめる
      </button>
      <button
        id="diagnosis-button"
        className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-200"
        onClick={() => {
          // ローディング状態を示すカスタムイベントを発行
          const loadingEvent = new CustomEvent('startDiagnosisLoading');
          document.dispatchEvent(loadingEvent);
          
          // 2.5秒後に診断モーダルを開くイベントを発行
          setTimeout(() => {
            const event = new CustomEvent('openDiagnosisModal');
            document.dispatchEvent(event);
          }, 2500);
        }}
      >
        AI退職適性診断
      </button>
    </div>
  </div>
);

const EnhancedHeroSection = () => {
  const [showDiagnosisModal, setShowDiagnosisModal] = useState(false);
  const [isDiagnosisLoading, setIsDiagnosisLoading] = useState(false);
  
  useEffect(() => {
    // カスタムイベントリスナーの設定
    const handleOpenDiagnosisModal = () => {
      setShowDiagnosisModal(true);
      setIsDiagnosisLoading(false); // モーダルが開いたらローディング状態を解除
    };
    
    const handleStartDiagnosisLoading = () => {
      setIsDiagnosisLoading(true);
    };
    
    document.addEventListener('openDiagnosisModal', handleOpenDiagnosisModal);
    document.addEventListener('startDiagnosisLoading', handleStartDiagnosisLoading);

    return () => {
      document.removeEventListener('openDiagnosisModal', handleOpenDiagnosisModal);
      document.removeEventListener('startDiagnosisLoading', handleStartDiagnosisLoading);
    };
  }, []);

  return (
    <>
      <style jsx>{marqueeStyles}</style>
      <style jsx global>{`
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        
        .loading-progress {
          animation: progress 2.5s ease-in-out forwards;
        }
      `}</style>
      <section
        id="hero-section"
        className="relative w-full h-screen text-white overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #ff8400 0%, #ff6b00 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          contain: "layout"
        }}
      >
        {/* メインコピー(上部) */}
        <div className="absolute inset-x-0 top-0 flex flex-col items-center pointer-events-none pt-4 z-10">
          <MainMessages />
        </div>

        {/* メインコンテンツ */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <HeroContent />
        </div>

        {/* 診断モーダル */}
        {showDiagnosisModal && (
          <Modal onClose={() => setShowDiagnosisModal(false)}>
            <MultiStepQuestions onClose={() => setShowDiagnosisModal(false)} />
          </Modal>
        )}

        {/* ローディングアニメーション */}
        {isDiagnosisLoading && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-auto shadow-2xl">
              <div className="text-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-4">
                  AIが退職適性を分析しています
                </h2>
                <p className="text-gray-600 mb-6">
                  あなたに最適な診断を準備中です...
                </p>
                
                <div className="flex justify-center mb-8">
                  <svg className="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                
                <div className="space-y-3">
                  <div className="h-1.5 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full loading-progress"></div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>データ収集</span>
                    <span>分析中</span>
                    <span>準備完了</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ソーシャルプルーフ(下部) */}
        <div className="absolute inset-x-0 bottom-5 flex flex-col items-center pointer-events-none z-10">
          <SocialProofSection />
        </div>
      </section>
    </>
  );
};

export default EnhancedHeroSection;
