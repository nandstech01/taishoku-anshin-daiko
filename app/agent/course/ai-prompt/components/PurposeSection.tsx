import React from 'react';
import { HiLightningBolt, HiCog, HiChartBar, HiUserGroup } from 'react-icons/hi';

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
              <div className="bg-purple-100 p-3 rounded-md mr-4">
                <HiLightningBolt className="text-2xl text-purple-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">AIモデルの選択と統合を理解する</h3>
            </div>
            <ul className="ml-12 space-y-2 text-gray-700 list-disc">
              <li>目的や課題に応じて最適なAIモデル（ChatGPTなど大規模言語モデル、画像認識モデル等）を選定</li>
              <li>外部APIの活用や既存システムとの連携イメージを持ち、効率化や新規プロジェクト創出を目指す</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <div className="flex items-start mb-4">
              <div className="bg-blue-100 p-3 rounded-md mr-4">
                <HiCog className="text-2xl text-blue-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">実務で役立つプロンプト設計の習得</h3>
            </div>
            <ul className="ml-12 space-y-2 text-gray-700 list-disc">
              <li>AIに的確な指示を出すための「プロンプト最適化技術」を学習</li>
              <li>生成AIを用いた市場分析、ペルソナ設定、競合分析、SEOコンテンツなどの実践プロセスを習得</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <div className="flex items-start mb-4">
              <div className="bg-green-100 p-3 rounded-md mr-4">
                <HiChartBar className="text-2xl text-green-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">業務改善・成果への応用</h3>
            </div>
            <ul className="ml-12 space-y-2 text-gray-700 list-disc">
              <li>AIを活用したデータ分析やレポート作成、戦略立案に役立つ具体的なユースケースを提示</li>
              <li>自身の課題を洗い出し、効率化やプロジェクト改善を実現するシナリオ策定</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <div className="flex items-start mb-4">
              <div className="bg-yellow-100 p-3 rounded-md mr-4">
                <HiUserGroup className="text-2xl text-yellow-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">スキルアップでキャリアの幅を広げる</h3>
            </div>
            <ul className="ml-12 space-y-2 text-gray-700 list-disc">
              <li>周囲にAI活用の魅力やノウハウを伝えられるスキルを習得</li>
              <li>フリーランスや副業、キャリアアップに活かせる実践的なスキルを身につける</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
} 