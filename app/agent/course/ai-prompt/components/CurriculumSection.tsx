import React from 'react';
import { HiOutlineBookOpen, HiOutlineVideoCamera, HiOutlineUserGroup, HiChevronDown } from 'react-icons/hi';

export default function CurriculumSection() {
  return (
    <section className="w-full py-16 sm:py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-tight text-gray-800 text-center">
          カリキュラム詳細
        </h2>
        <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          本研修は、eラーニングでの理論学習とZoomオンライン講義による実践演習で構成されています。
          段階的に理解を深め、実務に活かせるスキルを習得します。
        </p>
        
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <HiOutlineVideoCamera className="text-blue-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">eラーニング（6時間）</h3>
          </div>
          
          <div className="overflow-hidden shadow-md rounded-lg border border-gray-200">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-3 px-4 bg-blue-50 text-left text-sm font-semibold text-gray-700 w-20">モジュール</th>
                  <th className="py-3 px-4 bg-blue-50 text-left text-sm font-semibold text-gray-700">タイトル</th>
                  <th className="py-3 px-4 bg-blue-50 text-left text-sm font-semibold text-gray-700 w-24">時間</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-4 text-sm text-gray-600">1</td>
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium text-gray-800">AIモデル概論・生成AIの最新動向</p>
                    <p className="text-xs text-gray-500 mt-1">大規模言語モデル（LLM）の基礎、ChatGPT等の生成AIツール比較、AIモデルの社会的インパクトと活用事例</p>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">30分</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-gray-600">2</td>
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium text-gray-800">プロンプトエンジニアリングの基礎</p>
                    <p className="text-xs text-gray-500 mt-1">プロンプトとは何か、シンプルな指示から複雑な要求へ設計するステップ、入出力の相関を理解し最適なアウトプットを得る方法</p>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">40分</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-gray-600">3</td>
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium text-gray-800">AIモデルの選択と業務統合</p>
                    <p className="text-xs text-gray-500 mt-1">AIモデルの種類（言語／画像／音声など）、API連携・外部ツール統合の基礎、社内システムや外部プラットフォームとの連携方法</p>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">45分</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-gray-600">4</td>
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium text-gray-800">ビジネス分析における生成AI活用①</p>
                    <p className="text-xs text-gray-500 mt-1">AIを用いた情報収集・信頼性評価、ペルソナの自動生成・ニーズ抽出、戦略立案への落とし込み方</p>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">45分</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-gray-600">5</td>
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium text-gray-800">ビジネス分析における生成AI活用②</p>
                    <p className="text-xs text-gray-500 mt-1">需要予測やキーワード提案の仕組み、AIを用いたコンテンツ制作の効率化、KPI設計サポートと改善サイクル</p>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">40分</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-gray-600">6</td>
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium text-gray-800">プロンプト最適化の応用事例とリスク管理</p>
                    <p className="text-xs text-gray-500 mt-1">高度なプロンプト設計のテクニック、不適切回答やバイアス、セキュリティリスクの扱い、今後のアップデートや技術トレンドの追い方</p>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">30分</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-gray-600">7</td>
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium text-gray-800">小テスト：AI活用・プロンプトエンジニアリング総復習</p>
                    <p className="text-xs text-gray-500 mt-1">選択式＋記述式問題、理解度チェックと再学習を推奨</p>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">20分</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 bg-blue-50 p-4 rounded-md">
            <h4 className="font-semibold text-gray-800 mb-2">eラーニングの学習の流れ</h4>
            <ol className="space-y-2 text-gray-700 list-decimal ml-5">
              <li>各モジュールで15～45分程度の講義動画を見ながら、要点を習得</li>
              <li>事例集やチェックリストをPDFでダウンロード、社内検討や復習に活用</li>
              <li>学習の定着度を測定し、苦手分野を把握 → Zoom講義での質問に備える</li>
            </ol>
          </div>
        </div>
        
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <HiOutlineUserGroup className="text-green-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Zoomオンライン講義（4時間）</h3>
          </div>
          
          <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-200">
              <div className="p-5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full text-green-700 font-semibold mr-3">1</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">オリエンテーション</h4>
                      <p className="text-sm text-gray-600">講師自己紹介・研修ゴール設定、受講者の自己紹介や学習目的共有</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">約15分</span>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full text-green-700 font-semibold mr-3">2</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">プロンプトエンジニアリングの復習・質疑応答</h4>
                      <p className="text-sm text-gray-600">eラーニング要点を振り返りつつ、応用的なプロンプト最適化技術を補足、受講者が抱える疑問・課題を講師が丁寧に回答</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">約60分</span>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full text-green-700 font-semibold mr-3">3</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">ケーススタディ・演習</h4>
                      <p className="text-sm text-gray-600">例：「AIで市場分析→ペルソナ設定→KPI設計→コンテンツ案作成」をグループワーク、プロンプトを実際に考案し、AI出力を評価・再調整</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">約60分</span>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full text-green-700 font-semibold mr-3">4</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">業務改善・DX推進計画の立案</h4>
                      <p className="text-sm text-gray-600">AI導入ステップやPoC設計、社内教育・リスク管理などを紹介、助成金（事業展開等リスキリング支援コース）の要件や申請手続きの概略説明</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">約30分</span>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full text-green-700 font-semibold mr-3">5</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">質疑応答・まとめ</h4>
                      <p className="text-sm text-gray-600">研修全体の振り返り、今後の追加学習・フォローアップ案内、他コースや追加コンサルティングのオプションを提案</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">約15分</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <div className="bg-indigo-100 p-2 rounded-full mr-3">
              <HiOutlineBookOpen className="text-indigo-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">全体スケジュール</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-2 px-3 text-left text-sm font-semibold text-gray-700">期間</th>
                  <th className="py-2 px-3 text-left text-sm font-semibold text-gray-700">学習ステップ</th>
                  <th className="py-2 px-3 text-left text-sm font-semibold text-gray-700">備考</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-3 text-sm text-gray-700">実施前（～2週間）</td>
                  <td className="py-2 px-3 text-sm text-gray-700">受講者リスト確定、eラーニング案内</td>
                  <td className="py-2 px-3 text-sm text-gray-600">LMSアカウント発行・資料DL方法案内</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-3 text-sm text-gray-700">第1週</td>
                  <td className="py-2 px-3 text-sm text-gray-700">eラーニング：モジュール1～3（計約2時間）視聴</td>
                  <td className="py-2 px-3 text-sm text-gray-600">AIモデル選択・プロンプト基礎を学ぶ</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-3 text-sm text-gray-700">第2週</td>
                  <td className="py-2 px-3 text-sm text-gray-700">eラーニング：モジュール4～7（計約3～4時間）視聴</td>
                  <td className="py-2 px-3 text-sm text-gray-600">ビジネス分析事例やリスク管理を学習。小テストで理解度確認</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-3 text-sm text-gray-700">第3週</td>
                  <td className="py-2 px-3 text-sm text-gray-700">Zoomオンライン講義（4時間）</td>
                  <td className="py-2 px-3 text-sm text-gray-600">ケース演習・質疑応答中心。録画対応も検討可</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-sm text-gray-700">研修終了後</td>
                  <td className="py-2 px-3 text-sm text-gray-700">アンケート回収、修了証発行（必要に応じ）</td>
                  <td className="py-2 px-3 text-sm text-gray-600">希望者へフォローアップ・個別相談。助成金申請サポートも実施</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
} 