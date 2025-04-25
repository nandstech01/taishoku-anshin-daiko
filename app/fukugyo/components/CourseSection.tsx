"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const commonImagePath = "/images/agent-course-common.jpg"; // 共通の画像パス

// 副業ページ用に3つのコースだけを選択
const courses = [
  {
    title: "SEO-WEBサイトのデジタル分析",
    slug: "seo-web",
    description: [
      "データに基づきウェブサイトの課題を発見",
      "効果的なSEO戦略を立案・実行",
      "サイトパフォーマンスを最大化"
    ],
    image: commonImagePath 
  },
  {
    title: "AIリテラシー基礎習得",
    slug: "ai",
    description: [
      "AIの基本原理と歴史を理解",
      "AI倫理と社会への影響を考察",
      "最新AIトレンドを把握"
    ],
    image: commonImagePath
  },
  {
    title: "AIを活用したWEBコンテンツ制作",
    slug: "aiweb",
    description: [
      "AIツールで効率的にコンテンツ作成",
      "ターゲットに響く文章・構成を学習",
      "SEOに強いコンテンツ制作術"
    ],
    image: commonImagePath 
  }
];

export default function CourseSection() {
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setActiveCardIndex(prevIndex => prevIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            AI副業コースプログラム
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
            未経験からでも安心。すぐに収益化できるAIスキルを習得し、新しい働き方を手に入れましょう。
          </p>
        </div>

        {/* 3つのコースなので1列、2列、3列を適切に設定 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => {
            return (
              <div 
                key={index} 
                className="group transition-all duration-500 rounded-lg border bg-card text-card-foreground shadow-md hover:shadow-lg overflow-hidden relative flex flex-col cursor-pointer"
                onClick={() => handleCardClick(index)}
                role="button"
                tabIndex={0}
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`object-cover transition-transform duration-300 group-hover:scale-105 ${activeCardIndex === index ? 'scale-105' : ''}`}
                    priority={index <= 2}
                  />
                  {/* ホバー時に表示されるオーバーレイとタイトル */}
                  <div 
                    className={`absolute inset-0 bg-black/70 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${activeCardIndex === index ? 'opacity-100' : ''}`}
                  >
                    <p className="text-white text-lg font-semibold text-center">{course.title}</p>
                  </div>
                </div>
                {/* 説明を箇条書きリストに */}
                <div className="p-4 text-left flex-grow flex flex-col justify-between">
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 mb-4">
                    {course.description.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                  <div className="mt-auto text-center lg:text-right">
                    <Link 
                      href={`/agent/course/${course.slug}`}
                      className="inline-block rounded-md px-4 py-2 text-sm font-medium bg-indigo-700 text-white hover:bg-indigo-800 transition-colors duration-200"
                    >
                      コース詳細
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 