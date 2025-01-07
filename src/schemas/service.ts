export const generateServiceSchema = (baseUrl: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'タイショクアンシン',
    alternateName: '退職あんしん代行',
    description: '業界最安値2,980円の退職代行サービス。24時間365日対応、弁護士・労働組合と連携し、あなたの退職を完全サポート。',
    url: baseUrl,
    provider: {
      '@type': 'Organization',
      name: '株式会社エヌアンドエス',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.svg`
      }
    },
    areaServed: {
      '@type': 'Country',
      name: '日本'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '退職代行サービス',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '退職代行基本プラン',
            description: '退職の意思表示から手続き完了までをサポート'
          },
          price: '2980',
          priceCurrency: 'JPY',
          availability: 'https://schema.org/InStock'
        }
      ]
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: baseUrl,
      servicePhone: '0120-558-551',
      serviceSmsNumber: 'https://line.me/R/ti/p/@taishoku_anshin'
    },
    serviceType: [
      '退職代行',
      '労働問題解決',
      'キャリアサポート'
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
      '未払い残業代の請求サポート',
      '給付金申請のサポート',
      'キャリア相談'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1000',
      bestRating: '5',
      worstRating: '1'
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: '対応時間',
        value: '24時間365日'
      },
      {
        '@type': 'PropertyValue',
        name: '料金',
        value: '2,980円（税込）'
      },
      {
        '@type': 'PropertyValue',
        name: '特徴',
        value: '弁護士・労働組合連携'
      }
    ]
  };
}; 