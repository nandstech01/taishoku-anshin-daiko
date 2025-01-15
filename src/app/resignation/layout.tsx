import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | 退職届作成',
    default: '退職届作成',
  },
  description: '退職届・退職願をAIのサポートで簡単に作成できるツール',
}

export default function ResignationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>{children}</main>
    </div>
  )
} 