'use client'

import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-20"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          プライバシーポリシー
        </h1>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">個人情報保護方針</h2>
            <p className="text-gray-700">
              株式会社エヌアンドエス（以下「当社」といいます。）は、事業を実施する上で、個人情報の重要性を認識し、個人情報を適切に取り扱うことが社会的責務であると考えます。そこで、当社は、個人情報の適切な取り扱いについて組織として取り組むために個人情報保護方針を以下のとおり定め、従業員に周知し、個人情報の保護に努めます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. 法令の遵守について</h2>
            <p className="text-gray-700">
              当社は、個人情報の適切な取り扱いのため、個人情報保護法及び関連法令を遵守します。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. 個人情報の利用目的</h2>
            <p className="text-gray-700 mb-4">当社は、以下の目的で個人情報を利用いたします：</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>退職代行サービスの提供</li>
              <li>給付金申請支援サービスの提供</li>
              <li>キャリアコンサルティングサービスの提供</li>
              <li>お客様からのお問い合わせ対応</li>
              <li>サービス品質向上のための分析</li>
              <li>新サービスの開発</li>
              <li>キャンペーン、セミナー等のご案内</li>
              <li>アンケート調査の実施</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. 個人情報の安全管理</h2>
            <p className="text-gray-700">
              当社は、個人情報の紛失、破壊、改ざん、漏洩などを防止するため、適切な安全管理措置を講じます。また、個人情報を取り扱う従業員及び委託先に対して、適切な監督を行います。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. 個人情報の第三者提供</h2>
            <p className="text-gray-700 mb-4">
              当社は、法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供いたしません。ただし、以下の場合は除きます：
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>法令に基づく場合</li>
              <li>人の生命、身体または財産の保護のために必要がある場合</li>
              <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合</li>
              <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. 個人情報の開示・訂正・削除</h2>
            <p className="text-gray-700">
              当社は、ご本人から個人情報の開示、訂正、追加、削除、利用停止、消去等を求められた場合は、ご本人であることを確認の上、適切に対応いたします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Cookieの使用について</h2>
            <p className="text-gray-700">
              当社のウェブサイトでは、サービスの向上及び利用状況の分析のためにCookieを使用しています。ブラウザの設定により、Cookieの使用を制限することが可能です。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">7. お問い合わせ窓口</h2>
            <div className="text-gray-700 space-y-2">
              <p>個人情報の取り扱いに関するお問い合わせは、下記までご連絡ください：</p>
              <div className="mt-4">
                株式会社エヌアンドエス 個人情報保護管理者<br />
                <p className="font-semibold mt-4 mb-2">[本社]</p>
                〒520-0025<br />
                滋賀県大津市皇子ヶ丘２丁目１０番２５−３００４号<br />
                <p className="font-semibold mt-4 mb-2">[退職あんしん代行事業本部]</p>
                〒150-0043<br />
                東京都渋谷区道玄坂１丁目１０番８号 渋谷道玄坂東急ビル2F-C<br />
                <p className="mt-4">
                メール：contact@nands.tech<br />
                電話：0120-558-551<br />
                受付時間：10:00～21:00
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">8. プライバシーポリシーの改定</h2>
            <p className="text-gray-700">
              当社は、必要に応じて本プライバシーポリシーを改定することがあります。重要な変更がある場合は、当ウェブサイト上でお知らせいたします。
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200 text-right text-gray-600">
            <p>制定日：2024年2月1日</p>
            <p className="mt-4">
              株式会社エヌアンドエス<br />
              代表取締役：原田 賢治
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPage; 