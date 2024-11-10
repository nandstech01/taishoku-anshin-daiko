'use client'

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ConsultationForm() {
    const [formData, setFormData] = useState({
        employment: '',
        age: '',
        name: '',
        furigana: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // フォーム送信処理
        console.log(formData);
    };

    return (
        <motion.section
            id="consultation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative py-20 md:py-32 bg-gradient-to-b from-orange-50 to-white overflow-hidden"
        >
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white text-lg font-bold px-6 py-2 rounded-full mb-6 shadow-lg"
                    >
                        無料相談フォーム
                    </motion.div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        まずはお気軽にご相談ください
                    </h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        24時間365日受付中！<br/>専門スタッフが丁寧にご対応いたします
                    </p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    onSubmit={handleSubmit}
                    className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8"
                >
                    <div className="space-y-6">
                        {/* 雇用形態 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                雇用形態
                                <span className="text-red-500 ml-1">必須</span>
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                {['正社員', '契約社員', 'パート・アルバイト', 'その他'].map((type) => (
                                    <label key={type} className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                                        <input
                                            type="radio"
                                            name="employment"
                                            value={type}
                                            onChange={(e) => setFormData({ ...formData, employment: e.target.value })}
                                            className="text-orange-500 focus:ring-orange-500"
                                            required
                                        />
                                        <span className="text-gray-700">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* 年齢 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                年齢
                                <span className="text-red-500 ml-1">必須</span>
                            </label>
                            <input
                                type="number"
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                required
                            />
                        </div>

                        {/* お名前 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                お名前
                                <span className="text-red-500 ml-1">必須</span>
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                required
                            />
                        </div>

                        {/* フリガナ */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                フリガナ
                                <span className="text-red-500 ml-1">必須</span>
                            </label>
                            <input
                                type="text"
                                value={formData.furigana}
                                onChange={(e) => setFormData({ ...formData, furigana: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                required
                            />
                        </div>

                        {/* メールアドレス */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                メールアドレス
                                <span className="text-red-500 ml-1">必須</span>
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                required
                            />
                        </div>

                        {/* 電話番号 - 必須に変更 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                電話番号
                                <span className="text-red-500 ml-1">必須</span>
                            </label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                required  // 必須属性を追加
                                pattern="[0-9]*"  // 数字のみ許可
                                placeholder="例：09012345678"
                            />
                        </div>

                        {/* お問い合わせ内容 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                お問い合わせ内容
                            </label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={4}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>

                        {/* 送信ボタン */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            無料相談する
                        </motion.button>
                    </div>
                </motion.form>
            </div>
        </motion.section>
    );
} 