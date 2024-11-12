'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Twitter, Instagram, Youtube } from 'lucide-react';
import { useMenu } from '@/contexts/MenuContext';
import Image from 'next/image';
import { useEffect } from 'react';

export default function HamburgerMenu() {
    const { isMenuOpen, setIsMenuOpen } = useMenu();

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, [isMenuOpen]);

    const Path = (props: any) => (
        <motion.path
            fill="transparent"
            strokeWidth="2"
            stroke="currentColor"
            strokeLinecap="round"
            {...props}
        />
    );

    const menuItems = [
        { title: "選ばれる理由", href: "#reasons" },
        { title: "サービスの特徴", href: "#features" },
        { title: "ご利用料金", href: "#pricing" },
        { title: "他社との比較", href: "#comparison" },
        { title: "退職の流れ", href: "#process" },
        { title: "お客様の声", href: "#testimonials" },
        { title: "お支払い方法", href: "#payment" },
        { title: "よくある質問", href: "#faq" },
        { type: 'divider' },
        {
            title: "キャリア支援",
            subItems: [
                { title: "転職エージェントセレクト", href: "#", isExternal: true },
                { title: "生成AIリスキリング研修", href: "#", isExternal: true }
            ]
        },
        { title: "LINE無料相談", href: "https://lin.ee/h1kk42r" }
    ];

    return (
        <div className="relative">
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none w-10 h-10 flex items-center justify-center"
            >
                <svg width="28" height="28" viewBox="0 0 23 23">
                    <Path
                        variants={{
                            closed: { d: "M 2 2.5 L 20 2.5" },
                            open: { d: "M 3 16.5 L 17 2.5" }
                        }}
                        animate={isMenuOpen ? "open" : "closed"}
                        transition={{ duration: 0.5 }}
                    />
                    <Path
                        d="M 2 9.423 L 20 9.423"
                        variants={{
                            closed: { opacity: 1 },
                            open: { opacity: 0 }
                        }}
                        animate={isMenuOpen ? "open" : "closed"}
                        transition={{ duration: 0.5 }}
                    />
                    <Path
                        variants={{
                            closed: { d: "M 2 16.346 L 20 16.346" },
                            open: { d: "M 3 2.5 L 17 16.346" }
                        }}
                        animate={isMenuOpen ? "open" : "closed"}
                        transition={{ duration: 0.5 }}
                    />
                </svg>
            </button>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed top-[64px] inset-0 bg-black/80 backdrop-blur-sm z-40 overflow-hidden"
                    >
                        <div className="flex flex-col h-[calc(100vh-64px)]">
                            <div className="bg-gradient-to-r from-black/70 to-transparent p-6 border-b border-white/10">
                                <div className="text-center">
                                    <p className="text-white/90 text-sm font-medium mb-1">-NANDS-</p>
                                    <h2 className="text-xl font-bold text-white">退職あんしん代行</h2>
                                    
                                    <div className="mt-4">
                                        <p className="text-white/80 text-sm mb-3">＼ フォローしてね ／</p>
                                        <div className="flex justify-center gap-6">
                                            <motion.a
                                                href="#"
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="text-white hover:text-orange-400 transition-colors duration-300"
                                            >
                                                <Twitter className="w-7 h-7" />
                                            </motion.a>
                                            <motion.a
                                                href="#"
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="text-white hover:text-orange-400 transition-colors duration-300"
                                            >
                                                <Instagram className="w-7 h-7" />
                                            </motion.a>
                                            <motion.a
                                                href="#"
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="text-white hover:text-orange-400 transition-colors duration-300"
                                            >
                                                <Youtube className="w-7 h-7" />
                                            </motion.a>
                                            <motion.a
                                                href="#"
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="text-white hover:text-orange-400 transition-colors duration-300"
                                            >
                                                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                                                </svg>
                                            </motion.a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto">
                                <nav className="px-4 py-2">
                                    <ul className="space-y-4">
                                        {menuItems.map((item, index) => (
                                            <li key={index}>
                                                {item.type === 'divider' ? (
                                                    <div className="my-6 border-t border-white/10" />
                                                ) : item.subItems ? (
                                                    <div className="mb-2">
                                                        <span className="text-lg font-medium text-white/90">
                                                            {item.title}
                                                        </span>
                                                        <ul className="ml-4 mt-2 space-y-2">
                                                            {item.subItems.map((subItem, subIndex) => (
                                                                <motion.li
                                                                    key={subIndex}
                                                                    whileHover={{ x: 4 }}
                                                                    className="flex items-center"
                                                                >
                                                                    <ChevronRight className="w-4 h-4 text-orange-500 mr-1" />
                                                                    <a
                                                                        href={subItem.href}
                                                                        onClick={() => setIsMenuOpen(false)}
                                                                        className="text-gray-300 hover:text-orange-500 transition-colors"
                                                                    >
                                                                        {subItem.title}
                                                                    </a>
                                                                </motion.li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ) : (
                                                    <motion.div
                                                        whileHover={{ x: 4 }}
                                                        className="flex items-center"
                                                    >
                                                        <a
                                                            href={item.href}
                                                            onClick={() => setIsMenuOpen(false)}
                                                            className="text-lg font-medium text-white hover:text-orange-500 transition-colors"
                                                        >
                                                            {item.title}
                                                        </a>
                                                    </motion.div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>

                            <div className="bg-gradient-to-t from-black via-black/95 to-transparent pt-20 pb-8">
                                <div className="relative px-6">
                                    <div className="absolute inset-0 opacity-10">
                                        <Image
                                            src="/images/footer-bg.jpg"
                                            alt="Background"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5, duration: 0.3 }}
                                        className="text-center relative z-10"
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="inline-block"
                                        >
                                            <a
                                                href="https://nands.tech"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group relative"
                                            >
                                                <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/10">
                                                    <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                                                        - NANDS -
                                                    </span>
                                                    <motion.div
                                                        className="absolute -inset-px bg-gradient-to-r from-orange-500/50 to-amber-500/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                        animate={{
                                                            backgroundPosition: ['0% 0%', '100% 100%'],
                                                        }}
                                                        transition={{
                                                            duration: 3,
                                                            repeat: Infinity,
                                                            repeatType: 'reverse',
                                                        }}
                                                    />
                                                </div>
                                            </a>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}