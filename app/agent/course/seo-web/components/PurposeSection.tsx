import React from 'react';
import { FaGlobe, FaSearch, FaChartLine, FaUserGraduate } from 'react-icons/fa';

export default function PurposeSection() {
  return (
    <section id="purpose" className="w-full max-w-5xl mx-auto px-4 py-10 sm:py-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">学習目標</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-xl transition duration-300">
          <div className="flex items-center mb-3 sm:mb-4">
            <FaGlobe className="text-2xl sm:text-3xl text-blue-500 mr-3 sm:mr-4 flex-shrink-0" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">WEB分析ツールの習得</h3>
          </div>
          <ul className="list-disc pl-8 sm:pl-12 text-gray-700 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
            <li>Google Analyticsの設定と<wbr/>基本操作方法のマスター</li>
            <li>Search Consoleを用いた<wbr/>検索パフォーマンス分析</li>
            <li>各種レポートの解釈と<wbr/>実用的なインサイト抽出</li>
          </ul>
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border-l-4 border-teal-500 hover:shadow-xl transition duration-300">
          <div className="flex items-center mb-3 sm:mb-4">
            <FaSearch className="text-2xl sm:text-3xl text-teal-500 mr-3 sm:mr-4 flex-shrink-0" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">SEO基礎と実践スキルの獲得</h3>
          </div>
          <ul className="list-disc pl-8 sm:pl-12 text-gray-700 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
            <li>検索エンジンの仕組みと<wbr/>最新アルゴリズムの理解</li>
            <li>オンページSEOとオフページSEOの<wbr/>実践テクニック</li>
            <li>コンテンツSEOと技術的SEOの<wbr/>最適化手法</li>
          </ul>
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border-l-4 border-green-500 hover:shadow-xl transition duration-300">
          <div className="flex items-center mb-3 sm:mb-4">
            <FaChartLine className="text-2xl sm:text-3xl text-green-500 mr-3 sm:mr-4 flex-shrink-0" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">データ分析と改善提案</h3>
          </div>
          <ul className="list-disc pl-8 sm:pl-12 text-gray-700 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
            <li>ユーザー行動分析と<wbr/>コンバージョン最適化手法</li>
            <li>データに基づいた<wbr/>ウェブサイト改善策の立案</li>
            <li>効果測定とKPI設定による<wbr/>継続的な改善サイクル</li>
          </ul>
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border-l-4 border-orange-500 hover:shadow-xl transition duration-300">
          <div className="flex items-center mb-3 sm:mb-4">
            <FaUserGraduate className="text-2xl sm:text-3xl text-orange-500 mr-3 sm:mr-4 flex-shrink-0" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">実践的プロジェクト経験</h3>
          </div>
          <ul className="list-disc pl-8 sm:pl-12 text-gray-700 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
            <li>実サイトのSEO診断<wbr/>レポート作成</li>
            <li>アクセス解析データからの<wbr/>課題抽出演習</li>
            <li>実践的なサイト改善計画の<wbr/>立案と提案</li>
          </ul>
        </div>
      </div>
    </section>
  );
} 