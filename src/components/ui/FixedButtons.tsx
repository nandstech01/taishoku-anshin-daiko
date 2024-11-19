'use client'

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useMenu } from '@/contexts/MenuContext';
import { motion, AnimatePresence } from 'framer-motion';

interface FixedButtonsProps {
    isVisible?: boolean;
}

export default function FixedButtons({ isVisible: isChatVisible = true }: FixedButtonsProps) {
    const { ref: mainButtonRef, inView: isMainButtonVisible } = useInView({
        threshold: 0.5,
    });
    const { ref: footerRef, inView: isFooterVisible } = useInView({
        threshold: 0,
        rootMargin: '-120px 0px 0px 0px',
    });
    const [isVisible, setIsVisible] = useState(false);
    const { isMenuOpen } = useMenu();

    useEffect(() => {
        setIsVisible(!isMainButtonVisible && !isFooterVisible && !isMenuOpen && isChatVisible);
    }, [isMainButtonVisible, isFooterVisible, isMenuOpen, isChatVisible]);

    return (
        <>
            <div ref={mainButtonRef} className="absolute top-0 left-0 w-full h-[100vh] pointer-events-none" />
            <AnimatePresence>
                {isVisible && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed bottom-8 left-0 right-0 z-[55] px-4 mx-auto max-w-3xl"
                    >
                        <a
                            href="https://lin.ee/h1kk42r"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                block w-full py-4 px-8
                                text-center text-white text-xl font-bold
                                bg-gradient-to-r from-[#ff8210] to-[#f59e0b]
                                rounded-full shadow-lg
                                hover:shadow-2xl hover:scale-105
                                transform transition-all duration-300
                                relative overflow-hidden
                                border-2 border-white/20
                            "
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0"
                                animate={{
                                    x: ['-200%', '200%'],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            <motion.div
                                className="absolute inset-0 rounded-full"
                                animate={{
                                    boxShadow: [
                                        '0 0 20px rgba(255,130,16,0.5)',
                                        '0 0 40px rgba(245,158,11,0.8)',
                                        '0 0 20px rgba(255,130,16,0.5)'
                                    ]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            <span className="relative flex items-center justify-center gap-2">
                                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z"/>
                                </svg>
                                まずはLINEで無料相談
                            </span>
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
            <div ref={footerRef} className="h-px w-full absolute bottom-0 z-[45]" />
        </>
    );
}