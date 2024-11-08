import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, MessageCircle, Sparkles } from 'lucide-react';
import type { ChatMessage, ChatBotProps } from '../types/chat';

interface ConversationHistory {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export default function ChatBot({ isOpen, onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      text: 'こんにちは！退職代行サービスの専門相談員です。\n\nご相談内容について、以下からお選びいただけますと幸いです：',
      isBot: true,
      options: [
        '職場でのパワハラやストレスについて相談したい',
        '退職の手続きや費用について知りたい',
        '明日から会社に行きたくない',
        'メンタルヘルスのサポートについて知りたい'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [conversationHistory, setConversationHistory] = useState<ConversationHistory[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage,
          conversationHistory 
        }),
      });
      
      const data = await response.json();
      
      // 段階的にメッセージを表示
      for (const res of data.responses) {
        await new Promise(resolve => setTimeout(resolve, res.delay));
        setMessages(prev => [...prev, { 
          text: res.text, 
          isBot: true,
          options: res.options 
        }]);
      }

      setConversationHistory(data.conversationHistory);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { text: 'すみません、エラーが発生しました。', isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  // 選択肢をクリックしたときの処理を修正
  const handleOptionClick = async (option: string) => {
    setMessages(prev => [...prev, { text: option, isBot: false }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: option,
          conversationHistory 
        }),
      });
      
      const data = await response.json();
      
      // 段階的にメッセージを表示
      for (const res of data.responses) {
        await new Promise(resolve => setTimeout(resolve, res.delay));
        setMessages(prev => [...prev, { 
          text: res.text, 
          isBot: true,
          options: res.options 
        }]);
      }

      setConversationHistory(data.conversationHistory);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { text: 'すみません、エラーが発生しました。', isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  // 背景のアニメーション用の変数
  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // チャットウィンドウのアニメーション
  const chatWindowVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 100
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120,
        duration: 0.6
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 100,
      transition: {
        duration: 0.3
      }
    }
  };

  // メッセージのアニメーション
  const messageVariants = {
    hidden: { 
      opacity: 0,
      x: -20
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* オーバーレイ背景 - z-indexを100に変更 */}
          <motion.div
            variants={backgroundVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-gradient-to-br from-slate-900/95 to-blue-900/95 backdrop-blur-sm z-[100]"
            onClick={onClose}
          >
            {/* デコレーティブな背景要素 */}
            <motion.div
              className="absolute inset-0 opacity-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
            </motion.div>
          </motion.div>

          {/* メインチャットウィンドウ - z-indexを101に変更 */}
          <motion.div
            variants={chatWindowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-4 md:inset-8 bg-white rounded-2xl shadow-2xl flex flex-col z-[101] overflow-hidden"
          >
            {/* ヘッダー */}
            <motion.div 
              className="p-6 bg-gradient-to-r from-blue-950 to-indigo-900 text-white"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <MessageCircle className="w-6 h-6 text-cyan-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold">退職相談チャット</h3>
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </motion.button>
              </div>
            </motion.div>

            {/* メッセージエリアを更新 */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                      message.isBot
                        ? 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800'
                        : 'bg-gradient-to-br from-blue-600 to-blue-700 text-white'
                    }`}
                  >
                    {message.text}
                    {message.options && (
                      <div className="mt-4 space-y-2">
                        {message.options.map((option, i) => (
                          <motion.button
                            key={i}
                            onClick={() => handleOptionClick(option)}
                            className="w-full text-left p-3 rounded-lg bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 transition-colors duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {option}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div 
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-gray-50 p-4 rounded-2xl shadow-sm">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader2 className="w-5 h-5 text-blue-600" />
                    </motion.div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* LINE誘導バナー - 新規追加 */}
            <div className="px-6 py-3 bg-[#06C755]/10 border-t border-[#06C755]/20">
              <a
                href="https://lin.ee/ye1zwHn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 text-[#06C755] hover:text-[#05b34c] transition-colors"
              >
                <span className="font-bold">より詳しい無料相談はLINEで</span>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.95 8.17L8.83 16.29C8.44 16.68 7.81 16.68 7.42 16.29C7.03 15.9 7.03 15.27 7.42 14.88L15.54 6.76C15.93 6.37 16.56 6.37 16.95 6.76C17.34 7.15 17.34 7.78 16.95 8.17Z"/>
                </svg>
              </a>
            </div>

            {/* 入力エリア */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="p-6 border-t bg-white/80 backdrop-blur-sm"
            >
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="メッセージを入力..."
                  className="w-full p-4 pr-14 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm transition-all"
                />
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  <Send size={20} />
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 