// src/components/common/MessageCircle.tsx
import React from 'react'

type MessageCircleProps = React.SVGProps<SVGSVGElement>

const MessageCircle: React.FC<MessageCircleProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.02 9.02 0 01-4.92-1.688L3 20l1.688-4.08A9.02 9.02 0 0112 4c4.97 0 9 3.582 9 8z" />
  </svg>
)

export default MessageCircle