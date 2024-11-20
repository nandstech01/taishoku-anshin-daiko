'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, MessageCircle, Sparkles } from 'lucide-react';
import ChatBot from '@/components/ChatBot';
import { openChat } from '@/components/ChatBot';

export default function RefinedCourseDates() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <div className="font-sans">
        <AnimatePresence>
          {isVisible && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden z-[40]"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50" />
              
              <motion.div
                className="absolute inset-0 opacity-[0.03]"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'linear',
                }}
                style={{
                  backgroundImage: 'url("/images/background-pattern.jpg")',
                  backgroundSize: '200px 200px',
                }}
              />

              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)',
                    'linear-gradient(to right, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.5) 100%)',
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'linear',
                }}
              />

              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
              </div>

              <div className="container mx-auto relative z-10 py-8 px-4">
                <div className="flex flex-col items-center justify-center space-y-6">
                  <motion.div 
                    className="flex items-center space-x-3 text-2xl font-bold text-amber-400"
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Users className="w-8 h-8" />
                    <span>退職者Aさんの声</span>
                    <Sparkles className="w-6 h-6" />
                  </motion.div>
                  
                  <div className="flex items-center space-x-2 text-lg text-gray-600">
                    <MessageCircle className="w-5 h-5 text-cyan-400" />
                    <span>退職成功者様の実体験談</span>
                  </div>
                </div>
              
                <div className="text-center mt-8">
                  <motion.button
                    onClick={openChat}
                    whileHover={{ scale: 1.03 }}
                    className="inline-block bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold py-5 px-10 rounded-lg shadow-lg transition-all duration-300 ease-in-out text-xl"
                  >
                    <span className="block text-sm mb-1">＼ 先輩の体験談を記録 ／</span>
                    <span className="block">先輩にまるッと相談</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <ChatBot />
    </>
  );
}
