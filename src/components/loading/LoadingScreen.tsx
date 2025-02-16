'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 初期表示用の静的コンテンツ
const LoadingContent = () => (
  <div className="text-white text-center">
    <h2 className="text-4xl font-bold mb-4">
      退職代行サービス
    </h2>
    <p className="text-xl">
      業界最安値2,980円で即日対応
    </p>
  </div>
);

export default function LoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(true);

  // マウント時の処理
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // ローディング画面の表示制御
  useEffect(() => {
    if (!mounted) return;

    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [mounted]);

  // 初期表示時はnullを返し、メインコンテンツを優先
  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center"
          style={{ position: 'fixed' }} // 重要: メインコンテンツの邪魔をしない
        >
          <LoadingContent />
        </motion.div>
      )}
    </AnimatePresence>
  );
} 