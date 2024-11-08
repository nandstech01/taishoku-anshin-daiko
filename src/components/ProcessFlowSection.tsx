'use client'

import { motion } from 'framer-motion';
import { MessageCircle, CreditCard, CheckCircle2, Phone, FileCheck, UserCheck } from 'lucide-react';

interface ProcessStepProps {
    number: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    subDescription?: string[];
    delay: number;
}

const ProcessStep = ({ number, icon, title, description, subDescription, delay }: ProcessStepProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            className="relative flex items-start gap-6"
        >
            {/* 左側の数字とライン */}
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {number}
                </div>
                <div className="w-0.5 h-full bg-gradient-to-b from-orange-500 to-transparent absolute top-12 left-6 -z-10" />
            </div>

            {/* 右側のコンテンツ */}
            <div className="flex-1 bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-orange-100 rounded-lg">
                        {icon}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">{title}</h4>
                </div>
                <p className="text-gray-700 mb-4">{description}</p>
                {subDescription && (
                    <ul className="space-y-2">
                        {subDescription.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-600">
                                <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </motion.div>
    );
};

export default function ProcessFlowSection() {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            id="process"
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
                        簡単3ステップ
                    </motion.div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        退職相談の流れ
                    </h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        まずはお気軽にご相談ください<br/>専門スタッフが丁寧にサポートいたします
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto">
                    <ProcessStep
                        number="01"
                        icon={<Phone className="w-6 h-6 text-orange-500" />}
                        title="無料相談"
                        description="お電話・メール・LINEにて、現在の状況やご要望をお聞かせください。"
                        subDescription={[
                            "24時間365日いつでもご相談可能",
                            "ご相談は完全無料",
                            "プライバシーは厳守いたします"
                        ]}
                        delay={0.2}
                    />
                    <ProcessStep
                        number="02"
                        icon={<FileCheck className="w-6 h-6 text-orange-500" />}
                        title="ご契約・お支払い"
                        description="サービス内容をご説明し、ご納得いただけましたらお手続きを進めます。"
                        subDescription={[
                            "明朗会計で追加料金なし",
                            "クレジットカード決済対応",
                            "その場でお手続き完了"
                        ]}
                        delay={0.4}
                    />
                    <ProcessStep
                        number="03"
                        icon={<UserCheck className="w-6 h-6 text-orange-500" />}
                        title="退職手続き代行"
                        description="ご希望の日時で退職代行を進めさせていただきます。"
                        subDescription={[
                            "専任スタッフが責任を持って対応",
                            "進捗状況を随時ご報告",
                            "給付金申請もサポート"
                        ]}
                        delay={0.6}
                    />
                </div>
            </div>
        </motion.section>
    );
} 