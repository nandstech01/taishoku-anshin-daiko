export type ResignationFormData = {
  documentType: '退職届' | '退職願'
  submissionDate: string
  resignationDate: string
  department: string
  name: string
  companyName: string
  representativeName: string
  reason: string
  useAiCheck: boolean
}

// PDFの生成に必要な型定義
export type PDFGenerationData = ResignationFormData & {
  createdAt: string
  deviceInfo: {
    userAgent: string
    platform: string
  }
}

// ログ用の型定義（DBには保存しない、一時的なログ用）
export type ResignationLogData = {
  id: string
  created_at: string
  document_type: string
  device_info?: {
    userAgent: string
    platform: string
  }
  ai_check_used: boolean
} 