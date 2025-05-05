import React from 'react';
import { HiAcademicCap, HiVideoCamera, HiUserGroup, HiCheckCircle } from 'react-icons/hi';

export default function LearningFormatSection() {
  return (
    <section className="w-full py-16 sm:py-20 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 leading-tight text-gray-800 text-center">
          総学習時間と実施形式
        </h2>
        <p className="text-center text-lg text-gray-600 mb-12">
          本コースは合計10時間で、以下の2つの形式に分割して実施します。
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-600 py-4 px-6">
              <div className="flex items-center">
                <HiVideoCamera className="text-3xl text-white mr-3" />
                <h3 className="text-xl font-bold text-white">eラーニング</h3>
              </div>
              <p className="text-blue-100 mt-2">合計6時間</p>
            </div>
            
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <HiCheckCircle className="text-blue-500 text-xl flex-shrink-0 mt-0.5 mr-3" />
                  <span className="text-gray-700">動画講義・スライド・確認テストを使い、自分のペースで学習</span>
                </li>
                <li className="flex items-start">
                  <HiCheckCircle className="text-blue-500 text-xl flex-shrink-0 mt-0.5 mr-3" />
                  <span className="text-gray-700">AIモデルの仕組み・プロンプト設計理論・実装／運用イメージなどを理論的にインプット</span>
                </li>
              </ul>
              
              <div className="mt-6 bg-blue-50 p-4 rounded-md">
                <h4 className="font-semibold text-gray-800 mb-2">主な学習項目</h4>
                <ul className="space-y-1 text-sm text-gray-700 list-disc ml-5">
                  <li>AIモデル概論・生成AIの最新動向</li>
                  <li>プロンプトエンジニアリングの基礎</li>
                  <li>AIモデルの選択と業務統合</li>
                  <li>ビジネス分析における生成AI活用</li>
                  <li>プロンプト最適化の応用事例とリスク管理</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-green-600 py-4 px-6">
              <div className="flex items-center">
                <HiUserGroup className="text-3xl text-white mr-3" />
                <h3 className="text-xl font-bold text-white">Zoomオンライン講義</h3>
              </div>
              <p className="text-green-100 mt-2">合計4時間</p>
            </div>
            
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <HiCheckCircle className="text-green-500 text-xl flex-shrink-0 mt-0.5 mr-3" />
                  <span className="text-gray-700">講師とのリアルタイムなコミュニケーションや演習を通じ、実務シミュレーションを実施</span>
                </li>
                <li className="flex items-start">
                  <HiCheckCircle className="text-green-500 text-xl flex-shrink-0 mt-0.5 mr-3" />
                  <span className="text-gray-700">企業固有の課題やユースケースを共有し合い、ビジネス成果へ展開するヒントを得る</span>
                </li>
              </ul>
              
              <div className="mt-6 bg-green-50 p-4 rounded-md">
                <h4 className="font-semibold text-gray-800 mb-2">主な講義内容</h4>
                <ul className="space-y-1 text-sm text-gray-700 list-disc ml-5">
                  <li>プロンプトエンジニアリングの応用とQ&A</li>
                  <li>ビジネスケーススタディと演習</li>
                  <li>業務改善・DX推進計画の立案</li>
                  <li>グループディスカッションと成果発表</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center bg-purple-100 px-4 py-2 rounded-full">
            <HiAcademicCap className="text-2xl text-purple-700 mr-2" />
            <span className="text-purple-800 font-medium">学習ゴール</span>
          </div>
          
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-purple-500">
              <h4 className="font-bold text-gray-800 mb-2">最適なAIモデルの選定とシステム統合方法を把握</h4>
              <p className="text-gray-600 text-sm">ChatGPTなど大規模言語モデルを中心に、画像・音声認識モデルなどの仕組みを理解</p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-purple-500">
              <h4 className="font-bold text-gray-800 mb-2">プロンプト設計・最適化スキルを習得</h4>
              <p className="text-gray-600 text-sm">AIへの指示を的確に行い、期待する出力を得るためのテクニックを修得</p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-purple-500">
              <h4 className="font-bold text-gray-800 mb-2">生成AIを活用したビジネス分析・戦略立案の体験</h4>
              <p className="text-gray-600 text-sm">市場分析・競合分析・ペルソナ設定・SEOコンテンツ制作など多岐にわたるユースケース</p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-purple-500">
              <h4 className="font-bold text-gray-800 mb-2">業務改善・DX推進へ展開する実務力を養成</h4>
              <p className="text-gray-600 text-sm">部署全体や企業全体に生成AI活用を広げる際のポイント・体制づくり・リスク管理を把握</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 