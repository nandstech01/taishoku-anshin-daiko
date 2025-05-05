import React from 'react';
import { BsPlayCircle, BsFileEarmarkText, BsLaptop, BsPeople } from 'react-icons/bs';

export default function LearningFormatSection() {
  return (
    <section id="learning-format" className="bg-gray-50 py-12 sm:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">学習形式</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* オンデマンドビデオ講義 */}
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
            <div className="flex items-center mb-4">
              <BsPlayCircle className="text-3xl sm:text-4xl text-blue-600 mr-4" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">オンデマンドビデオ講義</h3>
            </div>
            <p className="text-sm sm:text-base text-gray-700 mb-4">
              プロの講師による解説ビデオを、自分のペースでいつでも視聴できます。
              各モジュールは15-20分程度の短い動画に分割されており、隙間時間でも効率的に学習できます。
            </p>
            <ul className="text-xs sm:text-sm text-gray-600 space-y-2">
              <li className="flex items-center">
                <span className="bg-blue-100 rounded-full w-4 h-4 flex items-center justify-center mr-2 text-blue-600 text-xs">✓</span>
                24時間365日アクセス可能
              </li>
              <li className="flex items-center">
                <span className="bg-blue-100 rounded-full w-4 h-4 flex items-center justify-center mr-2 text-blue-600 text-xs">✓</span>
                一時停止、早送り、巻き戻し機能
              </li>
              <li className="flex items-center">
                <span className="bg-blue-100 rounded-full w-4 h-4 flex items-center justify-center mr-2 text-blue-600 text-xs">✓</span>
                繰り返し視聴可能
              </li>
            </ul>
          </div>
          
          {/* 実践的な演習課題 */}
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
            <div className="flex items-center mb-4">
              <BsFileEarmarkText className="text-3xl sm:text-4xl text-teal-600 mr-4" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">実践的な演習課題</h3>
            </div>
            <p className="text-sm sm:text-base text-gray-700 mb-4">
              各モジュールの学習後に、実際のウェブサイトでGoogle AnalyticsやSearch Consoleを使用した
              実践的な課題に取り組み、スキルを定着させます。
            </p>
            <ul className="text-xs sm:text-sm text-gray-600 space-y-2">
              <li className="flex items-center">
                <span className="bg-teal-100 rounded-full w-4 h-4 flex items-center justify-center mr-2 text-teal-600 text-xs">✓</span>
                実際のデータを使用した分析演習
              </li>
              <li className="flex items-center">
                <span className="bg-teal-100 rounded-full w-4 h-4 flex items-center justify-center mr-2 text-teal-600 text-xs">✓</span>
                SEO改善提案の作成
              </li>
              <li className="flex items-center">
                <span className="bg-teal-100 rounded-full w-4 h-4 flex items-center justify-center mr-2 text-teal-600 text-xs">✓</span>
                専門家からのフィードバック
              </li>
            </ul>
          </div>
          
          {/* ハンズオンプロジェクト */}
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
            <div className="flex items-center mb-4">
              <BsLaptop className="text-3xl sm:text-4xl text-purple-600 mr-4" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">ハンズオンプロジェクト</h3>
            </div>
            <p className="text-sm sm:text-base text-gray-700 mb-4">
              コース後半では、実際のウェブサイトを対象に総合的な分析と改善提案を行う
              実践プロジェクトに取り組みます。ポートフォリオとしても活用できる成果物を作成します。
            </p>
            <ul className="text-xs sm:text-sm text-gray-600 space-y-2">
              <li className="flex items-center">
                <span className="bg-purple-100 rounded-full w-4 h-4 flex items-center justify-center mr-2 text-purple-600 text-xs">✓</span>
                実サイトのデータ分析
              </li>
              <li className="flex items-center">
                <span className="bg-purple-100 rounded-full w-4 h-4 flex items-center justify-center mr-2 text-purple-600 text-xs">✓</span>
                改善提案書の作成
              </li>
              <li className="flex items-center">
                <span className="bg-purple-100 rounded-full w-4 h-4 flex items-center justify-center mr-2 text-purple-600 text-xs">✓</span>
                プレゼンテーションスキルの習得
              </li>
            </ul>
          </div>
          
          {/* オンラインディスカッション */}
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
            <div className="flex items-center mb-4">
              <BsPeople className="text-3xl sm:text-4xl text-green-600 mr-4" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">コミュニティ学習</h3>
            </div>
            <p className="text-sm sm:text-base text-gray-700 mb-4">
              専用のオンラインフォーラムで、同じ目標を持つ仲間や講師とディスカッションを行い、
              相互学習を促進します。業界トレンドや最新情報も常に共有されます。
            </p>
            <ul className="text-xs sm:text-sm text-gray-600 space-y-2">
              <li className="flex items-center">
                <span className="bg-green-100 rounded-full w-4 h-4 flex items-center justify-center mr-2 text-green-600 text-xs">✓</span>
                専用オンラインフォーラム
              </li>
              <li className="flex items-center">
                <span className="bg-green-100 rounded-full w-4 h-4 flex items-center justify-center mr-2 text-green-600 text-xs">✓</span>
                講師への質問機会
              </li>
              <li className="flex items-center">
                <span className="bg-green-100 rounded-full w-4 h-4 flex items-center justify-center mr-2 text-green-600 text-xs">✓</span>
                仲間との知識共有
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
} 