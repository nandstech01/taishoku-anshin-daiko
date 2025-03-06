"use client"

import { Star, StarHalf, CheckCircle, ExternalLink, AlertTriangle } from "lucide-react"
import { memo } from "react"

// メモ化したバッジコンポーネント
const Badge = memo(({ 
  children, 
  variant = "default", 
  className = "" 
}: { 
  children: React.ReactNode; 
  variant?: "default" | "secondary"; 
  className?: string;
}) => {
  const baseClasses = "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium";
  const variantClasses = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800"
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
});
Badge.displayName = 'Badge';

// メモ化したカードコンポーネント
const Card = memo(({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => {
  return (
    <div className={`rounded-none border border-gray-200 shadow-sm ${className}`}>
      {children}
    </div>
  );
});
Card.displayName = 'Card';

// メモ化した星評価コンポーネント
const RatingStars = memo(({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(Math.floor(rating))].map((_, i) => (
        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
      ))}
      {rating % 1 !== 0 && <StarHalf className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
    </div>
  );
});
RatingStars.displayName = 'RatingStars';

// メインコンポーネント
export default function ComparisonTable() {
  // サービスデータ
  const services = [
    {
      name: "モームリ",
      company: "株式会社アルバトロス",
      tag: "#弁護士監修",
      price: "正社員：22,000円\nアルバイト：12,000円",
      rating: 5,
      description: "弁護士監修と労働組合提携。24時間365日対応、後払い可。全額返金保証あり。",
      features: ["無料転職支援", "メンタルケア", "後払い"],
      url: "https://momuri.com/"
    },
    {
      name: "退職あんしん代行",
      company: "株式会社エヌアンドエス",
      tag: "#最安値",
      price: "2,980円",
      rating: 4.5,
      description: "業界最安値級。24時間チャット対応、全国対応。労組・弁護士連携可。",
      features: ["24時間対応", "副業支援", "全国対応"],
      url: "https://taishoku-anshin-daiko.com"
    },
    {
      name: "EXIT",
      company: "EXIT株式会社",
      tag: "#最大手",
      price: "20,000円",
      rating: 4.5,
      description: "利用者数万人規模。2回目以降半額。スピード対応に定評あり。",
      features: ["リピ割引", "迅速対応", "実績豊富"],
      note: "※2回目以降半額",
      url: "https://www.taishokudaikou.com/"
    },
    {
      name: "退職代行ニコイチ",
      company: "株式会社ニコイチ",
      tag: "#老舗",
      price: "27,000円",
      rating: 4,
      description: "創業18年以上、実績4万件超。成功率100%。LINE無料相談可。",
      features: ["全額返金保証", "LINE相談", "高実績"],
      url: "https://www.g-j.jp/lp04/"
    },
    {
      name: "退職代行OITOMA",
      company: "株式会社5core",
      tag: "#労組提携",
      price: "24,000円",
      rating: 4,
      description: "労組系で安心。24時間365日、即日対応OK。交渉・有給取得サポート込み。",
      features: ["即日対応", "有給サポート", "追加料金なし"],
      url: "https://o-itoma.jp/"
    }
  ];

  return (
    <Card className="mx-auto max-w-3xl overflow-hidden bg-white text-sm">
      {/* ヘッダーセクション */}
      <div className="bg-gradient-to-b from-blue-50 to-white p-4 text-center">
        <div className="mb-3 bg-red-600 text-white py-1.5 px-3 inline-flex items-center rounded-none border-l-4 border-red-800">
          <AlertTriangle className="w-4 h-4 mr-1.5" />
          <span className="text-sm font-bold">退職を検討している人は必見！</span>
        </div>
        <h2 className="text-lg font-bold">
          <span className="text-red-600">実績と評判で選んだ</span>
          <br />
          おすすめ退職代行サービスTOP5
        </h2>
        <p className="mt-2 text-xs text-gray-600">
          多数のサービスから、実績・料金・サポート体制を徹底比較（2025年3月最新版）
        </p>
      </div>

      {/* テーブルビュー */}
      <div className="overflow-x-auto p-2">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left font-medium bg-blue-800 text-white">サービス</th>
              <th className="p-2 text-left font-medium bg-blue-800 text-white">料金</th>
              <th className="p-2 text-left font-medium bg-blue-800 text-white">特徴</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.name} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                <td className="p-2">
                  <div className="font-bold text-blue-600">{service.name}</div>
                  <div className="text-[10px] text-gray-500">{service.company}</div>
                  <Badge variant="secondary" className="mt-1 bg-blue-50 text-[10px] text-blue-600">
                    {service.tag}
                  </Badge>
                  <div className="mt-1 flex items-center gap-1">
                    <RatingStars rating={service.rating} />
                    <span className="text-xs text-gray-500">{service.rating}</span>
                  </div>
                </td>
                <td className="p-2">
                  <div className="whitespace-pre-line font-medium text-red-600 mb-2">{service.price}</div>
                  {service.note && <div className="text-[10px] text-red-500 mb-2">{service.note}</div>}
                  <a 
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center font-medium rounded-none transition-colors bg-blue-600 hover:bg-blue-700 border border-transparent text-xs px-2.5 py-1.5 w-full"
                    style={{ color: '#ffffff !important' }}
                  >
                    <span style={{ color: '#ffffff' }}>公式サイト</span>
                    <ExternalLink className="ml-1.5" style={{ color: '#ffffff' }} size={12} />
                  </a>
                </td>
                <td className="p-2">
                  <p className="text-gray-600">{service.description}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {service.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="bg-green-50 text-[10px] text-green-600">
                        <CheckCircle className="mr-1 h-2 w-2" />
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
} 