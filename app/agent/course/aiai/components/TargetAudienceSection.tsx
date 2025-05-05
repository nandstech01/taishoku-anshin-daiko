import React from 'react';
import { FaArrowRight, FaRegLightbulb, FaUsers, FaCode, FaBrain } from 'react-icons/fa';

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
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">プログラミング未経験・初級者</h3>
            </div>
            <ul className="text-gray-700 space-y-2 sm:space-y-3">
              <li className="flex items-start">
                <FaArrowRight className="text-blue-500 mt-1 mr-2 flex-shrink-0 text-xs sm:text-sm" />
                <span className="text-xs sm:text-sm leading-tight">コードを書くことに不安があるが、<wbr/>生成AI・Pythonを基礎から学びたい方</span>
              </li>
              <li className="flex items-start">
                <FaArrowRight className="text-blue-500 mt-1 mr-2 flex-shrink-0 text-xs sm:text-sm" />
                <span className="text-xs sm:text-sm leading-tight">GitHub Copilot等のAIを活用し、<wbr/>短期間で開発スキルを高めたい方</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition duration-300">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="bg-green-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                <FaCode className="text-xl sm:text-2xl text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">現役エンジニア</h3>
            </div>
            <ul className="text-gray-700 space-y-2 sm:space-y-3">
              <li className="flex items-start">
                <FaArrowRight className="text-green-500 mt-1 mr-2 flex-shrink-0 text-xs sm:text-sm" />
                <span className="text-xs sm:text-sm leading-tight">従来のWEB開発に加え、生成AI技術を<wbr/>組み合わせた新しいアプリを実装したい方</span>
              </li>
              <li className="flex items-start">
                <FaArrowRight className="text-green-500 mt-1 mr-2 flex-shrink-0 text-xs sm:text-sm" />
                <span className="text-xs sm:text-sm leading-tight">Next.js や OpenAI API の最新動向を<wbr/>把握し、実務で活かすノウハウを得たい方</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition duration-300">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="bg-purple-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                <FaUsers className="text-xl sm:text-2xl text-purple-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">企業内DX推進担当者</h3>
            </div>
            <ul className="text-gray-700 space-y-2 sm:space-y-3">
              <li className="flex items-start">
                <FaArrowRight className="text-purple-500 mt-1 mr-2 flex-shrink-0 text-xs sm:text-sm" />
                <span className="text-xs sm:text-sm leading-tight">社内の問い合わせ対応や新規サービスを、<wbr/>AIエージェントや生成AIで効率化したい方</span>
              </li>
              <li className="flex items-start">
                <FaArrowRight className="text-purple-500 mt-1 mr-2 flex-shrink-0 text-xs sm:text-sm" />
                <span className="text-xs sm:text-sm leading-tight">リソースを抑えながら、<wbr/>エンジニア人材をアップスキルさせたい方</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition duration-300">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="bg-orange-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                <FaBrain className="text-xl sm:text-2xl text-orange-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">独立・フリーランス志向の方</h3>
            </div>
            <ul className="text-gray-700 space-y-2 sm:space-y-3">
              <li className="flex items-start">
                <FaArrowRight className="text-orange-500 mt-1 mr-2 flex-shrink-0 text-xs sm:text-sm" />
                <span className="text-xs sm:text-sm leading-tight">生成AI技術に強みを持つエンジニアとして、<wbr/>市場価値を高めたい方</span>
              </li>
              <li className="flex items-start">
                <FaArrowRight className="text-orange-500 mt-1 mr-2 flex-shrink-0 text-xs sm:text-sm" />
                <span className="text-xs sm:text-sm leading-tight">高単価・高需要のAI開発案件に対応し、<wbr/>案件受注の幅を広げたい方</span>
              </li>
            </ul>
          </div>
        </div>
        
        <p className="text-center mt-8 sm:mt-10 text-xs sm:text-sm md:text-base text-gray-700 px-2 max-w-3xl mx-auto leading-relaxed">
          本コースは、プログラミング初学者から中級エンジニアまで対応可能な学習サポート体制を整備しており、
          <br className="hidden sm:block" />
          AIを活用したモダン開発の全体像を学べる構成です。
        </p>
      </div>
    </section>
  );
} 