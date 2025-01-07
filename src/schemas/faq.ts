interface FAQCategory {
  title: string;
  questions: {
    question: string;
    answer: string;
  }[];
}

export const generateFAQSchema = (baseUrl: string) => {
  const faqCategories: FAQCategory[] = [
    {
      title: 'サービス全般',
      questions: [
        {
          question: '退職代行サービスは本当に合法なのですか？',
          answer: 'はい、完全に合法です。労働者には退職の自由が憲法で保障されており、その意思表示を代行することは法的に問題ありません。当社は顧問弁護士と連携し、すべての手続きを適法に行っています。'
        },
        {
          question: '退職までどのくらいの期間がかかりますか？',
          answer: '最短即日での対応が可能です。ただし、円滑な引き継ぎのため、通常は2週間程度をお勧めしています。緊急性の高いケース（パワハラ・体調不良など）では、即日対応も可能です。'
        },
        {
          question: '会社に直接会って退職を伝える必要はありますか？',
          answer: 'いいえ、必要ありません。すべての手続きを当社が代行いたしますので、会社に直接会う必要はございません。パワハラなどの被害に遭われている方も、安心して退職手続きを進めることができます。'
        }
      ]
    },
    {
      title: '料金・支払い',
      questions: [
        {
          question: '料金の支払いはいつ必要ですか？',
          answer: '初回相談は無料です。サービスの利用を決定された後、契約時にお支払いいただきます。分割払いにも対応しておりますので、ご相談ください。'
        },
        {
          question: '追加料金は発生しますか？',
          answer: 'いいえ、当社では明朗会計を徹底しており、契約時にお支払いいただいた料金以外の追加料金は一切発生いたしません。'
        }
      ]
    },
    {
      title: '権利・保証',
      questions: [
        {
          question: '退職金や未払い残業代はどうなりますか？',
          answer: '退職金や未払い残業代などの権利は、しっかりと確保いたします。必要に応じて顧問弁護士や労働組合と連携し、適切な金額が支払われるよう交渉いたします。'
        },
        {
          question: '失業保険はもらえますか？',
          answer: 'はい、条件を満たせば受給可能です。当社では失業給付金の申請手続きもサポートしており、スムーズな受給開始をお手伝いいたします。'
        }
      ]
    },
    {
      title: 'プライバシー',
      questions: [
        {
          question: '在職中の退職代行依頼はバレませんか？',
          answer: 'ご安心ください。当社は厳格な守秘義務を徹底しており、ご依頼の事実は完全に秘密として扱われます。会社側への連絡も慎重に行い、あなたのプライバシーを最大限保護いたします。'
        }
      ]
    },
    {
      title: 'キャリア支援',
      questions: [
        {
          question: '退職後のキャリア相談も可能ですか？',
          answer: 'はい、可能です。提携キャリアアドバイザーによる転職相談や、AIスキル習得プログラムの提供など、次のキャリアに向けたサポートも行っています。'
        },
        {
          question: 'AIスキル習得支援とは具体的にどのようなものですか？',
          answer: '最新のAI技術を活用したオンライン学習プログラムを提供しています。プログラミングの基礎からAIの実践的な活用まで、現場で求められるスキルを体系的に学ぶことができます。'
        }
      ]
    }
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqCategories.flatMap(category => 
      category.questions.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer
        }
      }))
    ),
    provider: {
      '@type': 'Organization',
      name: 'タイショクアンシン',
      url: baseUrl
    },
    about: {
      '@type': 'Service',
      name: '退職代行サービス',
      description: '業界最安値2,980円の退職代行サービス。24時間365日対応、弁護士・労働組合と連携し、あなたの退職を完全サポート。'
    }
  };
}; 