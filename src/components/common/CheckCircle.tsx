// src/components/common/CheckCircle.tsx
import React from 'react'

type CheckCircleProps = React.SVGProps<SVGSVGElement>

const CheckCircle: React.FC<CheckCircleProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    <circle cx="12" cy="12" r="9" />
  </svg>
)

export default CheckCircle
