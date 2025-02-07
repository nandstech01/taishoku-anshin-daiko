import * as React from 'react';
import { LineButton } from '../common/LineButton';

interface InlineLineButtonProps {
  title?: string;
  description?: string;
}

export const InlineLineButton: React.FC<InlineLineButtonProps> = ({ 
  title = "無料カウンセリングを予約する",
  description = "退職に関する不安や悩みをご相談ください"
}) => {
  return (
    <div className="my-8 p-6 rounded-lg bg-gradient-to-r from-green-50 to-green-100">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <p className="text-sm text-gray-500 mb-4">※ご相談は完全無料です</p>
      <LineButton />
    </div>
  );
}; 