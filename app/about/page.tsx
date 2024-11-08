'use client'

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/common/Footer';

const AboutPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="pt-16">
      {/* メインビジュアル */}
      <div className="relative h-[60vh] bg-gradient-to-r from-blue-900 to-black">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <Image
          src="/images/company.jpg"
          alt="NANDS office"
          fill
          className="object-cover mix-blend-overlay"
          priority
        />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 h-full flex items-center justify-center text-white"
        >
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">NANDS</h1>
            <p className="text-xl md:text-2xl tracking-wider">NEXT SOLUTIONS</p>
          </div>
        </motion.div>
      </div>

      {/* ビジネスコンセプト */}
      <motion.section 
        {...fadeIn}
        className="py-24 bg-white"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Business Concept</h2>
          <div className="text-center">
            <p className="text-2xl text-blue-700 font-bold mb-8">
              "全ての働く人に、次のステージへ"
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              私たちは、急速に変化する時代において、<br />
              一人ひとりの可能性を最大限に引き出し、<br />
              確かな一歩を踏み出すためのソリューションを提供します。
            </p>
          </div>
        </div>
      </motion.section>

      {/* ミッション & ビジョン（新規追加） */}
      <motion.section {...fadeIn} className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* ミッション */}
            <div className="bg-white p-10 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-8 text-center">Mission</h2>
              <div className="space-y-6">
                <p className="text-xl font-bold text-blue-700 text-center mb-8">
                  "働く人々の可能性を解放し、<br />
                  キャリアの新たな地平を切り拓く"
                </p>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    私たちは、テクノロジーの力と人々の潜在能力を結びつけ、
                    一人ひとりが望むキャリアを実現できる社会を創造します。
                  </p>
                  <ul className="space-y-3 text-gray-700 list-disc pl-5">
                    <li>最新技術を活用した実践的なスキル開発支援</li>
                    <li>個々のニーズに寄り添った丁寧なキャリア支援</li>
                    <li>安心・確実な転職・退職プロセスのサポート</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ビジョン */}
            <div className="bg-white p-10 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-8 text-center">Vision</h2>
              <div className="space-y-6">
                <p className="text-xl font-bold text-blue-700 text-center mb-8">
                  "2030年、日本の働き方を革新する<br />
                  リーディングカンパニーへ"
                </p>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    変化の激しい時代において、私たちは以下の目標を掲げ、
                    日本の働き方改革を推進します：
                  </p>
                  <ul className="space-y-3 text-gray-700 list-disc pl-5">
                    <li>
                      <span className="font-semibold">キャリア革新</span><br />
                      10万人の働く人々のキャリアトランスフォーメーションを実現
                    </li>
                    <li>
                      <span className="font-semibold">企業変革</span><br />
                      1000社以上の企業のデジタルトランスフォーメーションを支援
                    </li>
                    <li>
                      <span className="font-semibold">社会貢献</span><br />
                      日本のAIリテラシー向上を通じた、グローバル競争力の強化
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Enterprise AI Solutions（新規追加） */}
      <motion.section {...fadeIn} className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Enterprise AI Solutions</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* AI導入コンサルティング */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
              <div className="text-blue-700 text-4xl font-bold mb-4">01</div>
              <h3 className="text-xl font-bold mb-4">AI導入コンサルティング</h3>
              <p className="text-gray-600 mb-4">
                企業の課題やニーズに合わせた最適なAIソリューションを提案。
                導入から運用まで一貫してサポートします。
              </p>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>AI活用戦略の策定</li>
                <li>業務プロセスの分析・改善</li>
                <li>ROI評価とコスト最適化</li>
              </ul>
            </div>

            {/* 企業向けAI研修 */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
              <div className="text-blue-700 text-4xl font-bold mb-4">02</div>
              <h3 className="text-xl font-bold mb-4">企業向けAI研修プログラム</h3>
              <p className="text-gray-600 mb-4">
                経営層から実務者まで、役職や目的に応じた
                カスタマイズ可能な研修プログラムを提供します。
              </p>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>経営者向けAI戦略研修</li>
                <li>実務者向けAIツール活用研修</li>
                <li>開発者向け技術研修</li>
              </ul>
            </div>

            {/* AI組織支援 */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
              <div className="text-blue-700 text-4xl font-bold mb-4">03</div>
              <h3 className="text-xl font-bold mb-4">AI組織構築支援</h3>
              <p className="text-gray-600 mb-4">
                社内のAI活用を推進する組織づくりから、
                必要な人材の育成・採用までトータルでサポート。
              </p>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>AI人材の採用支援</li>
                <li>組織体制の設計</li>
                <li>社AI活用推進体制の構築</li>
              </ul>
            </div>
          </div>

          {/* 導入実績 */}
          <div className="mt-16 bg-gray-50 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-8 text-center">導入実績・成果</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700 mb-2">200+</div>
                <p className="text-gray-600">導入企業数</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700 mb-2">98%</div>
                <p className="text-gray-600">顧客満足度</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700 mb-2">30%+</div>
                <p className="text-gray-600">平均業務効率化率</p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button className="bg-blue-600 text-white hover:bg-blue-500 font-bold py-3 px-8 rounded-full shadow-md transition-colors">
                導入事例を見る
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 事業内容 */}
      <motion.section 
        {...fadeIn}
        className="py-24 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Business</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-blue-700">キャリア変革支援事業</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold mb-2">生成AI活用リスキリング研修</h4>
                  <p className="text-gray-600">最新のAI技術を活用した実践的な教育プログラムを提供し、次世代のデジタル人材を育成します。</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">キャリアコンサルティング</h4>
                  <p className="text-gray-600">一人ひとりの経験とキルを活かした、オーダーメイドのキャリア支援を提供します。</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-blue-700">キャリアサポート事業</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold mb-2">
                    <Link href="#" className="hover:text-blue-600">退職支援事業「退職あんしん代行」</Link>
                  </h4>
                  <p className="text-gray-600">専門アドバイザーによる安心・確実な退職プロセスのサポートを提供します。</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">
                    <Link href="#" className="hover:text-blue-600">給付金支援「退職あんしんサポートプロ」</Link>
                  </h4>
                  <p className="text-gray-600">各種給付金の申請手続きを専門家がサポートし、スムーズな手続きをお手伝いします。</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-blue-700">情報プラットフォーム事業</h3>
              <div>
                <h4 className="font-bold mb-2">
                  <Link href="#" className="hover:text-blue-600">メディア運営「転職エージェントセレクト」</Link>
                </h4>
                <p className="text-gray-600">
                  信頼できる転職エージェント情報を提供し、キャリア選択をサポートする情報プラットフォームを運営しています。
                  客観的な情報提供を通じて、より良いキャリア選択をサポートします。
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 会社概要 */}
      <motion.section 
        {...fadeIn}
        className="py-24 bg-white"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Company</h2>
          <div className="bg-white shadow-lg rounded-lg p-8">
            <dl className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <dt className="font-bold text-gray-700 md:col-span-1">会社名</dt>
                <dd className="md:col-span-3">株式会社NANDS</dd>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <dt className="font-bold text-gray-700 md:col-span-1">代表取締役</dt>
                <dd className="md:col-span-3">原田 賢治</dd>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <dt className="font-bold text-gray-700 md:col-span-1">設立</dt>
                <dd className="md:col-span-3">2008年4月</dd>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <dt className="font-bold text-gray-700 md:col-span-1">本社</dt>
                <dd className="md:col-span-3">
                  〒520-0025<br />
                  滋賀県大津市皇子ヶ丘２丁目１０番２５−３００４号
                </dd>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <dt className="font-bold text-gray-700 md:col-span-1">東京支社</dt>
                <dd className="md:col-span-3">
                  〒150-0043<br />
                  東京都渋谷区道玄坂１丁目１０番８号渋谷道玄坂東急ビル2F-C
                </dd>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <dt className="font-bold text-gray-700 md:col-span-1">事業内容</dt>
                <dd className="md:col-span-3">
                  <ul className="list-disc list-inside space-y-2">
                    <li>生成AI活用リスキリング研修事業</li>
                    <li>キャリアコンサルティング事業</li>
                    <li>人材紹介事業</li>
                    <li>退職支援事業</li>
                    <li>給付金支援事業</li>
                    <li>メディア運営事業</li>
                  </ul>
                </dd>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <dt className="font-bold text-gray-700 md:col-span-1">お問い合わせ</dt>
                <dd className="md:col-span-3">
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold">メール：</span>
                      <a href="mailto:contact@nands.tech" className="text-blue-600 hover:text-blue-500">
                        contact@nands.tech
                      </a>
                    </p>
                    <p>
                      <span className="font-semibold">電話：</span>
                      <a href="tel:0120558551" className="text-blue-600 hover:text-blue-500">
                        0120-558-551
                      </a>
                    </p>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </motion.section>

      {/* 代表メッセージ（新規追加） */}
      <motion.section {...fadeIn} className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Message</h2>
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/3">
                <Image
                  src="/images/ceo.jpg"
                  alt="代表取締役 原田賢治"
                  width={300}
                  height={400}
                  className="rounded-lg shadow-md"
                />
                <p className="text-center mt-4">
                  <span className="block text-sm text-gray-600">代表取締役</span>
                  <span className="block text-xl font-bold mt-1">原田 賢治</span>
                </p>
              </div>
              <div className="md:w-2/3 space-y-6 text-gray-700">
                <p className="text-lg font-bold text-blue-700">
                  "働くすべての人に、新たなステージを！"
                </p>
                <p>
                  2008年の設立以来、「人々の生活を豊かにするために」というビジョンのもと、
                  多くの挑戦を重ねてまいりました。
                </p>
                <p>
                  2020年以降、世界的な変革の波に対応し、これまで培ってきた経験と技術をもとに、
                  働く人々のキャリアや生活を支援する新たなソリューションの提供を決意しました。
                </p>
                <p>
                  特にAI技術においては、私自身が新たな挑戦として習得に取り組み、
                  「AIリスキリング研修」を新たにスタートさせることができました。
                  これからの時代に不可欠なスキルを支えるプログラムを提供することで、
                  次の世代の働く人々のキャリアを後押ししていきます。
                </p>
                <p>
                  これからも「すべての働く人々に次のチャンスを提供する」という信念のもと、
                  変化する時代のニーズに応え続けてまいります。
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 沿革を詳細化 */}
      <motion.section {...fadeIn} className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">History</h2>
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="space-y-8">
              <div className="flex gap-8">
                <div className="text-xl font-bold text-blue-700 w-32">2008年4月</div>
                <div>
                  <p className="font-bold mb-2">株式会社エヌアンドエス設立</p>
                  <p className="text-gray-600">「時代のニーズに応じた��リューションを提供する」というビジョンのもと、企業活動をスタート</p>
                </div>
              </div>

              <div className="flex gap-8">
                <div className="text-xl font-bold text-blue-700 w-32">2011年1月</div>
                <div>
                  <p className="font-bold mb-2">デジタルマーケティング事業進出</p>
                  <p className="text-gray-600">企業のオンラインプレゼンス強化サービスを開始</p>
                </div>
              </div>

              <div className="flex gap-8">
                <div className="text-xl font-bold text-blue-700 w-32">2014年6月</div>
                <div>
                  <p className="font-bold mb-2">人材育成事業本格開始</p>
                  <p className="text-gray-600">企業内人材教育・スキルアップ支援を展開</p>
                </div>
              </div>

              <div className="flex gap-8">
                <div className="text-xl font-bold text-blue-700 w-32">2018年11月</div>
                <div>
                  <p className="font-bold mb-2">転職サポート事業開始</p>
                  <p className="text-gray-600">キャリアカウンセリングと転職支援サービスを開始</p>
                </div>
              </div>

              <div className="flex gap-8">
                <div className="text-xl font-bold text-blue-700 w-32">2020年8月</div>
                <div>
                  <p className="font-bold mb-2">事業方針刷新</p>
                  <p className="text-gray-600">「働く人のキャリアと生活を支える総合サポート企業」として事業を再定義</p>
                </div>
              </div>

              <div className="flex gap-8">
                <div className="text-xl font-bold text-blue-700 w-32">2021年2月</div>
                <div>
                  <p className="font-bold mb-2">AIコンサルティング事業開始</p>
                  <p className="text-gray-600">AI技術導入支援と業務効率化コンサルティングを展開</p>
                </div>
              </div>

              <div className="flex gap-8">
                <div className="text-xl font-bold text-blue-700 w-32">2022年</div>
                <div>
                  <p className="font-bold mb-2">退職支援事業開始</p>
                  <p className="text-gray-600">「退職あんしん代行」サービスを開始し、キャリアチェンジを総合的にサポート</p>
                </div>
              </div>

              <div className="flex gap-8">
                <div className="text-xl font-bold text-blue-700 w-32">2023年</div>
                <div>
                  <p className="font-bold mb-2">AI事業本部設立</p>
                  <p className="text-gray-600">生成AI活用リスキリング研修事業を開始し、次世代のキャリア支援を本格展開</p>
                </div>
              </div>

              <div className="flex gap-8">
                <div className="text-xl font-bold text-blue-700 w-32">2024年</div>
                <div>
                  <p className="font-bold mb-2">メディア事業拡大</p>
                  <p className="text-gray-600">「転職エージェントセレクト」運営開始。キャリアアップの包括的サポートを強化</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* アクセスセクション */}
      <motion.section 
        {...fadeIn}
        className="py-24 bg-gray-50"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Access</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* 本社 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">本社</h3>
                <p className="text-gray-600">
                  〒520-0025<br />
                  滋賀県大津市皇子ヶ丘２丁目１０番２５−３００４号
                </p>
              </div>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!..."
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* 東京支社 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">東京支社</h3>
                <p className="text-gray-600">
                  〒150-0043<br />
                  東京都渋谷区道玄坂１丁目１０番８号<br />
                  渋谷道玄坂東急ビル2F-C
                </p>
                <div className="mt-4">
                  <p className="text-gray-600">
                    <span className="font-semibold">メール：</span>
                    <a href="mailto:contact@nands.tech" className="text-blue-600 hover:text-blue-500">
                      contact@nands.tech
                    </a>
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">電話：</span>
                    <a href="tel:0120558551" className="text-blue-600 hover:text-blue-500">
                      0120-558-551
                    </a>
                  </p>
                </div>
              </div>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!..."
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* フッターを追加 */}
      <Footer />
    </div>
  );
};

export default AboutPage;