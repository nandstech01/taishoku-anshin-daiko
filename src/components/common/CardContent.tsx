// src/components/common/CardContent.tsx
import React from 'react'

type CardContentProps = React.HTMLAttributes<HTMLDivElement>

const CardContent: React.FC<CardContentProps> = ({ children, className, ...props }) => {
  return (
    <div className={`card-content ${className}`} {...props}>
      {children}
    </div>
  )
}

export default CardContent
