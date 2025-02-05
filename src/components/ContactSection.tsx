'use client'

import { motion } from 'framer-motion';
import { Phone, MessageCircle, Mail, Clock, Shield, ArrowRight } from 'lucide-react';

export default function ContactSection() {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative py-20 md:py-32 bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 overflow-hidden"
        >
            {/* 装飾的な背景要素 */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl opacity-10 translate-x-1/2 translate-y-1/2" />
            </div>

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
                        24時間365日対応
                    </motion.div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        ご相談はこちら
                    </h3>
                    <p className="text-white/90 text-lg max-w-2xl mx-auto">
                        専門スタッフがあなたの状況に合わせて<br/>丁寧にサポートいたします
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid gap-6">
                        {/* 電話相談 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <a
                                href="tel:0120558551"
                                className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                                <div className="relative flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-blue-100 rounded-xl">
                                            <Phone className="w-8 h-8 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-blue-600 font-bold mb-1">お電話でのご相談</p>
                                            <p className="text-3xl font-bold text-gray-900">0120-558-551</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-6 h-6 text-blue-500 transform group-hover:translate-x-2 transition-transform" />
                                </div>
                            </a>
                        </motion.div>

                        {/* LINE相談 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#06C755]/20 to-[#06C755]/5 rounded-full transform translate-x-16 -translate-y-16" />
                                
                                <div className="text-center mb-6">
                                    <motion.div
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="inline-block"
                                    >
                                        <MessageCircle className="w-12 h-12 text-[#06C755] mx-auto mb-2" />
                                    </motion.div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                                        公式LINEでお気軽に相談
                                    </h4>
                                    <p className="text-gray-600">
                                        LINEなら、いつでも気軽にご相談いただけます
                                    </p>
                                </div>

                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <a
                                        href="https://lin.ee/h1kk42r"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-[#06C755] font-bold"
                                    >
                                        LINEで相談する
                                    </a>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* メール相談 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <a
                                href="mailto:info@taishoku-daiko.jp"
                                className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                                <div className="relative flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-orange-100 rounded-xl">
                                            <Mail className="w-8 h-8 text-orange-500" />
                                        </div>
                                        <div>
                                            <p className="text-orange-500 font-bold mb-1">メールでのご相談</p>
                                            <p className="text-lg text-gray-600">24時間受付中</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-6 h-6 text-orange-500 transform group-hover:translate-x-2 transition-transform" />
                                </div>
                            </a>
                        </motion.div>
                    </div>

                    {/* 安心ポイント */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mt-8 grid grid-cols-2 gap-4"
                    >
                        <div className="bg-white rounded-xl p-4 flex items-center gap-3">
                            <Clock className="w-6 h-6 text-orange-500" />
                            <p className="text-gray-900 font-medium">365日受付</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 flex items-center gap-3">
                            <Shield className="w-6 h-6 text-orange-500" />
                            <p className="text-gray-900 font-medium">相談無料</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
} 