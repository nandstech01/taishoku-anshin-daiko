import { redirect } from "next/navigation";
import { Suspense } from "react";
import UnifiedDiagnosisResult from "@/components/diagnosis/UnifiedDiagnosisResult";
import ShareButtons from "@/components/ShareButtons";
import AIAnalysisLoader from "@/components/diagnosis/AIAnalysisLoader";
import { DiagnosisAnswer, DiagnosisResult as BaseResult, GallupCategory } from "@/types/diagnosis";
import Anthropic from "@anthropic-ai/sdk";
import { headers } from "next/headers";
import { analyzeAnswers as analyzeDiagnosisAnswers } from "@/utils/diagnosis-analyzer";
import { questions } from "@/data/questions";
import { personalityTraits } from "@/data/personality-definitions";
import { riasecTypes } from "@/data/riasec-definitions";
import { gallupCategoryDescriptions } from "@/data/gallup-definitions";

type PersonalityTrait = keyof typeof personalityTraits;
type RiasecType = keyof typeof riasecTypes;

type SimplifiedResult = {
  bigFive: Record<PersonalityTrait, number>;
  riasec: Record<RiasecType, number>;
  stress: {
    total: number;
    riskLevel: 'low' | 'moderate' | 'high';
    recommendations: string[];
  };
  engagement: {
    overallScore: number;
    engagementLevel: string;
    recommendations: string[];
  };
};

function convertToSimplifiedResult(result: BaseResult): SimplifiedResult {
  return {
    bigFive: {
      extraversion: result.bigFive.extraversion,
      agreeableness: result.bigFive.agreeableness,
      conscientiousness: result.bigFive.conscientiousness,
      neuroticism: result.bigFive.neuroticism,
      openness: result.bigFive.openness,
    },
    riasec: {
      R: result.riasec.realistic,
      I: result.riasec.investigative,
      A: result.riasec.artistic,
      S: result.riasec.social,
      E: result.riasec.enterprising,
      C: result.riasec.conventional,
    },
    stress: {
      total: result.stress.total,
      riskLevel: result.stress.riskLevel,
      recommendations: result.stress.recommendations,
    },
    engagement: {
      overallScore: result.engagement.overallScore,
      engagementLevel: result.engagement.engagementLevel,
      recommendations: result.engagement.recommendations,
    },
  };
}

// Anthropic設定
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || ''
});

// キャッシュを無効化
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// リファラーを取得する関数
function getReferrer() {
  const headersList = headers();
  return headersList.get('referer') || '/blog';
}

async function analyzeAnswers(answers: DiagnosisAnswer, result: BaseResult) {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('ANTHROPIC_API_KEY is not set');
    return generateDefaultAnalysis(convertToSimplifiedResult(result));
  }

  const simplifiedResult = convertToSimplifiedResult(result);
  const systemPrompt = `
  あなたは組織心理学と統計分析の専門家です。
  以下の診断結果を分析し、具体的なアドバイスを提供してください。
  スコアは特に明記がない限り、1-5の範囲で評価され、3が平均値です。

  1. パーソナリティ特性（Big Five）:
  ${Object.entries(simplifiedResult.bigFive).map(([trait, score]) => 
    `- ${personalityTraits[trait as PersonalityTrait].name}: ${score.toFixed(1)} (平均より${score < 3 ? '低い' : '高い'})`
  ).join('\n')}

  2. 職業興味（RIASEC）:
  ${Object.entries(simplifiedResult.riasec).map(([type, score]) => 
    `- ${riasecTypes[type as RiasecType].name}: ${score.toFixed(1)}`
  ).join('\n')}

  3. ストレスレベル: ${simplifiedResult.stress.total.toFixed(1)} (1-5の範囲、高いほどストレスが高い)
  リスクレベル: ${simplifiedResult.stress.riskLevel}

  4. エンゲージメント: ${simplifiedResult.engagement.overallScore.toFixed(1)} (1-5の範囲)
  レベル: ${simplifiedResult.engagement.engagementLevel}
  `;

  const userPrompt = `
  上記の診断結果を元に、以下の観点から具体的な分析とアドバイスを提供してください：

  1. パーソナリティ特性の分析
  - 特に顕著な特性（平均から1ポイント以上離れているもの）に注目
  - それらの特性が仕事や人間関係にどう影響するか
  - 特性を活かせる職種や働き方の具体的な提案

  2. キャリア開発の方向性
  - RIASECスコアに基づく具体的な職種提案
  - 現在の職場環境との適合性分析
  - 優先的に開発すべきスキルの提案

  3. ストレス管理の具体策
  - ストレスレベルの詳細な分析
  - 優先的に対処すべき要因の特定
  - 具体的な改善アクションプラン

  4. エンゲージメント向上のための提案
  - 現状の具体的な課題
  - 短期的に実行可能な改善アクション
  - 上司やHRとの建設的な対話ポイント

  回答は以下の点に注意して作成してください：
  - 具体的な数値や事実に基づいた分析
  - 実行可能で具体的な改善提案
  - 前向きで建設的な表現の使用
  - 箇条書きを活用した読みやすい構成
  `;

  try {
    const message = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 2000,
      temperature: 0.3,
      messages: [
        {
          role: "user",
          content: `${systemPrompt}\n\n${userPrompt}`
        }
      ]
    });

    if (message.content[0].type === 'text') {
      return message.content[0].text;
    }
    return generateDefaultAnalysis(convertToSimplifiedResult(result));
  } catch (error) {
    console.error('AI Analysis Error:', error);
    return generateDefaultAnalysis(convertToSimplifiedResult(result));
  }
}

function generateDefaultAnalysis(result: SimplifiedResult) {
  const analysis = [];
  
  // パーソナリティ分析
  const traits = Object.entries(result.bigFive)
    .map(([trait, score]) => ({
      trait: trait as PersonalityTrait,
      score,
      name: personalityTraits[trait as PersonalityTrait].name,
      level: score >= 3 ? 'high' : 'low'
    }))
    .sort((a, b) => Math.abs(b.score - 3) - Math.abs(a.score - 3));

  const significantTraits = traits
    .filter(t => Math.abs(t.score - 3) >= 0.5)
    .map(t => ({
      ...t,
      details: personalityTraits[t.trait][t.level as 'high' | 'low']
    }));
  
  analysis.push(`【パーソナリティ特性の分析】
${significantTraits.length > 0 
  ? `■ 特徴的な性格特性
${significantTraits.map(t => `・${t.name}（スコア: ${t.score.toFixed(1)}）
  → ${t.details.traits.join('\n  → ')}`).join('\n')}

■ キャリアへの影響
${significantTraits.map(t => `・${t.details.careers[0]}`).join('\n')}`
  : '特に顕著な性格特性は見られません。バランスの取れた性格傾向を持っています。'}`);

  // キャリア適性
  const strongInterests = Object.entries(result.riasec)
    .map(([type, score]) => ({
      type: type as RiasecType,
      score,
      name: riasecTypes[type as RiasecType].name,
      details: riasecTypes[type as RiasecType]
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  
  analysis.push(`【キャリア適性の分析】
■ 適性が高い職業分野
${strongInterests.map(i => `・${i.name}（スコア: ${i.score.toFixed(1)}）
  → ${i.details.description}
  → おすすめの職種: ${i.details.examples.join('、')}`).join('\n')}

■ キャリア開発の方向性
${strongInterests.map(i => `・${i.details.strengths[0]}`).join('\n')}`);

  // ストレス分析
  const stressLevel = result.stress.total;
  const stressAnalysis = stressLevel >= 4 
    ? '現在のストレス状態は健全な範囲内です。'
    : stressLevel >= 3
    ? 'ストレスレベルに注意が必要です。'
    : '早急なストレス対策が必要です。';

  analysis.push(`【ストレス状態の分析】
■ 現状評価
・ストレススコア: ${stressLevel.toFixed(1)} / 5.0
・${stressAnalysis}

■ 改善のための具体的アクション
${result.stress.recommendations.map(r => `・${r}`).join('\n')}`);

  // エンゲージメント分析
  const engagementScore = result.engagement.overallScore;
  const engagementLevel = result.engagement.engagementLevel;
  
  const engagementAnalysis = {
    highly_engaged: {
      status: '非常に高いエンゲージメント状態',
      actions: [
        '現在の良好な状態を維持するための定期的な振り返り',
        'チーム全体のエンゲージメント向上への貢献',
        'さらなる成長機会の探索'
      ]
    },
    engaged: {
      status: '良好なエンゲージメント状態',
      actions: [
        '現在の強みを活かした役割の拡大',
        'チーム内でのポジティブな影響力の発揮',
        '定期的な1on1ミーティングの活用'
      ]
    },
    not_engaged: {
      status: '改善が必要なエンゲージメント状態',
      actions: [
        '上司との率直な対話による課題の共有',
        '具体的な改善目標の設定',
        'キャリア開発計画の見直し'
      ]
    },
    actively_disengaged: {
      status: '深刻なエンゲージメント低下',
      actions: [
        '早急な上司やHRとの面談設定',
        '現状の課題の明確化と改善プランの作成',
        'キャリアパスの再検討'
      ]
    }
  };

  const currentEngagement = engagementAnalysis[engagementLevel as keyof typeof engagementAnalysis] || engagementAnalysis.not_engaged;

  analysis.push(`【職場エンゲージメントの分析】
■ 現状評価
・エンゲージメントスコア: ${engagementScore.toFixed(1)} / 5.0
・状態: ${currentEngagement.status}

■ 推奨アクション
${currentEngagement.actions.map(action => `・${action}`).join('\n')}

■ 具体的な改善提案
${Array.from(new Set([
  ...result.engagement.recommendations,
  ...currentEngagement.actions
])).map(recommendation => `・${recommendation}`).join('\n')}`);

  return analysis.join('\n\n');
}

export default async function ResultPage({
  searchParams,
}: {
  searchParams?: Record<string, string | undefined>;
}) {
  const referrer = getReferrer();
  
  // データパラメータの存在チェック
  if (!searchParams?.data) {
    return (
      <div className="max-w-5xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">エラー</h1>
        <p>診断データが見つかりません。診断を最初からやり直してください。</p>
        <a href={referrer} className="text-blue-500 hover:underline mt-4 inline-block">
          前のページに戻る
        </a>
      </div>
    );
  }

  try {
    // デコードとJSONパースを試行
    const decoded = decodeURIComponent(searchParams.data);
    const answers = JSON.parse(decoded) as DiagnosisAnswer;
    
    // 回答データの基本的な構造チェック
    if (typeof answers !== 'object') {
      throw new Error('Invalid data format');
    }

    // 診断結果の分析
    const result = analyzeDiagnosisAnswers(questions, answers);

    return (
      <div className="w-full py-2 sm:py-4 px-0 sm:px-2">
        <h1 className="text-base sm:text-lg font-bold mb-4 px-2">総合診断結果</h1>

        <Suspense fallback={<AIAnalysisLoader />}>
          {/* 診断結果の表示 */}
          <UnifiedDiagnosisResult result={result} />

          {/* AIによるコメント */}
          <AnalysisSection answers={answers} result={result} />

          {/* 相談ボタン */}
          <div className="px-2 mt-8">
            <a
              href="https://lin.ee/h1kk42r"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center text-xl font-bold py-6 rounded-lg shadow-lg hover:from-orange-400 hover:to-orange-500 hover:shadow-xl transition-all transform hover:scale-[1.03] active:scale-[0.98] hover:brightness-110"
            >
              退職代行の無料相談をする
            </a>
          </div>

          {/* 再診断ボタン */}
          <div className="mt-8 text-center px-2">
            <a
              href="https://taishoku-anshin-daiko.com/"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              トップページに戻る
            </a>
          </div>
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error in ResultPage:', error);
    return (
      <div className="w-full py-2 sm:py-4 px-2">
        <h1 className="text-2xl font-bold mb-4">エラー</h1>
        <p>診断データの処理中にエラーが発生しました。診断を最初からやり直してください。</p>
        <a href={referrer} className="text-blue-500 hover:underline mt-4 inline-block">
          前のページに戻る
        </a>
      </div>
    );
  }
}

async function AnalysisSection({ answers, result }: { answers: DiagnosisAnswer; result: BaseResult }) {
  const analysisText = await analyzeAnswers(answers, result);

  return (
    <div className="mt-4 sm:mt-8 bg-white shadow-lg overflow-hidden">
      <div className="bg-blue-600 px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center gap-3">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-white"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0012 18a3.374 3.374 0 00-2.988-1.913l-.548-.547z" 
            />
          </svg>
          <h2 className="text-xl font-bold text-white">AI分析レポート</h2>
        </div>
      </div>
      
      <div className="px-4 sm:px-6 py-6 sm:py-8">
        <div className="prose prose-blue max-w-none space-y-8 sm:space-y-12">
          {analysisText.split('\n\n').map((section, index) => {
            const [title, ...content] = section.split('\n');
            const sectionTitle = title.replace(/【|】/g, '');
            
            return (
              <div key={index} className="group">
                <h3 className="text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                  <span className="text-blue-600 hidden">{index + 1}.</span>
                  {sectionTitle}
                </h3>
                <div className="text-gray-600 leading-relaxed space-y-4 sm:space-y-6">
                  {content.join('\n').split('■').map((part, i) => {
                    if (i === 0) return part;
                    const [subTitle, ...subContent] = part.trim().split('\n');
                    return (
                      <div key={i} className="bg-gray-50 rounded-lg p-4 sm:p-6">
                        <h4 className="text-base font-bold text-gray-900 mb-3 sm:mb-4">{subTitle}</h4>
                        <div className="space-y-2">
                          {subContent.map((line, j) => (
                            <p key={j} className="text-gray-600">{line}</p>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 