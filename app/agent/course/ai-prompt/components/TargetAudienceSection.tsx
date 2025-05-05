import React from 'react';
import { HiUserCircle, HiDesktopComputer, HiLightBulb, HiOfficeBuilding } from 'react-icons/hi';

export default function TargetAudienceSection() {
  return (
    <section className="w-full py-16 sm:py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 leading-tight text-gray-800 text-center">
          対象者・想定受講者像
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 sm:p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <HiUserCircle className="text-3xl text-blue-600 mr-4" aria-hidden="true" />
              <h3 className="text-xl font-bold text-gray-800">マーケティング／企画に関わる方</h3>
            </div>
            <ul className="space-y-2 text-gray-700 list-disc ml-8">
              <li>市場分析・競合調査・ペルソナ設定・コンテンツ作成などにAIを導入したい</li>
              <li>AIを活用してキャリアアップやスキルアップを目指したい</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 sm:p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <HiDesktopComputer className="text-3xl text-green-600 mr-4" aria-hidden="true" />
              <h3 className="text-xl font-bold text-gray-800">IT／デジタル関連の業務に携わる方</h3>
            </div>
            <ul className="space-y-2 text-gray-700 list-disc ml-8">
              <li>既存システムやツールとの連携を考慮しつつ、最適なAIモデルを選定・導入・運用したい</li>
              <li>AI技術を深く理解し、プロンプトエンジニアリングの基礎～応用まで学びたい</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 sm:p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <HiLightBulb className="text-3xl text-yellow-600 mr-4" aria-hidden="true" />
              <h3 className="text-xl font-bold text-gray-800">個人事業主・フリーランス・副業実践者</h3>
            </div>
            <ul className="space-y-2 text-gray-700 list-disc ml-8">
              <li>生成AIを活用した製品・サービス企画や業務効率化を図りたい</li>
              <li>実験段階から本格導入までの流れを把握し、自分の活動でのAI活用を促進したい</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 sm:p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <HiOfficeBuilding className="text-3xl text-purple-600 mr-4" aria-hidden="true" />
              <h3 className="text-xl font-bold text-gray-800">キャリアチェンジ希望者・転職準備中の方</h3>
            </div>
            <ul className="space-y-2 text-gray-700 list-disc ml-8">
              <li>AIを活用したプロジェクト計画や意思決定を行うために、プロンプトエンジニアリングの重要性を理解したい</li>
              <li>AI導入に伴うリスク管理や活用方法のポイントを把握し、実践的なスキルを身につけたい</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 p-6 bg-blue-50 rounded-lg text-center">
          <p className="text-lg text-gray-700">
            本コースはプログラミング初心者から中級者まで幅広く対応し、生成AIやプロンプトエンジニアリングの専門用語をわかりやすく解説します。
            実践的な事例や演習も多く取り入れ、様々な目的や背景を持つ方に有益な学びを提供いたします。
          </p>
        </div>
      </div>
    </section>
  );
} 