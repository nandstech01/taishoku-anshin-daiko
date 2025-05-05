import React from 'react';
import { HiOutlineDocument, HiOutlineChat, HiOutlineAcademicCap, HiOutlineOfficeBuilding } from 'react-icons/hi';

export default function SupportSection() {
  return (
    <section className="w-full py-16 sm:py-20 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 leading-tight text-gray-800 text-center">
          講座のメリットと受講後サポート
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-2 bg-blue-600"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <HiOutlineDocument className="text-blue-600 text-xl" />
                </span>
                分析力・企画力の向上
              </h3>
              <ul className="pl-14 list-disc space-y-2 text-gray-700">
                <li>AIモデルを効果的に活用し、市場分析・ペルソナ設定などの作業を高品質・短時間で実行</li>
                <li>競合分析やSEOコンテンツ制作にも応用し、成果を見える化しやすい</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-2 bg-green-600"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <HiOutlineAcademicCap className="text-green-600 text-xl" />
                </span>
                効率化とスキル向上
              </h3>
              <ul className="pl-14 list-disc space-y-2 text-gray-700">
                <li>最適化したプロンプトによりリサーチやアイデア創出をスピードアップ</li>
                <li>AI活用の仕組みを理解し、自分の活動やプロジェクトに応用できる基盤を作る</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-2 bg-purple-600"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <HiOutlineOfficeBuilding className="text-purple-600 text-xl" />
                </span>
                キャリアチェンジの可能性
              </h3>
              <ul className="pl-14 list-disc space-y-2 text-gray-700">
                <li>市場価値の高いAIスキルを習得し、転職やキャリアアップに活かせる</li>
                <li>副業やフリーランスとしても活用できる実践的なスキルを身につける</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-2 bg-yellow-600"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                  <HiOutlineChat className="text-yellow-600 text-xl" />
                </span>
                実践直結のハイブリッド学習
              </h3>
              <ul className="pl-14 list-disc space-y-2 text-gray-700">
                <li>eラーニング＋Zoom講義で、理論から実践演習まで通して学習可能</li>
                <li>修了後のフォローアップも充実し、実際の活用をサポートする体制も整備</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mb-14">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">受講後のフォローアップと追加サポート</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex">
              <div className="bg-blue-100 p-3 rounded-full h-14 w-14 flex items-center justify-center flex-shrink-0">
                <HiOutlineDocument className="text-blue-600 text-2xl" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800 mb-1">修了アンケート・個別フィードバック</h4>
                <p className="text-gray-600 text-sm">受講者の声・要望を集約し、必要に応じて個別コーチングを提供</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="bg-green-100 p-3 rounded-full h-14 w-14 flex items-center justify-center flex-shrink-0">
                <HiOutlineAcademicCap className="text-green-600 text-2xl" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800 mb-1">学習コミュニティ参加</h4>
                <p className="text-gray-600 text-sm">AI活用やプロンプトエンジニアリングをテーマに、受講者同士が交流できるコミュニティと追加資料提供</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="bg-purple-100 p-3 rounded-full h-14 w-14 flex items-center justify-center flex-shrink-0">
                <HiOutlineChat className="text-purple-600 text-2xl" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800 mb-1">他コースへのステップアップ</h4>
                <p className="text-gray-600 text-sm">「AIリテラシー基礎習得講座」「AIエキスパートコース」などでスキルを拡大</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="bg-yellow-100 p-3 rounded-full h-14 w-14 flex items-center justify-center flex-shrink-0">
                <HiOutlineOfficeBuilding className="text-yellow-600 text-2xl" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800 mb-1">実践プロジェクトサポート</h4>
                <p className="text-gray-600 text-sm">自分のプロジェクトや仕事での活用に関するアドバイス、最新のAI活用トレンドや情報を共有</p>
              </div>
            </div>
          </div>
        </div>
        

      </div>
    </section>
  );
} 