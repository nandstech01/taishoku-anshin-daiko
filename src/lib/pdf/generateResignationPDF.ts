import { PDFDocument, rgb } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import type { ResignationFormData } from '@/types/resignation'

// 日本語フォントのバイナリデータを取得する関数
async function fetchFontData() {
  try {
    const response = await fetch('/fonts/NotoSansJP-Regular.otf')
    if (!response.ok) throw new Error('フォントの読み込みに失敗しました')
    return new Uint8Array(await response.arrayBuffer())
  } catch (error) {
    console.error('Font loading error:', error)
    throw new Error('日本語フォントの読み込みに失敗しました')
  }
}

export async function generateResignationPDF(data: ResignationFormData): Promise<Uint8Array> {
  try {
    // PDFドキュメントを作成
    const pdfDoc = await PDFDocument.create()
    
    // フォントキットを登録
    pdfDoc.registerFontkit(fontkit)
    
    // 日本語フォントを読み込み
    const fontData = await fetchFontData()
    const notoSansJP = await pdfDoc.embedFont(fontData)
    
    // ページを追加
    const page = pdfDoc.addPage([595.28, 841.89]) // A4サイズ
    
    // 描画開始位置を設定
    const { width, height } = page.getSize()
    let currentY = height - 70 // 上端から70ポイント下
    
    // タイトルを描画（中央揃え）
    const titleWidth = notoSansJP.widthOfTextAtSize(data.documentType, 24)
    page.drawText(data.documentType, {
      x: (width - titleWidth) / 2,
      y: currentY,
      font: notoSansJP,
      size: 24,
    })
    
    currentY -= 80 // タイトルの下に余白
    
    // 日付を描画（右揃え）
    const dateText = `${data.submissionDate}`
    const dateWidth = notoSansJP.widthOfTextAtSize(dateText, 12)
    page.drawText(dateText, {
      x: width - dateWidth - 50,
      y: currentY,
      font: notoSansJP,
      size: 12,
    })
    
    currentY -= 40
    
    // 宛名を描画
    page.drawText(`${data.companyName}`, {
      x: 50,
      y: currentY,
      font: notoSansJP,
      size: 12,
    })
    
    currentY -= 25
    
    page.drawText(`${data.representativeName} 殿`, {
      x: 50,
      y: currentY,
      font: notoSansJP,
      size: 12,
    })
    
    currentY -= 60
    
    // 部署・氏名を描画（右揃え）
    const deptText = `${data.department}`
    const nameText = `${data.name}`
    const deptWidth = notoSansJP.widthOfTextAtSize(deptText, 12)
    const nameWidth = notoSansJP.widthOfTextAtSize(nameText, 12)
    
    page.drawText(deptText, {
      x: width - deptWidth - 50,
      y: currentY,
      font: notoSansJP,
      size: 12,
    })
    
    currentY -= 25
    
    page.drawText(nameText, {
      x: width - nameWidth - 50,
      y: currentY,
      font: notoSansJP,
      size: 12,
    })
    
    // 印鑑スペースを描画（四角形）
    page.drawRectangle({
      x: width - 90,
      y: currentY - 10,
      width: 40,
      height: 40,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    })
    
    currentY -= 100
    
    // 本文を描画
    const mainText = `私は、下記の理由により${data.resignationDate}をもって退職致したく、ここにお届け申し上げます。`
    page.drawText(mainText, {
      x: 50,
      y: currentY,
      font: notoSansJP,
      size: 12,
    })
    
    currentY -= 40
    
    // 退職理由を描画
    page.drawText('退職理由：', {
      x: 50,
      y: currentY,
      font: notoSansJP,
      size: 12,
    })
    
    currentY -= 20
    
    // 理由を複数行に分割して描画
    const maxWidth = width - 100 // 左右のマージンを考慮
    const words = data.reason.split('')
    let line = ''
    let lineY = currentY
    
    for (const char of words) {
      const testLine = line + char
      const lineWidth = notoSansJP.widthOfTextAtSize(testLine, 12)
      
      if (lineWidth > maxWidth) {
        page.drawText(line, {
          x: 50,
          y: lineY,
          font: notoSansJP,
          size: 12,
        })
        line = char
        lineY -= 20
      } else {
        line = testLine
      }
    }
    
    // 最後の行を描画
    if (line) {
      page.drawText(line, {
        x: 50,
        y: lineY,
        font: notoSansJP,
        size: 12,
      })
    }
    
    // PDFをバイナリデータとして出力
    return await pdfDoc.save()
  } catch (error) {
    console.error('PDF generation error:', error)
    throw new Error('PDF生成中にエラーが発生しました')
  }
} 