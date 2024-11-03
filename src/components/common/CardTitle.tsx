// src/components/common/CardTitle.tsx
import React from 'react'

type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>

const CardTitle: React.FC<CardTitleProps> = ({ children, className, ...props }) => {
  return (
    <h3 className={`card-title ${className}`} {...props}>
      {children}
    </h3>
  )
}

export default CardTitle
