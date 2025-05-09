"use client";

import Link from 'next/link';
import Header from '../../src/components/common/Header';
import Footer from '../../src/components/common/Footer';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function CanceledPage() {
  return (
    <>
      <Header />
      <main className="bg-gray-50 py-16 min-h-screen">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg"
          >
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">お支払いがキャンセルされました</h1>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-amber-800 mb-3">安心してください</h2>
              <p className="text-gray-700 mb-4">
                お支払い手続きはキャンセルされました。お客様のカードには請求されていません。
              </p>
              <p className="text-gray-700">
                ご質問がある場合は、お気軽にお問い合わせください。
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-3">お役立ち情報</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>お支払いに問題がある場合は、別の支払い方法をお試しいただけます</li>
                <li>カード情報の入力時に誤りがないかご確認ください</li>
                <li>当サービスについてさらに詳しく知りたい場合は、FAQをご確認ください</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors">
                <ArrowLeft size={18} />
                ホームに戻る
              </Link>
              <Link 
                href="https://lin.ee/h1kk42r" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle-heart"><path d="M7.9 20A9 9 0 0 0 12 21.7a9.3 9.3 0 0 0 4.1-1.1"/><path d="M12 21.7C5.4 21.7 1.9 16.9 1.9 10.2S5.4 2 12 2c6.6 0 10.1 4.8 10.1 8.2 0 2.2-1.1 4.2-2.9 5.6"/><path d="M15.8 15.2a2.5 2.5 0 0 0-3.5 0l-.3.4-.3-.4a2.5 2.5 0 0 0-3.5 0c-.9.8-1 2.2-.2 3.2l3.8 4 3.8-4c.9-1 .7-2.4-.2-3.2Z"/></svg>
                ラインでお問い合わせ
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
} 