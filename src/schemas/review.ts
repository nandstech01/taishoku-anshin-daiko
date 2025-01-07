interface Testimonial {
  content: string;
  job: string;
  age: number;
  income: string;
  highlight: string;
  stars: number;
}

export const generateReviewSchema = (baseUrl: string, testimonials: Testimonial[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Service',
      name: 'タイショクアンシン',
      description: '退職代行サービス'
    },
    reviewRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: testimonials.length.toString(),
      bestRating: '5',
      worstRating: '1'
    },
    author: {
      '@type': 'Organization',
      name: 'タイショクアンシン'
    },
    publisher: {
      '@type': 'Organization',
      name: '株式会社エヌアンドエス',
      url: baseUrl
    },
    reviews: testimonials.map(testimonial => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: testimonial.stars,
        bestRating: '5',
        worstRating: '1'
      },
      author: {
        '@type': 'Person',
        jobTitle: testimonial.job
      },
      reviewBody: testimonial.content,
      datePublished: new Date().toISOString().split('T')[0], // 実際のレビュー日付がない場合の対応
      positiveNotes: {
        '@type': 'ItemList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: testimonial.highlight
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: testimonial.income
          }
        ]
      }
    }))
  };
}; 