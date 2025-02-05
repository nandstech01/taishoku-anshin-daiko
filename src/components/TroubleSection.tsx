'use client'

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function TroubleSection() {
    return (
        <div id="troubles">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative py-16 md:py-24 min-h-[600px]"
            >
                <Image
                    src="/images/troubles-background.jpg"
                    alt="Background"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                    className="object-center"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                
                <div className="relative container mx-auto px-4 flex flex-col items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        ひとりで悩まないでください<br/><br/>退職を検討される方の
                        </h2>
                        <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                            よくある心配事
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 w-full max-w-5xl">
                        {[
                            [
                                "退職代行に依頼したのがバレたくない",
                                "親とか同僚に迷惑をかけたくない",
                                "退職後に会社とのやりとりが不安"
                            ],
                            [
                                "残業代が全く支払われていない",
                                "約束された給与より大幅に少ない",
                                "昇給の見込みが全くない"
                            ],
                            [
                                "上司からのパワハラで精神的に限界",
                                "退職を言い出せない雰囲気がある",
                                "毎日の残業で体調を崩している"
                            ],
                            [
                                "もっと高い給与で働きたい",
                                "退職を申し出たら脅された",
                                "転職で年収を上げたい"
                            ]
                        ].map((items, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + (index * 0.2), duration: 0.5 }}
                                className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-black/40 transition-all duration-300"
                            >
                                <ul className="space-y-4">
                                    {items.map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-white/90">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                        className="mt-12 text-center"
                    >
                        <motion.p 
                            className="text-xl font-bold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent mb-3"
                            animate={{ 
                                scale: [1, 1.03, 1],
                                opacity: [0.8, 1, 0.8]
                            }}
                            transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            ひとりで悩まないでください
                        </motion.p>
                        <motion.p 
                            className="text-white/80 max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                                delay: 1.4,
                                duration: 0.8,
                                ease: "easeOut"
                            }}
                        >
                            経験豊富な専門アドバイザーが、<br className="hidden sm:block" />
                            あなたの状況に合わせた最適な解決策をご提案いたします
                        </motion.p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
} 