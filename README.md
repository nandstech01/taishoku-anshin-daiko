# 退職あんしん代行

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## LLM対応

このプロジェクトは、LLM（大規模言語モデル）との互換性を持たせるために、以下のファイルを提供しています：

- [llms.txt](/llms.txt) - プロジェクトの構造と主要機能の概要を提供するマークダウンファイル
- [llms-full.txt](/llms-full.txt) - より詳細なプロジェクト情報を含むマークダウンファイル

これらのファイルは、AIアシスタントがプロジェクトについて質問に答える際に正確な情報を提供するために使用されます。詳細については、[llms.txt標準](https://llmstxt.org/)を参照してください。

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## ドキュメント

- [アーキテクチャ設計](./docs/ARCHITECTURE.md)
  - データモデルの設計判断
  - 技術的な注意点
