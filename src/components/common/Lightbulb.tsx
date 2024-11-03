// src/components/common/Lightbulb.tsx
import React from 'react'

type LightbulbProps = React.SVGProps<SVGSVGElement>

const Lightbulb: React.FC<LightbulbProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-11a6 6 0 11-12 0 6 6 0 0112 0z" />
  </svg>
)

export default Lightbulb