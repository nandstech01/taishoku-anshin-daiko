'use client'

import * as React from 'react';
import { motion, useScroll, useTransform, MotionStyle } from 'framer-motion';
import Image from 'next/image';
import { Shield, Clock, Scale, DollarSign, Users, Sparkles } from 'lucide-react';
import { optimizedMotionConfig, getDeviceOptimizedConfig } from '@/lib/motion-config';

interface ReasonCardProps {
    number: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    delay: number;
    image?: string;
}

const ReasonCard = ({ number, icon, title, description, delay, image }: ReasonCardProps) => {
    const cardRef = React.useRef<HTMLDivElement>(null);
    
    // デバイスに応じた最適化設定を取得
    const deviceConfig = React.useMemo(() => getDeviceOptimizedConfig(), []);

    // スクロール検出を最適化 - 閾値を調整し、リフローを減らす
    const { scrollYProgress } = useScroll({
        target: cardRef as React.RefObject<HTMLElement>,
        offset: deviceConfig.viewport.once ? ["0 1", "0.8 1"] : ["0 1", "1.2 1"]
    });
    
    // パフォーマンス最適化のためにtransform値を事前計算
    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [50, 0]); // 移動距離を縮小
    
    // メモ化したスタイルオブジェクト - 型を修正
    const motionStyle: MotionStyle = React.useMemo(() => ({ 
        opacity, 
        y, 
        position: 'relative',
        willChange: 'transform, opacity' // GPUヒントを追加
    }), [opacity, y]);

    return (
        <motion.div
            ref={cardRef}
            style={motionStyle}
            className="relative group"
        >
            <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
            <motion.div
                initial={{ scale: 0.95 }} // より小さなアニメーション効果に調整
                animate={{ scale: 1 }}
                transition={{ 
                    ...optimizedMotionConfig.commonTransition,
                    delay 
                }}
                className="relative bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
                {image && (
                    <div className="mb-6 relative h-40 w-full overflow-hidden rounded-lg">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                )}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-500 to-amber-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {number}
                </div>
                <div className="mb-4 bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center">
                    {icon}
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-900">{title}</h4>
                <p className="text-gray-600 leading-relaxed">{description}</p>
            </motion.div>
        </motion.div>
    );
};

export default function ReasonsSection() {
    const sectionRef = React.useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef as React.RefObject<HTMLElement>,
        offset: ["start end", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section 
            ref={sectionRef} 
            className="py-20 overflow-hidden"
            style={{ position: 'relative' }}
            id="reasons"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* 装飾的な背景要素 - より洗練された効果に */}
                <motion.div
                    style={{ y: backgroundY }}
                    className="absolute inset-0 opacity-30"
                >
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl" />
                </motion.div>

                <div className="container mx-auto px-4 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="inline-block bg-white text-orange-500 text-lg font-bold px-6 py-2 rounded-full mb-6 shadow-lg"
                        >
                            選ばれる理由
                        </motion.div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            <span className="text-orange-400 drop-shadow-md">選ばれる6つの理由</span>
                        </h3>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <ReasonCard
                            number="01"
                            icon={<Clock className="w-8 h-8 text-orange-500" />}
                            title="スピーディーな対応"
                            description="24時間365日対応可能。急なご相談や緊急の対応も迅速に行います。"
                            delay={0.2}
                            image="/images/reasons/01.png"
                        />
                        <ReasonCard
                            number="02"
                            icon={<Shield className="w-8 h-8 text-orange-500" />}
                            title="安心の料金設定"
                            description="2,980円と退職者様の負担を最大限軽減した料金設定。全額返金保証もあり安心してご利用いただけます。"
                            delay={0.3}
                            image="/images/reasons/02.png"
                        />
                        <ReasonCard
                            number="03"
                            icon={<Scale className="w-8 h-8 text-orange-500" />}
                            title="顧問弁護士監修"
                            description="法的リスクを回避し、適切なアドバイスと対応策を提供します。"
                            delay={0.4}
                            image="/images/reasons/03.png"
                        />
                        <ReasonCard
                            number="04"
                            icon={<DollarSign className="w-8 h-8 text-orange-500" />}
                            title="給付金サポート"
                            description="失業給付金等の申請手続きを完全サポート。経済的な不安を解消します。"
                            delay={0.5}
                            image="/images/reasons/04.png"
                        />
                        <ReasonCard
                            number="05"
                            icon={<Users className="w-8 h-8 text-orange-500" />}
                            title="労働組合との連携"
                            description="必要に応じて労働組合と連携し、より強力な交渉力を発揮します。"
                            delay={0.6}
                            image="/images/reasons/05.png"
                        />
                        <ReasonCard
                            number="06"
                            icon={<Sparkles className="w-8 h-8 text-orange-500" />}
                            title="充実のアフターフォロー"
                            description="退職後のキャリア相談やAIスキル習得支援で、次のステップを支援します。"
                            delay={0.7}
                            image="/images/reasons/06.png"
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    );
} 