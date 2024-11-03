import { Metadata } from 'next';
import '@/styles/globals.css'; // グローバルスタイルのインポート
import Header from '@/components/common/Header'; // ヘッダーコンポーネントのインポート

// メタデータの設定
export const metadata: Metadata = {
  title: 'サイトタイトル',
  description: 'サイトの説明',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        {/* 必要に応じて他のメタタグを追加 */}
      </head>
      <body>
        <Header /> {/* ヘッダーを追加 */}
        {children}
      </body>
    </html>
  );
}