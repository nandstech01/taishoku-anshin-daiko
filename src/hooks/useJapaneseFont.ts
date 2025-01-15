import { useState, useEffect } from 'react'
import { loadJapaneseFont } from '@/utils/pdf/loadFont'

export type FontLoadingStatus = 'idle' | 'loading' | 'success' | 'error' | 'fallback'

export function useJapaneseFont() {
  const [status, setStatus] = useState<FontLoadingStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadFont() {
      try {
        setStatus('loading')
        setError(null)

        // メインフォントの読み込みを試行
        try {
          await loadJapaneseFont()
          if (isMounted) setStatus('success')
        } catch (err) {
          console.error('Error loading main font:', err)
          // フォールバックフォントの読み込みを試行
          try {
            await loadJapaneseFont() // フォールバック処理は内部で行われる
            if (isMounted) setStatus('fallback')
          } catch (fallbackErr) {
            throw fallbackErr
          }
        }
      } catch (err) {
        console.error('Error loading fonts:', err)
        if (isMounted) {
          setError('日本語フォントの読み込みに失敗しました')
          setStatus('error')
        }
      }
    }

    loadFont()

    return () => {
      isMounted = false
    }
  }, [])

  return {
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isFallback: status === 'fallback',
    isError: status === 'error',
    error,
  }
} 