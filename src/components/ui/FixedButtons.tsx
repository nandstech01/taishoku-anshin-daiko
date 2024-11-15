'use client'

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useMenu } from '@/contexts/MenuContext';
import { motion, AnimatePresence } from 'framer-motion';

interface FixedButtonsProps {
    isVisible?: boolean;
}

export default function FixedButtons({ isVisible: isChatVisible = true }: FixedButtonsProps) {
    const { ref: footerRef, inView: isFooterVisible } = useInView({
        threshold: 0,
        rootMargin: '-120px 0px 0px 0px',
    });
    const [isVisible, setIsVisible] = useState(true);
    const { isMenuOpen } = useMenu();

    useEffect(() => {
        setIsVisible(!isFooterVisible && !isMenuOpen && isChatVisible);
    }, [isFooterVisible, isMenuOpen, isChatVisible]);

    return (
        <>
            <AnimatePresence>
                {isVisible && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed bottom-0 left-0 right-0 flex justify-center p-4 z-[55] mb-6"
                    >
                        <div className="flex flex-row gap-4 p-4 bg-black/70 rounded-lg shadow-lg">
                            <a
                                href="tel:0120558551"
                                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold py-2 px-6 rounded-md w-40 shadow-md text-center transition-all duration-300"
                            >
                                <div className="flex flex-col items-center justify-center">
                                    <span className="text-xs">＼通話料無料／</span>
                                    <span>無料電話相談</span>
                                </div>
                            </a>
                            <a
                                href="https://lin.ee/h1kk42r"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#06C755] hover:bg-[#05b34c] text-white font-bold py-2 px-6 rounded-md w-40 shadow-md text-center transition-all duration-300 flex items-center justify-center"
                            >
                                <span>LINE無料相談受付</span>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div ref={footerRef} className="h-px w-full absolute bottom-0 z-[45]" />
        </>
    );
}