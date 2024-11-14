'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Footer from '@/components/common/Footer';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const CompletePage = () => {
  const socialLinks = [
    { icon: Twitter, href: '#', label: 'X（旧Twitter）' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
  ];

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-20"
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* 上部の装飾バー */}
            <div className="h-2 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600" />

            <div className="p-8 md:p-12">
              <div className="text-center space-y-8">
                {/* チェックマークアイコン */}
                <div className="flex justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.2 
                    }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center"
                  >
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                </div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-3xl font-bold text-gray-900"
                >
                  ご登録ありがとうございます
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-6 text-gray-600"
                >
                  <p className="text-lg leading-relaxed">
                    ご入力いただきました内容を確認後、担当者よりご連絡させていただきますのでお待ちください。
                  </p>
                  
                  <p className="text-lg leading-relaxed">
                    お手続きが安心して進められますよう、誠心誠意サポートさせていただきます。お急ぎの方は２４時間LINEにて受け付けておりますのでLINEからご依頼くださいませ。
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="pt-8"
                >
                  <a
                    href="https://lin.ee/h1kk42r"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full md:w-auto px-8 py-4 text-lg font-medium text-white bg-[#06C755] hover:bg-[#05B54C] rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <svg
                      className="w-6 h-6 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.95 8.05L14.95 14.61C14.9 14.8 14.75 14.92 14.55 14.92C14.35 14.92 14.2 14.8 14.15 14.61L12.95 11.61L9.95 14.61C9.9 14.8 9.75 14.92 9.55 14.92C9.35 14.92 9.2 14.8 9.15 14.61L7.15 8.05C7.1 7.85 7.2 7.65 7.4 7.55C7.6 7.45 7.8 7.5 7.95 7.7L10.95 10.7L12.15 7.7C12.2 7.5 12.4 7.4 12.6 7.4C12.8 7.4 13 7.5 13.05 7.7L14.25 10.7L17.25 7.7C17.4 7.5 17.6 7.45 17.8 7.55C18 7.65 18.1 7.85 18.05 8.05H16.95Z" />
                    </svg>
                    LINEで相談する
                  </a>

                  <p className="mt-4 text-sm text-gray-500 font-medium">
                    24時間365日対応
                  </p>
                </motion.div>

                {/* SNSリンク */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="pt-8 border-t border-gray-100"
                >
                  <p className="text-sm text-gray-500 mb-4">各種SNSでも情報を発信しています</p>
                  <div className="flex justify-center space-x-6">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        aria-label={social.label}
                      >
                        <social.icon className="w-6 h-6" />
                      </a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* 下部の装飾バー */}
            <div className="h-2 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400" />
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default CompletePage; 