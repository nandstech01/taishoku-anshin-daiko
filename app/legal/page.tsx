'use client'

import React from 'react';
import { motion } from 'framer-motion';

const LegalPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-20"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 !text-black">
          特定商取引法に基づく表記
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-12">
          {/* 事業者情報 */}
          <section className="space-y-6">
            <dl className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <dt className="font-bold !text-black">事業者名</dt>
                <dd className="md:col-span-3 !text-black">株式会社エヌアンドエス</dd>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <dt className="font-bold !text-black">代表者名</dt>
                <dd className="md:col-span-3 !text-black">原田 賢治</dd>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <dt className="font-bold !text-black">所在地</dt>
                <dd className="md:col-span-3 !text-black">
                  <p className="font-semibold mb-2">[本社]</p>
                  〒520-0025<br />
                  滋賀県大津市皇子ヶ丘２丁目１０番２５−３００４号
                  <p className="font-semibold mt-4 mb-2">[東京支社]</p>
                  〒150-0043<br />
                  東京都渋谷区道玄坂１丁目１０番８号 渋谷道玄坂東急ビル2F-C
                </dd>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <dt className="font-bold !text-black">電話番号</dt>
                <dd className="md:col-span-3 !text-black">0120-558-551</dd>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <dt className="font-bold !text-black">電話受付時間</dt>
                <dd className="md:col-span-3 !text-black">10:00 ～ 21:00</dd>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <dt className="font-bold !text-black">メールアドレス</dt>
                <dd className="md:col-span-3 !text-black">contact@taishoku-anshin-daiko.com</dd>
              </div>
            </dl>
          </section>

          {/* 販売価格・支払方法 */}
          <section className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-6 !text-black">販売価格</h2>
              <p className="!text-black">詳細ページをご参照ください。</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-6 !text-black">お支払い方法</h2>
              <ul className="list-disc list-inside space-y-2 !text-black">
                <li>銀行振込</li>
                <li>クレジットカード払い</li>
                <li>スマートフォン決済</li>
              </ul>
              <p className="mt-4 !text-black">※いずれのお支払い方法も、お支払いは前払いとなります。</p>
            </div>
          </section>

          {/* サービス提供について */}
          <section className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-6 !text-black">サービスの提供時期</h2>
              <p className="!text-black">
                ご入金確認後、24時間以内にサービスを開始いたします。
                退職代行サービスの性質上、即日対応も可能です。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-6 !text-black">キャンセル・返金について</h2>
              <div className="space-y-4 !text-black">
                <p>
                  サービス提供開始前のキャンセルについては、全額返金いたします。
                  サービス提供開始後のキャンセルについては、原則として返金はできません。
                  ただし、当社の責めに帰すべき事由により退職が実現できなかった場合は、全額返金いたします。
                </p>
              </div>
            </div>
          </section>

          {/* 動作環境について */}
          <section>
            <h2 className="text-xl font-bold mb-6 !text-black">動作環境について</h2>
            <p className="!text-black">
              オンラインでのご相談の場合、以下の環境が必要となります：
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4 !text-black">
              <li>安定したインターネット接続環境</li>
              <li>メールの送受信が可能な端末</li>
              <li>電話での連絡が可能な環境</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 text-right">
          <p className="!text-black">最終更新日：2024年2月1日</p>
          <p className="mt-4 !text-black">
            株式会社エヌアンドエス<br />
            代表取締役：原田 賢治
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LegalPage; 