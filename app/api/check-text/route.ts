import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: Request) {
  try {
    const { text } = await request.json()

    const message = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: `以下の退職理由の文章を、より適切な敬語とビジネスマナーを考慮した表現に修正してください。
修正の際は以下の点に注意してください：
- 丁寧で誠実な表現を使用
- 感情的な表現を避ける
- 簡潔かつ明確な表現を心がける
- 相手への感謝の意を含める

退職理由：
${text}`,
        },
      ],
    })

    const suggestion = message.content.toString()

    return NextResponse.json({ suggestion })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'AI文章チェックに失敗しました' },
      { status: 500 }
    )
  }
} 