'use client'

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Footer from '@/components/common/Footer';
import { Metadata } from 'next';
import { generateFAQSchema } from '@/schemas/faq';

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

export const generateMetadata = async (): Promise<Metadata> => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://taishoku-anshin-daiko.com';
    const faqSchema = generateFAQSchema(baseUrl);

    return {
        title: 'よくあるご質問 | タイショクアンシン',
        description: '退職代行サービスに関するよくある質問をまとめています。サービスの合法性、料金、プライバシー保護、キャリア支援など、お客様からよくいただく質問に詳しくお答えします。',
        alternates: {
            canonical: `${baseUrl}/faq`
        },
        openGraph: {
            title: 'よくあるご質問 | タイショクアンシン',
            description: '退職代行サービスに関するよくある質問をまとめています。',
            url: `${baseUrl}/faq`,
            siteName: 'タイショクアンシン',
            locale: 'ja_JP',
            type: 'website',
        },
        other: {
            'script:ld+json': JSON.stringify(faqSchema)
        }
    };
};

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs: FAQItem[] = [
        // サービス全般
        {
            category: "サービス全般",
            question: "退職代行サービスは本当に合法なのですか？",
            answer: "はい、完全に合法です。労働者には退職の自由が憲法で保障されており、その意思表示を代行することは法的に問題ありません。当社は顧問弁護士と連携し、すべての手続きを適法に行っています。"
        },
        {
            category: "サービス全般",
            question: "退職までどのくらいの期間がかかりますか？",
            answer: "最短即日での対応が可能です。ただし、円滑な引き継ぎのため、通常は2週間程度をお勧めしています。緊急性の高いケース（パワハラ・体調不良など）では、即日対応も可能です。"
        },
        {
            category: "サービス全般",
            question: "会社に直接会って退職を伝える必要はありますか？",
            answer: "いいえ、必要ありません。すべての手続きを当社が代行いたしますので、会社に直接会う必要はございません。パワハラなどの被害に遭われている方も、安心して退職手続きを進めることができます。"
        },
        // 料金・支払い
        {
            category: "料金・支払い",
            question: "料金の支払いはいつ必要ですか？",
            answer: "初回相談は無料です。サービスの利用を決定された後、契約時にお支払いいただきます。分割払いにも対応しておりますので、ご相談ください。"
        },
        {
            category: "料金・支払い",
            question: "追加料金は発生しますか？",
            answer: "いいえ、当社では明朗会計を徹底しており、契約時にお支払いいただいた料金以外の追加料金は一切発生いたしません。"
        },
        // 権利・保証
        {
            category: "権利・保証",
            question: "退職金や未払い残業代はどうなりますか？",
            answer: "退職金や未払い残業代などの権利は、しっかりと確保いたします。必要に応じて顧問弁護士や労働組合と連携し、適切な金額が支払われるよう交渉いたします。"
        },
        {
            category: "権利・保証",
            question: "失業保険はもらえますか？",
            answer: "はい、条件を満たせば受給可能です。当社では失業給付金の申請手続きもサポートしており、スムーズな受給開始をお手伝いいたします。"
        },
        // プライバシー
        {
            category: "プライバシー",
            question: "在職中の退職代行依頼はバレませんか？",
            answer: "ご安心ください。当社は厳格な守秘義務を徹底しており、ご依頼の事実は完全に秘密として扱われます。会社側への連絡も慎重に行い、あなたのプライバシーを最大限保護いたします。"
        },
        // キャリア支援
        {
            category: "キャリア支援",
            question: "退職後のキャリア相談も可能ですか？",
            answer: "はい、可能です。提携キャリアアドバイザーによる転職相談や、AIスキル習得プログラムの提供など、次のキャリアに向けたサポートも行っています。"
        },
        {
            category: "キャリア支援",
            question: "AIスキル習得支援とは具体的にどのようなものですか？",
            answer: "最新のAI技術を活用したオンライン学習プログラムを提供しています。プログラミングの基礎からAIの実践的な活用まで、現場で求められるスキルを体系的に学ぶことができます。"
        }
    ];

    const categories = Array.from(new Set(faqs.map(faq => faq.category)));

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-20"
            >
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
                        よくあるご質問
                    </h1>

                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-12">
                        {categories.map((category, categoryIndex) => (
                            <div key={categoryIndex}>
                                <h2 className="text-xl font-bold text-orange-500 mb-6">
                                    {category}
                                </h2>
                                <div className="space-y-4">
                                    {faqs.filter(faq => faq.category === category).map((faq, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="border-b border-gray-200 last:border-0"
                                        >
                                            <button
                                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                                className="w-full py-4 flex items-center justify-between gap-4 text-left"
                                            >
                                                <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                                                <motion.div
                                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <ChevronDown className="w-6 h-6 text-orange-500 flex-shrink-0" />
                                                </motion.div>
                                            </button>
                                            <motion.div
                                                initial={false}
                                                animate={{
                                                    height: openIndex === index ? 'auto' : 0,
                                                    opacity: openIndex === index ? 1 : 0,
                                                    marginBottom: openIndex === index ? '16px' : '0px'
                                                }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="text-gray-600 leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </motion.div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <p className="text-center text-gray-600">
                                その他ご不明な点がございましたら、お気軽にお問い合わせください。
                            </p>
                            <div className="mt-6 flex justify-center">
                                <a
                                    href="https://lin.ee/h1kk42r"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#06C755] hover:bg-[#05b34c] text-white font-bold py-3 px-8 rounded-full transition-colors duration-300"
                                >
                                    LINEで無料相談
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
            <Footer />
        </>
    );
} 