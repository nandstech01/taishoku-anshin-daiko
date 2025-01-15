'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import type { ResignationFormData } from '@/types/resignation'
import { resignationFormSchema } from '@/schemas/resignation'
import { generateResignationPDF } from '@/utils/pdf/generateResignationPDF'
import { getCurrentDate } from '@/utils/date'
import { PDFPreview } from './PDFPreview'
import styles from '@/styles/resignation.module.css'

export function ResignationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [aiSuggestion, setAiSuggestion] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isChecking, setIsChecking] = useState(false)
  const [previewData, setPreviewData] = useState<ResignationFormData | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ResignationFormData>({
    resolver: zodResolver(resignationFormSchema),
    defaultValues: {
      documentType: '退職届',
      submissionDate: getCurrentDate(),
      useAiCheck: true,
    },
  })

  const reason = watch('reason')
  const useAiCheck = watch('useAiCheck')

  const checkText = async (text: string) => {
    if (!text.trim() || !useAiCheck) return
    
    setIsChecking(true)
    setError(null)
    
    try {
      const response = await fetch('/api/check-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      
      if (!response.ok) {
        throw new Error('AI文章チェックに失敗しました')
      }
      
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      
      setAiSuggestion(data.suggestion)
    } catch (error) {
      console.error('Error:', error)
      setError(error instanceof Error ? error.message : 'AI文章チェックに失敗しました')
    } finally {
      setIsChecking(false)
    }
  }

  const applyAiSuggestion = () => {
    if (aiSuggestion) {
      setValue('reason', aiSuggestion)
      setAiSuggestion('')
    }
  }

  const handlePreview = (data: ResignationFormData) => {
    setPreviewData(data)
  }

  const onSubmit = async (data: ResignationFormData) => {
    setIsSubmitting(true)
    setError(null)
    try {
      // PDF生成
      const pdfBytes = await generateResignationPDF(data)
      
      // PDFをダウンロード
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${data.documentType}_${data.name}_${data.submissionDate}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      
    } catch (error) {
      console.error('Error:', error)
      setError(error instanceof Error ? error.message : 'PDF生成中にエラーが発生しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.resignationForm}>
        {error && (
          <div className={styles.formSection}>
            <div className={styles.errorMessage}>{error}</div>
          </div>
        )}

        <div className={styles.formSection}>
          <label className={styles.formLabel}>文書の種類</label>
          <select {...register('documentType')} className={styles.formInput}>
            <option value="退職届">退職届</option>
            <option value="退職願">退職願</option>
          </select>
        </div>

        <div className={styles.formSection}>
          <div>
            <label className={styles.formLabel}>提出日</label>
            <input
              type="date"
              {...register('submissionDate')}
              className={styles.formInput}
            />
            {errors.submissionDate && (
              <div className={styles.errorMessage}>{errors.submissionDate.message}</div>
            )}
          </div>
          <div>
            <label className={styles.formLabel}>退職日</label>
            <input
              type="date"
              {...register('resignationDate')}
              className={styles.formInput}
            />
            {errors.resignationDate && (
              <div className={styles.errorMessage}>{errors.resignationDate.message}</div>
            )}
          </div>
        </div>

        <div className={styles.formSection}>
          <div>
            <label className={styles.formLabel}>部署名</label>
            <input
              type="text"
              {...register('department')}
              className={styles.formInput}
              placeholder="〇〇部"
            />
            {errors.department && (
              <div className={styles.errorMessage}>{errors.department.message}</div>
            )}
          </div>
          <div>
            <label className={styles.formLabel}>氏名</label>
            <input
              type="text"
              {...register('name')}
              className={styles.formInput}
              placeholder="山田 太郎"
            />
            {errors.name && (
              <div className={styles.errorMessage}>{errors.name.message}</div>
            )}
          </div>
          <div>
            <label className={styles.formLabel}>会社名</label>
            <input
              type="text"
              {...register('companyName')}
              className={styles.formInput}
              placeholder="株式会社〇〇"
            />
            {errors.companyName && (
              <div className={styles.errorMessage}>{errors.companyName.message}</div>
            )}
          </div>
          <div>
            <label className={styles.formLabel}>代表者名</label>
            <input
              type="text"
              {...register('representativeName')}
              className={styles.formInput}
              placeholder="代表取締役社長 〇〇 〇〇"
            />
            {errors.representativeName && (
              <div className={styles.errorMessage}>{errors.representativeName.message}</div>
            )}
          </div>
        </div>

        <div className={styles.formSection}>
          <label className={styles.formLabel}>退職理由</label>
          <textarea
            {...register('reason')}
            className={styles.formTextarea}
            placeholder="一身上の都合により..."
          />
          {errors.reason && (
            <div className={styles.errorMessage}>{errors.reason.message}</div>
          )}
          {useAiCheck && reason && reason.length > 0 && (
            <button
              type="button"
              onClick={() => checkText(reason)}
              disabled={isChecking}
              className={styles.submitButton}
            >
              {isChecking ? '文章をチェック中...' : '文章をAIでチェック'}
            </button>
          )}
        </div>

        <div className={styles.formSection}>
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              {...register('useAiCheck')}
            />
            <label>AI文章チェックを使用する</label>
          </div>
        </div>

        {aiSuggestion && (
          <div className={styles.aiSuggestionContainer}>
            <h3>AI提案文章</h3>
            <p>{aiSuggestion}</p>
            <button
              type="button"
              onClick={applyAiSuggestion}
              className={styles.submitButton}
            >
              この提案を採用する
            </button>
          </div>
        )}

        <div className={styles.formSection}>
          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={handleSubmit(handlePreview)}
              className={styles.previewButton}
            >
              プレビュー
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? '処理中...' : 'PDF生成'}
            </button>
          </div>
        </div>
      </form>

      {previewData && (
        <PDFPreview
          formData={previewData}
          onClose={() => setPreviewData(null)}
        />
      )}
    </>
  )
} 