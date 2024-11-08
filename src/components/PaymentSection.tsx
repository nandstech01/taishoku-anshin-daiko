'use client'

import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Building2, Shield, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

interface PaymentMethodProps {
    title: string;
    description: string | React.ReactNode;
    icon: React.ReactNode;
    brands?: string[];
    delay: number;
}

const PaymentMethod = ({ title, description, icon, brands, delay }: PaymentMethodProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
        >
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                    {icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900">{title}</h4>
            </div>
            <div className="space-y-4">
                {typeof description === 'string' ? (
                    <p className="text-gray-600">{description}</p>
                ) : (
                    description
                )}
                {brands && (
                    <div className="grid grid-cols-3 gap-3 mt-4">
                        {brands.map((brand, index) => (
                            <motion.div
                                key={brand}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: delay + (index * 0.1) }}
                                className="relative h-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-2 flex items-center justify-center"
                            >
                                <Image
                                    src={`/images/payment/${brand}.svg`}
                                    alt={brand}
                                    width={60}
                                    height={30}
                                    className="object-contain"
                                />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default function PaymentSection() {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            id="payment"
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
                        安心のお支払い
                    </motion.div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        お支払い方法
                    </h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        各種クレジットカード・銀行振込に対応。<br />
                        分割払いなどご相談に応じます。
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
                    <PaymentMethod
                        title="クレジットカード決済"
                        description={
                            <div className="space-y-3">
                                <p className="text-gray-600">主要なクレジットカードに対応しています。</p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-gray-600">
                                        <CheckCircle2 className="w-5 h-5 text-orange-500" />
                                        <span>分割払い可能</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-600">
                                        <CheckCircle2 className="w-5 h-5 text-orange-500" />
                                        <span>SSL暗号化で安全な決済</span>
                                    </li>
                                </ul>
                            </div>
                        }
                        icon={<CreditCard className="w-8 h-8 text-orange-500" />}
                        brands={['visa', 'mastercard', 'amex', 'jcb', 'diners', 'discover']}
                        delay={0.2}
                    />
                    <PaymentMethod
                        title="銀行振込"
                        description={
                            <div className="space-y-3">
                                <p className="text-gray-600">全国の主要銀行からお振込いただけます。</p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-gray-600">
                                        <CheckCircle2 className="w-5 h-5 text-orange-500" />
                                        <span>インターネットバンキング対応</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-600">
                                        <CheckCircle2 className="w-5 h-5 text-orange-500" />
                                        <span>法人・個人口座両対応</span>
                                    </li>
                                </ul>
                            </div>
                        }
                        icon={<Building2 className="w-8 h-8 text-orange-500" />}
                        brands={['mizuho', 'mufg', 'smbc', 'japan-post', 'paypay']}
                        delay={0.4}
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="max-w-3xl mx-auto bg-gradient-to-br from-orange-500 to-amber-500 p-[1px] rounded-xl"
                >
                    <div className="bg-white rounded-xl p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-orange-100 rounded-lg">
                                <Smartphone className="w-8 h-8 text-orange-500" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900">スマホ決済対応</h4>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                            {['paypay', 'linepay', 'rakutenpay', 'aupay', 'dpay'].map((brand, index) => (
                                <motion.div
                                    key={brand}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8 + (index * 0.1) }}
                                    className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 flex items-center justify-center"
                                >
                                    <Image
                                        src={`/images/payment/${brand}.svg`}
                                        alt={brand}
                                        width={80}
                                        height={40}
                                        className="object-contain"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="text-center mt-12"
                >
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                        <Shield className="w-5 h-5 text-orange-500" />
                        <p className="font-medium">安全な決済システムで<br/>安心してお支払いいただけます</p>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
} 