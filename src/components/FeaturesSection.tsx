"use client";

/****************************************************************************
 * FeaturesSection.tsx: 
 *   「どうして2,980円でここまでできるの？」「怪しい業者との違いは？」
 *   といった不安を解消し、圧倒的な安心感を与えるコンバージョンセクション。
 * 
 *  - ヒーローやトラブルセクション以上に極めたデザイン/アニメ
 *  - CASE3 ~ CASE6の内容を要約/当社向けに変換し、文章で説明
 *  - 2,980円でも十分に対応可であることを丁寧に解説
 ****************************************************************************/

import React from "react";
import { motion } from "framer-motion";

// アイコン (Lucideなど)
import {
  ShieldCheck,
  Bot,
  Scale,
  Building2,
  UserCheck,
  CheckCircle,
  AlertTriangle,
  GraduationCap,
} from "lucide-react";

/******************************************************************************
 * 1) 退職対応データ
 *    CASE3~CASE6で言及される論点を当社向けに再構成
 ****************************************************************************/

// 2,980円を実現する背景 (AI, 広告費ゼロ, etc)
const whyCheapData = [
  {
    icon: <Bot className="w-8 h-8 text-orange-500" />,
    title: "AI＆広告費ゼロでコスト削減",
    desc: "最新AIで事務・オペレーションを効率化し、広告に一切お金をかけないから固定費を抑えられます。だから2,980円でもしっかり対応可能。",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-orange-500" />,
    title: "弁護士・社労士監修で安心",
    desc: "法的な不備がないよう監修済み。トラブル発生時にも安心の連携体制。余計なリスク回避でコスト増を防ぎます。",
  },
];

// 「こんな不安にも対応できる」リスト
// (プライバシー, 給与, 職場, キャリア)
const troubleData = [
  {
    title: "プライバシー保護",
    items: [
      "退職代行に依頼したのがバレたくない",
      "親や同僚に迷惑をかけたくない",
      "退職後の会社とのやりとりが不安",
    ],
    solution:
      "完全秘密厳守。情報漏洩は一切なし。会社への連絡もすべて当社が代行します。",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    title: "給与トラブル",
    items: [
      "残業代がまったく支払われていない",
      "約束された給与より大幅に少ない",
      "昇給の見込みがまったくない",
    ],
    solution:
      "未払い残業代請求も法サポート付きで対応。正当な権利を取り戻しましょう。",
    icon: <Scale className="w-6 h-6" />,
  },
  {
    title: "職場環境の問題",
    items: [
      "上司からパワハラで精神的に限界",
      "退職を言い出せない雰囲気がある",
      "毎日の残業で体調を崩している",
    ],
    solution:
      "即日対応で健康を最優先。1日でも早くつらい環境から抜け出し、新しい一歩を踏み出せます。",
    icon: <Building2 className="w-6 h-6" />,
  },
  {
    title: "キャリアの悩み",
    items: [
      "もっと高い給与で働きたい",
      "退職を申し出たら脅された",
      "転職で年収を上げたい",
    ],
    solution:
      "退職後のキャリアプランニングまでサポート。転職・副業など多方面でアドバイスします。",
    icon: <UserCheck className="w-6 h-6" />,
  },
];

// CASE3 ~ CASE6 をまとめた解説データ
// (怪しい業者との違い、交渉不要の理由、弁護士や労働組合との比較など)
const additionalExplanations = [
  {
    title: "怪しい業者との違い",
    content: `多くの退職代行業者が乱立する中、代表者が不明・実態不透明な業者もあります。当社は株式会社で運営されており法監修体制が整っており、安心してご利用いただけます。退職代行は大きな決断だからこそ、会社の正体がはっきりしている当社をお選びください。`,
    icon: <AlertTriangle className="w-8 h-8 text-orange-500" />,
  },
  {
    title: "退職＝通知だけでOK",
    content: `退職するのに「交渉」は不要です。労働者には自由に退職できる権利が法で定められています。交渉が必要になるケースは極めて稀。あえて交渉しようとすると話がこじれる可能性も。だから2,980円で問題なく退職できるのです。`,
    icon: <CheckCircle className="w-8 h-8 text-orange-500" />,
  },
  {
    title: "弁護士に頼んだ方がいい？",
    content: `退職だけなら交渉の必要はありません。弁護士に依頼すると5万円以上かかり、時間もかかりがち。特別な事情がない限り、2,980円の当社サービスで十分対応できます。`,
    icon: <GraduationCap className="w-8 h-8 text-orange-500" />,
  },
  {
    title: "労働組合の退職代行？",
    content: `形だけの労働組合を作り、交渉可能と主張する業者もありますが、実際は違法の可能性大。交渉しない退職代行なら弁護士でもない業者で問題なく退職できます。`,
    icon: <Building2 className="w-8 h-8 text-orange-500" />,
  },
];

/******************************************************************************
 * メインのコンポーネント
 ******************************************************************************/
export default function FeaturesSection() {
  return (
    <section 
      className="relative w-full min-h-screen bg-gradient-to-br from-white via-orange-50 to-amber-50"
      id="features"
    >
      <div className="relative container mx-auto py-16 md:py-24 px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
            <span className="md:hidden">
              2,980円でも<br />
              ここまで安心。
            </span>
            <span className="hidden md:inline">
              2,980円でも、ここまで安心。
            </span>
          </h2>
          <p className="text-gray-700 text-xl mt-4 leading-relaxed">
            退職は大きな決断だからこそ<br />
            <span className="font-semibold">「本当にこんな安さで大丈夫？」</span>
            そう思うのは当然です。<br />
            でも、しっかり理由があるから安くても十分対応できるんです。
          </p>
        </motion.div>

        <WhySoCheap />
        <TroubleSolutions />
        <AdditionalExplanations />
        <FooterCTA />
      </div>
    </section>
  );
}

function WhySoCheap() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-14"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {whyCheapData.map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-lg p-6 shadow-md border border-orange-100 relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-orange-100 to-amber-50 opacity-20 -z-10"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.3 }}
            transition={{ duration: 1 }}
          />
          <div className="flex items-center space-x-3 mb-4">
            {item.icon}
            <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            {item.desc}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

function TroubleSolutions() {
  return (
    <div className="max-w-5xl mx-auto mb-16">
      <motion.h3
        className="text-2xl md:text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <span className="md:hidden">
          こんな不安にも<br />
          しっかり対応できます
        </span>
        <span className="hidden md:inline">
          こんな不安にも、しっかり対応できます
        </span>
      </motion.h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {troubleData.map((trouble, i) => (
          <motion.div
            key={trouble.title}
            className="bg-white rounded-xl p-6 shadow border border-orange-100 relative overflow-hidden"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center space-x-2 mb-3">
              <div className="text-orange-500">{trouble.icon}</div>
              <h4 className="text-lg font-bold text-gray-800">
                {trouble.title}
              </h4>
            </div>
            <ul className="space-y-2 mb-4">
              {trouble.items.map((item, j) => (
                <li key={j} className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-orange-400" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-3 rounded-lg border border-orange-100">
              <span className="text-gray-700 font-semibold">解決策：</span>
              <span className="text-gray-700 ml-1">{trouble.solution}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AdditionalExplanations() {
  return (
    <div className="max-w-4xl mx-auto mb-16">
      <motion.h3
        className="text-2xl md:text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        それでも不安ですか？
      </motion.h3>
      <p className="text-center text-gray-700 mb-8">
        退職は大きな決断。<br />
        「本当に2,980円でいいの？」「怪しくない？」<br />
        そんな不安にもしっかりお答えします。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {additionalExplanations.map((item, i) => (
          <motion.div
            key={i}
            className="relative bg-white p-6 rounded-xl shadow-lg border border-orange-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-amber-50 opacity-20 pointer-events-none -z-10" />
            <div className="flex items-center space-x-3 mb-4 text-orange-500">
              {item.icon}
              <h4 className="text-lg font-bold text-gray-800">{item.title}</h4>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {item.content}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function FooterCTA() {
  return (
    <motion.div
      className="text-center max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* 価格カード */}
      <motion.div
        className="inline-block bg-white border border-orange-200 rounded-2xl px-6 py-4 shadow-lg mb-6"
        animate={{
          boxShadow: [
            "0 0 20px rgba(255,165,0,0.2)",
            "0 0 40px rgba(255,165,0,0.4)",
            "0 0 20px rgba(255,165,0,0.2)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="text-xl font-extrabold text-orange-600 mb-2">業界最安値</div>
        <div className="text-4xl font-extrabold text-orange-500">
          2,980円<span className="text-base ml-1">(税込)</span>
        </div>
        <div className="text-sm text-gray-600 mt-2">
          AI&広告費ゼロ、法監修でこれだけできる
        </div>
      </motion.div>

      <motion.button
        onClick={() => {
          window.location.href = "https://lin.ee/h1kk42r";
        }}
        className="inline-block bg-gradient-to-r from-orange-500 to-amber-400 text-white font-bold py-3 px-8 rounded-full shadow hover:shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        今すぐ無料相談する
      </motion.button>
    </motion.div>
  );
}
