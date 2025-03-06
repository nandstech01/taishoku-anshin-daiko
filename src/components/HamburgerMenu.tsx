'use client'

import { memo, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Twitter, Instagram, Youtube } from 'lucide-react';
import { useMenu } from '@/contexts/MenuContext';
import Image from 'next/image';
import Link from 'next/link';

// メニューアイコンコンポーネント
const MenuIcon = memo(({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
    const iconVariants = {
        top: {
            open: { rotate: 45, translateY: 7, translateX: 0 },
            closed: { rotate: 0, translateY: 0, translateX: 0 }
        },
        middle: {
            open: { opacity: 0 },
            closed: { opacity: 1 }
        },
        bottom: {
            open: { rotate: -45, translateY: -7, translateX: 0 },
            closed: { rotate: 0, translateY: 0, translateX: 0 }
        }
    };

    return (
        <button
            onClick={onClick}
            className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none w-10 h-10 flex items-center justify-center"
            aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        >
            <svg width="24" height="24" viewBox="0 0 24 24">
                <motion.path
                    fill="transparent"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    d="M 4 6 L 20 6"
                    initial="closed"
                    animate={isOpen ? "open" : "closed"}
                    variants={iconVariants.top}
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    style={{ transformOrigin: "center" }}
                />
                <motion.path
                    fill="transparent"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    d="M 4 12 L 20 12"
                    initial="closed"
                    animate={isOpen ? "open" : "closed"}
                    variants={iconVariants.middle}
                    transition={{ duration: 0.2 }}
                    style={{ transformOrigin: "center" }}
                />
                <motion.path
                    fill="transparent"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    d="M 4 18 L 20 18"
                    initial="closed"
                    animate={isOpen ? "open" : "closed"}
                    variants={iconVariants.bottom}
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    style={{ transformOrigin: "center" }}
                />
            </svg>
        </button>
    );
});
MenuIcon.displayName = 'MenuIcon';

// ソーシャルアイコンコンポーネント
const SocialIcon = memo(({ href, icon: Icon, name }: { href: string; icon: any; name: string }) => (
    <Link
        href={href}
        className="text-white hover:text-orange-400 transition-colors duration-300 transform hover:scale-110"
        aria-label={`${name}をフォロー`}
    >
        <div className="w-7 h-7">
            <Icon className="w-full h-full" />
        </div>
    </Link>
));
SocialIcon.displayName = 'SocialIcon';

// メニューアイテムの型定義を追加
type MenuItem = {
    title: string;
    href?: string;
    subItems?: Array<{
        title: string;
        href: string;
        isExternal?: boolean;
    }>;
    type?: 'divider';
};

// メニューアイテムコンポーネント
const MenuItem = memo(({ item, onClose }: { 
    item: MenuItem; 
    onClose: () => void 
}) => {
    if (item.type === 'divider') {
        return <div className="my-6 border-t border-white/10" />;
    }

    const itemVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        }
    };

    // スクロール処理を追加
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        onClose(); // メニューを閉じる
        
        // 内部リンク（#で始まるもの）の場合のみスクロール処理を行う
        if (item.href && item.href.startsWith('#')) {
            e.preventDefault();
            const targetId = item.href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // 少し遅延を入れてメニューが閉じた後にスクロールするようにする
                setTimeout(() => {
                    // スムーズスクロール
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // ヘッダーの高さを考慮
                        behavior: 'smooth'
                    });
                }, 300);
            }
        }
    };

    // サブアイテムのクリックハンドラ
    const handleSubItemClick = (e: React.MouseEvent<HTMLAnchorElement>, subItem: { href: string, isExternal?: boolean }) => {
        onClose(); // メニューを閉じる
        
        // 外部リンクまたは通常のリンクの場合は通常の動作
        if (subItem.isExternal || !subItem.href.startsWith('#')) {
            return; // デフォルトの動作を許可
        }
        
        // 内部リンク（#で始まるもの）の場合のみスクロール処理を行う
        if (subItem.href.startsWith('#')) {
            e.preventDefault();
            const targetId = subItem.href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // 少し遅延を入れてメニューが閉じた後にスクロールするようにする
                setTimeout(() => {
                    // スムーズスクロール
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // ヘッダーの高さを考慮
                        behavior: 'smooth'
                    });
                }, 300);
            }
        }
    };

    if (item.subItems) {
        return (
            <motion.div 
                variants={itemVariants}
                className="mb-2"
            >
                <span className="text-lg font-medium text-white/90">
                    {item.title}
                </span>
                <ul className="ml-4 mt-2 space-y-2">
                    {item.subItems.map((subItem, index) => (
                        <motion.li
                            key={`${subItem.title}-${index}`}
                            variants={itemVariants}
                            className="flex items-center transform transition-transform hover:translate-x-1"
                        >
                            <ChevronRight className="w-4 h-4 text-orange-500 mr-1" />
                            <a
                                href={subItem.href}
                                onClick={(e) => handleSubItemClick(e, subItem)}
                                className="text-gray-300 hover:text-orange-500 transition-colors"
                                target={subItem.isExternal ? "_blank" : undefined}
                                rel={subItem.isExternal ? "noopener noreferrer" : undefined}
                            >
                                {subItem.title}
                            </a>
                        </motion.li>
                    ))}
                </ul>
            </motion.div>
        );
    }

    return (
        <motion.div 
            variants={itemVariants}
            className="transform transition-transform hover:translate-x-1"
        >
            <a
                href={item.href}
                onClick={handleClick}
                className="text-lg font-medium text-white hover:text-orange-500 transition-colors"
            >
                {item.title}
            </a>
        </motion.div>
    );
});
MenuItem.displayName = 'MenuItem';

// メニューコンテナコンポーネント
const MenuContainer = memo(({ isOpen, children }: {
    isOpen: boolean;
    children: React.ReactNode;
}) => {
    const containerVariants = {
        hidden: { opacity: 0, x: "100%" },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                staggerChildren: 0.1
            }
        },
        exit: { 
            opacity: 0, 
            x: "100%",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-[64px] inset-0 bg-black/80 backdrop-blur-sm z-40 overflow-hidden will-change-transform"
        >
            <div className="relative h-full">
                {children}
            </div>
        </motion.div>
    );
});
MenuContainer.displayName = 'MenuContainer';

// メインコンポーネント
const HamburgerMenu = () => {
    const { isMenuOpen, setIsMenuOpen } = useMenu();

    // スクロール制御の最適化
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, [isMenuOpen]);

    // メニューの開閉ハンドラ
    const handleMenuToggle = useCallback(() => {
        setIsMenuOpen(!isMenuOpen);
    }, [isMenuOpen, setIsMenuOpen]);

    // メニューを閉じるハンドラ
    const handleClose = useCallback(() => {
        setIsMenuOpen(false);
    }, [setIsMenuOpen]);

    // メニューアイテムの定義
    const menuItems = useMemo<MenuItem[]>(() => [
        { title: "選ばれる理由", href: "#reasons" },
        { title: "サービスの特徴", href: "#features" },
        { title: "ご利用料金", href: "#pricing" },
        { title: "他社との比較", href: "#comparison" },
        { title: "退職の流れ", href: "#process" },
        { title: "お客様の声", href: "#testimonials" },
        { title: "お支払い方法", href: "#payment" },
        { title: "よくある質問", href: "#faq" },
        { title: "区切り線", type: 'divider' },
        {
            title: "キャリア支援",
            subItems: [
                { title: "転職エージェントセレクト", href: "#", isExternal: true },
                { title: "生成AIリスキリング研修", href: "#", isExternal: true }
            ]
        },
        { title: "LINE無料相談", href: "https://lin.ee/h1kk42r" }
    ], []);

    // ソーシャルアイコンの定義
    const socialIcons = useMemo(() => [
        { name: 'Twitter', icon: Twitter, href: 'https://x.com/anshin_taishoku' },
        { name: 'Instagram', icon: Instagram, href: '#' },
        { name: 'Youtube', icon: Youtube, href: '#' },
        { 
            name: 'TikTok', 
            icon: () => (
                <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
            ),
            href: 'https://www.tiktok.com/@taishokuanshindaiko'
        }
    ], []);

    return (
        <div className="relative">
            <MenuIcon isOpen={isMenuOpen} onClick={handleMenuToggle} />
            
            <AnimatePresence mode="wait">
                {isMenuOpen && (
                    <MenuContainer isOpen={isMenuOpen}>
                        <div className="flex flex-col h-[calc(100vh-64px)]">
                            {/* ヘッダー部分 */}
                            <div className="bg-gradient-to-r from-black/70 to-transparent p-6 border-b border-white/10">
                                <div className="text-center">
                                    <p className="text-white/90 text-sm font-medium mb-1">-NANDS-</p>
                                    <h2 className="text-xl font-bold text-white">退職あんしん代行</h2>
                                    
                                    <div className="mt-4">
                                        <p className="text-white/80 text-sm mb-3">＼ フォローしてね ／</p>
                                        <div className="flex justify-center gap-6">
                                            {socialIcons.map((social) => (
                                                <SocialIcon
                                                    key={social.name}
                                                    href={social.href}
                                                    icon={social.icon}
                                                    name={social.name}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* メニュー項目 */}
                            <div className="flex-1 overflow-y-auto">
                                <nav className="px-4 py-2">
                                    <ul className="space-y-4">
                                        {menuItems.map((item, index) => (
                                            <li key={`${item.title || index}`}>
                                                <MenuItem
                                                    item={item}
                                                    onClose={handleClose}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>

                            {/* フッター部分 */}
                            <div className="bg-gradient-to-t from-black via-black/95 to-transparent pt-20 pb-8">
                                <div className="relative px-6">
                                    <div className="absolute inset-0 opacity-10">
                                        <Image
                                            src="/images/footer-bg.jpg"
                                            alt=""
                                            fill
                                            sizes="100vw"
                                            className="object-cover"
                                            priority={false}
                                        />
                                    </div>
                                    
                                    <div className="text-center relative z-10">
                                        <Link
                                            href="/about"
                                            className="group relative inline-block"
                                            onClick={handleClose}
                                        >
                                            <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/10 transform transition-transform hover:scale-105">
                                                <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                                                    - NANDS -
                                                </span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MenuContainer>
                )}
            </AnimatePresence>
        </div>
    );
};

export default memo(HamburgerMenu);