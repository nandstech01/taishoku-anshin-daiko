"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../src/components/common/Header';
import Footer from '../../src/components/common/Footer';
import { motion } from 'framer-motion';

// ローディング中のフォールバックUI
function LoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center py-12 min-h-[calc(100vh-200px)]">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-emerald-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600">読み込み中...</p>
    </div>
  );
}

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // セッションIDを使用して必要な処理を行う（オプション）
    if (sessionId) {
      console.log('Payment successful with session ID:', sessionId);
      // ここで必要に応じて追加の処理を行う
    }
    
    // ローディング状態を解除
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [sessionId]);

  return (
    <main className="bg-gray-50 py-16 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg"
        >
          {isLoading ? (
            <LoadingFallback />
          ) : (
            <>
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">お支払いが完了しました</h1>
              
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-emerald-800 mb-3">ありがとうございます！</h2>
                <p className="text-gray-700 mb-4">
                  退職あんしん代行サービスのお支払いが正常に完了しました。
                  担当者から24時間以内にLINEにてご連絡いたします。
                </p>
                <p className="text-sm text-gray-600">
                  注文番号: {sessionId ? sessionId.substring(0, 12) + '...' : 'N/A'}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-medium text-gray-800 mb-3">次のステップ</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>LINE公式アカウントからのメッセージをお待ちください</li>
                  <li>担当者から詳細なヒアリングと手続きのご案内をいたします</li>
                  <li>お客様に代わって、会社への退職意思の伝達を行います</li>
                </ol>
              </div>
              
              <div className="text-center">
                <Link href="/" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                  ホームに戻る
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <SuccessPageContent />
      </Suspense>
      <Footer />
    </>
  );
} 