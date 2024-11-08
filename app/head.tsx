// app/head.tsx

export default function HeadMetadata() {
  return (
    <>
      <title>NANDS 退職あんしん代行 | パワハラ・メンタル相談対応</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="退職代行NANDS。パワハラ・メンタルヘルス・キャリアアップ相談に対応。AI活用で最短即日対応可能。退職後の副業支援やキャリアプランニングもサポート。24時間無料相談受付中。" />
      
      {/* OGP設定 */}
      <meta property="og:title" content="NANDS 退職あんしん代行 | 24時間無料相談受付中" />
      <meta property="og:description" content="退職代行NANDS。パワハラ・メンタルヘルス・キャリアアップ相談に対応。AI活用で最短即日対応可能。退職後の副業支援やキャリアプランニングもサポート。" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://nands.jp/" />
      <meta property="og:image" content="https://nands.jp/ogp.jpg" />
      
      {/* SEOキーワード最適化 */}
      <meta name="keywords" content="退職代行,パワハラ,メンタルヘルス,キャリアアップ,副業支援,AI活用,キャリアチェンジ,転職相談,労働問題,ハラスメント,メンタルケア,ワークライフバランス,即日対応,24時間対応,無料相談" />
      
      {/* その他のメタタグ */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="NANDS" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* 構造化データ */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "NANDS 退職あんしん代行",
            "description": "退職代行NANDSは、パワハラ・メンタルヘルス・キャリアアップ相談に対応。AI活用で最短即日対応可能。退職後の副業支援やキャリアプランニングもサポート。",
            "priceRange": "¥2,980～",
            "openingHours": "Mo-Su 00:00-24:00",
            "telephone": "0120-XXX-XXX",
            "areaServed": "JP",
            "serviceType": [
              "退職代行サービス",
              "キャリアカウンセリング",
              "副業支援",
              "メンタルヘルスケア"
            ]
          }
        `}
      </script>
      
      {/* ファビコンとアプリアイコン */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </>
  )
}
