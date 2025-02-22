import React from 'react';
import { RecommendationListProps } from '../types';

export const RecommendationList: React.FC<RecommendationListProps> = ({
  recommendations,
  title,
  icon
}) => {
  return (
    <div className="space-y-4">
      {title && (
        <div className="flex items-center gap-2">
          {icon && <div className="flex-shrink-0">{icon}</div>}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      <div className="space-y-3">
        {recommendations.map((rec, i) => (
          <div 
            key={i}
            className="flex items-start gap-4"
            role="listitem"
          >
            <div 
              className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold"
              aria-hidden="true"
            >
              {i + 1}
            </div>
            <p className="text-gray-700">{rec}</p>
          </div>
        ))}
      </div>
    </div>
  );
}; 