import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

interface HearingSheetAnswer {
  [key: string]: string | string[];
}

// スプレッドシートのカラム順序 (ユーザー指定)
const SHEET_COLUMNS = [
  '氏名', 'LINE登録者名', '電話番号', 'メールアドレス', '年齢', '性別',
  '会社名', '職種', '勤務先情報', '在籍年数', '会社規模',
  '退職理由', '希望退職日', '最終出勤日', '次回出勤予定日', '退職意思を伝える連絡先',
  '雇用形態', '残業時間', '未払い残業有無', '有給休暇の状況', '有給取得希望', '退職金の有無',
  'ハラスメント有無', 'ハラスメント内容', '健康上の問題有無', '健康上の問題の詳細', '診断書有無',
  '会社からの貸与物', 'ロッカーの状況', '私物の取り扱い', '会社からの郵送希望書類',
  '希望連絡手段', '連絡希望時間帯', 'その他要望', '当社をどのようにお知りになりましたか',
  'タイムスタンプ' // タイムスタンプカラムを追加
];

export async function POST(request: NextRequest) {
  try {
    // リクエストボディを解析
    const body = await request.json();
    const { answers } = body as { answers: HearingSheetAnswer };
    
    console.log('Received hearing sheet answers:', answers);
    
    // --- Google Sheets API 連携 ---
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID || 'YOUR_SPREADSHEET_ID'; // 環境変数から取得
    const sheetName = process.env.GOOGLE_SHEET_NAME || 'シート1'; // 環境変数から取得、またはデフォルト値

    // Google認証
    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n').replace(/^"(.*)"$/, '$1'),
        project_id: process.env.GOOGLE_PROJECT_ID
      }
    });
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client as any });

    // 回答データをスプレッドシートの行形式に整形
    const now = new Date();
    const timestamp = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const newRow = SHEET_COLUMNS.map(colName => {
      if (colName === 'タイムスタンプ') {
        return timestamp;
      }
      const answer = answers[colName];
      return Array.isArray(answer) ? answer.join(', ') : (answer || '');
    });

    // スプレッドシートに新しい行を追加
    await sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: `${sheetName}!A1`, // A1から開始して自動的に最終行に追加
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [newRow],
      },
    });

    console.log('Successfully appended data to Google Sheet.');
    // --- Google Sheets API 連携 終了 ---
    
    return NextResponse.json({ 
      success: true, 
      message: '退職相談フォームが正常に送信されました。担当者が24時間以内にご連絡いたします。' 
    });
    
  } catch (error) {
    console.error('Error processing hearing sheet submission:', error);
    
    let errorMessage = 'ヒアリングシートの送信中にエラーが発生しました。お手数ですが、もう一度お試しください。';
    if (error instanceof Error) {
        errorMessage += ` (エラー詳細: ${error.message})`;
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage 
      },
      { status: 500 }
    );
  }
} 