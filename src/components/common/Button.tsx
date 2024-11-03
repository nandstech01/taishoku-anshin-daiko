import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import { ArrowRight } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => (
  <button 
    className={`group flex items-center justify-between w-full max-w-sm bg-white text-gray-800 font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out ${className}`} 
    {...props}
  >
    <span className="text-base mr-2">{children}</span>
    <div className="bg-gray-100 rounded-full px-3 py-1 group-hover:bg-gray-200 transition-colors duration-300">
      <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-colors duration-300" />
    </div>
  </button>
);

export default Button;
