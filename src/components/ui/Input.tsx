// src/components/ui/Input.tsx

import React from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        'block w-full rounded-md border-gray-300 shadow-sm',
        'focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
        className
      )}
      {...props}
    />
  );
};

export default Input;
