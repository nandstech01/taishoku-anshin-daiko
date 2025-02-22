import { affinityLevels } from '@/data/career-definitions';

export interface Question {
  id: string;
  category: 'personality' | 'career' | 'stress' | 'engagement';
  text: string;
  scaleType: "TIPI" | "5scale";
}

export interface Answer {
  questionId: string;
  value: number;
}

export type PersonalityTrait = 'extraversion' | 'agreeableness' | 'conscientiousness' | 'neuroticism' | 'openness';
export type RiasecType = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

// Gallup Q12のカテゴリー定義
export type GallupCategory = 
  | 'basic_needs'        // 基本的ニーズ
  | 'management_support' // マネジメントサポート
  | 'teamwork'          // チームワーク
  | 'growth'            // 成長機会
  | 'purpose'           // 目的意識
  | 'development'       // 成長機会
  | 'relationships'     // 人間関係
  | 'management'        // マネジメント
  | 'environment';      // 職場環境

export interface GallupQuestionData {
  category: GallupCategory;
  positiveIndicator: string;
  negativeIndicator: string;
  improvementSuggestions: string[];
}

export interface GallupAnalysis {
  overallScore: number;
  categoryScores: {
    [K in GallupCategory]: {
      score: number;
      questions: number[];
      strengths: string[];
      areas_for_improvement: string[];
    };
  };
  engagementLevel: 'highly_engaged' | 'engaged' | 'not_engaged' | 'actively_disengaged';
  recommendations: string[];
}

export interface PersonalityTraitData {
  name: string;
  high: {
    traits: string[];
    strengths: string[];
    workStyles: string[];
    careers: string[];
  };
  low: {
    traits: string[];
    strengths: string[];
    workStyles: string[];
    careers: string[];
  };
}

export interface RiasecTypeData {
  name: string;
  description: string;
  traits: string[];
  strengths: string[];
  workEnvironments: string[];
  examples: string[];
}

export interface CareerCategoryData {
  name: string;
  description: string;
  keywords: string[];
  affinity: {
    personality: PersonalityTrait[];
    riasec: RiasecType[];
  };
}

export interface AffinityLevel {
  label: string;
  description: string;
  color: string;
  threshold: number;
}

export interface Choice {
  value: number;
  label: string;
}

export interface DiagnosisAnswer {
  [key: string]: number;
}

export interface ShareButtonsProps {
  shareLink: string;
  text: string;
}

// Big Five (TIPI) の因子
export type BigFiveFactor = PersonalityTrait;

// 診断結果の型を更新
export interface DiagnosisResult {
  bigFive: {
    extraversion: number;
    agreeableness: number;
    conscientiousness: number;
    neuroticism: number;
    openness: number;
  };
  riasec: {
    realistic: number;
    investigative: number;
    artistic: number;
    social: number;
    enterprising: number;
    conventional: number;
  };
  stress: {
    total: number;
    factors: number[];
    riskLevel: 'low' | 'moderate' | 'high';
    recommendations: string[];
  };
  engagement: {
    overallScore: number;
    categoryScores: {
      [K in GallupCategory]: {
        score: number;
        questions: number[];
        strengths: string[];
        areas_for_improvement: string[];
      };
    };
    engagementLevel: 'highly_engaged' | 'engaged' | 'not_engaged' | 'actively_disengaged';
    recommendations: string[];
  };
  careerAffinity: {
    [key: string]: {
      score: number;
      level: keyof typeof affinityLevels;
      name: string;
      description: string;
      keywords: string[];
    };
  };
} 