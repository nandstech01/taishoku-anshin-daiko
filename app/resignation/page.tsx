import { ResignationForm } from '@/components/resignation/ResignationForm'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: '退職届・退職願作成 | 無料で簡単に作成',
  description: '退職届・退職願を無料で簡単に作成できます。AI文章チェック機能付きで、適切な敬語と文面を自動で提案します。',
}

export default function ResignationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">退職届・退職願作成</h1>
      <div className="max-w-2xl mx-auto">
        <ResignationForm />
      </div>
    </div>
  )
} 