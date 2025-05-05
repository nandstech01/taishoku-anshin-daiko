import React from 'react';
import { FaArrowRight, FaRegLightbulb, FaUsers, FaCode, FaTools } from 'react-icons/fa';

export default function TargetAudienceSection() {
  return (
    <section id="target-audience" className="w-full bg-indigo-50 py-12 sm:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">対象者・想定受講者像</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition duration-300">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="bg-blue-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                <FaRegLightbulb className="text-xl sm:text-2xl text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">マーケティング担当者</h3>
            </div>
            <ul className="text-gray-700 space-y-2 sm:space-y-3">
              <li className="flex items-start">
                <FaArrowRight className="text-blue-500 mt-1 mr-2 flex-shrink-0 text-xs sm:text-sm" />
                <span className="text-xs sm:text-sm leading-tight">マーケティング部門でWEB担当として<wbr/>活躍したい方</span>
              </li>
              <li className="flex items-start">
                <FaArrowRight className="text-blue-500 mt-1 mr-2 flex-shrink-0 text-xs sm:text-sm" />
                <span className="text-xs sm:text-sm leading-tight">デジタルマーケティングのスキルを<wbr/>体系的に学びたい方</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition duration-300">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="bg-green-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                <FaCode className="text-xl sm:text-2xl text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">WEB担当者・制作者</h3>
            </div>
            <ul className="text-gray-700 space-y-2 sm:space-y-3">
              <li className="flex items-start">
                <FaArrowRight className="text-green-500 mt-1 mr-2 flex-shrink-0 text-xs sm:text-sm" />
                <span className="text-xs sm:text-sm leading-tight">自社サイトのアクセス解析を<wbr/>行いたいWeb担当者</span>
              </li>
              <li className="flex items-start">
                <FaArrowRight className="text-green-500 mt-1 mr-2 flex-shrink-0 text-xs sm:text-sm" />
                <span className="text-xs sm:text-sm leading-tight">SEOを考慮したウェブサイト制作<wbr/>スキルを身につけたい方</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition duration-300">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="bg-purple-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                <FaUsers className="text-xl sm:text-2xl text-purple-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">キャリアアップ志向の方</h3>
            </div>
            <ul className="text-gray-700 space-y-2 sm:space-y-3">
              <li className="flex items-start">
                <FaArrowRight className="text-purple-500 mt-1 mr-2 flex-shrink-0 text-xs sm:text-sm" />
                <span className="text-xs sm:text-sm leading-tight">データ分析スキルを身につけて<wbr/>キャリアアップしたい方</span>
              </li>
              <li className="flex items-start">
                <FaArrowRight className="text-purple-500 mt-1 mr-2 flex-shrink-0 text-xs sm:text-sm" />
                <span className="text-xs sm:text-sm leading-tight">WEBアナリストやSEOスペシャリストを<wbr/>目指す方</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition duration-300">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="bg-orange-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                <FaTools className="text-xl sm:text-2xl text-orange-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">転職・独立志向の方</h3>
            </div>
            <ul className="text-gray-700 space-y-2 sm:space-y-3">
              <li className="flex items-start">
                <FaArrowRight className="text-orange-500 mt-1 mr-2 flex-shrink-0 text-xs sm:text-sm" />
                <span className="text-xs sm:text-sm leading-tight">Webサイト制作会社やマーケティング会社への<wbr/>転職を目指す方</span>
              </li>
              <li className="flex items-start">
                <FaArrowRight className="text-orange-500 mt-1 mr-2 flex-shrink-0 text-xs sm:text-sm" />
                <span className="text-xs sm:text-sm leading-tight">フリーランスとしてSEOコンサルティング<wbr/>サービスを提供したい方</span>
              </li>
            </ul>
          </div>
        </div>
        
        <p className="text-center mt-8 sm:mt-10 text-xs sm:text-sm md:text-base text-gray-700 px-2 max-w-3xl mx-auto leading-relaxed">
          本コースは、デジタル分析の初学者から中級者まで対応可能な学習サポート体制を整備しており、
          <br className="hidden sm:block" />
          WEB分析とSEOの全体像を実践的に学べる構成です。
        </p>
      </div>
    </section>
  );
} 