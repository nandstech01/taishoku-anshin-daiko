import { z } from 'zod'

// 日付のバリデーション用ヘルパー関数
const isValidDate = (date: string) => {
  const d = new Date(date)
  return d instanceof Date && !isNaN(d.getTime())
}

export const resignationFormSchema = z.object({
  documentType: z.enum(['退職届', '退職願'], {
    required_error: '文書の種類を選択してください',
  }),
  submissionDate: z.string({
    required_error: '提出日を入力してください',
  }).refine(isValidDate, '有効な日付を入力してください'),
  resignationDate: z.string({
    required_error: '退職日を入力してください',
  }).refine(isValidDate, '有効な日付を入力してください'),
  department: z.string({
    required_error: '部署名を入力してください',
  }).min(1, '部署名を入力してください'),
  name: z.string({
    required_error: '氏名を入力してください',
  }).min(1, '氏名を入力してください'),
  companyName: z.string({
    required_error: '会社名を入力してください',
  }).min(1, '会社名を入力してください'),
  representativeName: z.string({
    required_error: '代表者名を入力してください',
  }).min(1, '代表者名を入力してください'),
  reason: z.string({
    required_error: '退職理由を入力してください',
  }).min(10, '退職理由は10文字以上で入力してください')
    .max(1000, '退職理由は1000文字以内で入力してください'),
  useAiCheck: z.boolean().default(true),
}) 