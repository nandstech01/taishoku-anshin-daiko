import React from 'react';
import { FaLaptopCode, FaTools, FaUserGraduate, FaChartLine } from 'react-icons/fa';

export default function PurposeSection() {
  return (
    <section id="purpose" className="w-full max-w-5xl mx-auto px-4 py-10 sm:py-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">コースの目的</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-xl transition duration-300">
          <div className="flex items-center mb-3 sm:mb-4">
            <FaLaptopCode className="text-2xl sm:text-3xl text-blue-500 mr-3 sm:mr-4 flex-shrink-0" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">プログラミング基礎＋最新AI技術の習得</h3>
          </div>
          <ul className="list-disc pl-8 sm:pl-12 text-gray-700 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
            <li>Pythonなどの言語基礎から、<wbr/>Next.jsによるモダンなフロントエンド開発手法</li>
            <li>生成AI（OpenAI APIなど）との<wbr/>連携構造の理解</li>
            <li>GitHub Copilot等のAIコーディング<wbr/>支援ツールの活用方法</li>
          </ul>
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border-l-4 border-purple-500 hover:shadow-xl transition duration-300">
          <div className="flex items-center mb-3 sm:mb-4">
            <FaTools className="text-2xl sm:text-3xl text-purple-500 mr-3 sm:mr-4 flex-shrink-0" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">実践的な生成AIアプリケーション開発スキルの獲得</h3>
          </div>
          <ul className="list-disc pl-8 sm:pl-12 text-gray-700 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
            <li>問い合わせ対応自動化や英会話AIアプリなど、<wbr/>具体的ユースケースを通じた演習</li>
            <li>RAG（Retrieval-Augmented Generation）や<wbr/>プロンプト最適化手法の習得</li>
            <li>応答精度の高いAIアプリケーションの構築</li>
          </ul>
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border-l-4 border-green-500 hover:shadow-xl transition duration-300">
          <div className="flex items-center mb-3 sm:mb-4">
            <FaChartLine className="text-2xl sm:text-3xl text-green-500 mr-3 sm:mr-4 flex-shrink-0" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">DX人材としてのキャリアアップ</h3>
          </div>
          <ul className="list-disc pl-8 sm:pl-12 text-gray-700 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
            <li>生成AI技術を応用した新規サービスや<wbr/>業務改善提案ができるエンジニアへ</li>
            <li>企業内リスキリングの推進、<wbr/>DXプロジェクトの加速</li>
            <li>市場価値の高いAIエンジニアとしての<wbr/>スキルセット獲得</li>
          </ul>
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border-l-4 border-orange-500 hover:shadow-xl transition duration-300">
          <div className="flex items-center mb-3 sm:mb-4">
            <FaUserGraduate className="text-2xl sm:text-3xl text-orange-500 mr-3 sm:mr-4 flex-shrink-0" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">挫折を防ぐ学習サポート</h3>
          </div>
          <ul className="list-disc pl-8 sm:pl-12 text-gray-700 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
            <li>プログラミング未経験者でも安心の<wbr/>丁寧なサポート体制</li>
            <li>エラー対処やコードレビューを<wbr/>サポート</li>
            <li>受講後も勉強会や質疑応答の場を設け、<wbr/>現場での活用をフォロー</li>
          </ul>
        </div>
      </div>
    </section>
  );
} 