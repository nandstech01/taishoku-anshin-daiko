import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

// APIキーが設定されているか確認するログ
console.log('API Key exists:', !!process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
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
    // APIキーの存在確認
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is not configured');
      return NextResponse.json({ 
        error: 'Configuration Error',
        message: 'OpenAI API key is not configured'
      }, { status: 500 });
    }

    const { messages } = await req.json();
    console.log('Received messages:', messages.length);

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          ...INITIAL_MESSAGES,
          ...messages,
          ...(messages.filter((msg: any) => msg.role === "assistant").length === 2 ? [{
            role: "system",
            content: "この返信には必ず「より詳しいご相談は、下記の無料相談フォームからお気軽にご連絡ください。」というメッセージを含めてください。"
          }] : [])
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      console.log('API response received');
      return NextResponse.json(completion.choices[0].message);

    } catch (apiError: any) {
      console.error('OpenAI API Error:', apiError);
      return NextResponse.json({ 
        error: 'OpenAI API Error',
        message: apiError.message,
        details: apiError.response?.data || 'No additional details'
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error('General Error:', error);
    return NextResponse.json({ 
      error: 'Server Error',
      message: error.message || 'An unexpected error occurred'
    }, { status: 500 });
  }
} 