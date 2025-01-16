export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "NANDS 退職あんしん代行",
          "description": "退職代行NANDSは、パワハラ・メンタルヘルス・キャリアアップ相談に対応。AI活用で最短即日対応可能。退職後の副業支援やキャリアプランニングもサポート。",
          "priceRange": "¥2,980～",
          "openingHours": "Mo-Su 00:00-24:00",
          "telephone": "0120-558-551",
          "areaServed": "JP",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "JP",
            "addressRegion": "Tokyo"
          },
          "serviceType": [
            "退職代行サービス",
            "キャリアカウンセリング",
            "副業支援",
            "メンタルヘルスケア"
          ]
        })
      }}
    />
  )
} 