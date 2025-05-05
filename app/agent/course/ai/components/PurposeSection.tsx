import React from 'react';
import { FaRobot, FaTools, FaShieldAlt, FaChartLine } from 'react-icons/fa';

export default function PurposeSection() {
  return (
    <section id="purpose" className="w-full max-w-5xl mx-auto px-4 pb-12 sm:pb-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">この講座で得られること</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition duration-300">
          <div className="flex items-center mb-3 sm:mb-4">
            <FaRobot className="text-2xl sm:text-3xl text-blue-500 mr-3 sm:mr-4 flex-shrink-0" />
            <h3 className="text-lg sm:text-xl font-bold">AIの基礎がわかる</h3>
          </div>
          <ul className="list-disc pl-8 sm:pl-12 text-gray-700 space-y-1 sm:space-y-2 text-sm sm:text-base">
            <li>AI、機械学習、ディープラーニングの違いを説明できる</li>
            <li>AI技術がどのように進化してきたかを知る</li>
            <li>生成AI（ChatGPTなど）の仕組みの基本を理解する</li>
          </ul>
        </div>
        
        <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md border-l-4 border-purple-500 hover:shadow-lg transition duration-300">
          <div className="flex items-center mb-3 sm:mb-4">
            <FaTools className="text-2xl sm:text-3xl text-purple-500 mr-3 sm:mr-4 flex-shrink-0" />
            <h3 className="text-lg sm:text-xl font-bold">AI活用スキルが身につく</h3>
          </div>
          <ul className="list-disc pl-8 sm:pl-12 text-gray-700 space-y-1 sm:space-y-2 text-sm sm:text-base">
            <li>ChatGPTなどを効果的に使うための質問（プロンプト）のコツを学ぶ</li>
            <li>身近な業務や学習にAIを応用するアイデアを得る</li>
            <li>様々なAIツールの特徴を知り、目的に合わせて選べるようになる</li>
          </ul>
        </div>
        
        <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md border-l-4 border-green-500 hover:shadow-lg transition duration-300">
          <div className="flex items-center mb-3 sm:mb-4">
            <FaShieldAlt className="text-2xl sm:text-3xl text-green-500 mr-3 sm:mr-4 flex-shrink-0" />
            <h3 className="text-lg sm:text-xl font-bold">AIのリスクと倫理を理解する</h3>
          </div>
          <ul className="list-disc pl-8 sm:pl-12 text-gray-700 space-y-1 sm:space-y-2 text-sm sm:text-base">
            <li>AI利用における注意点（情報の正確性、著作権など）を知る</li>
            <li>個人情報やプライバシーに関するリスクを理解する</li>
            <li>AIが持つバイアス（偏り）の問題について学ぶ</li>
          </ul>
        </div>
        
        <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md border-l-4 border-orange-500 hover:shadow-lg transition duration-300">
          <div className="flex items-center mb-3 sm:mb-4">
            <FaChartLine className="text-2xl sm:text-3xl text-orange-500 mr-3 sm:mr-4 flex-shrink-0" />
            <h3 className="text-lg sm:text-xl font-bold">AI時代のキャリアを考える</h3>
          </div>
          <ul className="list-disc pl-8 sm:pl-12 text-gray-700 space-y-1 sm:space-y-2 text-sm sm:text-base">
            <li>AIによって仕事がどう変わる可能性があるかを知る</li>
            <li>AIを活用して自分のスキルや市場価値を高めるヒントを得る</li>
            <li>今後の学習やキャリアプランを考えるきっかけにする</li>
          </ul>
        </div>
      </div>
    </section>
  );
} 