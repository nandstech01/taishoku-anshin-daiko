const baseUrl = 'https://taishoku-anshin-daiko.com';

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService'],
  '@id': `${baseUrl}/about#LocalBusiness`,
  'name': '退職あんしん代行',
  'legalName': '株式会社エヌアンドエス',
  'url': `${baseUrl}/about`,
  'description': '業界最安値2,980円！弁護士や労働組合連携可能で安心の退職代行サービス。24時間対応し、あなたの退職とキャリアを徹底サポートします。',
  'image': [
    `${baseUrl}/images/logo.png`
  ],
  'logo': `${baseUrl}/images/logo.png`,
  'telephone': '+81-120-558-551',
  'priceRange': '¥',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': '皇子ヶ丘２丁目１０番２５−３００４号',
    'addressLocality': '大津市',
    'addressRegion': '滋賀県',
    'postalCode': '520-0025',
    'addressCountry': 'JP'
  },
  'offers': {
    '@type': 'Offer',
    'name': '退職代行プラン',
    'description': '弁護士・労働組合連携可能で安心サポート。24時間365日受付、追加料金なし。',
    'price': '2980',
    'priceCurrency': 'JPY',
    'availability': 'https://schema.org/InStock',
    'url': `${baseUrl}/about`
  },
  'openingHoursSpecification': {
    '@type': 'OpeningHoursSpecification',
    'dayOfWeek': [
      'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ],
    'opens': '00:00',
    'closes': '23:59'
  },
  'sameAs': [
    'https://lin.ee/h1kk42r'
  ]
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': [
    {
      '@type': 'ListItem',
      'position': 1,
      'item': {
        '@id': baseUrl,
        'name': 'ホーム'
      }
    },
    {
      '@type': 'ListItem',
      'position': 2,
      'item': {
        '@id': `${baseUrl}/about`,
        'name': '会社概要'
      }
    }
  ]
};

export const metadata = {
  title: '会社概要 | 退職あんしん代行',
  description: '業界最安値2,980円！弁護士や労働組合連携可能で安心の退職代行サービス。24時間対応し、あなたの退職とキャリアを徹底サポートします。',
  alternates: {
    canonical: `${baseUrl}/about`
  },
  openGraph: {
    title: '会社概要 | 退職あんしん代行',
    description: '業界最安値2,980円！弁護士や労働組合連携可能で安心の退職代行サービス。',
    url: `${baseUrl}/about`,
    siteName: '退職あんしん代行',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '会社概要 | 退職あんしん代行',
    description: '業界最安値2,980円！弁護士や労働組合連携可能で安心の退職代行サービス。',
  },
  verification: {
    'ld+json': JSON.stringify([localBusinessSchema, breadcrumbSchema])
  }
}; 