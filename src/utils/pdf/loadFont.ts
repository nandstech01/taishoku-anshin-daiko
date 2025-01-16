import { PDFDocument } from 'pdf-lib'

// Base64エンコードされたフォントデータ
const NOTO_SANS_JP_BASE64 = '/fonts/NotoSansJP-Regular.otf'
const IPAEX_GOTHIC_BASE64 = '/fonts/ipaexg.ttf'

let fontBytes: Uint8Array | null = null
let fallbackFontBytes: Uint8Array | null = null

export async function loadJapaneseFont(): Promise<Uint8Array> {
  if (fontBytes) {
    console.log('Using cached font bytes')
    return fontBytes
  }

  try {
    console.log('Attempting to load Noto Sans JP...')
    const response = await fetch(NOTO_SANS_JP_BASE64)
    
    if (!response.ok) {
      console.error('Failed to fetch Noto Sans JP:', response.status, response.statusText)
      throw new Error('フォントの読み込みに失敗しました')
    }
    
    const buffer = await response.arrayBuffer()
    console.log('Noto Sans JP loaded, size:', buffer.byteLength, 'bytes')
    
    if (buffer.byteLength < 1000) {
      console.error('Font file too small, might be corrupted or not loaded correctly')
      throw new Error('フォントファイルが正しくありません')
    }
    
    // バッファーの最初の数バイトをログ出力（フォントファイルの識別に使用）
    const firstBytes = new Uint8Array(buffer.slice(0, 4))
    console.log('First bytes:', Array.from(firstBytes).map(b => b.toString(16).padStart(2, '0')).join(' '))
    
    fontBytes = new Uint8Array(buffer)
    return fontBytes
  } catch (error) {
    console.error('Error loading Noto Sans JP:', error)
    console.log('Falling back to IPAex Gothic...')
    return await loadFallbackFont()
  }
}

async function loadFallbackFont(): Promise<Uint8Array> {
  if (fallbackFontBytes) {
    console.log('Using cached fallback font bytes')
    return fallbackFontBytes
  }

  try {
    console.log('Attempting to load IPAex Gothic...')
    const response = await fetch(IPAEX_GOTHIC_BASE64)
    
    if (!response.ok) {
      console.error('Failed to fetch IPAex Gothic:', response.status, response.statusText)
      throw new Error('フォールバックフォントの読み込みに失敗しました')
    }

    const buffer = await response.arrayBuffer()
    console.log('IPAex Gothic loaded, size:', buffer.byteLength, 'bytes')
    
    if (buffer.byteLength < 1000) {
      console.error('Fallback font file too small, might be corrupted or not loaded correctly')
      throw new Error('フォールバックフォントファイルが正しくありません')
    }
    
    // バッファーの最初の数バイトをログ出力
    const firstBytes = new Uint8Array(buffer.slice(0, 4))
    console.log('First bytes:', Array.from(firstBytes).map(b => b.toString(16).padStart(2, '0')).join(' '))
    
    fallbackFontBytes = new Uint8Array(buffer)
    return fallbackFontBytes
  } catch (error) {
    console.error('Error loading IPAex Gothic:', error)
    throw new Error('フォントの読み込みに失敗しました')
  }
}

export async function embedJapaneseFont(pdfDoc: PDFDocument): Promise<void> {
  try {
    const fontBytes = await loadJapaneseFont()
    console.log('Font loaded successfully, attempting to embed...')
    await pdfDoc.embedFont(fontBytes)
    console.log('Font embedded successfully')
  } catch (error) {
    console.error('Error embedding font:', error)
    throw error
  }
} 