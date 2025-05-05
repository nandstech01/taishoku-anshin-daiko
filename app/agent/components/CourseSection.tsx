"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// アイコンは削除 (BrainCircuit, Search, PenTool, Sparkles, GraduationCap)

const commonImagePath = "/images/agent-course-common.jpg"; // 共通の画像パス

// URLスラッグを生成する簡単な関数
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-') // スペースをハイフンに
    .replace(/[〜]+/g, '-') // 全角チルダをハイフンに
    .replace(/[^a-z0-9-]/g, ''); // 英数字とハイフン以外を削除
};

const courses = [
  {
    title: "SEO-WEBサイトのデジタル分析",
    slug: "seo-web", // そのまま
    // icon: <Search className="h-6 w-6 text-blue-400" />,
    description: [
      "データに基づきウェブサイトの課題を発見",
      "効果的なSEO戦略を立案・実行",
      "サイトパフォーマンスを最大化"
    ],
    image: commonImagePath 
  },
  {
    title: "AIリテラシー基礎習得",
    slug: "ai", // そのまま
    // icon: <BrainCircuit className="h-6 w-6 text-purple-400" />,
    description: [
      "AIの基本原理と歴史を理解",
      "AI倫理と社会への影響を考察",
      "最新AIトレンドを把握"
    ],
    image: commonImagePath
  },
  {
    title: "AIを活用したWEBコンテンツ制作",
    slug: "aiweb", // ハイフンなしに修正
    // icon: <PenTool className="h-6 w-6 text-green-400" />,
    description: [
      "AIツールで効率的にコンテンツ作成",
      "ターゲットに響く文章・構成を学習",
      "SEOに強いコンテンツ制作術"
    ],
    image: commonImagePath 
  },
  {
    title: "高度AI活用プロンプトエンジニア",
    slug: "ai-prompt", // 正しいのでそのまま
    // icon: <Sparkles className="h-6 w-6 text-yellow-400" />,
    description: [
      "AIの能力を最大限に引き出す指示術",
      "複雑なタスクを自動化するプロンプト設計",
      "実践的なプロンプトチューニング"
    ],
    image: commonImagePath
  },
  {
    title: "AIエキスパート生成AIエンジニア",
    slug: "aiai", // ハイフンなしに修正
    // icon: <GraduationCap className="h-6 w-6 text-red-400" />,
    description: [
      "生成AIモデルの仕組みを深く理解",
      "独自のAIアプリケーション開発",
      "最新AI技術の研究・応用"
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
    // 背景をDemandSalaryセクションに合わせる
    <section className="py-16 bg-white px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          {/* <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">学習プログラム</h2> */}
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            AIエンジニアプログラム
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
            未経験から市場価値の高いAI人材へ。最新技術を体系的に学び、実践力を養います。
          </p>
        </div>

        {/* PC(lg)版で3列、それ以下はレスポンシブに変更 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
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
                    // sizesを修正: lgでは3列になるため、1/3幅(33vw)に近づける
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
                {/* 説明を箇条書きリストに変更 */}
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