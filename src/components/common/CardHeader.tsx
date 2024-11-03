// src/components/common/CardHeader.tsx
import React from 'react'

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>

const CardHeader: React.FC<CardHeaderProps> = ({ children, className, ...props }) => {
  return (
    <div className={`card-header ${className}`} {...props}>
      {children}
    </div>
  )
}

export default CardHeader
