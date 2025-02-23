"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { questions, tipiScaleChoices, fiveScaleChoices } from "@/data/questions";
import { Question, Choice, DiagnosisAnswer } from "@/types/diagnosis";
import Image from "next/image";
import { motion } from "framer-motion";

export default function MultiStepQuestions({
  onClose,
}: {
  onClose: () => void;
}) {
  const router = useRouter();
  const [answers, setAnswers] = useState<DiagnosisAnswer>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  };

  // 次へボタン
  const handleNext = () => {
    // 現在のスクロール位置を取得
    const container = document.querySelector('.questions-container');
    const currentQuestion = document.querySelector('.mb-8');
    if (container && currentQuestion) {
      const currentQuestionTop = currentQuestion.getBoundingClientRect().top;
      setCurrentStep((prev) => prev + 1);
      // 新しい質問を同じ位置に表示
      setTimeout(() => {
        const newQuestions = document.querySelectorAll('.mb-8');
        if (newQuestions.length > 0) {
          const firstNewQuestion = newQuestions[0];
          const newTop = firstNewQuestion.getBoundingClientRect().top;
          const adjustment = newTop - currentQuestionTop;
          container.scrollBy({
            top: adjustment,
            behavior: 'auto'
          });
        }
      }, 0);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // 戻るボタン
  const handlePrev = () => {
    // 次へボタンと同様の処理
    const container = document.querySelector('.questions-container');
    const currentQuestion = document.querySelector('.mb-8');
    if (container && currentQuestion) {
      const currentQuestionTop = currentQuestion.getBoundingClientRect().top;
      setCurrentStep((prev) => prev - 1);
      setTimeout(() => {
        const newQuestions = document.querySelectorAll('.mb-8');
        if (newQuestions.length > 0) {
          const firstNewQuestion = newQuestions[0];
          const newTop = firstNewQuestion.getBoundingClientRect().top;
          const adjustment = newTop - currentQuestionTop;
          container.scrollBy({
            top: adjustment,
            behavior: 'auto'
          });
        }
      }, 0);
    } else {
      setCurrentStep((prev) => prev - 1);
    }
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
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto max-h-[80vh] overflow-y-auto px-4 py-6 questions-container"
    >
      <div className="bg-white p-6 md:p-8">
        <div className="relative">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              {getCurrentSectionTitle()}
              <span className="text-sm font-normal text-gray-500 ml-2">
                ステップ {currentStep + 1} / {totalSteps}
              </span>
            </h2>
            
            {/* プログレスバー */}
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300 rounded-full"
                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {currentQuestions.map((q: Question) => (
            <div key={q.id} className="mb-8">
              <p className="text-base font-medium text-slate-800 mb-4">{q.text}</p>
              <div className="relative w-full">
                <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
                  <div className="absolute w-full" style={{ top: '-10px' }}>
                    <div className="relative w-full flex">
                      {getChoicesForQuestion(q).map((_, index) => (
                        <div 
                          key={index} 
                          className="flex-1 flex justify-center"
                        >
                          <div className="w-1 h-6 bg-gray-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-300"
                    style={{ 
                      width: answers[q.id] !== undefined 
                        ? `${((answers[q.id] - 1) / (getChoicesForQuestion(q).length - 1)) * 100}%`
                        : '0%'
                    }}
                  />
                </div>
                <div className="w-full flex">
                  {getChoicesForQuestion(q).map((choice: Choice) => (
                    <button
                      key={choice.value}
                      onClick={() => handleChange(q.id, choice.value)}
                      className="group flex-1 flex justify-center"
                    >
                      <div className="relative flex flex-col items-center">
                        <div className={`
                          w-6 h-6 rounded-full transition-all duration-300
                          ${answers[q.id] === choice.value
                            ? 'bg-blue-500 scale-125 shadow-lg'
                            : 'bg-white border-2 border-gray-300 hover:border-blue-500 hover:scale-110'
                          }
                        `} />
                        <div className={`
                          absolute top-8 left-1/2 transform -translate-x-1/2 w-max
                          text-[10px] leading-tight py-1 px-2 rounded-lg transition-all duration-300
                          ${answers[q.id] === choice.value
                            ? 'opacity-100 bg-blue-500 text-white'
                            : 'opacity-0 group-hover:opacity-100 bg-gray-700 text-white'
                          }
                        `}>
                          {choice.label.split('どちらかというと').map((part, index) => (
                            <React.Fragment key={index}>
                              {index > 0 && ' '}
                              {index > 0 ? 'どちらかというと' : ''}{part}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* ボタン操作 */}
          <div className="flex justify-between mt-8">
            {currentStep > 0 ? (
              <button
                onClick={handlePrev}
                className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-200 transition-all duration-300"
                disabled={isSubmitting}
              >
                戻る
              </button>
            ) : (
              <div />
            )}
            {currentStep < totalSteps - 1 ? (
              <button
                onClick={handleNext}
                className={`px-8 py-3 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg
                  ${isCurrentStepCompleted() 
                    ? 'bg-blue-500 hover:bg-blue-600' 
                    : 'bg-gray-400 cursor-not-allowed'}`}
                disabled={!isCurrentStepCompleted() || isSubmitting}
              >
                次へ
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className={`px-10 py-3 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg
                  ${Object.keys(answers).length === questions.length
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : 'bg-gray-400 cursor-not-allowed'}`}
                disabled={Object.keys(answers).length !== questions.length || isSubmitting}
              >
                {isSubmitting ? '分析中...' : '診断結果を見る'}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 