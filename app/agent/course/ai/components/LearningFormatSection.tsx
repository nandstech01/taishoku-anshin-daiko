import React from 'react';
import { FaLaptopCode } from 'react-icons/fa';
import { SiZoom } from 'react-icons/si';

export default function LearningFormatSection() {
  return (
    <section id="learning-format" className="w-full max-w-5xl mx-auto px-4 py-12 sm:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">学習の進め方</h2>
      <div className="bg-white rounded-xl shadow-lg p-5 sm:p-8 mb-8 sm:mb-12">
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 text-center">
          本コースは、合計<span className="text-indigo-600 font-bold text-lg sm:text-xl">約10時間</span>の学習コンテンツを、<br className="sm:hidden"/>柔軟なスタイルで学べるように構成されています。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
          <div className="bg-blue-50 rounded-xl p-5 sm:p-6 border border-blue-100">
            <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-3 sm:mb-4 flex items-center">
              <FaLaptopCode className="mr-2 sm:mr-3 text-blue-600 text-xl sm:text-2xl flex-shrink-0"/>
              eラーニング（約6時間）
            </h3>
            <ul className="list-disc pl-5 sm:pl-6 text-gray-700 space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li>好きな時間に自分のペースで視聴できる動画講義</li>
              <li>図解豊富なスライド資料（ダウンロード可）</li>
              <li>理解度を確認できる小テスト</li>
              <li>AIの基本、歴史、事例など知識のインプット中心</li>
            </ul>
          </div>
          <div className="bg-green-50 rounded-xl p-5 sm:p-6 border border-green-100">
            <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-3 sm:mb-4 flex items-center">
              <SiZoom className="mr-2 sm:mr-3 text-green-600 text-xl sm:text-2xl flex-shrink-0"/>
              ライブ講義/Q&Aセッション（約4時間）
            </h3>
            <ul className="list-disc pl-5 sm:pl-6 text-gray-700 space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li>講師によるリアルタイム解説と質疑応答</li>
              <li>eラーニングの内容を深掘りする応用解説</li>
              <li>参加者同士で意見交換できるワークショップ形式（任意参加）</li>
              <li>具体的なAI活用法や疑問点を直接質問できる</li>
            </ul>
          </div>
        </div>
        <p className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-gray-600">
          eラーニングはいつでもアクセス可能。ライブセッションは定期的に開催され、アーカイブ視聴も可能です。
        </p>
      </div>
    </section>
  );
} 