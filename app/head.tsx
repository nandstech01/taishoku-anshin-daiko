// app/head.tsx

import Head from 'next/head';

export default function CustomHead() {
  return (
    <Head>
      <title>会社名 | コーポレートサイト</title>
      <meta name="description" content="会社の紹介やサービス内容などを紹介するコーポレートサイトです。" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* その他のメタタグ */}
    </Head>
  );
}
