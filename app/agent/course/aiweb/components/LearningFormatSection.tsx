import React from 'react';
import { FaVideo, FaLaptop, FaUserFriends, FaChartLine } from 'react-icons/fa';

export default function LearningFormatSection() {
  return (
    <section className="w-full py-16 sm:py-20 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 leading-tight text-gray-800 text-center">
          学習目標とカリキュラム
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
            <div className="mr-4 p-3 bg-blue-100 rounded-full">
              <FaVideo className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">AIライティングツールの導入・運用プロセス</h3>
              <ul className="space-y-2 text-gray-700 list-disc ml-5">
                <li>ChatGPTなどの初期設定・API連携・料金体系</li>
                <li>社内で運用する際のルール整備・リスク管理</li>
                <li>AI生成コンテンツの校正・監修フロー確立</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
            <div className="mr-4 p-3 bg-green-100 rounded-full">
              <FaLaptop className="text-green-600 text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">ニーズに合ったキーワード選定とペルソナ設計</h3>
              <ul className="space-y-2 text-gray-700 list-disc ml-5">
                <li>検索ボリュームや競合状況を解析し、効率的なキーワード戦略を立案</li>
                <li>ターゲットのペルソナを明確化し、質の高いコンテンツ設計を行う</li>
                <li>コンテンツの役割とユーザージャーニーマッピング</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
            <div className="mr-4 p-3 bg-purple-100 rounded-full">
              <FaUserFriends className="text-purple-600 text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">AIを活用した記事作成・リライト技術の習得</h3>
              <ul className="space-y-2 text-gray-700 list-disc ml-5">
                <li>AIの下書きと人間による最終チェックを組み合わせ、質を維持しつつ工数を削減</li>
                <li>リライト手法や効果的なフィードバックサイクルの構築</li>
                <li>専門性の高い記事でAIを補助的に活用する方法</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
            <div className="mr-4 p-3 bg-yellow-100 rounded-full">
              <FaChartLine className="text-yellow-600 text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">効果測定とPDCAサイクルの実行</h3>
              <ul className="space-y-2 text-gray-700 list-disc ml-5">
                <li>アクセス解析ツールを利用して、公開後のコンテンツの成果を評価</li>
                <li>PDCAによりコンテンツ精度を高め、ビジネス目標の達成に繋げる</li>
                <li>データドリブンなコンテンツ戦略の立案と見直し</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">研修スケジュール例</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">期間</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">ステップ</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">備考</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 text-gray-800">実施前（〜2週間）</td>
                  <td className="py-3 px-4 text-gray-800">受講者確定・eラーニング案内</td>
                  <td className="py-3 px-4 text-gray-600">LMSアカウント発行・ダウンロード資料の周知</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-gray-800">第1週</td>
                  <td className="py-3 px-4 text-gray-800">eラーニング：モジュール1〜3（約2時間）視聴</td>
                  <td className="py-3 px-4 text-gray-600">AIライティングやキーワード選定の基礎を学習</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-gray-800">第2週</td>
                  <td className="py-3 px-4 text-gray-800">eラーニング：モジュール4〜7（約4時間）視聴</td>
                  <td className="py-3 px-4 text-gray-600">リライト手法や解析連携、事例確認</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-800">第3週</td>
                  <td className="py-3 px-4 text-gray-800">Zoomオンライン講義（4時間）</td>
                  <td className="py-3 px-4 text-gray-600">ケーススタディ・演習で実践力を高める</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
} 