// src/components/common/FileText.tsx
import React from 'react'

type FileTextProps = React.SVGProps<SVGSVGElement>

const FileText: React.FC<FileTextProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9m-9 0a2 2 0 01-2-2v-4a2 2 0 012-2h9m-9 0v6m0 0v-6m0 0H3m9 0h-6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8M8 16h8" />
  </svg>
)

export default FileText
