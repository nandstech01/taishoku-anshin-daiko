import React from 'react';
import { DiagnosisResult as DiagnosisResultType } from '@/types/diagnosis';
import ChartSection from '../ChartSection';
import { personalityTraits } from '@/data/personality-definitions';
import { riasecTypes } from '@/data/riasec-definitions';
import { careerCategories, affinityLevels } from '@/data/career-definitions';
import { gallupCategoryDescriptions, engagementLevelDescriptions } from '@/data/gallup-definitions';

interface DiagnosisResultProps {
  result: DiagnosisResultType;
}

export default function DiagnosisResult({ result }: DiagnosisResultProps) {
  // パーソナリティ特性の詳細を取得
  const getPersonalityDetails = (trait: keyof typeof personalityTraits, score: number) => {
    const level = score > 4 ? 'high' : 'low';
    return personalityTraits[trait][level];
  };

  // キャリア親和性のソート
  const sortedCareerAffinity = Object.entries(result.careerAffinity)
    .sort(([, a], [, b]) => b.score - a.score);

  return (
    <div className="max-w-4xl mx-auto">
      {/* 総合スコアと概要 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">診断結果サマリー</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">エンゲージメントレベル</h3>
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {engagementLevelDescriptions[result.engagement.engagementLevel].description}
            </div>
            <p className="text-gray-600">
              スコア: {result.engagement.overallScore.toFixed(1)} / 5.0
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">ストレスレベル</h3>
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {result.stress.riskLevel === 'low' ? '健全' :
               result.stress.riskLevel === 'moderate' ? '要注意' : '要対策'}
            </div>
            <p className="text-gray-600">
              スコア: {result.stress.total.toFixed(1)} / 5.0
            </p>
          </div>
        </div>
      </section>

      {/* チャートセクション */}
      <section className="mb-12">
        <ChartSection answers={{}} /> {/* TODO: 適切なデータを渡す */}
      </section>

      {/* パーソナリティ分析の詳細 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">パーソナリティ特性</h2>
        <div className="space-y-6">
          {Object.entries(result.bigFive).map(([trait, score]) => {
            const details = getPersonalityDetails(trait as keyof typeof personalityTraits, score);
            return (
              <div key={trait} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">
                  {personalityTraits[trait as keyof typeof personalityTraits].name}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">特徴</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      {details.traits.map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">強み</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      {details.strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* キャリア適性の詳細 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">キャリア適性分析</h2>
        <div className="space-y-6">
          {sortedCareerAffinity.map(([category, data]) => (
            <div key={category} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-lg font-semibold">{data.name}</h3>
                <span className={`${
                  affinityLevels[data.level].color
                } text-sm font-medium`}>
                  {affinityLevels[data.level].label}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{data.description}</p>
              <div className="flex flex-wrap gap-2">
                {data.keywords.map((keyword, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* エンゲージメント分析の詳細 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">職場エンゲージメント分析</h2>
        <div className="space-y-6">
          {Object.entries(result.engagement.categoryScores).map(([category, data]) => (
            <div key={category} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">
                {gallupCategoryDescriptions[category as keyof typeof gallupCategoryDescriptions]}
              </h3>
              <div className="mb-4">
                <div className="text-2xl font-bold text-blue-600">
                  {data.score.toFixed(1)} / 5.0
                </div>
              </div>
              {data.strengths.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">強み</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {data.strengths.map((strength, i) => (
                      <li key={i}>{strength}</li>
                    ))}
                  </ul>
                </div>
              )}
              {data.areas_for_improvement.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">改善ポイント</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {data.areas_for_improvement.map((area, i) => (
                      <li key={i}>{area}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 推奨アクション */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">推奨アクション</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-4">
            {result.engagement.recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                  {i + 1}
                </div>
                <p className="text-gray-700">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 