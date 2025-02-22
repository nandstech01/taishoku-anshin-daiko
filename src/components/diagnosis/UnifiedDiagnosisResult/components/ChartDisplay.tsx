'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { ChartDisplayProps } from '../types';
import { useAnimationControl } from '../hooks/useAnimationControl';

// Chart.js のプラグイン登録をクライアントサイドでのみ行う
if (typeof window !== 'undefined') {
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip
  );
}

export const ChartDisplay: React.FC<ChartDisplayProps> = ({
  data,
  options,
  shouldReduceMotion
}) => {
  const { getChartOptions } = useAnimationControl();
  const mergedOptions = getChartOptions(options);

  // データの要約テキストを生成
  const getSummaryText = () => {
    const maxValue = Math.max(...data.datasets[0].data);
    const maxIndex = data.datasets[0].data.indexOf(maxValue);
    const maxLabel = data.labels[maxIndex];
    
    return `最も高い値は${maxLabel}で${maxValue.toFixed(1)}です。` +
           `全体の平均は${(data.datasets[0].data.reduce((a, b) => a + b, 0) / data.datasets[0].data.length).toFixed(1)}です。`;
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div
        role="img"
        aria-label={`${data.datasets[0].label}のレーダーチャート。${getSummaryText()}`}
      >
        <div className="aspect-square">
          <Radar 
            data={data} 
            options={mergedOptions as ChartJS<'radar'>['options']}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* スクリーンリーダー用のデータテーブル */}
      <div className="sr-only" role="table" aria-label={`${data.datasets[0].label}の詳細データ`}>
        <div role="row">
          {data.labels.map((label, index) => (
            <div key={`${label}-${index}`} role="cell">
              {label}: {data.datasets[0].data[index].toFixed(1)}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}; 