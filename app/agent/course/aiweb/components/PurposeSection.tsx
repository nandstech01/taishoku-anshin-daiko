import React from 'react';
import { HiLightningBolt, HiClock, HiUserGroup, HiCash } from 'react-icons/hi';

export default function PurposeSection() {
  return (
    <section className="w-full py-16 sm:py-20 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 leading-tight text-gray-800 text-center">
          このコースの目的
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <div className="flex items-start mb-4">
              <div className="bg-green-100 p-3 rounded-md mr-4">
                <HiLightningBolt className="text-2xl text-green-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">AIツールを活用した効率的な制作フローの確立</h3>
            </div>
            <ul className="ml-12 space-y-2 text-gray-700 list-disc">
              <li>ChatGPT等のAIサービスを活用してライティング工程やリライト工程を効率化</li>
              <li>AIツールの具体的な活用事例と実践的なノウハウを学ぶ</li>
              <li>コンテンツ品質を維持しながら作業時間を大幅削減</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <div className="flex items-start mb-4">
              <div className="bg-blue-100 p-3 rounded-md mr-4">
                <HiUserGroup className="text-2xl text-blue-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">解析ツールを用いたキーワード選定とペルソナ設計</h3>
            </div>
            <ul className="ml-12 space-y-2 text-gray-700 list-disc">
              <li>検索ニーズを正確に捉えるためのキーワード分析手法を習得</li>
              <li>ターゲットのペルソナに合ったコンテンツ企画を行う</li>
              <li>集客・読者満足度を高めるSEO対策とコンテンツ設計</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <div className="flex items-start mb-4">
              <div className="bg-purple-100 p-3 rounded-md mr-4">
                <HiClock className="text-2xl text-purple-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">リライト技術とコンテンツ評価指標の理解</h3>
            </div>
            <ul className="ml-12 space-y-2 text-gray-700 list-disc">
              <li>記事のクオリティを維持・向上させるためのリライト手順やチェックポイントを学ぶ</li>
              <li>WEB解析ツールを活用し、コンテンツの効果測定とPDCAサイクルを実行</li>
              <li>一貫性のあるブランドボイスを維持するための編集ガイドライン</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <div className="flex items-start mb-4">
              <div className="bg-yellow-100 p-3 rounded-md mr-4">
                <HiCash className="text-2xl text-yellow-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">スキルアップでキャリアの幅を広げる</h3>
            </div>
            <ul className="ml-12 space-y-2 text-gray-700 list-disc">
              <li>AI活用・コンテンツ制作のスキルを身につけ、専門性を高める</li>
              <li>実践的な手法を学び、即戦力となる技術を習得</li>
              <li>業務効率化により、より創造的な企画立案に時間を使えるようになる</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
} 