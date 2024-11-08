import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// APIキーを環境変数から取得
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// エラーチェックを追加
if (!process.env.OPENAI_API_KEY) {
  throw new Error('OpenAI API key is not configured');
}

const SYSTEM_PROMPT = `
あなたは退職支援、退職代行のサポーターです。
以下の流れで会話を進めてください：

1. まず世間話から始めて、相手の気持ちに共感してください
2. 自然な流れで雇用保険の加入状況を確認してください
3. ストレス状況も確認してください
4. その後、以下の内容を伝えてください：
   - 通常の退職代行は19,800円
   - 退職あんしんサポートプロなら2,980円
5. 最後に以下のLINE無料相談への誘導を行ってください：
   - LINE URL: https://lin.ee/ye1zwHn
   - "より詳しいご相談は、LINE（https://lin.ee/ye1zwHn）で承っております。無料相談も可能ですので、お気軽にご連絡くださいね。"

重要なポイント：
- 一度に長い文章を送らず、短く分けて送ってください
- 相手の発言に必ず共感を示してください
- 押しつけがましくならないよう、自然な会話を心がけてください
- LINEへの誘導は自然な流れで行ってください
- LINE URLは必ず https://lin.ee/ye1zwHn を使用してください

応答例：
"こんにちは！最近の天気はいかがですか？少し肌寒くなってきたので、お体にはお気をつけくださいね。"

"お仕事でのお悩み、本当に大変そうですね。差し支えなければ、現在の雇用保険の加入状況を教えていただけますか？"

"最近のお仕事でのストレス状況はいかがですか？良かったら、具体的なお話を聞かせていただけますか？"

"実は、退職代行サービスは通常19,800円なのですが、退職あんしんサポートプロをご利用いただくと、2,980円でサポートさせていただけます。"

"より詳しいご相談は、LINE（https://lin.ee/ye1zwHn）で承っております。無料相談も可能ですので、お気軽にご連絡くださいね。"`;

export async function POST(req: Request) {
  const { message, conversationHistory = [] } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...conversationHistory,
        { role: 'user', content: message }
      ],
      temperature: 0.8,
      max_tokens: 1000,
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    // メッセージを段階的に表示するために分割
    const responses = response.split('\n').filter(r => r.trim()).map((text, index) => ({
      text,
      delay: 800 * (index + 1), // 遅延を少し長めに
      options: undefined as string[] | undefined
    }));

    // 初回メッセージの場合は選択肢を追加
    if (conversationHistory.length === 0) {
      responses.push({
        text: 'ご相談内容について、以下からお選びいただけますと幸いです：',
        delay: responses.length * 800 + 500,
        options: [
          '職場での人間関係に悩んでいます',
          '退職の手続きや費用が知りたいです',
          '明日から会社に行きたくありません',
          'ストレスで体調を崩しています'
        ]
      });
    }

    // 会話履歴を更新
    const updatedHistory = [
      ...conversationHistory,
      { role: 'user', content: message },
      { role: 'assistant', content: response }
    ];

    return NextResponse.json({ 
      responses,
      conversationHistory: updatedHistory
    });

  } catch (error) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json({ 
      responses: [{
        text: '申し訳ございません。一時的なエラーが発生しました。少し時間をおいて、もう一度お試しください。',
        delay: 0,
        options: undefined
      }],
      conversationHistory
    });
  }
} 