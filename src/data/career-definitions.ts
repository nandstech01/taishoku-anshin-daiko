export const careerCategories = {
  tech: {
    name: "IT・テクノロジー",
    description: "デジタル技術で未来を創造する",
    keywords: ["システム開発", "AI", "クラウド", "データ分析"],
    affinity: {
      personality: ["openness", "conscientiousness"],
      riasec: ["I", "R", "C"]
    }
  },
  finance: {
    name: "金融・コンサルティング",
    description: "戦略的思考で価値を創造する",
    keywords: ["投資", "リスク管理", "経営戦略", "分析"],
    affinity: {
      personality: ["conscientiousness", "extraversion"],
      riasec: ["E", "I", "C"]
    }
  },
  marketing: {
    name: "広告・マーケティング",
    description: "創造性とデータで市場を動かす",
    keywords: ["デジタルマーケティング", "SNS", "コンテンツ制作", "データ分析"],
    affinity: {
      personality: ["extraversion", "openness"],
      riasec: ["A", "E", "S"]
    }
  },
  manufacturing: {
    name: "製造・エンジニアリング",
    description: "モノづくりの革新を推進する",
    keywords: ["生産管理", "品質管理", "ロボティクス", "自動化"],
    affinity: {
      personality: ["conscientiousness", "openness"],
      riasec: ["R", "I", "C"]
    }
  },
  healthcare: {
    name: "医療・ヘルスケア",
    description: "人々の健康と幸せを支える",
    keywords: ["医療機器", "介護支援", "健康管理", "バイオテクノロジー"],
    affinity: {
      personality: ["agreeableness", "conscientiousness"],
      riasec: ["S", "I", "R"]
    }
  },
  education: {
    name: "教育・人材開発",
    description: "人の成長と可能性を広げる",
    keywords: ["教育サービス", "研修", "キャリア支援", "スキル開発"],
    affinity: {
      personality: ["extraversion", "agreeableness"],
      riasec: ["S", "E", "A"]
    }
  },
  logistics: {
    name: "物流・運輸",
    description: "効率的な物流で社会を支える",
    keywords: ["物流管理", "配送最適化", "倉庫管理", "サプライチェーン"],
    affinity: {
      personality: ["conscientiousness", "agreeableness"],
      riasec: ["C", "R", "E"]
    }
  },
  entertainment: {
    name: "エンタメ・メディア",
    description: "創造性で人々に感動を届ける",
    keywords: ["コンテンツ制作", "ゲーム開発", "映像制作", "配信"],
    affinity: {
      personality: ["openness", "extraversion"],
      riasec: ["A", "E", "S"]
    }
  }
};

export const affinityLevels = {
  veryHigh: {
    label: "⭐️ ベストマッチ",
    description: "あなたの特性と非常に相性が良い分野です",
    color: "text-blue-600",
    threshold: 0.8
  },
  high: {
    label: "✨ 高い親和性",
    description: "あなたの強みを活かせる可能性が高い分野です",
    color: "text-green-600",
    threshold: 0.6
  },
  moderate: {
    label: "💫 可能性を感じる",
    description: "チャレンジによって活躍が期待できる分野です",
    color: "text-yellow-600",
    threshold: 0.4
  },
  exploring: {
    label: "🌱 探索フィールド",
    description: "新しい可能性を見出せる分野です",
    color: "text-gray-600",
    threshold: 0
  }
}; 