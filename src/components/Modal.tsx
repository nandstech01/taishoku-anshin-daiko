"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden"; // スクロール防止
    
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = ""; // スクロール復帰
    };
  }, [onClose]);

  const modalContent = (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-[99999] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* 背景ブラー効果 */}
        <motion.div 
          className="absolute inset-0 backdrop-blur-md bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        
        {/* モーダルコンテンツ */}
        <motion.div 
          className="relative w-full max-w-3xl mx-4 overflow-hidden"
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* グラスモーフィズム効果のモーダル */}
          <div className="relative bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden border border-white/20">
            {/* グラデーションアクセント */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
            
            {/* 装飾的な背景要素 */}
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 blur-xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-gradient-to-tr from-pink-400/20 to-yellow-500/20 blur-xl" />
            
            {/* 閉じるボタン */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all duration-300 z-10 group"
            >
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
              <svg className="w-5 h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  // クライアントサイドでのみポータルを使用
  if (typeof window === "undefined") return null;
  
  return createPortal(modalContent, document.body);
} 