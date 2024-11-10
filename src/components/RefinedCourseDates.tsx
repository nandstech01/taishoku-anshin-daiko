import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, MessageCircle, Sparkles } from 'lucide-react';
import ChatBot from './ChatBot';
import FixedButtons from './ui/FixedButtons';

export default function RefinedCourseDates() {
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="font-sans">
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-slate-900 to-blue-950 text-white py-8 px-4 shadow-xl relative overflow-hidden z-[40]"
          >
            <motion.div
              className="absolute inset-0 bg-blue-500 opacity-10"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            />
            <div className="container mx-auto relative z-10">
              <div className="flex flex-col items-center justify-center space-y-6">
                <motion.div 
                  className="flex items-center space-x-3 text-2xl font-bold text-amber-400"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Users className="w-8 h-8" />
                  <span>無料相談員５名</span>
                  <Sparkles className="w-6 h-6" />
                </motion.div>
                
                <div className="flex items-center space-x-2 text-lg text-gray-200">
                  <MessageCircle className="w-5 h-5 text-cyan-400" />
                  <span>あなたの相談にいつでも待機しています</span>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <motion.button
                onClick={() => setIsChatOpen(true)}
                whileHover={{ scale: 1.03 }}
                className="inline-block bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold py-5 px-10 rounded-lg shadow-lg transition-all duration-300 ease-in-out text-xl"
              >
                <span className="block text-sm mb-1">＼ 今すぐ無料相談 24時間受付 ／</span>
                <span className="block">専門家にまるッと相談</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <FixedButtons isVisible={!isChatOpen} />
    </div>
  );
}
