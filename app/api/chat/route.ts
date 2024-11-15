import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const INITIAL_MESSAGES = [
  {
    role: "system",
    content: `あなたは「退職あんしん代行」の専門相談員として、退職や職場で悩む方々に優しく丁寧に対応します。
    最初は4つの選択肢を提示し、「ストレスを感じている」が選ばれた場合は追加の4つの選択肢を提示します。
    3回目の返信では必ず相談フォームへの案内を含めてください。`
  }
];

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const conversationLength = messages.filter((msg: any) => msg.role === "assistant").length;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        ...INITIAL_MESSAGES,
        ...messages,
        ...(conversationLength === 2 ? [{
          role: "system",
          content: "この返信には必ず「より詳しいご相談は、下記の無料相談フォームからお気軽にご連絡ください。」というメッセージを含めてください。"
        }] : [])
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return NextResponse.json(completion.choices[0].message);

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 