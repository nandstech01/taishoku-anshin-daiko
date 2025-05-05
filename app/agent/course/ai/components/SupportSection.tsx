import React from 'react';
import { FaQuestionCircle, FaChalkboardTeacher, FaUsers } from 'react-icons/fa';

export default function SupportSection() {
  return (
    <section id="support" className="w-full max-w-5xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">安心して学べるサポート体制</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition duration-300">
          <FaQuestionCircle size={40} className="mx-auto mb-4 text-blue-500"/>
          <h3 className="text-lg font-semibold mb-2">いつでも質問可能</h3>
          <p className="text-sm text-gray-600">学習中の疑問点は、専用チャットやフォーラムでいつでも質問できます。</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition duration-300">
          <FaChalkboardTeacher size={40} className="mx-auto mb-4 text-green-500"/>
          <h3 className="text-lg font-semibold mb-2">ライブQ&Aセッション</h3>
          <p className="text-sm text-gray-600">定期的なライブセッションで、講師に直接質問し、疑問を解消できます。</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition duration-300">
          <FaUsers size={40} className="mx-auto mb-4 text-purple-500"/>
          <h3 className="text-lg font-semibold mb-2">受講生コミュニティ</h3>
          <p className="text-sm text-gray-600">他の受講生と交流し、情報交換や学び合いができます（任意参加）。</p>
        </div>
      </div>
    </section>
  );
} 