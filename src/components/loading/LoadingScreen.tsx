'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 初期表示用の静的コンテンツ
const LoadingContent = () => (
  <div className="w-full h-screen bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
    <div className="text-white text-center max-w-4xl mx-auto px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        退職代行サービス
        <span className="block text-2xl md:text-3xl mt-2">
          業界最安値2,980円で即日対応
        </span>
      </h1>
      <p className="text-xl mt-4">
        弁護士監修であんしん退職をサポート
      </p>
    </div>
  </div>
);

export default function LoadingScreen() {
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 pointer-events-none"
          aria-hidden="true"
        >
          <LoadingContent />
        </motion.div>
      )}
    </AnimatePresence>
  );
} 