export const generateAgentSchema = (baseUrl: string) => {
  const currentYear = new Date().getFullYear();

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '退職エージェント',
    alternateName: '退職・AIキャリア支援サービス',
    description: '退職支援からAIスキル習得、高年収求人紹介まで。AI時代のキャリアを加速させる総合サポートサービス。',
    url: `${baseUrl}/agent`,
    provider: {
      '@type': 'Organization',
      name: '株式会社エヌアンドエス',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/agent-logo.svg`
      }
    },
    areaServed: {
      '@type': 'Country',
      name: '日本'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AIキャリア支援サービス',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '退職代行＋AIキャリア支援',
            description: '退職の完全代行から、AIスキル習得、高年収求人紹介までをトータルサポート'
          },
          price: '49800',
          priceCurrency: 'JPY',
          availability: 'https://schema.org/InStock'
        }
      ]
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${baseUrl}/agent`,
      servicePhone: '0120-558-551',
      serviceSmsNumber: 'https://line.me/R/ti/p/@taishoku_anshin'
    },
    serviceType: [
      '退職代行',
      'AIスキル習得支援',
      'キャリアコンサルティング',
      '求人紹介'
    ],
    termsOfService: `${baseUrl}/terms`,
    hoursAvailable: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday',
        'Friday', 'Saturday', 'Sunday'
      ],
      opens: '00:00',
      closes: '23:59'
    },
    serviceOutput: [
      '退職手続きの完了',
      'AIスキルの習得',
      '年収アップの転職',
      'キャリアロードマップの策定'
    ],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/agent`
    },
    offers: {
      '@type': 'Offer',
      price: '49800',
      priceCurrency: 'JPY',
      availability: 'https://schema.org/InStock',
      validFrom: `${currentYear}-01-01`,
      priceValidUntil: `${currentYear + 1}-12-31`,
      url: `${baseUrl}/agent`,
      seller: {
        '@type': 'Organization',
        name: '株式会社エヌアンドエス',
        url: baseUrl
      }
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: '年収アップ実績',
        value: '平均1.5倍以上'
      },
      {
        '@type': 'PropertyValue',
        name: 'AI人材市場規模',
        value: '2025年8.8万人規模'
      },
      {
        '@type': 'PropertyValue',
        name: 'AI人材平均年収',
        value: '534.6万円'
      }
    ]
  };
};

export const generateAgentFAQSchema = (baseUrl: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '退職エージェントはどのようなサービスですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '退職エージェントは、退職支援からAIスキル習得、高年収求人紹介まで一貫してサポートする総合キャリア支援サービスです。AI時代の新しいキャリアを構築するためのロードマップを提供し、平均年収1.5倍以上の実績があります。'
        }
      },
      {
        '@type': 'Question',
        name: 'AIに関する知識がなくても利用できますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'はい、AIの予備知識がなくても問題ありません。初心者からプロフェッショナルまで、レベルに合わせた5つのコースを用意しており、それぞれの目標や経験に合わせたカリキュラムを提供しています。'
        }
      },
      {
        '@type': 'Question',
        name: 'どのようなAIスキルを習得できますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'プロンプトエンジニアリング、データ分析、AI開発基礎、AI活用戦略立案など、現在のAI市場で最も需要の高いスキルを習得できます。実践的なプロジェクトを通じて、すぐにビジネスで活用できる能力を身につけられます。'
        }
      },
      {
        '@type': 'Question',
        name: '退職から転職までどのくらいの期間がかかりますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '個人の状況やスキルレベル、目標によって異なりますが、退職手続きは最短即日対応、AIスキル習得コースは4週間から12週間、その後の転職活動を含めると平均2〜4ヶ月程度で完了するケースが多いです。'
        }
      },
      {
        '@type': 'Question',
        name: 'AIキャリアへの転職でどのくらい年収がアップしますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '当サービス利用者の平均で年収1.5倍以上の実績があります。AI人材の平均年収は534.6万円（2025年2月時点）で、スキルレベルやポジションによってはさらに高い年収も期待できます。'
        }
      },
      {
        '@type': 'Question',
        name: '現在の仕事と並行してサービスを利用できますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'はい、可能です。オンラインコースは自分のペースで進められるよう設計されており、週末や夜間に学習を進めることも可能です。ただし、退職支援と新しいキャリアへの集中のためには、ある程度の時間的余裕を持たれることをお勧めします。'
        }
      }
    ]
  };
}; 