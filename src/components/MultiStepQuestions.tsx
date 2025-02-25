"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { questions, tipiScaleChoices, fiveScaleChoices } from "@/data/questions";
import { Question, Choice, DiagnosisAnswer } from "@/types/diagnosis";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function MultiStepQuestions({
  onClose,
}: {
  onClose: () => void;
}) {
  const router = useRouter();
  const [answers, setAnswers] = useState<DiagnosisAnswer>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // モバイル判定
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // 診断開始時にAPIを呼び出す
  useEffect(() => {
    const recordDiagnosisStart = async () => {
      try {
        const response = await fetch('/api/diagnosis/start', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          console.error('Failed to record diagnosis start');
        }
      } catch (error) {
        console.error('Error recording diagnosis start:', error);
      }
    };

    recordDiagnosisStart();
  }, []);

  // 1ステップあたり6問表示（最後のステップは残りの問題）
  const QUESTIONS_PER_STEP = 6;
  // 全ステップ数
  const totalSteps = Math.ceil(questions.length / QUESTIONS_PER_STEP);

  // 今のステップで表示すべき質問の配列
  const startIndex = currentStep * QUESTIONS_PER_STEP;
  const endIndex = startIndex + QUESTIONS_PER_STEP;
  const currentQuestions = questions.slice(startIndex, endIndex) as Question[];

  // 選択肢の取得（TIPI か 5段階かで分岐）
  const getChoicesForQuestion = (question: Question): Choice[] => {
    return question.scaleType === "TIPI" ? tipiScaleChoices : fiveScaleChoices;
  };

  // ラジオボタンの値変更
  const handleChange = (qId: string, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: value,
    }));
    
    // 次の未回答の質問にスクロール
    const currentIndex = currentQuestions.findIndex(q => q.id === qId);
    const nextUnansweredIndex = currentQuestions.findIndex((q, idx) => 
      idx > currentIndex && answers[q.id] === undefined
    );
    
    if (nextUnansweredIndex !== -1) {
      // 次の未回答質問がある場合、そこにスクロール
      setTimeout(() => {
        const questionElements = document.querySelectorAll('.question-item');
        if (questionElements[nextUnansweredIndex]) {
          setActiveQuestion(currentQuestions[nextUnansweredIndex].id);
          questionElements[nextUnansweredIndex].scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }, 300);
    } else if (isCurrentStepCompleted() && currentStep < totalSteps - 1) {
      // すべて回答済みで最後のステップでない場合、次へボタンにスクロール
      setTimeout(() => {
        const nextButton = document.querySelector('.next-button');
        if (nextButton) {
          nextButton.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
          
          // 特に最初の質問の場合、追加のスクロール調整
          if (currentIndex === 0) {
            setTimeout(() => {
              if (containerRef.current) {
                // 最初の質問の場合、より多くスクロールして次へボタンが確実に見えるようにする
                containerRef.current.scrollBy({
                  top: 300, // 200から300に増加
                  behavior: 'smooth'
                });
              }
            }, 100);
          }
        }
      }, 300);
    }
  };

  // 次へボタン
  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
    
    // ステップ変更後、最初の質問にスクロール
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      
      // 最初の未回答質問を探してアクティブにする
      const firstUnansweredIndex = currentQuestions.findIndex(q => answers[q.id] === undefined);
      if (firstUnansweredIndex !== -1) {
        setActiveQuestion(currentQuestions[firstUnansweredIndex].id);
      } else {
        setActiveQuestion(currentQuestions[0]?.id || null);
      }
    }, 100);
  };

  // 戻るボタン
  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
    
    // ステップ変更後、最初の質問にスクロール
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  // 現在のステップの全ての質問に回答されているかチェック
  const isCurrentStepCompleted = () => {
    return currentQuestions.every((q) => answers[q.id] !== undefined);
  };

  // 診断結果を見る
  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // 全ての質問に回答されているかチェック
      const answeredQuestions = Object.keys(answers).length;
      if (answeredQuestions < questions.length) {
        alert('すべての質問に回答してください');
        setIsSubmitting(false);
        return;
      }

      // 回答をURLクエリにエンコード
      const encoded = encodeURIComponent(JSON.stringify(answers));
      
      // 結果ページのURLを構築
      const resultUrl = `/diagnosis/result?data=${encoded}`;
      
      // モーダルを閉じる
      onClose();
      
      // 直接遷移
      router.push(resultUrl);
    } catch (error) {
      console.error('Error submitting diagnosis:', error);
      alert('エラーが発生しました。もう一度お試しください。');
      setIsSubmitting(false);
    }
  };

  // 現在のセクションのタイトルを取得
  const getCurrentSectionTitle = () => {
    const firstQuestion = currentQuestions[0];
    if (!firstQuestion) return "";

    switch (firstQuestion.category) {
      case "personality":
        return "パーソナリティ診断";
      case "career":
        return "職業興味診断";
      case "stress":
        return "職場ストレス診断";
      case "engagement":
        return "職場エンゲージメント診断";
      default:
        return "総合診断";
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="h-[80vh] overflow-y-auto questions-container scrollbar-hide"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      <style jsx global>{`
        .questions-container::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 rgba(59, 130, 246, 0); }
          50% { box-shadow: 0 0 15px rgba(59, 130, 246, 0.5); }
        }
        
        @keyframes float-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .choice-dot {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .choice-dot:hover {
          transform: scale(1.2);
        }
        
        .choice-dot.active {
          animation: pulse-glow 2s infinite;
        }
        
        .question-item {
          animation: float-in 0.5s ease-out forwards;
        }
        
        .progress-indicator {
          background: linear-gradient(90deg, #3b82f6, #60a5fa);
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @media (max-width: 767px) {
          .section-title {
            font-size: 1.25rem;
          }
          
          .step-indicator {
            font-size: 0.7rem;
            padding: 0.15rem 0.5rem;
          }
        }
      `}</style>
      
      {/* 閉じるボタン - 常に表示 */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-[9999] w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-gray-700 hover:text-red-500 transition-all duration-300 group border border-gray-200"
        aria-label="閉じる"
      >
        <motion.div
          whileHover={{ rotate: 90 }}
          transition={{ duration: 0.2 }}
          className="relative z-10"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.div>
      </button>
      
      {/* ヘッダー部分 - 固定表示 */}
      <div className="sticky top-0 z-10 backdrop-blur-md bg-white/90 px-6 pt-6 pb-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`section-title font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent ${isMobile ? 'text-xl' : 'text-2xl'}`}>
              {getCurrentSectionTitle()}
            </h2>
            <span className={`step-indicator font-medium bg-blue-50 text-blue-600 rounded-full ${isMobile ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'}`}>
              ステップ {currentStep + 1} / {totalSteps}
            </span>
          </div>
          
          {/* プログレスバー */}
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full progress-indicator rounded-full"
              initial={{ width: `${((currentStep) / totalSteps) * 100}%` }}
              animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* 質問コンテンツ */}
      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <AnimatePresence mode="wait">
            {currentQuestions.map((q: Question, index) => (
              <motion.div 
                key={q.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: activeQuestion === q.id ? 1.02 : 1,
                  boxShadow: activeQuestion === q.id ? '0 4px 20px rgba(0, 0, 0, 0.1)' : '0 0 0 rgba(0, 0, 0, 0)'
                }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100
                }}
                className={`question-item p-6 rounded-xl ${
                  activeQuestion === q.id 
                    ? 'bg-blue-50/50 border border-blue-100' 
                    : 'bg-white/80 border border-gray-100'
                }`}
                onClick={() => setActiveQuestion(q.id)}
              >
                <p className={`font-medium text-gray-800 mb-6 ${isMobile ? 'text-sm' : 'text-lg'}`}>{q.text}</p>
                
                <div className="relative w-full">
                  {/* スライダーのトラック */}
                  <div className="w-full h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
                    {/* スライダーの目盛り */}
                    <div className="absolute w-full" style={{ top: '-10px' }}>
                      <div className="relative w-full flex">
                        {getChoicesForQuestion(q).map((_, index) => (
                          <div 
                            key={index} 
                            className="flex-1 flex justify-center"
                          >
                            <div className="w-0.5 h-4 bg-gray-300" />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* スライダーの進捗 */}
                    <motion.div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ 
                        width: answers[q.id] !== undefined 
                          ? `${((answers[q.id] - 1) / (getChoicesForQuestion(q).length - 1)) * 100}%`
                          : '0%'
                      }}
                      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                    />
                  </div>
                  
                  {/* 選択肢 */}
                  <div className="w-full flex justify-between">
                    {getChoicesForQuestion(q).map((choice: Choice) => (
                      <button
                        key={choice.value}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleChange(q.id, choice.value);
                        }}
                        className="group relative"
                      >
                        <motion.div 
                          className={`
                            choice-dot w-8 h-8 rounded-full flex items-center justify-center
                            ${answers[q.id] === choice.value
                              ? 'active bg-blue-500 text-white'
                              : 'bg-white border-2 border-gray-300 hover:border-blue-400'
                            }
                          `}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {answers[q.id] === choice.value && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </motion.div>
                          )}
                        </motion.div>
                        
                        {/* ツールチップ */}
                        <div className={`
                          absolute top-10 left-1/2 transform -translate-x-1/2 w-max z-10
                          px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200
                          ${answers[q.id] === choice.value
                            ? 'opacity-100 bg-blue-500 text-white'
                            : 'opacity-0 group-hover:opacity-100 bg-gray-800 text-white'
                          }
                        `}>
                          {choice.label.split('どちらかというと').map((part, index) => (
                            <React.Fragment key={index}>
                              {index > 0 && ' '}
                              {index > 0 ? 'どちらかというと' : ''}{part}
                            </React.Fragment>
                          ))}
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 bg-inherit"></div>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {/* 選択肢のラベル */}
                  <div className="w-full flex justify-between mt-2">
                    <span className={`text-gray-500 ${isMobile ? 'text-[8px]' : 'text-xs'}`}>
                      {getChoicesForQuestion(q)[0].label.split('どちらかというと')[0]}
                    </span>
                    <span className={`text-gray-500 ${isMobile ? 'text-[8px]' : 'text-xs'}`}>
                      {getChoicesForQuestion(q)[getChoicesForQuestion(q).length - 1].label.split('どちらかというと')[0]}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* ボタン操作 - 固定表示 */}
          <motion.div 
            className="sticky bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 p-6 mt-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="max-w-4xl mx-auto flex justify-between">
              {currentStep > 0 ? (
                <button
                  onClick={handlePrev}
                  className={`px-8 py-3 bg-white text-gray-700 rounded-xl border border-gray-300 hover:bg-gray-50 transition-all duration-300 shadow-sm ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                >
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="block"
                  >
                    戻る
                  </motion.span>
                </button>
              ) : (
                <div />
              )}
              {currentStep < totalSteps - 1 ? (
                <button
                  onClick={handleNext}
                  className={`next-button px-10 py-3 text-white rounded-xl transition-all duration-300 shadow-md
                    ${isCurrentStepCompleted() 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600' 
                      : 'bg-gray-400 cursor-not-allowed'}`}
                  disabled={!isCurrentStepCompleted() || isSubmitting}
                >
                  <motion.span
                    whileHover={isCurrentStepCompleted() ? { scale: 1.03 } : {}}
                    whileTap={isCurrentStepCompleted() ? { scale: 0.97 } : {}}
                    className="block"
                  >
                    次へ
                  </motion.span>
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className={`px-10 py-3 text-white rounded-xl transition-all duration-300 shadow-md
                    ${Object.keys(answers).length === questions.length
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600'
                      : 'bg-gray-400 cursor-not-allowed'}`}
                  disabled={Object.keys(answers).length !== questions.length || isSubmitting}
                >
                  <motion.span
                    whileHover={Object.keys(answers).length === questions.length ? { scale: 1.03 } : {}}
                    whileTap={Object.keys(answers).length === questions.length ? { scale: 0.97 } : {}}
                    className="block"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        分析中...
                      </div>
                    ) : '診断結果を見る'}
                  </motion.span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
} 