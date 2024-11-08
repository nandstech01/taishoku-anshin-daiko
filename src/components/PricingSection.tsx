'use client'

import { motion } from 'framer-motion';
import { Check, Shield, Star, Sparkles } from 'lucide-react';

export default function PricingSection() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            id="pricing"
            className="relative py-16 md:py-24 bg-gradient-to-b from-orange-50 to-white overflow-hidden"
        >
            {/* 装飾的な背景要素 */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full filter blur-3xl opacity-30 translate-x-1/2 -translate-y-1/2" />
            
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white text-lg font-bold px-6 py-2 rounded-full mb-6 shadow-lg"
                    >
                        圧倒的な業界最安値の料金
                    </motion.div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        ご利用料金
                    </h3>
                </motion.div>

                <div className="max-w-xl mx-auto">
                    {/* プロプラン - 目玉商品 */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="relative bg-gradient-to-br from-orange-500 to-amber-500 p-[2px] rounded-2xl shadow-xl"
                    >
                        <motion.div
                            animate={{ 
                                boxShadow: ['0 0 20px rgba(251, 146, 60, 0.3)', '0 0 40px rgba(251, 146, 60, 0.5)', '0 0 20px rgba(251, 146, 60, 0.3)']
                            }}
                            transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="bg-white rounded-2xl overflow-hidden relative"
                        >
                            <div className="absolute top-4 right-4">
                                <motion.div
                                    animate={{ 
                                        scale: [1, 1.2, 1],
                                        rotate: [-5, 5, -5],
                                    }}
                                    transition={{ 
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg"
                                >
                                    <Star className="w-7 h-7" fill="white" />
                                    なんと、
                                </motion.div>
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <Sparkles className="w-8 h-8 text-orange-500" />
                                    <h4 className="text-2xl font-bold text-gray-900">ご利用料金</h4>
                                </div>
                                
                                <div className="text-center mb-6">
                                    <div className="flex items-center justify-center mb-2">
                                        <span className="text-6xl font-bold text-orange-500">2,980</span>
                                        <span className="text-2xl text-orange-500 ml-2">円</span>
                                        <span className="text-gray-500 ml-2">（税込）</span>
                                    </div>
                                    <motion.div
                                        animate={{ 
                                            scale: [1, 1.05, 1],
                                        }}
                                        transition={{ 
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-bold px-4 py-1 rounded-full"
                                    >
                                        圧倒的料金でまるっと依頼
                                    </motion.div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3">
                                        <Check className="w-5 h-5 text-orange-500 flex-shrink-0" />
                                        <span className="text-gray-700">24時間365日対応可能</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Check className="w-5 h-5 text-orange-500 flex-shrink-0" />
                                        <span className="text-gray-700">給付金申請サポート可能</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Check className="w-5 h-5 text-orange-500 flex-shrink-0" />
                                        <span className="text-gray-700">弁護士相談可能</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Check className="w-5 h-5 text-orange-500 flex-shrink-0" />
                                        <span className="text-gray-700">退職後のキャリア相談可能</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <p className="text-gray-600 font-medium">
                        ご依頼状況によってはお急ぎの方を優先し<br/>１週間ほどいただく場合があります
                    </p>
                </motion.div>
            </div>
        </motion.section>
    );
} 