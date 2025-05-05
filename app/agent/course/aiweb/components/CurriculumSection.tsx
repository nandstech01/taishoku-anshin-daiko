import React from 'react';

export default function CurriculumSection() {
  return (
    <section className="w-full py-16 sm:py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 leading-tight text-gray-800 text-center">
          eラーニング（6時間）カリキュラム
        </h2>
        
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="py-3 px-4 text-left font-semibold text-gray-700 border-r">モジュール</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700 border-r">タイトル</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700 border-r">時間</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">主な学習内容</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4 text-gray-800 border-r">1</td>
                <td className="py-3 px-4 text-gray-800 border-r">AI活用コンテンツ制作概論</td>
                <td className="py-3 px-4 text-gray-800 border-r">30分</td>
                <td className="py-3 px-4 text-gray-700">
                  <ul className="list-disc ml-5 space-y-1">
                    <li>AIライティングのメリット・留意点</li>
                    <li>ChatGPT等主要AIツールの特徴</li>
                    <li>AI活用による作業効率化と品質向上</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 text-gray-800 border-r">2</td>
                <td className="py-3 px-4 text-gray-800 border-r">キーワード選定とペルソナ設計の基礎</td>
                <td className="py-3 px-4 text-gray-800 border-r">40分</td>
                <td className="py-3 px-4 text-gray-700">
                  <ul className="list-disc ml-5 space-y-1">
                    <li>解析ツールを使ったキーワードリサーチ</li>
                    <li>ペルソナ設定の重要性と具体手順</li>
                    <li>競合調査とユーザー意図分析</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 text-gray-800 border-r">3</td>
                <td className="py-3 px-4 text-gray-800 border-r">AIライティング入門：記事作成フロー</td>
                <td className="py-3 px-4 text-gray-800 border-r">45分</td>
                <td className="py-3 px-4 text-gray-700">
                  <ul className="list-disc ml-5 space-y-1">
                    <li>ChatGPTを利用した原稿の下書き・構成案作成</li>
                    <li>タイトル・リード文の最適化</li>
                    <li>人手レビューとの併用テクニック</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 text-gray-800 border-r">4</td>
                <td className="py-3 px-4 text-gray-800 border-r">リライト技術とコンテンツ品質向上</td>
                <td className="py-3 px-4 text-gray-800 border-r">45分</td>
                <td className="py-3 px-4 text-gray-700">
                  <ul className="list-disc ml-5 space-y-1">
                    <li>リライトの注意点と手順</li>
                    <li>SEO評価を高めるコツ</li>
                    <li>効果測定と改善サイクル</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 text-gray-800 border-r">5</td>
                <td className="py-3 px-4 text-gray-800 border-r">ツール連携と効率化実践：解析・運用管理</td>
                <td className="py-3 px-4 text-gray-800 border-r">40分</td>
                <td className="py-3 px-4 text-gray-700">
                  <ul className="list-disc ml-5 space-y-1">
                    <li>GoogleアナリティクスやSearch Consoleとの連携</li>
                    <li>AIライティング成果物の効果測定</li>
                    <li>効率的な運用管理フロー</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 text-gray-800 border-r">6</td>
                <td className="py-3 px-4 text-gray-800 border-r">成功事例・失敗事例から学ぶAIコンテンツ運用</td>
                <td className="py-3 px-4 text-gray-800 border-r">30分</td>
                <td className="py-3 px-4 text-gray-700">
                  <ul className="list-disc ml-5 space-y-1">
                    <li>AI執筆で成果を上げた事例</li>
                    <li>倫理的配慮や落とし穴があるケース</li>
                    <li>今後のトレンド予測と継続的なスキルアップ</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-800 border-r">7</td>
                <td className="py-3 px-4 text-gray-800 border-r">小テスト：AIコンテンツ制作総復習</td>
                <td className="py-3 px-4 text-gray-800 border-r">20分</td>
                <td className="py-3 px-4 text-gray-700">
                  <ul className="list-disc ml-5 space-y-1">
                    <li>選択式＋簡単な記述式問題</li>
                    <li>全モジュールの理解度チェック</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mt-12 mb-6 text-center">
          Zoomオンライン講義（4時間）カリキュラム
        </h3>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ol className="space-y-6">
            <li className="border-b pb-4">
              <div className="flex flex-col md:flex-row md:items-center mb-2">
                <h4 className="font-bold text-gray-800 mr-3">オリエンテーション</h4>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">約15分</span>
              </div>
              <ul className="list-disc ml-6 text-gray-700 space-y-1">
                <li>講師の自己紹介と研修ゴール設定</li>
                <li>受講者自己紹介・学習目的共有</li>
              </ul>
            </li>
            
            <li className="border-b pb-4">
              <div className="flex flex-col md:flex-row md:items-center mb-2">
                <h4 className="font-bold text-gray-800 mr-3">AIコンテンツ制作の復習・質疑応答</h4>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">約60分</span>
              </div>
              <ul className="list-disc ml-6 text-gray-700 space-y-1">
                <li>eラーニングの要点を確認し、さらに応用的なトピックを補足</li>
                <li>受講者からの疑問点や具体的な課題に対するアドバイスを行う</li>
              </ul>
            </li>
            
            <li className="border-b pb-4">
              <div className="flex flex-col md:flex-row md:items-center mb-2">
                <h4 className="font-bold text-gray-800 mr-3">ケーススタディ・演習</h4>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">約60分</span>
              </div>
              <ul className="list-disc ml-6 text-gray-700 space-y-1">
                <li>例：「実際にキーワードを選び、ChatGPTで記事を下書き→リライト工程まで試す」</li>
                <li>個人またはペアで協力しながらプロンプト作成、タイトル案・構成案を考案</li>
                <li>発表後、講師・他の参加者からフィードバック</li>
              </ul>
            </li>
            
            <li className="border-b pb-4">
              <div className="flex flex-col md:flex-row md:items-center mb-2">
                <h4 className="font-bold text-gray-800 mr-3">PDCA設計と効率的な運用管理</h4>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">約30分</span>
              </div>
              <ul className="list-disc ml-6 text-gray-700 space-y-1">
                <li>企画→執筆→リライト→公開→解析→改善の流れを継続運用するポイント</li>
                <li>個人でも実践できる効率的なコンテンツ管理手法</li>
              </ul>
            </li>
            
            <li>
              <div className="flex flex-col md:flex-row md:items-center mb-2">
                <h4 className="font-bold text-gray-800 mr-3">質疑応答・まとめ</h4>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">約15分</span>
              </div>
              <ul className="list-disc ml-6 text-gray-700 space-y-1">
                <li>全体の振り返り、今後の学習計画提案</li>
                <li>継続的なスキルアップのためのリソース紹介</li>
              </ul>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
} 