export const generateWebsiteSchema = (baseUrl: string) => {
  const currentYear = new Date().getFullYear();
  const nextYear = new Date(new Date().setFullYear(currentYear + 1)).toISOString().split('T')[0];

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'タイショクアンシン',
      alternateName: '退職あんしん代行',
      description: '退職代行サービス「タイショクアンシン」の公式ブログ。退職の不安や悩みを解消する情報を毎日配信。退職代行は業界最安値2,980円で対応。',
      url: baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}/blog/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      },
      publisher: {
        '@type': 'Organization',
        name: '株式会社エヌアンドエス',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/images/logo.svg`
        },
        contactPoint: [{
          '@type': 'ContactPoint',
          telephone: '0120-558-551',
          contactType: 'customer service',
          areaServed: 'JP',
          availableLanguage: ['Japanese'],
          contactOption: ['TollFree', 'HearingImpairedSupported']
        }]
      },
      inLanguage: 'ja',
      isFamilyFriendly: true,
      copyrightYear: currentYear,
      keywords: [
        '退職代行',
        '退職相談',
        '退職方法',
        '労働問題',
        'パワハラ対策',
        '給付金申請',
        '未払い残業代',
        'キャリア相談'
      ].join(',')
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${baseUrl}/#organization`,
      name: '退職あんしん代行',
      alternateName: 'タイショクアンシン',
      description: '退職代行・退職相談のプロフェッショナル。労働問題の解決から、キャリア支援まで、働く人の未来をサポートします。',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.svg`
      },
      telephone: '0120-558-551',
      email: 'contact@taishoku-anshin-daiko.com',
      priceRange: '¥',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'JP',
        addressRegion: '滋賀県',
        addressLocality: '大津市',
        streetAddress: '皇子が丘10番25-3004号'
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday',
          'Friday', 'Saturday', 'Sunday'
        ],
        opens: '00:00',
        closes: '23:59'
      },
      sameAs: [
        'https://twitter.com/taishoku_anshin',
        'https://www.facebook.com/taishokuanshin',
        'https://line.me/R/ti/p/@taishoku_anshin'
      ],
      offers: {
        '@type': 'Offer',
        name: '退職代行サービス',
        description: '退職の手続きを代行いたします。',
        price: '2980',
        priceCurrency: 'JPY',
        availability: 'https://schema.org/InStock',
        priceValidUntil: nextYear
      },
      areaServed: {
        '@type': 'Country',
        name: '日本',
        alternateName: 'Japan'
      },
      specialty: [
        '退職代行',
        '労働問題解決',
        'キャリアサポート',
        '給付金申請サポート',
        '弁護士連携',
        '労働組合連携'
      ].join(',')
    }
  ];
}; 