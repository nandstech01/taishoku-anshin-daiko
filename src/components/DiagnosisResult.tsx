import React from 'react';
import { DiagnosisResult as DiagnosisResultType } from '@/types/diagnosis';
import { Star } from 'lucide-react';
import { Radar, Bar } from 'react-chartjs-2';
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
} from 'chart.js';

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

interface DiagnosisResultProps {
  result: DiagnosisResultType;
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

export default function DiagnosisResult({ result }: DiagnosisResultProps) {
  // レーダーチャートのデータ
  const personalityData = {
    labels: Object.values(bigFiveLabels),
    datasets: [{
      label: 'パーソナリティ特性',
      data: Object.values(result.bigFive),
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 2,
    }]
  };

  const careerData = {
    labels: Object.values(riasecLabels),
    datasets: [{
      label: '職業興味',
      data: Object.values(result.riasec),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
    }]
  };

  const radarOptions = {
    scales: {
      r: {
        min: 0,
        max: 7,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800">総合診断結果</h1>
        </div>
        <div className="bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full">
          AI分析レポート
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* パーソナリティ分析 */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4 text-gray-800">パーソナリティ特性</h2>
          <div className="aspect-square">
            <Radar 
              data={personalityData} 
              options={{
                ...radarOptions,
                animation: {
                  duration: 800,
                  easing: 'easeInOutQuart'
                }
              }}
            />
          </div>
        </div>

        {/* 職業興味分析 */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4 text-gray-800">職業興味分析</h2>
          <div className="aspect-square">
            <Radar 
              data={careerData} 
              options={{
                ...radarOptions,
                scales: {
                  r: {
                    min: 0,
                    max: 5,
                    ticks: {
                      stepSize: 1,
                    },
                  },
                },
                animation: {
                  duration: 800,
                  easing: 'easeInOutQuart'
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* ストレスとエンゲージメント */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-xl">
          <div className="flex items-center gap-4 mb-6">
            <Star className="w-12 h-12 text-yellow-400 fill-yellow-400" />
            <div>
              <div className="text-4xl font-bold text-blue-600">
                {result.stress.total.toFixed(1)}
              </div>
              <div className="text-gray-600">ストレスレベル</div>
            </div>
          </div>
          <div className="space-y-4">
            {result.stress.recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                  {i + 1}
                </div>
                <p className="text-gray-700">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl">
          <div className="flex items-center gap-4 mb-6">
            <Star className="w-12 h-12 text-yellow-400 fill-yellow-400" />
            <div>
              <div className="text-4xl font-bold text-blue-600">
                {result.engagement.overallScore.toFixed(1)}
              </div>
              <div className="text-gray-600">エンゲージメントスコア</div>
            </div>
          </div>
          <div className="space-y-4">
            {Object.entries(result.engagement.categoryScores).map(([category, data]) => (
              <div key={category} className="flex items-center gap-2">
                <div className="w-32 text-sm text-gray-600">{category}</div>
                <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${(data.score / 5) * 100}%` }}
                  />
                </div>
                <div className="w-12 text-sm text-gray-600">{data.score.toFixed(1)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-600">
        <p className="text-lg mb-2">AI診断システムによる分析結果です</p>
        <p>
          より詳細な診断結果とキャリアアドバイスについては
          <a href="/diagnosis/detail" className="text-blue-600 hover:underline">
            こちら
          </a>
          をご覧ください
        </p>
      </div>
    </div>
  );
} 