import { Metadata } from 'next';
import '../globals.css';

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
    <div className="bg-white min-h-screen">
      {children}
    </div>
  );
} 