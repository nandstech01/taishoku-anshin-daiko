import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Stripeの初期化 (シークレットキーは環境変数から取得)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  // @ts-ignore Stripe SDKのバージョンと型定義のミスマッチの可能性あり
  apiVersion: '2024-04-10', // 使用するStripe APIのバージョン
  typescript: true,
});

export async function POST(req: NextRequest) {
  try {
    // 環境変数から価格IDを取得
    const priceId = process.env.STRIPE_PRICE_ID;
    
    if (!priceId) {
      console.error('Stripe Price ID is not configured');
      return NextResponse.json({ error: 'Stripe価格IDが設定されていません。' }, { status: 500 });
    }
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId, // 環境変数から価格IDを使用
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/canceled`,
      // 日本の住所を収集する場合 (必要に応じて)
      // billing_address_collection: 'required',
      // shipping_address_collection: {
      //   allowed_countries: ['JP'],
      // },
    });

    if (session.url) {
      return NextResponse.json({ sessionId: session.id, url: session.url });
    } else {
      return NextResponse.json({ error: 'Stripeセッションの作成に失敗しました。' }, { status: 500 });
    }

  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    const errorMessage = error instanceof Error ? error.message : '決済処理中に不明なエラーが発生しました。';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 