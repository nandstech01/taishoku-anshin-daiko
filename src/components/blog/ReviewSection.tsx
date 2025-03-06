"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, MessageCircle, Users, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { StarRating } from "./StarRating"

export default function ReviewSection() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [industry, setIndustry] = useState('')
  const [occupation, setOccupation] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')

  const ageRanges = ['〜24歳', '25〜30歳', '31〜40歳', '41〜50歳', '51〜60歳']
  const genders = ['男性', '女性', 'その他']

  return (
    <div className="relative">
      {/* 背景のグラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-white to-yellow-50/80"></div>
      
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6 relative">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl p-3 sm:p-8 border-2 border-yellow-400"
        >
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-8 mb-6 md:mb-12">
            {/* 画像とタイトルのコンテナ */}
            <div className="flex items-start gap-3 w-full md:w-auto">
              {/* 画像サイズを調整 */}
              <div className="relative w-24 h-24 md:w-48 md:h-48 flex-shrink-0">
                <div className="absolute inset-0 bg-yellow-400 translate-x-1.5 translate-y-1.5 md:translate-x-2 md:translate-y-2"></div>
                <div className="absolute inset-0 bg-white border-2 border-yellow-400 flex items-center justify-center">
                  <div className="relative w-[80%] h-[80%]">
                    <Image
                      src="/images/editorial/editorial-team.png"
                      alt="退職あんしん代行編集部"
                      fill
                      sizes="(max-width: 768px) 96px, 192px"
                      className="object-cover rounded-full"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* スマホ版でのタイトル配置 - h2をdivに変更 */}
              <div className="md:hidden flex-1">
                <div className="mb-1.5">
                  <div className="inline-block relative">
                    <div className="absolute inset-0 bg-yellow-300 transform rotate-3 rounded"></div>
                    <div className="relative bg-yellow-500 text-white px-2 py-0.5 text-sm font-bold rounded">5.0</div>
                  </div>
                </div>
                <div className="text-lg font-bold text-slate-800 leading-tight mb-1.5">ご利用者様の口コミ</div>
                <div className="flex justify-start">
                  <StarRating rating={5} />
                </div>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              {/* PC版でのタイトル（スマホでは非表示） */}
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="hidden md:flex items-center justify-center md:justify-start gap-6 mb-6"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800">ご利用者様の口コミ</h2>
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-300 transform rotate-3"></div>
                  <div className="relative bg-yellow-500 text-white px-4 py-1 text-lg font-bold">5.0</div>
                </div>
              </motion.div>

              {/* PC版の星評価（スマホでは非表示） */}
              <div className="hidden md:flex justify-center md:justify-start mb-4 md:mb-6">
                <StarRating rating={5} />
              </div>

              <div className="flex flex-row gap-4 sm:gap-6 justify-center md:justify-start text-slate-600 text-xs md:text-base mt-2 md:mt-0">
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                  <span>1,200+ レビュー</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                  <span>95% 満足度</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-3 md:space-y-8">
            <div>
              <h3 className="text-[10px] md:text-2xl font-bold mb-1 md:mb-4 text-slate-800 text-center">退職代行サービスの口コミについて</h3>
              <p className="text-[10px] md:text-base text-slate-600 leading-relaxed">
                本ページに掲載されている退職代行サービスの記事内容は、実際の利用者の口コミデータをもとに、
                編集部が実際にサービスを利用したうえで事実関係や最新の状況を確認したうえで作成しています。
              </p>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-200 overflow-hidden">
              <div 
                className="p-2 md:p-6 cursor-pointer hover:bg-yellow-100 transition-all duration-300"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <h3 className="text-[10px] md:text-lg font-bold flex items-center gap-2 md:gap-2">
                  <ChevronDown 
                    className={`w-4 h-4 md:w-5 md:h-5 text-yellow-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                  />
                  退職代行サービスの口コミを投稿する
                </h3>
              </div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <div className="pt-4 border-t border-yellow-200 space-y-6">
                      {/* 評価 */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          総合評価<span className="text-red-500 ml-1">*</span>
                        </label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((value) => (
                            <button
                              key={value}
                              onClick={() => setRating(value)}
                              className={`p-2 rounded-lg transition-colors ${
                                rating === value
                                  ? 'bg-yellow-100 text-yellow-600'
                                  : 'hover:bg-yellow-50'
                              }`}
                            >
                              <Star
                                className={`w-8 h-8 ${
                                  rating >= value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 口コミ */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          口コミ内容<span className="text-red-500 ml-1">*</span>
                        </label>
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                          rows={4}
                          placeholder="サービスの良かった点、改善点などを具体的にお書きください"
                        />
                      </div>

                      {/* 業界・職種 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            現在の業界
                          </label>
                          <input
                            type="text"
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                            placeholder="例：IT・通信"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            現在の職種
                          </label>
                          <input
                            type="text"
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                            placeholder="例：エンジニア"
                          />
                        </div>
                      </div>

                      {/* 年齢・性別 */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            年齢<span className="text-red-500 ml-1">*</span>
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {ageRanges.map((range) => (
                              <button
                                key={range}
                                onClick={() => setAge(range)}
                                className={`px-4 py-2 rounded-full border transition-colors ${
                                  age === range
                                    ? 'bg-yellow-100 border-yellow-400 text-yellow-600'
                                    : 'border-gray-300 hover:bg-yellow-50'
                                }`}
                              >
                                {range}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            性別<span className="text-red-500 ml-1">*</span>
                          </label>
                          <div className="flex gap-2 md:gap-2">
                            {genders.map((g) => (
                              <button
                                key={g}
                                onClick={() => setGender(g)}
                                className={`px-4 md:px-6 py-2 md:py-2 rounded-full border text-sm md:text-sm transition-colors ${
                                  gender === g
                                    ? 'bg-yellow-100 border-yellow-400 text-yellow-600'
                                    : 'border-gray-300 hover:bg-yellow-50'
                                }`}
                              >
                                {g}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* 送信ボタン */}
                      <button
                        className="w-full bg-yellow-500 text-white py-4 rounded-lg font-bold hover:bg-yellow-600 transition-colors mt-8"
                      >
                        口コミを投稿する
                      </button>

                      <p className="text-xs text-gray-500 text-center mt-2">
                        「口コミを投稿する」をクリックすることで、利用規約とプライバシーポリシーに同意したことになります。
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 