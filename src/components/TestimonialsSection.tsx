'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, TrendingUp, Brain, Sparkles } from 'lucide-react';

const testimonials = [
    {
        content: "退職を会社や同僚に一切バレることなく、スムーズに退職できました。派遣社員として働いていましたが、正社員としての転職先も紹介していただき、今は安定した収入で働けています。本当に感謝しています。",
        job: "派遣事務 → 正社員事務",
        age: 28,
        income: "年収520万円に上昇",
        image: "/images/testimonials/03.png",
        highlight: "正社員転換"
    },
    {
        content: "担当者の方が本当に親身になってくれて、退職後の転職先まで一緒に考えてくれました。不安だった将来のキャリアプランも、具体的なアドバイスをいただき、今は希望を持って働けています。",
        job: "アルバイト → 正社員",
        age: 32,
        income: "年収480万円に上昇",
        image: "/images/testimonials/01.png",
        highlight: "キャリアアップ"
    },
    {
        content: "依頼した日から、パワハラ上司と一切連絡を取らなくて済みました。精神的に追い詰められていましたが、全て代行してくれたおかげで、心の余裕を持って次の仕事を探すことができました。",
        job: "契約社員 → 正社員",
        age: 26,
        income: "年収620万円に上昇",
        image: "/images/testimonials/02.png",
        highlight: "安心対応"
    },
    
    {
        content: "残業代未払いに悩んでいましたが、適切なアドバイスのおかげで未払い分も受け取れ、新しい職場でも適正な評価を受けています。",
        job: "元SE → プロジェクトマネージャー",
        age: 34,
        income: "年収900万円に上昇",
        image: "/images/testimonials/04.png",
        highlight: "キャリアアップ"
    },
    {
        content: "有給休暇を取得できない環境でしたが、退職後はワークライフバランスの取れる企業に転職でき、プライベートも充実しています。",
        job: "元総務 → HR Tech企業",
        age: 30,
        income: "年収650万円に上昇",
        image: "/images/testimonials/05.png",
        highlight: "働き方改革"
    },
    {
        content: "AIスキル習得支援プログラムを利用し、未経験からAIエンジニアに。今では自分の市場価値を実感できています。",
        job: "元一般事務 → AIエンジニア",
        age: 27,
        income: "年収750万円に上昇",
        image: "/images/testimonials/06.png",
        highlight: "キャリアチェンジ"
    }
];

export default function TestimonialsSection() {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            id="testimonials"
            className="relative py-20 md:py-32 bg-gradient-to-b from-orange-50 to-white overflow-hidden"
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
                        Success Stories
                    </motion.div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        ご利用者様の声
                    </h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        退職後、より良いキャリアを実現された方々の声をご紹介します
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
                        >
                            <div className="absolute -top-3 right-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                {testimonial.highlight}
                            </div>
                            <div className="flex items-center mb-4">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                                    <Image
                                        src={testimonial.image}
                                        alt="User"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{testimonial.job}</p>
                                    <p className="text-sm text-gray-600">{testimonial.age}歳</p>
                                    <div className="flex items-center text-orange-500 mt-1">
                                        <TrendingUp className="w-4 h-4 mr-1" />
                                        <span className="text-sm font-medium">{testimonial.income}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4 flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-400" fill="#FBBF24" />
                                ))}
                            </div>
                            <p className="text-gray-600 leading-relaxed">{testimonial.content}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="text-center mt-16"
                >
                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-8 rounded-2xl shadow-xl relative overflow-hidden">
                        {/* 装飾的な背景要素 */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full transform translate-x-1/2 -translate-y-1/2 blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full transform -translate-x-1/2 translate-y-1/2 blur-3xl" />
                        
                        {/* スパークルアイコン装飾 */}
                        <motion.div
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                            className="absolute top-4 right-4"
                        >
                            <Sparkles className="w-8 h-8 text-white/50" />
                        </motion.div>

                        <div className="relative z-10">
                            <h4 className="text-xl md:text-3xl font-bold text-white mb-4">
                                あなたも新しいキャリアへの<br />
                                第一歩を
                            </h4>
                            <p className="text-white/90 text-lg mb-6">
                                今の状況を変えたい方へ<br />
                                無料相談から始めませんか？
                            </p>
                            <motion.a
                                href="https://lin.ee/ye1zwHn"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-block bg-white text-orange-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                まずは無料相談から
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
} 