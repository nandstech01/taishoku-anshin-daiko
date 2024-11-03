// src/components/common/CardFooter.tsx

import React, { ReactNode } from 'react';

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => {
  return (
    <div className={`card-footer ${className}`}>
      {children}
    </div>
  );
};

export default CardFooter;
