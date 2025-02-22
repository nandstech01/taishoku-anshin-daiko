import React from 'react';
import { motion } from 'framer-motion';
import { ScoreCardProps } from '../types';

export const ScoreCard: React.FC<ScoreCardProps> = ({
  title,
  score,
  maxScore,
  description,
  icon
}) => {
  const percentage = (score / maxScore) * 100;

  return (
    <div 
      className="bg-white p-6 rounded-xl shadow-sm"
      role="region"
      aria-label={`${title}のスコアカード`}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ y: -2 }}
      >
        <div className="flex items-center gap-4 mb-4">
          {icon && (
            <div 
              className="flex-shrink-0"
              aria-hidden="true"
            >
              {icon}
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {title}
            </h3>
            {description && (
              <p 
                className="text-sm text-gray-600"
                id={`${title}-description`}
              >
                {description}
              </p>
            )}
          </div>
        </div>
        <div 
          className="space-y-2"
          role="presentation"
          aria-label={`スコア: ${score.toFixed(1)}/${maxScore.toFixed(1)} (${percentage.toFixed(1)}%)`}
        >
          <div className="flex items-center justify-between">
            <span 
              className="text-2xl font-bold text-blue-600"
              aria-hidden="true"
            >
              {score.toFixed(1)}
            </span>
            <span 
              className="text-sm text-gray-500"
              aria-hidden="true"
            >
              / {maxScore.toFixed(1)}
            </span>
          </div>
          <div 
            className="h-2 bg-gray-200 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={score}
            aria-valuemin={0}
            aria-valuemax={maxScore}
            aria-valuetext={`${percentage.toFixed(1)}%`}
          >
            <motion.div
              className="h-full bg-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}; 