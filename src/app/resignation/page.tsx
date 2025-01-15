import { ResignationForm } from '@/components/resignation/ResignationForm'
import { FontLoadingStatus } from '@/components/resignation/FontLoadingStatus'
import styles from '@/styles/resignation.module.css'

export const metadata = {
  title: '退職届作成',
  description: '退職届・退職願をAIのサポートで簡単に作成',
}

export default function ResignationPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>退職届作成</h1>
      <p className={styles.description}>
        退職届・退職願を作成できます。AI文章チェック機能で適切な表現をサポートします。
      </p>
      <FontLoadingStatus />
      <ResignationForm />
    </div>
  )
} 