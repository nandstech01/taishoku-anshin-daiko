// src/components/ui/Button.tsx
import React from 'react';

// ここで独自のボタンコンポーネントを定義します
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return <button {...props} className="your-custom-class">{props.children}</button>;
};

export default Button;