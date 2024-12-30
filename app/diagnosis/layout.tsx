import { Metadata } from 'next';
import '../globals.css';
import 'tailwindcss/tailwind.css';

export const metadata: Metadata = {
  title: '給付金診断 | 失業保険申請サポート',
  description: 'ハローワークでは教えてくれない失業保険の申請方法を丁寧に解説',
};

export default function DiagnosisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Digital-7&display=swap" />
      </head>
      <body className="bg-white">
        {children}
      </body>
    </html>
  );
} 