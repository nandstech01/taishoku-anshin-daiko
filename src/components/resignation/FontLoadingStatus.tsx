'use client'

import { useJapaneseFont } from '@/hooks/useJapaneseFont'
import styles from '@/styles/resignation.module.css'

export function FontLoadingStatus() {
  const { isLoading, isSuccess, isFallback, isError, error } = useJapaneseFont()

  if (isSuccess) return null

  return (
    <div className={styles.fontStatus}>
      {isLoading && (
        <div className={styles.fontLoading}>
          <div className={styles.loadingSpinner} />
          <span>日本語フォントを読み込み中...</span>
        </div>
      )}
      {isFallback && (
        <div className={styles.fontWarning}>
          <span>代替フォントを使用します</span>
          <p className={styles.fontWarningHint}>
            メインフォントの読み込みに失敗したため、代替フォントを使用します。
            レイアウトが若干異なる場合があります。
          </p>
        </div>
      )}
      {isError && error && (
        <div className={styles.fontError}>
          <span>{error}</span>
          <p className={styles.fontErrorHint}>
            PDFプレビューと生成時に文字化けが発生する可能性があります
          </p>
        </div>
      )}
    </div>
  )
} 