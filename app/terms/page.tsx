'use client'

import { motion } from 'framer-motion';

export default function Terms() {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-20"
        >
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
                    退職あんしん代行 利用規約
                </h1>

                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            第1条（適用範囲と契約の成立）
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>1. 本規約は、株式会社NANDS（以下「当社」）が提供する退職代行サービス「退職あんしん代行」（以下「本サービス」）の利用に関する条件を定めるものです。</p>
                            <p>2. 利用者が本サービスの利用を申し込み、当社がこれを承諾した時点で、本規約に基づく契約（以下「本契約」）が成立します。</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            第2条（サービス内容）
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>1. 当社は、利用者に対し、以下のサービスを提供します：</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>退職意思の表明および退職手続きの代行</li>
                                <li>給付金申請のサポート</li>
                                <li>退職後のキャリア相談</li>
                                <li>AIスキル習得支援プログラムの提供</li>
                            </ul>
                            <p>2. 本サービスは、利用者の意思に基づき、適法かつ適切な方法で提供されます。</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            第3条（料金と支払い）
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>1. 利用者は、申込時に当社ウェブサイトに記載された方法で利用料金を支払うものとします。</p>
                            <p>2. 支払方法は、クレジットカード決済、銀行振込、またはスマートフォン決済に対応しています。</p>
                            <p>3. 銀行振込の場合の手数料は利用者負担となります。</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            第4条（返金保証）
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>1. 当社の責めに帰すべき事由により退職が実現できなかった場合、利用料金を全額返金いたします。</p>
                            <p>2. 返金手続きは、サービス提供から30日以内に行うものとします。</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            第5条（守秘義務）
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>1. 当社は、本サービスの提供にあたり知り得た利用者の個人情報を厳重に管理し、以下の場合を除き第三者に開示しません：</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>利用者の同意がある場合</li>
                                <li>法令に基づく場合</li>
                                <li>人の生命、身体または財産の保護のために必要がある場合</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            第6条（禁止事項）
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>以下の行為を禁止し、違反した場合は当社はサービスの提供を中止または契約を解除できます：</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>虚偽情報の提供</li>
                                <li>当社への暴力的な要求行為</li>
                                <li>違法または不当な目的での利用</li>
                                <li>当社の信用を毀損する行為</li>
                                <li>その他、当社が不適切と判断する行為</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            第7条（サービスの中断・停止）
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>当社は、以下の場合にサービスの提供を中断または停止することがあります：</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>システムの保守点検を行う場合</li>
                                <li>天災等の不可抗力により提供が困難となった場合</li>
                                <li>その他、当社が必要と判断した場合</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            第8条（免責事項）
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>1. 当社は、以下の事項について一切の責任を負いません：</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>利用者の故意または過失により生じた損害</li>
                                <li>利用者の退職後の就業状況</li>
                                <li>第三者との間で生じたトラブル</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            第9条（知的財産権）
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>本サービスに関する一切の知的財産権は当社に帰属し、利用者は無断で複製、転載、改変等を行うことはできません。</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            第10条（反社会的勢力の排除）
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>利用者は、反社会的勢力でないことを表明し、将来にわたって反社会的勢力との関係を持たないことを確約するものとします。</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            第11条（規約の変更）
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>当社は、必要と判断した場合には、利用者に通知することなく本規約を変更することができるものとします。</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            第12条（分離可能性）
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>本規約のいずれかの条項が無効とされた場合でも、他の条項の有効性には影響を与えないものとします。</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            第13条（準拠法・管轄裁判所）
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>1. 本規約の解釈にあたっては、日本法を準拠法とします。</p>
                            <p>2. 本サービスに関して紛争が生じた場合には、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</p>
                        </div>
                    </section>

                    <div className="mt-12 pt-8 border-t border-gray-200 text-right text-gray-600">
                        <p>制定日：2024年2月1日</p>
                        <p className="mt-4">
                            株式会社NANDS<br />
                            代表取締役：原田　賢治
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
} 