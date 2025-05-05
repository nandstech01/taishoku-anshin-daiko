import React from 'react';
import { FaLaptopCode, FaChalkboardTeacher } from 'react-icons/fa';

export default function CurriculumSection() {
  // カリキュラムデータ (eラーニング)
  const eLearningModules = [
    { no: 1, title: "イントロダクション", time: "30分", content: "コース概要、Next.jsとAIエージェント開発の可能性" },
    { no: 2, title: "開発環境構築", time: "40分", content: "Node.js, Python, VSCode, Git/GitHubセットアップ" },
    { no: 3, title: "Next.js基礎 ①", time: "50分", content: "React基礎、コンポーネント、JSX、Props、State" },
    { no: 4, title: "Next.js基礎 ②", time: "50分", content: "ルーティング(App Router)、レイアウト、API Routes" },
    { no: 5, title: "Python基礎", time: "40分", content: "基本的な文法、データ型、制御構文、関数" },
    { no: 6, title: "AIエージェント連携 ①", time: "40分", content: "OpenAI API概要、APIキー取得、簡単なAPI連携" },
    { no: 7, title: "AIエージェント連携 ②", time: "50分", content: "LangChain概要、基本的な使い方、簡単なエージェント作成" },
    { no: 8, title: "AIエージェント連携 ③", time: "40分", content: "RAG基礎、VectorDB(Chroma)連携、知識拡張エージェント" },
    { no: 9, title: "UI/UX基礎", time: "30分", content: "Tailwind CSS基礎、レスポンシブデザイン" },
    { no: 10, title: "総合演習", time: "??分", content: "Next.js + AIエージェントによる簡易アプリケーション開発" }, // 時間は演習内容による
  ];

  // カリキュラムデータ (メンタリング＆ハンズオン)
  const mentoringSessions = [
    { title: "Q&A・復習セッション", description: "eラーニング内容の疑問点解消、重要ポイントの復習" },
    { title: "Next.jsハンズオン", description: "コンポーネント設計、状態管理、API連携の実践演習" },
    { title: "Python & LangChainハンズオン", description: "AIエージェントの実装、デバッグ、カスタマイズ演習" },
    { title: "コードレビュー＆フィードバック", description: "受講生が作成したコードに対する個別レビューと改善指導" },
    { title: "応用・発展トピック", description: "最新技術トレンド紹介、キャリア相談など（任意参加）" },
  ];

  return (
    <section id="curriculum" className="w-full bg-gray-50 py-12 sm:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">カリキュラム例</h2>

        {/* eラーニング */}
        <div className="mb-10 sm:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center flex flex-col sm:flex-row items-center justify-center">
            <FaLaptopCode className="mb-2 sm:mb-0 sm:mr-3 text-blue-600" />
            <span className="text-center">eラーニング（6時間）</span>
          </h3>
          <p className="text-center mb-6 text-sm sm:text-base text-gray-700">基礎知識と技術をインプット</p>
          <div className="space-y-3 sm:space-y-4">
            {eLearningModules.map((module) => (
              <div key={module.no} className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 sm:mb-2">
                  <span className="font-semibold text-sm sm:text-base text-indigo-700">{`Module ${module.no}: ${module.title}`}</span>
                  <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded mt-1 sm:mt-0">{module.time}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 pl-0 sm:pl-5">{module.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* メンタリング＆ハンズオン */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center flex flex-col sm:flex-row items-center justify-center">
            <FaChalkboardTeacher className="mb-2 sm:mb-0 sm:mr-3 text-green-600" />
            <span className="text-center">メンタリング＆ハンズオン（4時間）</span>
          </h3>
          <p className="text-center mb-6 text-sm sm:text-base text-gray-700">実践スキルをアウトプット</p>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4 sm:mb-6">eラーニングでのインプットを元に、講師との対話や実践的な演習を通じてスキルを定着させます。個別の疑問解消やコードレビューにより、着実なスキルアップを目指します。</p>
            <ul className="space-y-3 sm:space-y-4">
              {mentoringSessions.map((session, index) => (
                <li key={index} className="flex flex-col sm:flex-row sm:items-start">
                  <span className="bg-green-100 text-green-800 text-xs font-semibold mb-1 sm:mb-0 sm:mr-3 px-2.5 py-0.5 rounded-full sm:mt-1 sm:flex-shrink-0 self-start">Session {index + 1}</span>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-green-900">{session.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600">{session.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
} 