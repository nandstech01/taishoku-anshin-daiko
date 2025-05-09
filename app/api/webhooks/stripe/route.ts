import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

// Stripeの初期化
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  // @ts-ignore StripeのAPIバージョンと型定義のミスマッチを無視
  apiVersion: '2024-04-10',
  typescript: true,
});

// Webhookシークレット（必ずStripeダッシュボードで設定したものを環境変数に追加）
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = headers().get('stripe-signature') || '';

    if (!webhookSecret) {
      console.error('Stripe Webhook Secret is not configured');
      return NextResponse.json(
        { error: 'Webhook secret is not configured' },
        { status: 500 }
      );
    }

    // イベントの検証
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error(`Webhook signature verification failed: ${errorMessage}`);
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${errorMessage}` },
        { status: 400 }
      );
    }

    // イベントタイプごとの処理
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        // 決済完了の処理
        // 例: データベースに注文情報を保存する
        console.log(`Payment succeeded for session ${session.id}`);
        break;
        
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`PaymentIntent success: ${paymentIntent.id}`);
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
} 