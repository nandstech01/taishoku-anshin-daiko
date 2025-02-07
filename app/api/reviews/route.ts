import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// Google Sheets APIの認証情報を設定
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Google Sheetsのインスタンスを作成
const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { rating, comment } = body;

    // 現在の日時を取得
    const now = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });

    // スプレッドシートに行を追加
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:D', // 適切なシート名とレンジを指定
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[now, rating, comment]],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving review:', error);
    return NextResponse.json(
      { error: 'Failed to save review' },
      { status: 500 }
    );
  }
} 