import { PDFDocument, rgb } from 'pdf-lib'
import type { ResignationFormData } from '@/types/resignation'
import { formatDate } from '@/utils/date'
import { loadJapaneseFont } from './loadFont'
import {
  A4,
  drawTitle,
  drawDateLine,
  drawCompanyInfo,
  drawPersonalInfo,
  drawResignationDate,
  drawReason,
  drawSealSpace,
} from './layout'

// fontkitをダイナミックインポート
async function getFontkit() {
  const fontkit = (await import('@pdf-lib/fontkit')).default
  return fontkit
}

export async function generateResignationPDF(data: ResignationFormData): Promise<Uint8Array> {
  try {
    console.log('Starting PDF generation...')
    
    // PDFドキュメントを作成
    const pdfDoc = await PDFDocument.create()
    console.log('PDF document created')
    
    // fontkitを動的に読み込んで登録
    const fontkit = await getFontkit()
    pdfDoc.registerFontkit(fontkit)
    console.log('Fontkit registered')
    
    try {
      // 日本語フォントを読み込み
      const fontBytes = await loadJapaneseFont()
      console.log('Font bytes loaded, length:', fontBytes.length)
      const font = await pdfDoc.embedFont(fontBytes)
      console.log('Font embedded successfully')
      
      // ページを追加
      const page = pdfDoc.addPage([A4.width, A4.height])
      console.log('Page added')
      
      // 背景色を設定（わずかにグレー）
      page.drawRectangle({
        x: 0,
        y: 0,
        width: A4.width,
        height: A4.height,
        color: rgb(0.98, 0.98, 0.98),
      })
      
      // タイトルを描画
      drawTitle(page, data.documentType, font)
      console.log('Title drawn')

      // 日付を描画
      drawDateLine(page, `提出日：${formatDate(data.submissionDate)}`, font)
      console.log('Date drawn')

      // 会社情報を描画
      drawCompanyInfo(page, data.companyName, data.representativeName, font)
      console.log('Company info drawn')

      // 個人情報を描画
      drawPersonalInfo(page, data.department, data.name, font)
      console.log('Personal info drawn')

      // 退職日を描画
      drawResignationDate(page, `退職日：${formatDate(data.resignationDate)}`, font)
      console.log('Resignation date drawn')

      // 退職理由を描画
      const reasonLines = splitTextIntoLines(data.reason, 40)
      drawReason(page, reasonLines, font)
      console.log('Reason drawn')

      // 印鑑欄を描画
      drawSealSpace(page)
      console.log('Seal space drawn')

      // PDFを生成
      console.log('Generating final PDF...')
      return await pdfDoc.save()
    } catch (fontError: unknown) {
      console.error('Font-related error:', fontError)
      const errorMessage = fontError instanceof Error ? fontError.message : 'Unknown error'
      throw new Error(`フォント処理中にエラーが発生しました: ${errorMessage}`)
    }
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw new Error('PDF生成中にエラーが発生しました')
  }
}

// テキストを指定した長さで分割する補助関数
function splitTextIntoLines(text: string, maxLength: number): string[] {
  const lines: string[] = []
  let currentLine = ''

  for (const char of text) {
    if (currentLine.length >= maxLength || char === '\n') {
      lines.push(currentLine)
      currentLine = ''
    }
    if (char !== '\n') {
      currentLine += char
    }
  }

  if (currentLine) {
    lines.push(currentLine)
  }

  return lines
} 