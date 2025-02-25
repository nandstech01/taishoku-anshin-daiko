import { NextResponse } from 'next/server';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

export const dynamic = 'force-dynamic';

// メール送信用のトランスポーター設定
const transporter: Transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, subject, text } = body;

    // 基本的なバリデーション
    if (!to || !subject || !text) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // メール送信
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      text,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending notification email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 