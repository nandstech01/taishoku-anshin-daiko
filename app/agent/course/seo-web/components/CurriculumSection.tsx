import React from 'react';

export default function CurriculumSection() {
  return (
    <section id="curriculum" className="w-full max-w-5xl mx-auto px-4 py-12 sm:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">カリキュラム</h2>
      
      <div className="space-y-4 sm:space-y-6">
        {/* Module 1 */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-blue-600 text-white p-3 sm:p-4">
            <h3 className="text-lg sm:text-xl font-bold">Module 1: WEB分析の基礎と環境構築</h3>
          </div>
          <div className="p-4 sm:p-6">
            <ul className="space-y-2 sm:space-y-3 text-gray-700 text-xs sm:text-sm">
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-700 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 text-xs sm:text-sm">1</span>
                <span className="leading-tight">デジタル分析の概要と重要性</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-700 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 text-xs sm:text-sm">2</span>
                <span className="leading-tight">Google Analytics 4のアカウント設定と基本構造</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-700 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 text-xs sm:text-sm">3</span>
                <span className="leading-tight">Google Search Consoleの設定と基本操作</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-700 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 text-xs sm:text-sm">4</span>
                <span className="leading-tight">計測タグの実装とデータ収集の確認</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Module 2 */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-teal-600 text-white p-3 sm:p-4">
            <h3 className="text-lg sm:text-xl font-bold">Module 2: Google Analytics実践活用法</h3>
          </div>
          <div className="p-4 sm:p-6">
            <ul className="space-y-2 sm:space-y-3 text-gray-700 text-xs sm:text-sm">
              <li className="flex items-start">
                <span className="bg-teal-100 text-teal-700 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 text-xs sm:text-sm">1</span>
                <span className="leading-tight">レポート機能と各種指標の理解</span>
              </li>
              <li className="flex items-start">
                <span className="bg-teal-100 text-teal-700 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 text-xs sm:text-sm">2</span>
                <span className="leading-tight">ユーザー行動分析とセグメント設定</span>
              </li>
              <li className="flex items-start">
                <span className="bg-teal-100 text-teal-700 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 text-xs sm:text-sm">3</span>
                <span className="leading-tight">コンバージョン設定と目標達成の測定</span>
              </li>
              <li className="flex items-start">
                <span className="bg-teal-100 text-teal-700 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 text-xs sm:text-sm">4</span>
                <span className="leading-tight">カスタムレポートの作成と活用法</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Module 3 */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-green-600 text-white p-3 sm:p-4">
            <h3 className="text-lg sm:text-xl font-bold">Module 3: SEO基礎と最適化戦略</h3>
          </div>
          <div className="p-4 sm:p-6">
            <ul className="space-y-2 sm:space-y-3 text-gray-700 text-xs sm:text-sm">
              <li className="flex items-start">
                <span className="bg-green-100 text-green-700 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 text-xs sm:text-sm">1</span>
                <span className="leading-tight">検索エンジンの仕組みとSEOの基本原則</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 text-green-700 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 text-xs sm:text-sm">2</span>
                <span className="leading-tight">キーワード調査とコンテンツ最適化</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 text-green-700 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 text-xs sm:text-sm">3</span>
                <span className="leading-tight">オンページSEOの実践テクニック</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 text-green-700 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 text-xs sm:text-sm">4</span>
                <span className="leading-tight">技術的SEOとサイト構造の最適化</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Module 4 */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-purple-600 text-white p-3 sm:p-4">
            <h3 className="text-lg sm:text-xl font-bold">Module 4: Search Console活用とSEO改善</h3>
          </div>
          <div className="p-4 sm:p-6">
            <ul className="space-y-2 sm:space-y-3 text-gray-700 text-xs sm:text-sm">
              <li className="flex items-start">
                <span className="bg-purple-100 text-purple-700 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 text-xs sm:text-sm">1</span>
                <span className="leading-tight">検索パフォーマンスレポートの分析方法</span>
              </li>
              <li className="flex items-start">
                <span className="bg-purple-100 text-purple-700 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 text-xs sm:text-sm">2</span>
                <span className="leading-tight">インデックスカバレッジとクロール問題の対処法</span>
              </li>
              <li className="flex items-start">
                <span className="bg-purple-100 text-purple-700 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 text-xs sm:text-sm">3</span>
                <span className="leading-tight">モバイルユーザビリティとサイトエクスペリエンスの改善</span>
              </li>
              <li className="flex items-start">
                <span className="bg-purple-100 text-purple-700 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 text-xs sm:text-sm">4</span>
                <span className="leading-tight">リッチリザルトを獲得するための構造化データ実装</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Module 5 */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-orange-600 text-white p-3 sm:p-4">
            <h3 className="text-lg sm:text-xl font-bold">Module 5: データ分析と改善提案の実践</h3>
          </div>
          <div className="p-4 sm:p-6">
            <ul className="space-y-2 sm:space-y-3 text-gray-700 text-xs sm:text-sm">
              <li className="flex items-start">
                <span className="bg-orange-100 text-orange-700 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 text-xs sm:text-sm">1</span>
                <span className="leading-tight">サイト診断レポートの作成方法</span>
              </li>
              <li className="flex items-start">
                <span className="bg-orange-100 text-orange-700 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 text-xs sm:text-sm">2</span>
                <span className="leading-tight">データに基づいたサイト改善施策の立案</span>
              </li>
              <li className="flex items-start">
                <span className="bg-orange-100 text-orange-700 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 text-xs sm:text-sm">3</span>
                <span className="leading-tight">クライアントへの提案資料作成と説明手法</span>
              </li>
              <li className="flex items-start">
                <span className="bg-orange-100 text-orange-700 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 text-xs sm:text-sm">4</span>
                <span className="leading-tight">改善施策の効果測定と継続的なPDCAサイクル</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
} 