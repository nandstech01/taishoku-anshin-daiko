import React from 'react';
import { HiDocumentText, HiSparkles, HiLightBulb, HiUserGroup } from 'react-icons/hi';

export default function TargetAudienceSection() {
  return (
    <section className="w-full py-16 sm:py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 leading-tight text-gray-800 text-center">
          対象者・想定受講者像
        </h2>
        
        <p className="text-center text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
          本コースは、プログラミングや高度なIT知識がなくても受講可能な設計です。
          AIツールを活用した実践的なコンテンツ制作や、キーワード分析・リライト手法を中心に学び、
          実務に直結するスキルを身につけます。
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          {/* WEBコンテンツ担当者 */}
          <div className="flex">
            <div className="mr-5 flex-shrink-0">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-green-100">
                <HiDocumentText className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">WEBコンテンツ制作者・ライター・編集者</h3>
              <ul className="space-y-2 text-gray-700 list-disc ml-5">
                <li>コンテンツ制作をより効率的に行い、AIで工数削減や品質向上を図りたい方</li>
                <li>新しいライティング方法やリライト技術に興味がある方</li>
                <li>AIツールを活用してクリエイティブな作業に時間を割きたい方</li>
              </ul>
            </div>
          </div>
          
          {/* マーケティング担当 */}
          <div className="flex">
            <div className="mr-5 flex-shrink-0">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-100">
                <HiSparkles className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">マーケティング担当・広報活動実践者</h3>
              <ul className="space-y-2 text-gray-700 list-disc ml-5">
                <li>ブログ・メディア・SNSなどの運用に関わっている方</li>
                <li>戦略的なコンテンツ企画やキーワード分析をAIで効率化したい方</li>
                <li>コンテンツマーケティングの効果を最大化したいと考えている方</li>
              </ul>
            </div>
          </div>
          
          {/* 新規プロジェクト実践者 */}
          <div className="flex">
            <div className="mr-5 flex-shrink-0">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-purple-100">
                <HiLightBulb className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">新規プロジェクト実践者・フリーランス</h3>
              <ul className="space-y-2 text-gray-700 list-disc ml-5">
                <li>新しいWEBメディアを立ち上げたい、もしくは既存メディアを改善したい方</li>
                <li>AIツールを活用し、個人でも高品質なコンテンツを制作したい方</li>
                <li>限られたリソースで最大の効果を出すコンテンツ戦略を探っている方</li>
              </ul>
            </div>
          </div>
          
          {/* キャリアアップ希望者 */}
          <div className="flex">
            <div className="mr-5 flex-shrink-0">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-yellow-100">
                <HiUserGroup className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">キャリアアップ希望者・転職検討者</h3>
              <ul className="space-y-2 text-gray-700 list-disc ml-5">
                <li>デジタルスキルを磨いて市場価値を高めたい方</li>
                <li>AIツールの活用スキルを身につけたい方</li>
                <li>コンテンツ制作やマーケティングの分野でスキルアップしたい方</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-16 bg-blue-50 rounded-xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">学習時間と実施形式</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-blue-800 mb-2">eラーニング（6時間）</h4>
              <ul className="space-y-1 text-gray-700 list-disc ml-5">
                <li>オンライン動画講義・スライド・確認テストで基礎知識をインプット</li>
                <li>AIライティングやキーワード分析、ペルソナ設計などを座学中心で習得</li>
                <li>自分のペースで学習でき、繰り返し復習可能</li>
              </ul>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-blue-800 mb-2">Zoomオンライン講義（4時間）</h4>
              <ul className="space-y-1 text-gray-700 list-disc ml-5">
                <li>講師とリアルタイムでやり取りし、演習やケーススタディを通じて実践力を強化</li>
                <li>受講者の疑問点を解消しつつ、実践的ノウハウを深める</li>
                <li>個人ワークで実際にAIツールを使ったコンテンツ制作を体験</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 