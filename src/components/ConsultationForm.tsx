'use client'

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ConsultationForm() {
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // フォームデータの取得と検証
        const formElement = e.currentTarget;
        const nameInput = formElement.querySelector<HTMLInputElement>('[name="name"]');
        const phoneInput = formElement.querySelector<HTMLInputElement>('[name="phone"]');
        const emailInput = formElement.querySelector<HTMLInputElement>('[name="email"]');
        const employmentTypeInput = formElement.querySelector<HTMLInputElement>('input[name="employmentType"]:checked');
        const messageInput = formElement.querySelector<HTMLTextAreaElement>('[name="message"]');

        // 値の取得
        const name = nameInput?.value;
        const phone = phoneInput?.value;
        const email = emailInput?.value;
        const employmentType = employmentTypeInput?.value;
        const message = messageInput?.value;

        console.log('Form values:', { name, phone, email, employmentType, message });

        // 必須項目の検証
        if (!name || !phone || !email || !message) {
            console.log('Missing required fields');
            alert('以下の必須項目を入力してください：\n・お名前\n・電話番号\n・メールアドレス\n・ご相談内容');
            return;
        }

        const formData = {
            name,
            phone,
            email,
            employmentType: employmentType || '',
            message
        };

        try {
            console.log('Sending data:', formData);

            const response = await fetch(
                'https://script.google.com/macros/s/AKfycbxC3OSv3HQLwcwE4yArLVXDTDmum4yEK62uASJxkXmujAMOxZpoLu64uk97VXnRNUts/exec',
                {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                }
            );

            console.log('Response:', response);

            // no-corsモードでは response.ok が確認できないため、
            // エラーが発生しなければ成功とみなす
            router.push('/complete');
            
        } catch (error) {
            console.error('Error details:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            alert(`送信に失敗しました。時間をおいて再度お試しください。エラー詳細: ${errorMessage}`);
        }
    };

    return (
        <section id="consultation-form" className="py-24 bg-gradient-to-b from-orange-50 to-white">
            <div className="max-w-4xl mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900"
                >
                    無料相談フォーム
                </motion.h2>

                <motion.form
                    onSubmit={handleSubmit}
                    className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12"
                >
                    <div className="space-y-8">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                お名前 <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                placeholder="山田 太郎"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                電話番号 <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                placeholder="090-1234-5678"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                メールアドレス <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                placeholder="example@email.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                現在の雇用形態
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {['正社員', '契約社員', 'パート・アルバイト', '派遣社員', 'その他'].map((type) => (
                                    <div key={type} className="flex items-center space-x-3">
                                        <input
                                            type="radio"
                                            name="employmentType"
                                            value={type}
                                            id={`employment-${type}`}
                                            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                                        />
                                        <label htmlFor={`employment-${type}`} className="text-sm text-gray-700">
                                            {type}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                ご相談内容 <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="message"
                                id="message"
                                rows={5}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                placeholder="現在の状況やご相談内容をご記入ください"
                            ></textarea>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full bg-orange-500 text-white py-4 px-6 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                無料相談する
                            </button>
                            <p className="mt-3 text-sm text-gray-500 text-center">
                                ※ 送信後、担当者より翌日以内にご連絡いたします
                            </p>
                        </div>
                    </div>
                </motion.form>
            </div>
        </section>
    );
} 