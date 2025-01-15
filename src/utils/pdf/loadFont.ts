import { PDFDocument } from 'pdf-lib'

let fontBytes: ArrayBuffer | null = null
let fallbackFontBytes: ArrayBuffer | null = null

export async function loadJapaneseFont(): Promise<ArrayBuffer> {
  if (fontBytes) {
    return fontBytes
  }

  try {
    const response = await fetch('/fonts/NotoSansJP-Regular.otf')
    if (!response.ok) {
      throw new Error('フォントの読み込みに失敗しました')
    }
    
    fontBytes = await response.arrayBuffer()
    return fontBytes
  } catch (error) {
    console.error('Error loading font:', error)
    return await loadFallbackFont()
  }
}

async function loadFallbackFont(): Promise<ArrayBuffer> {
  if (fallbackFontBytes) {
    return fallbackFontBytes
  }

  try {
    // フォールバックとしてIPAexゴシックを使用
    const response = await fetch('/fonts/ipaexg.ttf')
    if (!response.ok) {
      throw new Error('フォールバックフォントの読み込みに失敗しました')
    }

    fallbackFontBytes = await response.arrayBuffer()
    return fallbackFontBytes
  } catch (error) {
    console.error('Error loading fallback font:', error)
    throw new Error('フォントの読み込みに失敗しました')
  }
}

export async function embedJapaneseFont(pdfDoc: PDFDocument): Promise<void> {
  try {
    const fontBytes = await loadJapaneseFont()
    await pdfDoc.embedFont(fontBytes)
  } catch (error) {
    console.error('Error embedding font:', error)
    throw new Error('日本語フォントの埋め込みに失敗しました')
  }
} 