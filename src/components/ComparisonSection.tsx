'use client'

import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

declare module 'react-slick' {
  export interface Settings {
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    swipe?: boolean;
    arrows?: boolean;
  }
}

const comparisonData = [
    {
        service: "24時間365日対応",
        company1: true,
        company2: true,
        company3: false,
        company4: false
    },
    {
        service: "全国対応",
        company1: true,
        company2: true,
        company3: true,
        company4: true
    },
    {
        service: "給付金申請サポート",
        company1: true,
        company2: false,
        company3: false,
        company4: false
    },
    {
        service: "弁護士監修対応",
        company1: true,
        company2: true,
        company3: true,
        company4: true
    },
    {
        service: "労働組合連携",
        company1: true,
        company2: true,
        company3: true,
        company4: false
    },
    {
        service: "退職後のキャリア相談",
        company1: true,
        company2: false,
        company3: false,
        company4: false
    }
];

export default function ComparisonSection() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true,
        arrows: false,
        dotsClass: "slick-dots custom-dots"
    };

    return (
        <section id="comparison" className="py-20 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">他社との比較</h2>
                <div className="custom-slider">
                    <Slider {...settings}>
                        {["当社", "他社の代行", "労働組合運営", "弁護士運営"].map((company, index) => (
                            <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="p-4 text-left bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold">
                                                退職代行サービス
                                            </th>
                                            <th className="p-4 text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold">
                                                {company}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comparisonData.map((row, rowIndex) => (
                                            <tr key={rowIndex} className="border-b border-gray-100">
                                                <td className="p-4 text-gray-700">{row.service}</td>
                                                <td className="p-4 text-center">
                                                    {row[`company${index + 1}` as keyof typeof row] ? (
                                                        <Check className="w-6 h-6 text-orange-500 mx-auto" />
                                                    ) : (
                                                        <span className="block w-6 h-6 bg-gray-200 rounded-full mx-auto" />
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                        <tr className="bg-orange-50">
                                            <td className="p-4 font-bold text-gray-900">依頼費用の相場</td>
                                            <td className="p-4 text-center">
                                                {index === 0 ? (
                                                    <motion.div
                                                        animate={{
                                                            scale: [1, 1.1, 1],
                                                            textShadow: [
                                                                "0 0 10px rgba(251,146,60,0.3)",
                                                                "0 0 20px rgba(251,146,60,0.5)",
                                                                "0 0 10px rgba(251,146,60,0.3)"
                                                            ]
                                                        }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                        className="inline-block"
                                                    >
                                                        <div className="text-4xl font-bold text-orange-500 whitespace-nowrap">
                                                            2,980円
                                                        </div>
                                                        <span className="text-sm text-orange-600 font-bold block">
                                                            （税込）
                                                        </span>
                                                    </motion.div>
                                                ) : (
                                                    <div className="relative">
                                                        <span className="text-3xl font-bold text-gray-400 whitespace-nowrap">
                                                            {index === 1 ? "18,000円" : index === 2 ? "45,000円" : "80,000円"}
                                                        </span>
                                                        <span className="text-sm text-gray-500 block">（税込）</span>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            <style>
                {`
                    .custom-dots {
                        bottom: -40px !important;
                    }
                    .custom-dots li {
                        margin: 0 12px !important;
                    }
                    .custom-dots li button {
                        width: 16px !important;
                        height: 16px !important;
                    }
                    .custom-dots li button:before {
                        font-size: 16px !important;
                        width: 16px !important;
                        height: 16px !important;
                        color: #f97316 !important;
                        opacity: 0.25 !important;
                    }
                    .custom-dots li.slick-active button:before {
                        opacity: 1 !important;
                        color: #f97316 !important;
                    }
                `}
            </style>
        </section>
    );
} 