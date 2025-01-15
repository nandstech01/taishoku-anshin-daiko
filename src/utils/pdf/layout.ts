import type { PDFFont, PDFPage } from 'pdf-lib'
import { rgb } from 'pdf-lib'

// A4サイズの定数
export const A4 = {
  width: 595.28,
  height: 841.89,
  margin: {
    top: 70,
    right: 50,
    bottom: 50,
    left: 50,
  },
}

// 文字サイズの定数
export const FontSize = {
  title: 24,
  subtitle: 16,
  normal: 12,
  small: 10,
}

// レイアウトのユーティリティ関数
export function centerText(text: string, font: PDFFont, fontSize: number, pageWidth: number): number {
  const textWidth = font.widthOfTextAtSize(text, fontSize)
  return (pageWidth - textWidth) / 2
}

export function drawTitle(page: PDFPage, text: string, font: PDFFont) {
  const x = centerText(text, font, FontSize.title, A4.width)
  page.drawText(text, {
    x,
    y: A4.height - A4.margin.top,
    size: FontSize.title,
    font,
  })
}

export function drawDateLine(page: PDFPage, text: string, font: PDFFont) {
  page.drawText(text, {
    x: A4.margin.left,
    y: A4.height - A4.margin.top - 60,
    size: FontSize.normal,
    font,
  })
}

export function drawCompanyInfo(
  page: PDFPage,
  companyName: string,
  representativeName: string,
  font: PDFFont
) {
  // 会社名
  page.drawText(companyName, {
    x: A4.margin.left,
    y: A4.height - A4.margin.top - 120,
    size: FontSize.normal,
    font,
  })

  // 代表者名
  page.drawText(`${representativeName} 様`, {
    x: A4.margin.left,
    y: A4.height - A4.margin.top - 140,
    size: FontSize.normal,
    font,
  })
}

export function drawPersonalInfo(
  page: PDFPage,
  department: string,
  name: string,
  font: PDFFont
) {
  const rightColumnX = A4.width - A4.margin.right - 150

  // 部署名
  page.drawText(department, {
    x: rightColumnX,
    y: A4.height - A4.margin.top - 120,
    size: FontSize.normal,
    font,
  })

  // 氏名
  page.drawText(name, {
    x: rightColumnX,
    y: A4.height - A4.margin.top - 140,
    size: FontSize.normal,
    font,
  })
}

export function drawResignationDate(page: PDFPage, text: string, font: PDFFont) {
  page.drawText(text, {
    x: A4.margin.left,
    y: A4.height - A4.margin.top - 200,
    size: FontSize.normal,
    font,
  })
}

export function drawReason(page: PDFPage, lines: string[], font: PDFFont) {
  const startY = A4.height - A4.margin.top - 250
  const lineHeight = 25

  lines.forEach((line, index) => {
    page.drawText(line, {
      x: A4.margin.left,
      y: startY - (index * lineHeight),
      size: FontSize.normal,
      font,
    })
  })
}

// 印鑑欄を描画
export function drawSealSpace(page: PDFPage) {
  const sealSize = 60
  const x = A4.width - A4.margin.right - sealSize - 20
  const y = A4.height - A4.margin.top - 300

  // 印鑑欄の枠を描画
  page.drawRectangle({
    x,
    y,
    width: sealSize,
    height: sealSize,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1,
  })
} 