"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { DiagnosisResult as DiagnosisResultType, GallupCategory, PersonalityTrait, RiasecType } from '@/types/diagnosis';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Star, TrendingUp, Brain, Target, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { personalityTraits } from '@/data/personality-definitions';
import { riasecTypes } from '@/data/riasec-definitions';
import { careerCategories, affinityLevels } from '@/data/career-definitions';
import { gallupCategoryDescriptions, engagementLevelDescriptions, categoryRelationships } from '@/data/gallup-definitions';
import ErrorDisplay from './ErrorDisplay';
import LoadingSkeleton from './LoadingSkeleton';

// Chart.js のプラグイン登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

interface UnifiedDiagnosisResultProps {
  result: DiagnosisResultType;
  isLoading?: boolean;
  error?: string;
}

export default function UnifiedDiagnosisResult({ result, isLoading, error }: UnifiedDiagnosisResultProps) {
  const mainRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [selectedCharacteristic, setSelectedCharacteristic] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // フォーカス管理
  useEffect(() => {
    if (!isLoading && !error && mainRef.current) {
      mainRef.current.focus();
    }
  }, [isLoading, error]);

  // キーボードナビゲーション
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const focusableElements = mainRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusableElements) return;

    const focusableArray = Array.from(focusableElements);
    const currentIndex = focusableArray.indexOf(document.activeElement as Element);

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % focusableArray.length;
        (focusableArray[nextIndex] as HTMLElement).focus();
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        const prevIndex = currentIndex <= 0 ? focusableArray.length - 1 : currentIndex - 1;
        (focusableArray[prevIndex] as HTMLElement).focus();
        break;
    }
  };

  // アニメーション設定の最適化
  const containerAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.6,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: shouldReduceMotion ? 0 : 0.1
      }
    }
  };

  const childAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.4,
        ease: 'easeOut'
      }
    }
  };

  // アクセシビリティ用のセクション説明
  const sectionDescriptions = {
    personality: "パーソナリティ特性を5つの要素で分析したレーダーチャートです。",
    career: "職業興味を6つの要素で分析したレーダーチャートです。",
    affinity: "あなたの特性と職業興味に基づいて、最も適したキャリア分野を分析しています。各分野の親和性レベルと具体的な特徴を確認できます。",
    stress: "現在のストレスレベルと対策の分析結果です。ストレスレベルは1から5の範囲で評価され、数値が低いほどストレスが高いことを示します。",
    engagement: "職場でのエンゲージメント状態の分析結果です。"
  };

  const handleCharacteristicClick = (characteristic: string) => {
    setSelectedCharacteristic(characteristic === selectedCharacteristic ? null : characteristic);
  };

  const handleCategoryClick = (category: GallupCategory) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handleCareerCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  // パーソナリティ特性の詳細を取得
  const getPersonalityDetails = (trait: keyof typeof personalityTraits, score: number) => {
    const level = score > 4 ? 'high' : 'low';
    const details = personalityTraits[trait][level];
    return {
      description: details.traits.join('、'),
      characteristics: details.traits,
      strengths: details.strengths
    };
  };

  // キャリア親和性のソート
  const sortedCareerAffinity = Object.entries(result.careerAffinity)
    .sort(([, a], [, b]) => b.score - a.score);

  // レーダーチャートのデータ
  const personalityData = {
    labels: Object.values(personalityTraits).map(trait => trait.name),
    datasets: [{
      label: 'パーソナリティ特性',
      data: Object.values(result.bigFive),
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      borderColor: 'rgba(59, 130, 246, 1)',
      borderWidth: 2,
    }]
  };

  const careerData = {
    labels: Object.values(riasecTypes).map(type => type.name),
    datasets: [{
      label: '職業興味',
      data: Object.values(result.riasec),
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      borderColor: 'rgba(16, 185, 129, 1)',
      borderWidth: 2,
    }]
  };

  // チャートアニメーション設定
  const radarOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.2,
    scales: {
      r: {
        min: 0,
        max: 7,
        ticks: { 
          stepSize: 1,
          display: false
        },
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
        angleLines: { color: 'rgba(0, 0, 0, 0.1)' },
        pointLabels: {
          font: { size: 12 },
          padding: -10,
          centerPointLabels: false,
        }
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    animation: {
      duration: shouldReduceMotion ? 0 : 800,
      easing: 'easeInOutCubic' as const,
      delay(context: any) {
        return shouldReduceMotion ? 0 : context.dataIndex * 100;
      }
    },
    transitions: {
      active: {
        animation: {
          duration: shouldReduceMotion ? 0 : 300
        }
      }
    },
    interaction: {
      intersect: true,
      mode: 'point' as const
    }
  } as const;

  // ホバーアニメーション設定
  const hoverAnimation = shouldReduceMotion 
    ? {}
    : {
        scale: 1.02,
        transition: {
          duration: 0.2,
          ease: 'easeOut'
        }
      };

  // エンゲージメントレベルのマッピング
  const getEngagementLevelDescription = (level: 'highly_engaged' | 'engaged' | 'not_engaged' | 'actively_disengaged'): string => {
    switch (level) {
      case 'highly_engaged':
        return engagementLevelDescriptions.highly_engaged.description;
      case 'engaged':
        return engagementLevelDescriptions.engaged.description;
      case 'not_engaged':
      case 'actively_disengaged':
        return engagementLevelDescriptions.not_engaged.description;
      default:
        return '';
    }
  };

  // RIASECのマッピング
  const riasecMapping: Record<RiasecType, keyof DiagnosisResultType['riasec']> = {
    'R': 'realistic',
    'I': 'investigative',
    'A': 'artistic',
    'S': 'social',
    'E': 'enterprising',
    'C': 'conventional'
  };

  return (
    <div 
      ref={mainRef}
      role="main"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      aria-busy={isLoading}
      aria-atomic="true"
      className="max-w-7xl mx-auto px-4 py-8 print:px-0 print:py-0 print:max-w-none focus:outline-none"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerAnimation}
        aria-hidden={isLoading}
      >
        <div role="main" aria-label="診断結果全体">
          {/* ヘッダーセクション */}
          <header>
            <motion.div 
              className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 mb-8 text-white print:bg-white print:text-black print:border print:border-gray-200"
              variants={childAnimation}
            >
              <div className="flex items-center justify-between">
                <h1 
                  className="text-xl sm:text-2xl font-bold" 
                  id="diagnosis-title"
                  tabIndex={0}
                  aria-label="総合診断結果 - AIによる分析レポート"
                >
                  総合診断結果
                </h1>
                <div className="px-4 py-2 bg-white/20 text-sm font-medium print:bg-gray-100 print:text-gray-700">
                  AI分析レポート
                </div>
              </div>
            </motion.div>
          </header>

          {/* 各セクション */}
          <div className="space-y-12">
            {/* パーソナリティセクション */}
            <section
              className="mb-12"
              aria-labelledby="personality-section-title"
            >
              <div className="flex items-center gap-4 mb-6">
                <Brain className="w-8 h-8 text-blue-600" aria-hidden="true" />
                <h2 
                  id="personality-section-title"
                  className="text-2xl font-bold text-gray-900"
                >
                  パーソナリティ分析
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* レーダーチャート */}
                <motion.div
                  variants={childAnimation}
                  className="bg-white p-6 rounded-xl shadow-sm"
                >
                  <Radar data={personalityData} options={radarOptions} />
                </motion.div>

                {/* 特性の詳細 */}
                <div className="space-y-6">
                  {Object.entries(result.bigFive).map(([trait, score]) => {
                    const isSelected = selectedCharacteristic === trait;
                    const details = getPersonalityDetails(trait as keyof typeof personalityTraits, score);

                    return (
                      <motion.div
                        key={trait}
                        variants={childAnimation}
                        whileHover={hoverAnimation}
                        className={`bg-white p-6 rounded-xl shadow-sm transition-shadow ${
                          isSelected ? 'ring-2 ring-blue-500' : ''
                        }`}
                      >
                        <button
                          onClick={() => handleCharacteristicClick(trait)}
                          className="w-full text-left"
                          aria-expanded={isSelected}
                          aria-controls={`${trait}-details`}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {personalityTraits[trait as keyof typeof personalityTraits].name}
                            </h3>
                            <div className="flex items-center gap-2">
                              <div className="text-2xl font-bold text-blue-600">
                                {score.toFixed(1)}
                              </div>
                              {isSelected ? (
                                <ChevronUp className="w-5 h-5 text-gray-500" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-500" />
                              )}
                            </div>
                          </div>
                          <p className="text-gray-600 mb-4">{details.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {details.strengths.slice(0, 3).map((strength, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                              >
                                {strength}
                              </span>
                            ))}
                            {details.strengths.length > 3 && (
                              <span className="text-gray-500 text-sm">
                                他{details.strengths.length - 3}個の強み
                              </span>
                            )}
                          </div>
                        </button>

                        <div
                          id={`${trait}-details`}
                          className={`space-y-4 transition-all duration-300 ${
                            isSelected ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
                          }`}
                        >
                          <div>
                            <h4 className="font-medium mb-2">特徴</h4>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                              {details.characteristics.map((characteristic, i) => (
                                <li key={i}>{characteristic}</li>
                              ))}
                            </ul>
                          </div>
                          {details.strengths.length > 3 && (
                            <div>
                              <h4 className="font-medium mb-2">その他の強み</h4>
                              <ul className="list-disc list-inside text-gray-600 space-y-1">
                                {details.strengths.slice(3).map((strength, i) => (
                                  <li key={i}>{strength}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* スクリーンリーダー用の補足情報 */}
              <div className="sr-only">
                <p>{sectionDescriptions.personality}</p>
                <p>各特性をクリックすると、詳細な分析結果と特徴が表示されます。</p>
                <p>スコアは1から7の範囲で評価され、4が平均的な値です。</p>
              </div>
            </section>

            {/* キャリアセクション */}
            <section
              className="mb-12"
              aria-labelledby="career-section-title"
            >
              <div className="flex items-center gap-4 mb-6">
                <TrendingUp className="w-8 h-8 text-emerald-600" aria-hidden="true" />
                <h2 
                  id="career-section-title"
                  className="text-2xl font-bold text-gray-900"
                >
                  キャリア適性分析
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* レーダーチャート */}
                <motion.div
                  variants={childAnimation}
                  className="bg-white p-8 rounded-xl shadow-sm w-full"
                >
                  <div className="aspect-[1.2] w-full">
                    <Radar data={careerData} options={radarOptions} />
                  </div>
                </motion.div>

                {/* キャリア親和性の詳細 */}
                <div className="space-y-6">
                  {sortedCareerAffinity.map(([category, data]) => {
                    const isSelected = selectedCategory === category;
                    const categoryData = careerCategories[category as keyof typeof careerCategories];

                    return (
                      <motion.div
                        key={category}
                        variants={childAnimation}
                        whileHover={hoverAnimation}
                        className={`bg-white p-6 rounded-xl shadow-sm transition-shadow ${
                          isSelected ? 'ring-2 ring-emerald-500' : ''
                        }`}
                      >
                        <button
                          onClick={() => handleCareerCategoryClick(category)}
                          className="w-full text-left"
                          aria-expanded={isSelected}
                          aria-controls={`${category}-details`}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {data.name}
                              </h3>
                              <span className={`${
                                affinityLevels[data.level].color
                              } text-sm font-medium`}>
                                {affinityLevels[data.level].label}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-2xl font-bold text-emerald-600">
                                {(data.score * 100).toFixed(1)}%
                              </div>
                              {isSelected ? (
                                <ChevronUp className="w-5 h-5 text-gray-500" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-500" />
                              )}
                            </div>
                          </div>
                          <p className="text-gray-600 mb-4">{data.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {data.keywords.slice(0, 3).map((keyword, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm"
                              >
                                {keyword}
                              </span>
                            ))}
                            {data.keywords.length > 3 && (
                              <span className="text-gray-500 text-sm">
                                他{data.keywords.length - 3}個のキーワード
                              </span>
                            )}
                          </div>
                        </button>

                        <div
                          id={`${category}-details`}
                          className={`space-y-4 transition-all duration-300 ${
                            isSelected ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
                          }`}
                        >
                          {/* 概要 */}
                          <div>
                            <p className="text-gray-600">{data.description}</p>
                          </div>

                          {/* パーソナリティ適性 */}
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">パーソナリティ適性</h4>
                            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                              {categoryData.affinity.personality.map((trait) => {
                                const personalityTrait = trait as PersonalityTrait;
                                const score = result.bigFive[personalityTrait];
                                const traitData = personalityTraits[personalityTrait];
                                const level = score >= 4 ? 'high' : 'low';
                                return (
                                  <div key={personalityTrait} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium text-gray-700">{traitData.name}</span>
                                      <span className={`text-sm ${score >= 4 ? 'text-green-600' : 'text-gray-500'}`}>
                                        {score.toFixed(1)}
                                      </span>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      <p className="mb-2">{traitData[level].traits.join('、')}</p>
                                      <div>
                                        <p className="font-medium mb-1">強み:</p>
                                        <ul className="list-disc list-inside">
                                          {traitData[level].strengths.map((strength: string, i: number) => (
                                            <li key={i}>{strength}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* RIASEC適性 */}
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">職業興味との適合</h4>
                            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                              {categoryData.affinity.riasec.map((type) => {
                                const riasecType = type as RiasecType;
                                const typeData = riasecTypes[riasecType];
                                const score = result.riasec[riasecMapping[riasecType]];
                                return (
                                  <div key={riasecType} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium text-gray-700">{typeData.name}</span>
                                      <span className={`text-sm ${score >= 4 ? 'text-green-600' : 'text-gray-500'}`}>
                                        {score.toFixed(1)}
                                      </span>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      <p className="mb-2">{typeData.description}</p>
                                      <div>
                                        <p className="font-medium mb-1">代表的な職種:</p>
                                        <ul className="list-disc list-inside">
                                          {typeData.examples.slice(0, 3).map((example: string, i: number) => (
                                            <li key={i}>{example}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* キーワード */}
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">重要なキーワード</h4>
                            <div className="flex flex-wrap gap-2">
                              {data.keywords.map((keyword, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm"
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* 適性レベルの説明 */}
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">適性レベル</h4>
                            <p className="text-gray-600">
                              {affinityLevels[data.level].description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* スクリーンリーダー用の補足情報 */}
              <div className="sr-only">
                <p>{sectionDescriptions.career}</p>
                <p>{sectionDescriptions.affinity}</p>
              </div>
            </section>

            {/* ストレスセクション */}
            <section
              className="mb-12"
              aria-labelledby="stress-section-title"
            >
              <div className="flex items-center gap-4 mb-6">
                <Target className="w-8 h-8 text-red-600" aria-hidden="true" />
                <h2 
                  id="stress-section-title"
                  className="text-2xl font-bold text-gray-900"
                >
                  ストレス分析
                </h2>
              </div>

              <div className="space-y-8">
                {/* 総合スコア */}
                <motion.div
                  variants={childAnimation}
                  whileHover={hoverAnimation}
                  className="bg-white p-6 rounded-xl shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        総合ストレスレベル
                      </h3>
                      <p className="text-gray-600">
                        {result.stress.riskLevel === 'high' ? '要対策' :
                         result.stress.riskLevel === 'moderate' ? '要注意' : '健全'}
                      </p>
                    </div>
                    <div className="text-2xl font-bold text-red-600">
                      {result.stress.total.toFixed(1)}
                    </div>
                  </div>
                </motion.div>

                {/* 対策リスト */}
                <motion.div
                  variants={childAnimation}
                  className="bg-white p-6 rounded-xl shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    推奨される対策
                  </h3>
                  <ul className="space-y-4">
                    {result.stress.recommendations.map((recommendation, index) => (
                      <li 
                        key={index}
                        className="flex items-start gap-4"
                      >
                        <Info className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" aria-hidden="true" />
                        <p className="text-gray-600">{recommendation}</p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* スクリーンリーダー用の補足情報 */}
              <div className="sr-only">
                <p>{sectionDescriptions.stress}</p>
              </div>
            </section>

            {/* エンゲージメントセクション */}
            <section
              className="mb-12"
              aria-labelledby="engagement-section-title"
            >
              <div className="flex items-center gap-4 mb-6">
                <Star className="w-8 h-8 text-yellow-500" aria-hidden="true" />
                <h2 
                  id="engagement-section-title"
                  className="text-2xl font-bold text-gray-900"
                >
                  エンゲージメント分析
                </h2>
              </div>

              <div className="space-y-8">
                {/* 総合スコア */}
                <motion.div
                  variants={childAnimation}
                  whileHover={hoverAnimation}
                  className="bg-white p-6 rounded-xl shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        総合エンゲージメントレベル
                      </h3>
                      <p className="text-gray-600">
                        {getEngagementLevelDescription(result.engagement.engagementLevel)}
                      </p>
                    </div>
                    <div className="text-2xl font-bold text-yellow-500">
                      {result.engagement.overallScore.toFixed(1)}
                    </div>
                  </div>
                </motion.div>

                {/* カテゴリー別スコア */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {Object.entries(result.engagement.categoryScores).map(([category, data]) => {
                    const isSelected = selectedCategory === category;
                    const description = gallupCategoryDescriptions[category as GallupCategory];

                    return (
                      <motion.div
                        key={category}
                        variants={childAnimation}
                        whileHover={hoverAnimation}
                        className={`bg-white p-6 rounded-xl shadow-sm transition-shadow ${
                          isSelected ? 'ring-2 ring-yellow-500' : ''
                        }`}
                      >
                        <button
                          onClick={() => handleCategoryClick(category as GallupCategory)}
                          className="w-full text-left"
                          aria-expanded={isSelected}
                          aria-controls={`${category}-details`}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {description}
                            </h3>
                            <div className="flex items-center gap-2">
                              <div className="text-2xl font-bold text-yellow-500">
                                {data.score.toFixed(1)}
                              </div>
                              {isSelected ? (
                                <ChevronUp className="w-5 h-5 text-gray-500" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-500" />
                              )}
                            </div>
                          </div>
                          {data.strengths.length > 0 && (
                            <div className="mb-4">
                              <div className="flex flex-wrap gap-2">
                                {data.strengths.slice(0, 3).map((strength, i) => (
                                  <span
                                    key={i}
                                    className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm"
                                  >
                                    {strength}
                                  </span>
                                ))}
                                {data.strengths.length > 3 && (
                                  <span className="text-gray-500 text-sm">
                                    他{data.strengths.length - 3}個の強み
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                          {data.areas_for_improvement.length > 0 && (
                            <div className="mb-4">
                              <p className="text-gray-600">改善ポイント: {data.areas_for_improvement[0]}</p>
                            </div>
                          )}
                        </button>

                        <div
                          id={`${category}-details`}
                          className={`space-y-4 transition-all duration-300 ${
                            isSelected ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
                          }`}
                        >
                          {data.strengths.length > 3 && (
                            <div>
                              <h4 className="font-medium mb-2">その他の強み</h4>
                              <ul className="list-disc list-inside text-gray-600 space-y-1">
                                {data.strengths.slice(3).map((strength, i) => (
                                  <li key={i}>{strength}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {data.areas_for_improvement.length > 1 && (
                            <div>
                              <h4 className="font-medium mb-2">その他の改善ポイント</h4>
                              <ul className="list-disc list-inside text-gray-600 space-y-1">
                                {data.areas_for_improvement.slice(1).map((area, i) => (
                                  <li key={i}>{area}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {categoryRelationships[category as GallupCategory] && (
                            <div>
                              <h4 className="font-medium mb-2">関連する要素</h4>
                              <ul className="list-disc list-inside text-gray-600 space-y-1">
                                {categoryRelationships[category as GallupCategory].related.map((relatedCategory: GallupCategory, i: number) => (
                                  <li key={i}>{gallupCategoryDescriptions[relatedCategory]}</li>
                                ))}
                              </ul>
                              {categoryRelationships[category as GallupCategory].impact && (
                                <p className="mt-2 text-gray-600">
                                  {categoryRelationships[category as GallupCategory].impact}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* スクリーンリーダー用の補足情報 */}
              <div className="sr-only">
                <p>{sectionDescriptions.engagement}</p>
                <p>各カテゴリーをクリックすると、詳細な分析結果と改善提案が表示されます。</p>
                <p>スコアは1から5の範囲で評価され、数値が高いほど良好な状態を示します。</p>
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 