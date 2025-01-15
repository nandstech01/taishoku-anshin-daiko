'use client'

import { useEffect, useState } from 'react'
import type { ResignationFormData } from '@/types/resignation'
import { generateResignationPDF } from '@/utils/pdf/generateResignationPDF'
import styles from '@/styles/resignation.module.css'

type PDFPreviewProps = {
  formData: ResignationFormData | null
  onClose: () => void
}

export function PDFPreview({ formData, onClose }: PDFPreviewProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function generatePreview() {
      if (!formData) return

      try {
        setIsLoading(true)
        setError(null)

        const pdfBytes = await generateResignationPDF(formData)
        const blob = new Blob([pdfBytes], { type: 'application/pdf' })
        const url = URL.createObjectURL(blob)
        setPdfUrl(url)
      } catch (err) {
        console.error('Error generating PDF preview:', err)
        setError('PDFプレビューの生成に失敗しました')
      } finally {
        setIsLoading(false)
      }
    }

    generatePreview()

    // クリーンアップ関数
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl)
      }
    }
  }, [formData])

  if (!formData) return null

  return (
    <div className={styles.previewOverlay}>
      <div className={styles.previewContainer}>
        <div className={styles.previewHeader}>
          <h2>プレビュー</h2>
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="閉じる"
          >
            ×
          </button>
        </div>

        <div className={styles.previewContent}>
          {isLoading ? (
            <div className={styles.loadingMessage}>
              プレビューを生成中...
            </div>
          ) : error ? (
            <div className={styles.errorMessage}>
              {error}
            </div>
          ) : (
            <iframe
              src={pdfUrl || ''}
              className={styles.previewFrame}
              title="PDF Preview"
            />
          )}
        </div>

        <div className={styles.previewFooter}>
          <button
            onClick={onClose}
            className={styles.cancelButton}
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  )
} 