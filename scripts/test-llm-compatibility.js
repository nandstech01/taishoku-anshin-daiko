/**
 * LLMとの互換性をテストするためのスクリプト
 * 
 * 使用方法:
 * 1. OpenAI APIキーを環境変数に設定: export OPENAI_API_KEY=your_api_key
 * 2. スクリプトを実行: node scripts/test-llm-compatibility.js
 */

const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');

// OpenAI APIクライアントの初期化
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// テスト用の質問リスト
const testQuestions = [
  '退職あんしん代行のサービス内容を教えて',
  '退職あんしん代行の料金はいくらですか',
  '退職届作成ツールの機能について教えて',
  '失業保険診断の使い方を教えて',
  '退職あんしん代行のAPIについて教えて'
];

// llms.txtとllms-full.txtの内容を読み込む
const llmsTxtPath = path.join(__dirname, '..', 'llms.txt');
const llmsFullTxtPath = path.join(__dirname, '..', 'llms-full.txt');

const llmsTxt = fs.readFileSync(llmsTxtPath, 'utf8');
const llmsFullTxt = fs.readFileSync(llmsFullTxtPath, 'utf8');

// LLMに質問を投げかけ、回答を取得する関数
async function askLLM(question, context) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `あなたは退職あんしん代行のアシスタントです。以下の情報を元に質問に答えてください。\n\n${context}`
        },
        {
          role: 'user',
          content: question
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return 'APIエラーが発生しました';
  }
}

// テストを実行する関数
async function runTests() {
  console.log('LLM互換性テストを開始します...\n');

  // llms.txtを使用したテスト
  console.log('=== llms.txtを使用したテスト ===');
  for (const question of testQuestions) {
    console.log(`質問: ${question}`);
    const answer = await askLLM(question, llmsTxt);
    console.log(`回答: ${answer}\n`);
  }

  console.log('\n');

  // llms-full.txtを使用したテスト
  console.log('=== llms-full.txtを使用したテスト ===');
  for (const question of testQuestions) {
    console.log(`質問: ${question}`);
    const answer = await askLLM(question, llmsFullTxt);
    console.log(`回答: ${answer}\n`);
  }

  console.log('テスト完了');
}

// メイン処理
if (!process.env.OPENAI_API_KEY) {
  console.error('エラー: OPENAI_API_KEYが設定されていません。');
  console.error('export OPENAI_API_KEY=your_api_key を実行してください。');
  process.exit(1);
}

runTests().catch(console.error); 