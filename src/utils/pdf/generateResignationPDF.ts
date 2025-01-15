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

export async function generateResignationPDF(data: ResignationFormData): Promise<Uint8Array> {
  try {
    // PDFドキュメントを作成
    const pdfDoc = await PDFDocument.create()
    
    // 日本語フォントを読み込み
    const fontBytes = await loadJapaneseFont()
    const font = await pdfDoc.embedFont(fontBytes)
    
    // ページを追加
    const page = pdfDoc.addPage([A4.width, A4.height])
    
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

    // 日付を描画
    drawDateLine(page, `提出日：${formatDate(data.submissionDate)}`, font)

    // 会社情報を描画
    drawCompanyInfo(page, data.companyName, data.representativeName, font)

    // 個人情報を描画
    drawPersonalInfo(page, data.department, data.name, font)

    // 退職日を描画
    drawResignationDate(page, `退職日：${formatDate(data.resignationDate)}`, font)

    // 退職理由を描画
    const reasonLines = splitTextIntoLines(data.reason, 40)
    drawReason(page, reasonLines, font)

    // 印鑑欄を描画
    drawSealSpace(page)

    // PDFを生成
    return await pdfDoc.save()
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