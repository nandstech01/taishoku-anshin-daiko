import { ResignationForm } from '@/src/components/resignation/ResignationForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '退職届・退職願作成ツール | 無料で簡単に作成',
  description: '退職届・退職願を無料で簡単に作成できます。AI文章チェック機能付きで、適切な敬語と文面を自動で提案します。',
}

export default function ResignationToolPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">退職届・退職願作成ツール</h1>
          <p className="text-gray-600">
            必要事項を入力するだけで、適切な文面の退職届・退職願を作成できます。
            個人情報は一切保存されません。
          </p>
        </div>
        <div className="bg-white shadow-sm rounded-lg p-6">
          <ResignationForm />
        </div>
      </div>
    </div>
  )
} 