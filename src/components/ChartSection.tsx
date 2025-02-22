"use client";

import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Radar, Bar } from "react-chartjs-2";
import { DiagnosisAnswer, DiagnosisResult, GallupCategory } from "@/types/diagnosis";

// Chart.js のプラグイン登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

interface ChartSectionProps {
  answers: DiagnosisAnswer;
}

// Big Five の因子名と日本語ラベルのマッピング
const bigFiveLabels = {
  extraversion: "外向性",
  agreeableness: "協調性",
  conscientiousness: "誠実性",
  neuroticism: "神経症的傾向",
  openness: "開放性"
};

// RIASEC の職業興味領域と日本語ラベルのマッピング
const riasecLabels = {
  realistic: "現実的",
  investigative: "研究的",
  artistic: "芸術的",
  social: "社会的",
  enterprising: "企業的",
  conventional: "慣習的"
};

export default function ChartSection({ answers }: ChartSectionProps) {
  const [activeTab, setActiveTab] = useState<"personality" | "career" | "stress">("personality");

  // 診断結果の計算
  const calculateResults = (): DiagnosisResult => {
    const result: DiagnosisResult = {
      bigFive: {
        extraversion: 0,
        agreeableness: 0,
        conscientiousness: 0,
        neuroticism: 0,
        openness: 0
      },
      riasec: {
        realistic: 0,
        investigative: 0,
        artistic: 0,
        social: 0,
        enterprising: 0,
        conventional: 0
      },
      stress: {
        total: 0,
        factors: [],
        riskLevel: 'low' as const,
        recommendations: [
          "現在のストレスレベルは健全な範囲です",
          "定期的なセルフチェックを継続してください"
        ]
      },
      engagement: {
        overallScore: 0,
        categoryScores: {
          basic_needs: {
            score: 0,
            questions: [],
            strengths: [],
            areas_for_improvement: []
          },
          management_support: {
            score: 0,
            questions: [],
            strengths: [],
            areas_for_improvement: []
          },
          teamwork: {
            score: 0,
            questions: [],
            strengths: [],
            areas_for_improvement: []
          },
          growth: {
            score: 0,
            questions: [],
            strengths: [],
            areas_for_improvement: []
          },
          purpose: {
            score: 0,
            questions: [],
            strengths: [],
            areas_for_improvement: []
          },
          development: {
            score: 0,
            questions: [],
            strengths: [],
            areas_for_improvement: []
          },
          relationships: {
            score: 0,
            questions: [],
            strengths: [],
            areas_for_improvement: []
          },
          management: {
            score: 0,
            questions: [],
            strengths: [],
            areas_for_improvement: []
          },
          environment: {
            score: 0,
            questions: [],
            strengths: [],
            areas_for_improvement: []
          }
        },
        engagementLevel: 'not_engaged' as const,
        recommendations: []
      },
      careerAffinity: {
        tech: {
          score: 0,
          level: 'exploring',
          name: "IT・テクノロジー",
          description: "デジタル技術で未来を創造する",
          keywords: ["システム開発", "AI", "クラウド", "データ分析"]
        }
      }
    };

    // TIPI (Big Five) のスコア計算
    Object.entries(answers).forEach(([id, value]) => {
      if (id.startsWith("TIPI")) {
        const questionNumber = parseInt(id.replace("TIPI", ""));
        if (questionNumber <= 5) {
          // 肯定的な質問
          const factor = Object.keys(result.bigFive)[questionNumber - 1] as keyof typeof result.bigFive;
          result.bigFive[factor] = value;
        } else {
          // 否定的な質問（逆転項目）
          const factor = Object.keys(result.bigFive)[questionNumber - 6] as keyof typeof result.bigFive;
          // 逆転項目の計算を修正
          const reversedScore = 8 - value;
          result.bigFive[factor] = result.bigFive[factor] === 0 
            ? reversedScore 
            : (result.bigFive[factor] + reversedScore) / 2;
        }
      }
    });

    // RIASEC のスコア計算（正規化を追加）
    Object.entries(answers).forEach(([id, value]) => {
      if (id.startsWith("RIASEC_")) {
        const factor = id.split("_")[1].toLowerCase() as keyof typeof result.riasec;
        result.riasec[factor] = value;
      }
    });

    // ストレス要因のスコア計算と詳細な分析
    const stressScores = Object.entries(answers)
      .filter(([id]) => id.startsWith("STRESS"))
      .map(([, value]) => value);
    
    result.stress.factors = stressScores;
    const avgStressScore = stressScores.reduce((sum, score) => sum + score, 0) / stressScores.length;
    result.stress.total = avgStressScore;

    // ストレスレベルの判定基準を調整
    result.stress.riskLevel = 
      avgStressScore >= 4.5 ? 'high' :
      avgStressScore >= 3.5 ? 'moderate' :
      'low';

    // ストレス要因に基づく推奨事項
    result.stress.recommendations = [
      avgStressScore >= 4.5 
        ? "早急なストレス軽減対策が必要です"
        : avgStressScore >= 3.5
        ? "ストレス要因の特定と対策を検討してください"
        : "現在のストレス管理を継続してください",
      stressScores[0] <= 3 ? "業務量の適正化を検討してください" : "",
      stressScores[1] <= 3 ? "意思決定への参加機会を増やすことを提案してください" : "",
      stressScores[2] <= 3 ? "職場の人間関係改善のための施策を検討してください" : "",
      stressScores[3] <= 3 ? "ワークライフバランスの改善を優先してください" : ""
    ].filter(Boolean);

    // エンゲージメントのスコア計算
    const engagementScores = Object.entries(answers)
      .filter(([id]) => id.startsWith("GALLUP"))
      .map(([, value]) => value);
    
    // カテゴリーごとのスコアを計算
    const categoryScores = {
      basic_needs: engagementScores.slice(0, 2),
      management_support: engagementScores.slice(2, 4),
      teamwork: engagementScores.slice(4, 6),
      growth: engagementScores.slice(6, 8)
    };

    // 各カテゴリーのスコアを設定
    Object.entries(categoryScores).forEach(([category, scores]) => {
      const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      result.engagement.categoryScores[category as GallupCategory].score = avgScore;
      result.engagement.categoryScores[category as GallupCategory].questions = scores;

      // 強みと改善点の設定
      if (avgScore >= 4) {
        result.engagement.categoryScores[category as GallupCategory].strengths.push(
          category === 'basic_needs' ? "基本的なニーズが十分に満たされています" :
          category === 'management_support' ? "マネジメントからの適切なサポートがあります" :
          category === 'teamwork' ? "チームワークが良好です" :
          "成長機会が十分に提供されています"
        );
      } else if (avgScore <= 3) {
        result.engagement.categoryScores[category as GallupCategory].areas_for_improvement.push(
          category === 'basic_needs' ? "基本的なニーズの充足が必要です" :
          category === 'management_support' ? "マネジメントサポートの強化が必要です" :
          category === 'teamwork' ? "チームワークの改善が必要です" :
          "成長機会の創出が必要です"
        );
      }
    });

    // 全体的なエンゲージメントスコアを計算
    result.engagement.overallScore = engagementScores.reduce((sum, score) => sum + score, 0) / engagementScores.length;

    // エンゲージメントレベルを決定（基準を調整）
    result.engagement.engagementLevel = 
      result.engagement.overallScore >= 4.5 ? 'highly_engaged' :
      result.engagement.overallScore >= 3.5 ? 'engaged' :
      result.engagement.overallScore >= 2.5 ? 'not_engaged' :
      'actively_disengaged';

    return result;
  };

  const results = calculateResults();

  // Big Five のレーダーチャートデータ
  const bigFiveData = {
    labels: Object.values(bigFiveLabels),
    datasets: [
      {
        label: "パーソナリティスコア",
        data: Object.values(results.bigFive),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // RIASEC のレーダーチャートデータ
  const riasecData = {
    labels: Object.values(riasecLabels),
    datasets: [
      {
        label: "職業興味スコア",
        data: Object.values(results.riasec),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // ストレス・エンゲージメントのバーチャートデータ
  const workplaceData = {
    labels: ["仕事量", "裁量権", "人間関係", "ワークライフバランス"],
    datasets: [
      {
        label: "ストレス要因",
        data: results.stress.factors,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // エンゲージメントデータの更新
  const engagementData = {
    labels: ["基本的ニーズ", "マネジメントサポート", "チームワーク", "成長機会"],
    datasets: [
      {
        label: "エンゲージメント要因",
        data: Object.values(results.engagement.categoryScores).map(cat => cat.score),
        backgroundColor: "rgba(153, 102, 255, 0.5)",
      },
    ],
  };

  // チャートのオプション
  const radarOptions = {
    scales: {
      r: {
        min: 0,
        max: activeTab === "personality" ? 7 : 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto p-4">
      {/* タブ切り替え */}
      <div className="flex flex-wrap md:flex-nowrap gap-2 border-b overflow-x-auto pb-2 md:pb-0">
        <button
          className={`px-4 py-2 whitespace-nowrap transition-all duration-300 ${
            activeTab === "personality"
              ? "border-b-2 border-blue-500 text-blue-600 transform scale-105"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("personality")}
        >
          パーソナリティ
        </button>
        <button
          className={`px-4 py-2 whitespace-nowrap transition-all duration-300 ${
            activeTab === "career"
              ? "border-b-2 border-blue-500 text-blue-600 transform scale-105"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("career")}
        >
          職業興味
        </button>
        <button
          className={`px-4 py-2 whitespace-nowrap transition-all duration-300 ${
            activeTab === "stress"
              ? "border-b-2 border-blue-500 text-blue-600 transform scale-105"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("stress")}
        >
          職場分析
        </button>
      </div>

      {/* チャート表示エリア */}
      <div className="w-full transition-all duration-500 ease-in-out">
        {activeTab === "personality" && (
          <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
            <h3 className="text-lg font-bold mb-6 text-gray-800">
              パーソナリティ分析（Big Five）
            </h3>
            <div className="aspect-square md:aspect-[4/3] w-full max-w-2xl mx-auto">
              <Radar data={bigFiveData} options={{
                ...radarOptions,
                animation: {
                  duration: 800,
                  easing: 'easeInOutQuart'
                },
                responsive: true,
                maintainAspectRatio: true
              }} />
            </div>
          </div>
        )}

        {activeTab === "career" && (
          <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
            <h3 className="text-lg font-bold mb-6 text-gray-800">
              職業興味分析（RIASEC）
            </h3>
            <div className="aspect-square md:aspect-[4/3] w-full max-w-2xl mx-auto">
              <Radar data={riasecData} options={{
                ...radarOptions,
                animation: {
                  duration: 800,
                  easing: 'easeInOutQuart'
                },
                responsive: true,
                maintainAspectRatio: true
              }} />
            </div>
          </div>
        )}

        {activeTab === "stress" && (
          <div className="space-y-8">
            <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
              <h3 className="text-lg font-bold mb-6 text-gray-800">
                ストレス要因分析
              </h3>
              <div className="aspect-[3/2] w-full max-w-2xl mx-auto">
                <Bar data={workplaceData} options={{
                  ...barOptions,
                  animation: {
                    duration: 800,
                    easing: 'easeInOutQuart'
                  },
                  responsive: true,
                  maintainAspectRatio: true
                }} />
              </div>
            </div>
            
            <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
              <h3 className="text-lg font-bold mb-6 text-gray-800">
                エンゲージメント分析
              </h3>
              <div className="aspect-[3/2] w-full max-w-2xl mx-auto">
                <Bar data={engagementData} options={{
                  ...barOptions,
                  animation: {
                    duration: 800,
                    easing: 'easeInOutQuart'
                  },
                  responsive: true,
                  maintainAspectRatio: true
                }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 