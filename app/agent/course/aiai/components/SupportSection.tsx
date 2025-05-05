import React from 'react';
import { FaComments, FaUsers, FaBookOpen } from 'react-icons/fa';

export default function SupportSection() {
  return (
    <section id="support" className="w-full max-w-5xl mx-auto px-4 py-12 sm:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">学習をサポートする体制</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
        <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md text-center hover:shadow-lg transition duration-300">
          <FaComments size={32} className="mx-auto mb-3 sm:mb-4 text-blue-500"/>
          <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">無制限の質問対応</h3>
          <p className="text-xs sm:text-sm text-gray-600 mx-auto max-w-[240px] sm:max-w-none">
            学習中の疑問点は専用チャット/フォーラムで<wbr/>いつでも質問可能。<wbr/>講師や他の受講生から回答を得られます。
          </p>
        </div>
        <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md text-center hover:shadow-lg transition duration-300">
          <FaUsers size={32} className="mx-auto mb-3 sm:mb-4 text-purple-500"/>
          <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">受講生コミュニティ</h3>
          <p className="text-xs sm:text-sm text-gray-600 mx-auto max-w-[240px] sm:max-w-none">
            他の受講生と交流し、モチベーション維持や<wbr/>情報交換ができます（任意参加）。
          </p>
        </div>
      </div>
      <div className="mt-8 sm:mt-10 text-center bg-indigo-50 p-5 sm:p-6 rounded-lg border border-indigo-100 max-w-3xl mx-auto">
        <h4 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-indigo-800 flex items-center justify-center">
          <FaBookOpen className="mr-2"/>
          さらに！受講後も安心
        </h4>
        <p className="text-xs sm:text-sm text-gray-700 mx-auto max-w-[280px] sm:max-w-none">
          コース終了後も、学習コンテンツへの<wbr/>アクセス権やコミュニティ参加は継続可能です。<br className="hidden xs:block"/>
          継続的なスキルアップやキャリア相談の機会も提供します。
        </p>
      </div>
    </section>
  );
} 