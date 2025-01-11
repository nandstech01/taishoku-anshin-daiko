'use client'

import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
    delay: number;
}

const FAQItem = ({ question, answer, isOpen, onToggle, delay }: FAQItemProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            viewport={{ once: true }}
            className="border-b border-gray-200 last:border-0"
        >
            <button
                onClick={onToggle}
                className="w-full py-6 flex items-center justify-between gap-4 text-left"
            >
                <span className="text-lg font-medium text-gray-900">{question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                >
                    {isOpen ? (
                        <Minus className="w-6 h-6 text-orange-500" />
                    ) : (
                        <Plus className="w-6 h-6 text-orange-500" />
                    )}
                </motion.div>
            </button>
            <motion.div
                initial={false}
                animate={{
                    height: isOpen ? 'auto' : 0,
                    opacity: isOpen ? 1 : 0,
                    marginBottom: isOpen ? '24px' : '0px'
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <div className="text-gray-600 leading-relaxed">
                    {answer}
                </div>
            </motion.div>
        </motion.div>
    );
};

const faqs = [
    {
        question: "退職代行サービスは本当に合法なのですか？",
        answer: "はい、退職代行サービスは完全に合法です。労働者には退職の自由が憲法で保障されており、その意思表示を代行することは法的に問題ありません。当社は顧問弁護士と連携し、すべての手続きを適法に行っています。"
    },
    {
        question: "退職までどのくらいの期間がかかりますか？",
        answer: "最短即日での対応が可能です。ただし、円滑な引き継ぎのため、通常は2週間程度をお勧めしています。緊急性の高いケース（パワハラ・体調不良など）では、即日対応も可能です。状況に応じて最適なタイミングをご提案させていただきます。"
    },
    {
        question: "会社に直接会って退職を伝える必要はありますか？",
        answer: "いいえ、必要ありません。すべての手続きを当社が代行いたしますので、会社に直接会う必要はございません。パワハラなどの被害に遭われている方も、安心して退職手続きを進めることができます。"
    },
    {
        question: "料金はいくらですか？",
        answer: "業界最安値の2,980円からご利用いただけます。初回相談は無料です。また、分割払いにも対応しておりますので、ご相談ください。"
    },
    {
        question: "24時間対応可能ですか？",
        answer: "はい、24時間365日対応可能です。LINEやメールでのご相談を承っております。緊急の場合は、電話での即時対応も可能です。"
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            id="faq"
            className="relative py-20 md:py-32 bg-gradient-to-b from-white to-orange-50 overflow-hidden"
        >
            {/* 装飾的な背景要素 */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full filter blur-3xl opacity-30 translate-x-1/2 -translate-y-1/2" />
            
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white text-lg font-bold px-6 py-2 rounded-full mb-6 shadow-lg"
                    >
                        よくある質問
                    </motion.div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        ご不明な点は<br/>ございませんか？
                    </h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        退職に関する疑問やご不安な点について<br/>詳しくご説明いたします
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                            delay={0.2 + index * 0.1}
                        />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-600">
                        その他のご質問も<br/>お気軽にお問い合わせください
                    </p>
                </motion.div>
            </div>
        </motion.section>
    );
} 