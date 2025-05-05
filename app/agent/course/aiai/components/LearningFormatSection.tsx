import React from 'react';
import { FaLaptopCode, FaChalkboardTeacher } from 'react-icons/fa';

export default function LearningFormatSection() {
  return (
    <section id="learning-format" className="w-full max-w-5xl mx-auto px-4 py-12 sm:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">総学習時間と実施形式</h2>
      
      <div className="bg-white rounded-xl shadow-lg p-5 sm:p-8 mb-8 sm:mb-12">
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 text-center">
          本コースは、合計<span className="text-indigo-600 font-bold text-lg sm:text-xl">10時間以上</span>の研修を以下の2形態で提供します。
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
          <div className="bg-blue-50 rounded-xl p-4 sm:p-6 border border-blue-100">
            <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-3 sm:mb-4 flex flex-wrap items-center">
              <span className="bg-blue-600 text-white rounded-full w-7 h-7 sm:w-8 sm:h-8 inline-flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">1</span>
              <span>eラーニング（6時間）</span>
            </h3>
            <ul className="list-disc pl-5 sm:pl-6 text-gray-700 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li>ウェブ上で視聴できる動画講義・スライド・<wbr/>資料ダウンロード・確認テスト</li>
              <li>自分のペースで学べ、<wbr/>隙間時間を活用しやすい</li>
              <li>インプット中心：Next.js基礎、<wbr/>Python文法、AIエージェント連携など</li>
            </ul>
          </div>
          <div className="bg-green-50 rounded-xl p-4 sm:p-6 border border-green-100">
            <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-3 sm:mb-4 flex flex-wrap items-center">
              <span className="bg-green-600 text-white rounded-full w-7 h-7 sm:w-8 sm:h-8 inline-flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">2</span>
              <span>メンタリング＆ハンズオン（4時間）</span>
            </h3>
            <ul className="list-disc pl-5 sm:pl-6 text-gray-700 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li>講師がリアルタイムに解説・<wbr/>個別フィードバック</li>
              <li>eラーニング内容を踏まえ、<wbr/>実践的な開発スキルを習得</li>
              <li>アウトプット中心：エラー解決、<wbr/>コードレビュー、質疑応答</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
} 