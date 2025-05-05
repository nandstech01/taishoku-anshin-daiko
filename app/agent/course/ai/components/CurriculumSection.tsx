import React from 'react';
import { FaBookOpen, FaComments } from 'react-icons/fa';

export default function CurriculumSection() {
  const modules = [
    { no: 1, title: "AIって何？ ～基本のキ～", time: "30分", content: "AIの定義、歴史、社会への影響。" },
    { no: 2, title: "AIを支える技術 ～機械学習・深層学習～", time: "40分", content: "学習の種類、ニューラルネットワークの仕組み。" },
    { no: 3, title: "AIができること① ～画像・音声認識～", time: "40分", content: "身近なAI応用例（顔認証、音声アシスタントなど）。" },
    { no: 4, title: "AIができること② ～自然言語処理と生成AI～", time: "40分", content: "ChatGPTの仕組み、翻訳や要約への活用。" },
    { no: 5, title: "AIを使ってみよう ～活用事例とプロンプト～", time: "45分", content: "業務・学習でのAI活用アイデア、効果的な質問の仕方。" },
    { no: 6, title: "データとAI ～情報の扱い方～", time: "30分", content: "データ活用の基本、情報の質とセキュリティ。" },
    { no: 7, title: "AIと社会 ～法律・倫理・注意点～", time: "30分", content: "個人情報、著作権、AIの偏見（バイアス）問題。" },
    { no: 8, title: "AIの未来とキャリア", time: "40分", content: "今後のAIの発展予測、AI時代の働き方。" },
    { no: 9, title: "AI活用実践ワーク", time: "30分", content: "学んだ知識を活かしてAIツールを試してみる。" },
    { no: 10, title: "総まとめテスト", time: "15分", content: "学習内容の理解度チェック。" },
  ];

  return (
    <section id="curriculum" className="w-full bg-gray-50 py-12 sm:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">学習内容</h2>

        {/* eラーニング */}
        <div className="mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-center flex items-center justify-center">
            <FaBookOpen className="mr-2 sm:mr-3 text-blue-600 text-lg sm:text-xl flex-shrink-0"/>eラーニング：AIの基礎から応用まで
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {modules.map((module) => (
              <div key={module.no} className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-between items-start mb-1 sm:mb-2">
                  <span className="font-semibold text-indigo-700 text-sm sm:text-lg">{` ${module.no}. ${module.title}`}</span>
                  <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{module.time}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 pl-4 sm:pl-5">{module.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ライブ講義/Q&A */}
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-center flex items-center justify-center">
            <FaComments className="mr-2 sm:mr-3 text-green-600 text-lg sm:text-xl flex-shrink-0"/>ライブ講義/Q&Aセッション：疑問を解消し、理解を深める
          </h3>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4 text-center sm:text-left">
              定期的に開催されるライブセッションでは、eラーニングの内容に関する質問や、さらに深い解説、最新情報の共有、参加者同士のディスカッションなどを行います。
            </p>
            <ul className="list-disc pl-5 sm:pl-6 text-xs sm:text-sm text-gray-700 space-y-1 sm:space-y-2">
              <li>eラーニング内容の補足・応用解説</li>
              <li>最新AIニュースやツールの紹介</li>
              <li>参加者からの質問への直接回答</li>
              <li>特定のテーマに関するワークショップ（例：プロンプト作成演習）</li>
              <li>他の受講生との意見交換</li>
            </ul>
            <p className="text-xs text-gray-600 mt-3 sm:mt-4 text-center sm:text-left">※参加は任意です。セッション内容は録画され、後日視聴も可能です。</p>
          </div>
        </div>
      </div>
    </section>
  );
} 