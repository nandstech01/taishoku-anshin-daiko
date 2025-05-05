import React from 'react';
import { FaUserCheck, FaUserTie, FaGraduationCap, FaRegLightbulb, FaComments, FaBrain } from 'react-icons/fa';

export default function TargetAudienceSection() {
  return (
    <section id="target-audience" className="w-full bg-indigo-50 py-12 sm:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">こんな方におすすめ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-md hover:shadow-lg transition duration-300 text-center">
            <FaUserCheck size={32} className="mx-auto mb-3 sm:mb-4 text-blue-500"/>
            <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-2">AI初心者の方</h3>
            <p className="text-xs sm:text-sm text-gray-700">AIについて基礎から体系的に学びたい</p>
          </div>
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-md hover:shadow-lg transition duration-300 text-center">
            <FaUserTie size={32} className="mx-auto mb-3 sm:mb-4 text-green-500"/>
            <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-2">ビジネスパーソン</h3>
            <p className="text-xs sm:text-sm text-gray-700">仕事でAIを活用して業務効率を上げたい</p>
          </div>
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-md hover:shadow-lg transition duration-300 text-center">
            <FaGraduationCap size={32} className="mx-auto mb-3 sm:mb-4 text-purple-500"/>
            <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-2">学生・学習意欲の高い方</h3>
            <p className="text-xs sm:text-sm text-gray-700">これからの時代に必要なAIスキルを身につけたい</p>
          </div>
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-md hover:shadow-lg transition duration-300 text-center">
            <FaRegLightbulb size={32} className="mx-auto mb-3 sm:mb-4 text-orange-500"/>
            <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-2">新しい技術に関心がある方</h3>
            <p className="text-xs sm:text-sm text-gray-700">AIの可能性や社会への影響を知りたい</p>
          </div>
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-md hover:shadow-lg transition duration-300 text-center">
            <FaComments size={32} className="mx-auto mb-3 sm:mb-4 text-red-500"/>
            <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-2">情報収集・発信をする方</h3>
            <p className="text-xs sm:text-sm text-gray-700">AIを使いこなして情報リテラシーを高めたい</p>
          </div>
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-md hover:shadow-lg transition duration-300 text-center">
            <FaBrain size={32} className="mx-auto mb-3 sm:mb-4 text-yellow-500"/>
            <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-2">クリエイティブな方</h3>
            <p className="text-xs sm:text-sm text-gray-700">AIをアイデア出しや創作活動に活かしたい</p>
          </div>
        </div>
        <p className="text-center mt-8 sm:mt-10 text-sm sm:text-base text-gray-700">
          特別な知識や経験は不要です。AIについて学び始めたいすべての方を歓迎します。
        </p>
      </div>
    </section>
  );
} 