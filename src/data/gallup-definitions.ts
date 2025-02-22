import type { GallupCategory, GallupQuestionData } from '@/types/diagnosis';

// Gallupカテゴリーの説明
export const gallupCategoryDescriptions: Record<GallupCategory, string> = {
  basic_needs: '基本的ニーズ',
  management_support: 'マネジメントからのサポートと認知',
  teamwork: 'チームの協力関係と相互支援',
  growth: '成長機会と組織への共感',
  purpose: '目的意識',
  development: '成長機会',
  relationships: '人間関係',
  management: 'マネジメント',
  environment: '職場環境'
};

// Gallup質問データ
export const gallupQuestions: Record<string, GallupQuestionData> = {
  GALLUP1: {
    category: 'basic_needs',
    positiveIndicator: "期待される役割と責任が明確に理解されている",
    negativeIndicator: "役割や期待が不明確で混乱を感じている",
    improvementSuggestions: [
      "定期的な1on1ミーティングの実施",
      "具体的な目標と期待値の文書化",
      "フィードバックの機会を増やす"
    ]
  },
  GALLUP2: {
    category: 'basic_needs',
    positiveIndicator: "仕事に必要な道具と環境が整っている",
    negativeIndicator: "必要なリソースが不足している",
    improvementSuggestions: [
      "必要な設備・ツールの定期的な見直し",
      "業務効率化のための環境整備",
      "リソース要望の定期的な確認"
    ]
  },
  GALLUP3: {
    category: 'management_support',
    positiveIndicator: "得意分野を活かせる機会がある",
    negativeIndicator: "スキルと業務のミスマッチがある",
    improvementSuggestions: [
      "個人の強みを活かしたタスク配分",
      "スキル開発の機会提供",
      "キャリアパスの明確化"
    ]
  },
  GALLUP4: {
    category: 'management_support',
    positiveIndicator: "良い仕事への認知と評価がある",
    negativeIndicator: "努力や成果が認められていない",
    improvementSuggestions: [
      "定期的な成果の可視化と共有",
      "具体的な評価基準の設定",
      "表彰制度の導入や改善"
    ]
  },
  GALLUP5: {
    category: 'teamwork',
    positiveIndicator: "上司や同僚が個人として気にかけてくれる",
    negativeIndicator: "職場での人間関係が希薄",
    improvementSuggestions: [
      "チームビルディング活動の実施",
      "定期的なコミュニケーション機会の創出",
      "メンタリング制度の導入"
    ]
  },
  GALLUP6: {
    category: 'teamwork',
    positiveIndicator: "成長を支援する人がいる",
    negativeIndicator: "キャリア開発のサポートが不足",
    improvementSuggestions: [
      "メンター制度の活用",
      "スキル開発計画の策定",
      "定期的なキャリア面談の実施"
    ]
  },
  GALLUP7: {
    category: 'growth',
    positiveIndicator: "意見が尊重され、反映される",
    negativeIndicator: "発言や提案が軽視される",
    improvementSuggestions: [
      "定期的なフィードバックセッション",
      "提案制度の改善",
      "意思決定プロセスの透明化"
    ]
  },
  GALLUP8: {
    category: 'growth',
    positiveIndicator: "組織の使命に共感できる",
    negativeIndicator: "組織の方向性への疑問や不安",
    improvementSuggestions: [
      "ビジョンと価値観の共有機会の増加",
      "組織の目標と個人の役割の紐付け",
      "定期的な経営方針の説明会実施"
    ]
  }
};

// エンゲージメントレベルの定義
export type EngagementLevel = 'highly_engaged' | 'engaged' | 'not_engaged' | 'actively_disengaged';

export interface EngagementLevelDescription {
  description: string;
  characteristics: string[];
}

export const engagementLevelDescriptions: Record<EngagementLevel, EngagementLevelDescription> = {
  highly_engaged: {
    description: '非常に高いエンゲージメント',
    characteristics: [
      '仕事に対して強い情熱と目的意識を持っている',
      'チームメンバーとの協力関係が非常に良好',
      '自己成長の機会を積極的に活用している',
      '組織の目標と個人の目標が完全に一致している',
      '職場環境に非常に満足している'
    ]
  },
  engaged: {
    description: '良好なエンゲージメント',
    characteristics: [
      '仕事に対して意欲的に取り組んでいる',
      'チームワークは良好',
      '成長の機会を活用している',
      '組織の目標を理解し共感している',
      '職場環境に満足している'
    ]
  },
  not_engaged: {
    description: '改善が必要なエンゲージメント',
    characteristics: [
      '仕事への意欲が低下している可能性がある',
      'チーム内でのコミュニケーションに課題がある',
      '成長の機会が限られていると感じている',
      '組織の目標との乖離を感じている',
      '職場環境に改善の余地がある'
    ]
  },
  actively_disengaged: {
    description: '深刻なエンゲージメントの低下',
    characteristics: [
      '仕事への意欲が著しく低下している',
      'チーム内での孤立が見られる',
      '成長の機会が見出せていない',
      '組織の目標と大きく乖離している',
      '職場環境に強い不満を感じている'
    ]
  }
};

// カテゴリー間の関連性
export interface CategoryRelationship {
  related: GallupCategory[];
  impact: string;
}

export const categoryRelationships: Record<GallupCategory, CategoryRelationship> = {
  basic_needs: {
    related: ['management_support', 'environment'],
    impact: '基本的ニーズは職場環境とマネジメントのサポートに強く影響を与えます'
  },
  purpose: {
    related: ['development', 'management_support'],
    impact: '目的意識は成長機会とマネジメントのサポートに強く影響を与えます'
  },
  development: {
    related: ['growth', 'teamwork'],
    impact: '成長機会はチームワークと組織への共感を高めます'
  },
  relationships: {
    related: ['teamwork', 'environment'],
    impact: '良好な人間関係はチームワークと職場環境の改善につながります'
  },
  management: {
    related: ['management_support', 'purpose'],
    impact: '効果的なマネジメントは目的意識とサポート体制を強化します'
  },
  environment: {
    related: ['relationships', 'teamwork'],
    impact: '良好な職場環境は人間関係とチームワークを促進します'
  },
  management_support: {
    related: ['management', 'growth'],
    impact: 'マネジメントからのサポートは成長と組織への共感を高めます'
  },
  teamwork: {
    related: ['relationships', 'environment'],
    impact: 'チームワークは人間関係と職場環境の質を向上させます'
  },
  growth: {
    related: ['development', 'purpose'],
    impact: '組織への共感は目的意識と成長意欲を強化します'
  }
}; 