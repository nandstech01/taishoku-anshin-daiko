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
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not set');
      throw new Error('OpenAI API key is not configured');
    }

    const { messages } = await req.json();
    const conversationLength = messages.filter((msg: any) => msg.role === "assistant").length;

    console.log('Attempting API call with key:', process.env.OPENAI_API_KEY ? 'Key exists' : 'No key');

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

  } catch (error: any) {
    console.error('Detailed API Error:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });

    return NextResponse.json({ 
      error: 'Internal Server Error', 
      details: error.message,
      type: error.name,
      code: error.code
    }, { status: 500 });
  }
} 