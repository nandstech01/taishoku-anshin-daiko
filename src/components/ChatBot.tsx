'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Users, MessageCircle } from 'lucide-react';
import FixedButtons from './ui/FixedButtons';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const INITIAL_MESSAGES: Message[] = [{
  role: 'assistant',
  content: `こんにちは！退職あんしん代行専門相談員にご相談頂きありがとうございます。以下からご相談内容をお選び頂くか、直接メッセージをご入力ください。

- ストレスを感じている
- 明日から会社には行きたくない
- 退職代行を使ったことを知られたくない
- 退職の手続きや費用を知りたい`
}];

const STRESS_OPTIONS = `
- 職場でハラスメントがあると感じている
- 職場での人間関係に悩んでいる
- 会社の待遇に悩んでいる
- 会社とプライベートが両立できない`;

export const openChat = () => {
  const event = new CustomEvent('openChatBot');
  window.dispatchEvent(event);
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
      const fixedButtons = document.querySelector('.fixed.bottom-0.flex.justify-center');
      if (fixedButtons) {
        fixedButtons.classList.add('hidden');
      }
    };

    const handleCloseChat = () => {
      const fixedButtons = document.querySelector('.fixed.bottom-0.flex.justify-center');
      if (fixedButtons) {
        fixedButtons.classList.remove('hidden');
      }
    };

    window.addEventListener('openChatBot', handleOpenChat);
    
    return () => {
      window.removeEventListener('openChatBot', handleOpenChat);
      handleCloseChat();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }]
        }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      let newMessage = data.content;

      if (userMessage.includes('ストレスを感じている')) {
        newMessage += STRESS_OPTIONS;
      }

      setMessages(prev => [...prev, { role: 'assistant', content: newMessage }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '申し訳ありません。エラーが発生しました。もう一度お試しください。' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionClick = (option: string) => {
    if (!isLoading) {
      setInput(option);
      handleSubmit({ preventDefault: () => {} } as React.FormEvent);
    }
  };

  const renderMessage = (message: Message, index: number) => {
    const messageContent = message.content.split('\n').map((line, i) => {
      if (line.startsWith('-')) {
        return (
          <motion.button
            key={i}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleOptionClick(line.substring(2))}
            className="block text-left px-4 py-3 my-2 rounded-lg bg-gradient-to-r from-orange-500/10 to-amber-500/10 hover:from-orange-500/20 hover:to-amber-500/20 text-orange-600 transition-all duration-300 w-full border border-orange-200 shadow-sm"
          >
            {line}
          </motion.button>
        );
      }
      if (line.includes('【無料相談フォーム')) {
        return (
          <div key={i} className="mt-4">
            <a
              href="/consultation#consultation-form"
              className="inline-block bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-md"
            >
              無料相談フォーム
            </a>
          </div>
        );
      }
      return <p key={i} className="mb-2 leading-relaxed">{line}</p>;
    });

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div
          className={`max-w-[80%] p-4 rounded-2xl shadow-md ${
            message.role === 'user'
              ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white'
              : 'bg-white border border-gray-100 text-gray-800'
          }`}
        >
          {messageContent}
        </div>
      </motion.div>
    );
  };

  const handleClose = () => {
    setIsOpen(false);
    const fixedButtons = document.querySelector('.fixed.bottom-0.flex.justify-center');
    if (fixedButtons) {
      fixedButtons.classList.remove('hidden');
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-32 right-4 w-[90vw] max-w-[400px] h-[580px] bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-100"
          >
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-slate-900 to-blue-950 text-white">
              <div className="flex items-center space-x-3">
                <div className="relative flex items-center">
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      rotate: {
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                      },
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                    className="absolute -left-2"
                  >
                    <MessageCircle className="w-5 h-5 text-cyan-400" />
                  </motion.div>
                  <Users className="w-5 h-5 text-amber-400 ml-6" />
                </div>
                <h2 className="text-lg font-bold">退職相談チャット</h2>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </motion.div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                onClick={handleClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="チャットを閉じる"
              >
                <X size={20} />
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50/50 to-white/50">
              {messages.map((message, index) => renderMessage(message, index))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t bg-white shadow-lg">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="メッセージを入力..."
                  className="flex-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all duration-300"
                  disabled={isLoading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isLoading}
                  className="p-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-xl transition-all duration-300 disabled:opacity-50 shadow-md"
                  aria-label="メッセージを送信"
                >
                  <Send size={20} />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <FixedButtons isVisible={!isOpen} />
    </>
  );
} 