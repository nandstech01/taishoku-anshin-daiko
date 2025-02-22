import { personalityTraits } from '../data/personality-definitions';
import { riasecTypes } from '../data/riasec-definitions';
import { careerCategories, affinityLevels } from '../data/career-definitions';
import { gallupQuestions, categoryRelationships } from '../data/gallup-definitions';
import { 
  Question, 
  Answer, 
  PersonalityTrait, 
  RiasecType,
  GallupCategory,
  DiagnosisResult
} from '../types/diagnosis';

// Big Five の因子名と日本語ラベルのマッピング
export const bigFiveLabels = {
  extraversion: "外向性",
  agreeableness: "協調性",
  conscientiousness: "誠実性",
  neuroticism: "神経症的傾向",
  openness: "開放性"
};

// RIASEC の職業興味領域と日本語ラベルのマッピング
export const riasecLabels = {
  realistic: "現実的",
  investigative: "研究的",
  artistic: "芸術的",
  social: "社会的",
  enterprising: "企業的",
  conventional: "慣習的"
};

export function analyzeAnswers(questions: Question[], answers: Record<string, number>): DiagnosisResult {
  return {
    bigFive: calculatePersonalityScores(questions, answers),
    riasec: calculateRiasecScores(questions, answers),
    stress: analyzeStressFactors(questions, answers),
    engagement: analyzeEngagement(questions, answers),
    careerAffinity: calculateCareerAffinity(
      calculatePersonalityScores(questions, answers),
      calculateRiasecScores(questions, answers)
    )
  };
}

function calculatePersonalityScores(questions: Question[], answers: Record<string, number>): DiagnosisResult['bigFive'] {
  const result = {
    extraversion: 0,
    agreeableness: 0,
    conscientiousness: 0,
    neuroticism: 0,
    openness: 0
  };

  // TIPI (Big Five) のスコア計算
  Object.entries(answers).forEach(([id, value]) => {
    if (id.startsWith("TIPI")) {
      const questionNumber = parseInt(id.replace("TIPI", ""));
      if (questionNumber <= 5) {
        // 肯定的な質問
        const factor = Object.keys(result)[questionNumber - 1] as keyof typeof result;
        result[factor] = value;
      } else {
        // 否定的な質問（逆転項目）
        const factor = Object.keys(result)[questionNumber - 6] as keyof typeof result;
        // 逆転項目の計算を修正
        const reversedScore = 8 - value;
        result[factor] = result[factor] === 0 
          ? reversedScore 
          : (result[factor] + reversedScore) / 2;
      }
    }
  });

  return result;
}

function calculateRiasecScores(questions: Question[], answers: Record<string, number>): DiagnosisResult['riasec'] {
  const result = {
    realistic: 0,
    investigative: 0,
    artistic: 0,
    social: 0,
    enterprising: 0,
    conventional: 0
  };

  // RIASEC のスコア計算
  Object.entries(answers).forEach(([id, value]) => {
    if (id.startsWith("RIASEC_")) {
      const factor = id.split("_")[1].toLowerCase() as keyof typeof result;
      result[factor] = value;
    }
  });

  return result;
}

function analyzeStressFactors(questions: Question[], answers: Record<string, number>): DiagnosisResult['stress'] {
  // ストレス要因のスコア計算と詳細な分析
  const stressScores = Object.entries(answers)
    .filter(([id]) => id.startsWith("STRESS"))
    .map(([, value]) => value);
  
  const avgStressScore = stressScores.reduce((sum, score) => sum + score, 0) / stressScores.length;

  // ストレスレベルの判定
  const riskLevel = avgStressScore >= 4.5 ? 'high' :
                   avgStressScore >= 3.5 ? 'moderate' :
                   'low';

  return {
    total: avgStressScore,
    factors: stressScores,
    riskLevel,
    recommendations: generateStressRecommendations(riskLevel, stressScores)
  };
}

function analyzeEngagement(questions: Question[], answers: Record<string, number>): DiagnosisResult['engagement'] {
  // カテゴリーごとのスコアを初期化
  const categoryScores: Record<GallupCategory, number[]> = {
    basic_needs: [],
    management_support: [],
    teamwork: [],
    growth: [],
    purpose: [],
    development: [],
    relationships: [],
    management: [],
    environment: []
  };

  // 質問とカテゴリーの対応関係を定義
  const questionCategoryMap: Record<string, GallupCategory> = {
    GALLUP1: 'basic_needs',
    GALLUP2: 'basic_needs',
    GALLUP3: 'management_support',
    GALLUP4: 'management_support',
    GALLUP5: 'teamwork',
    GALLUP6: 'teamwork',
    GALLUP7: 'growth',
    GALLUP8: 'growth'
  };

  // スコアを適切なカテゴリーに割り当て
  Object.entries(answers)
    .filter(([id]) => id.startsWith("GALLUP"))
    .forEach(([id, value]) => {
      const category = questionCategoryMap[id];
      if (category) {
        // スコアを1-5のスケールに正規化
        const normalizedScore = Math.max(1, Math.min(5, value));
        categoryScores[category].push(normalizedScore);
      }
    });

  // 全体的なエンゲージメントスコアを計算
  const engagementScores = Object.entries(answers)
    .filter(([id]) => id.startsWith("GALLUP"))
    .map(([, value]) => Math.max(1, Math.min(5, value)));

  const overallScore = engagementScores.length > 0
    ? engagementScores.reduce((sum, score) => sum + score, 0) / engagementScores.length
    : 0;

  // 各カテゴリーの最終スコアを計算
  const processedCategoryScores = Object.entries(categoryScores).reduce((acc, [category, scores]) => {
    const currentCategory = category as GallupCategory;
    let finalScore = 0;

    if (scores.length > 0) {
      // 直接の質問からのスコア
      finalScore = scores.reduce((sum: number, score: number) => sum + score, 0) / scores.length;
    } else {
      // 関連カテゴリーからの推定スコア
      const relatedCategories = categoryRelationships[currentCategory].related;
      const relatedScores: number[] = [];
      
      relatedCategories.forEach((relatedCategory: GallupCategory) => {
        const relatedCategoryScores = categoryScores[relatedCategory];
        if (relatedCategoryScores.length > 0) {
          const avgScore = relatedCategoryScores.reduce((sum: number, score: number) => sum + score, 0) / relatedCategoryScores.length;
          // 関連カテゴリーからのスコアは0.8の重みを持つ
          relatedScores.push(avgScore * 0.8);
        }
      });

      if (relatedScores.length > 0) {
        finalScore = relatedScores.reduce((sum: number, score: number) => sum + score, 0) / relatedScores.length;
      } else {
        // デフォルトスコアとして全体の平均を使用
        finalScore = overallScore;
      }
    }

    // スコアを1-5の範囲に制限
    finalScore = Math.max(1, Math.min(5, finalScore));

    acc[currentCategory] = {
      score: finalScore,
      questions: scores,
      strengths: generateStrengths(currentCategory, finalScore),
      areas_for_improvement: generateImprovements(currentCategory, finalScore)
    };
    return acc;
  }, {} as DiagnosisResult['engagement']['categoryScores']);

  // エンゲージメントレベルを決定
  const engagementLevel = 
    overallScore >= 4.5 ? 'highly_engaged' :
    overallScore >= 3.5 ? 'engaged' :
    overallScore >= 2.5 ? 'not_engaged' :
    'actively_disengaged';

  return {
    overallScore,
    categoryScores: processedCategoryScores,
    engagementLevel,
    recommendations: generateEngagementRecommendations(processedCategoryScores, engagementLevel)
  };
}

function generateStressRecommendations(riskLevel: 'low' | 'moderate' | 'high', scores: number[]): string[] {
  const recommendations = [
    riskLevel === 'high'
      ? "早急なストレス軽減対策が必要です"
      : riskLevel === 'moderate'
      ? "ストレス要因の特定と対策を検討してください"
      : "現在のストレス管理を継続してください"
  ];

  if (scores[0] <= 3) recommendations.push("業務量の適正化を検討してください");
  if (scores[1] <= 3) recommendations.push("意思決定への参加機会を増やすことを提案してください");
  if (scores[2] <= 3) recommendations.push("職場の人間関係改善のための施策を検討してください");
  if (scores[3] <= 3) recommendations.push("ワークライフバランスの改善を優先してください");

  return recommendations;
}

function generateStrengths(category: GallupCategory, score: number): string[] {
  if (score < 3.5) return [];

  const strengthsMap: Record<GallupCategory, string[]> = {
    basic_needs: [
      "基本的な職場環境が整っている",
      "役割と期待が明確に理解されている"
    ],
    management_support: [
      "マネジメントからの適切なサポートがある",
      "成果が適切に評価されている"
    ],
    teamwork: [
      "チームの協力関係が良好",
      "相互支援の文化が根付いている"
    ],
    growth: [
      "成長機会が十分に提供されている",
      "キャリア開発のサポートが充実している"
    ],
    purpose: [
      "組織の目的に共感できている",
      "自身の役割の意義を理解している"
    ],
    development: [
      "スキル開発の機会が豊富",
      "自己成長を実感できている"
    ],
    relationships: [
      "良好な人間関係が構築できている",
      "オープンなコミュニケーションができている"
    ],
    management: [
      "マネジメントのサポートが充実している",
      "リーダーシップが効果的に発揮されている"
    ],
    environment: [
      "働きやすい環境が整っている",
      "必要なリソースが適切に提供されている"
    ]
  };

  return strengthsMap[category] || [];
}

function generateImprovements(category: GallupCategory, score: number): string[] {
  if (score >= 3.5) return [];

  const improvementsMap: Record<GallupCategory, string[]> = {
    basic_needs: [
      "役割と期待値の明確化が必要",
      "必要なリソースの見直しと確保"
    ],
    management_support: [
      "マネジメントサポートの強化",
      "評価・フィードバックの改善"
    ],
    teamwork: [
      "チーム内コミュニケーションの活性化",
      "協力体制の構築"
    ],
    growth: [
      "成長機会の創出",
      "キャリアパスの明確化"
    ],
    purpose: [
      "組織の目的・ビジョンの共有",
      "個人の役割の意義の明確化"
    ],
    development: [
      "スキル開発プログラムの充実",
      "成長機会の提供"
    ],
    relationships: [
      "チームビルディングの強化",
      "コミュニケーション改善"
    ],
    management: [
      "マネジメントスキルの向上",
      "リーダーシップ開発"
    ],
    environment: [
      "職場環境の改善",
      "必要なリソースの確保"
    ]
  };

  return improvementsMap[category] || [];
}

function generateEngagementRecommendations(
  categoryScores: DiagnosisResult['engagement']['categoryScores'],
  level: DiagnosisResult['engagement']['engagementLevel']
): string[] {
  const recommendations: string[] = [];

  // エンゲージメントレベルに基づく全般的な推奨事項
  switch (level) {
    case 'highly_engaged':
      recommendations.push(
        "現在の高いエンゲージメントを維持するための取り組みを継続してください",
        "他のメンバーのエンゲージメント向上をサポートする役割を担うことを検討してください"
      );
      break;
    case 'engaged':
      recommendations.push(
        "さらなる成長機会を積極的に追求してください",
        "チーム内での建設的な提案を継続してください"
      );
      break;
    case 'not_engaged':
      recommendations.push(
        "現在の課題や不満を上司と率直に話し合うことを検討してください",
        "自身の期待と現状のギャップを明確にし、改善策を考えてください"
      );
      break;
    case 'actively_disengaged':
      recommendations.push(
        "早急に上司やHRと現状について話し合いの機会を持つことを推奨します",
        "キャリアの方向性について真剣な検討が必要かもしれません"
      );
      break;
  }

  // カテゴリー別スコアに基づく具体的な推奨事項
  Object.entries(categoryScores).forEach(([category, data]) => {
    if (data.score < 3) {
      recommendations.push(
        category === 'basic_needs'
          ? "基本的な職場環境の改善について具体的な提案をまとめてください"
          : category === 'management_support'
          ? "上司との1on1の機会を定期的に設定することを提案してください"
          : category === 'teamwork'
          ? "チーム内での役割や貢献方法について見直してください"
          : "自己啓発やスキルアップの機会を積極的に探してください"
      );
    }
  });

  return recommendations;
}

function calculateCareerAffinity(
  personalityResults: DiagnosisResult['bigFive'],
  riasecResults: DiagnosisResult['riasec']
): DiagnosisResult['careerAffinity'] {
  const result: DiagnosisResult['careerAffinity'] = {};

  // RIASECスコアのマッピング
  const riasecMap: Record<string, number> = {
    'R': riasecResults.realistic,
    'I': riasecResults.investigative,
    'A': riasecResults.artistic,
    'S': riasecResults.social,
    'E': riasecResults.enterprising,
    'C': riasecResults.conventional
  };

  // 各キャリアカテゴリーの親和性を計算
  Object.entries(careerCategories).forEach(([key, category]) => {
    // パーソナリティ特性の親和性スコア（0-1の範囲）
    const personalityScore = category.affinity.personality.reduce((sum, trait) => {
      const score = personalityResults[trait as keyof typeof personalityResults];
      return sum + (score / 7); // 7段階評価を0-1に正規化
    }, 0) / category.affinity.personality.length;

    // RIASEC特性の親和性スコア（0-1の範囲）
    const riasecScore = category.affinity.riasec.reduce((sum, code) => {
      const score = riasecMap[code];
      return sum + (score / 7); // 7段階評価を0-1に正規化
    }, 0) / category.affinity.riasec.length;

    // 総合スコア（パーソナリティとRIASECの平均）
    const totalScore = (personalityScore + riasecScore) / 2;

    // 親和性レベルの決定
    let level: keyof typeof affinityLevels = 'exploring';
    if (totalScore >= affinityLevels.veryHigh.threshold) {
      level = 'veryHigh';
    } else if (totalScore >= affinityLevels.high.threshold) {
      level = 'high';
    } else if (totalScore >= affinityLevels.moderate.threshold) {
      level = 'moderate';
    }

    result[key] = {
      score: totalScore,
      level,
      name: category.name,
      description: category.description,
      keywords: category.keywords
    };
  });

  return result;
} 