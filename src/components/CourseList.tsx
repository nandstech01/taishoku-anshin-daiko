import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import CardContent from '@/components/common/CardContent';
import CardHeader from '@/components/common/CardHeader';
import CardTitle from '@/components/common/CardTitle';
import CardFooter from '@/components/common/CardFooter';
import CheckCircle from '@/components/common/CheckCircle';

import React from 'react';

const CourseList = () => {
  const courses = [
    {
      title: (
        <div className="text-center space-y-2">
          <span>基礎コース</span>
          <br />
          <span>AIリテラシー研修</span>
        </div>
      ),
      description: "生成AIを使いこなすための基礎を学ぶ",
      features: [
        "プロンプトエンジニアリングの基礎",
        "ChatGPTの効果的な使用方法",
        "ビジネスでの活用事例",
      ],
      price: "¥99,000",
      duration: "4週間",
    },
    {
      title: (
        <div className="text-center space-y-2">
          <span>応用コース</span>
          <br />
          <span>実務プロンプトエンジニアリング</span>
        </div>
      ),
      description: "ビジネスシーンでのプロンプト作成",
      features: [
        "AIモデルの選択と統合",
        "実務で役立つプロンプトの設計",
        "業務改善に活かすスキルを身につける",
      ],
      price: "¥149,000",
      duration: "6週間",
    },
    {
      title: (
        <div className="text-center space-y-2">
          <span>エキスパートコース</span>
          <br />
          <span>キャリアアップ</span>
          <br />
          <span>プロンプトエンジニア</span>
        </div>
      ),
      description: "企業でのAI導入戦略を立案する",
      features: [
        "AI導入のロードマップ作成",
        "コスト分析と ROI 計算",
        "チーム編成と人材育成計画",
      ],
      price: "¥199,000",
      duration: "8週間",
    },
  ];

  return (
    <section id="プラン・料金" className="bg-gray-50 py- px-4"> {/* IDを追加 */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">コース一覧</h2> {/* 見出し下の余白を狭く */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <Card key={index} className="w-full max-w-sm mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold">{course.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-muted-foreground">{course.description}</p>
                <ul className="space-y-2">
                  {course.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-2" /> {/* 色を青に変更 */}
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col items-center space-y-4">
                <div className="text-3xl font-bold mt-6">{course.price}</div>
                <div className="text-sm text-muted-foreground">{course.duration}</div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">申し込む</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseList;