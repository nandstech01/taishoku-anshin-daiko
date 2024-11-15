import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 30000,
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
      console.error('OPENAI_API_KEY is not configured');
      return NextResponse.json({ 
        error: 'Configuration Error',
        message: 'API key is not set'
      }, { status: 500 });
    }

    const { messages } = await req.json();
    const conversationLength = messages.filter((msg: any) => msg.role === "assistant").length;

    console.log('Starting API call...');
    
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

    console.log('API call successful');
    return NextResponse.json(completion.choices[0].message);

  } catch (error: any) {
    console.error('Detailed API Error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      status: error.status,
      response: error.response
    });

    return NextResponse.json({ 
      error: 'API Error',
      message: error.message,
      type: error.name,
      status: error.status || 500
    }, { 
      status: error.status === 504 ? 504 : 500 
    });
  }
} 