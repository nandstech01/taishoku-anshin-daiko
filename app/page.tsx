'use client';

import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import RefinedCourseDates from '@/components/RefinedCourseDates';
import SeminarBenefits from '@/components/SeminarBenefits'; // SeminarBenefits をインポート
import CourseFeatures from '@/components/CourseFeatures';
import CourseList from '@/components/CourseList';
import WhyChooseDmmAiCamp from '@/components/WhyChooseDmmAiCamp';
import Testimonials from '@/components/Testimonials';
import MentorIntroduction from '@/components/MentorIntroduction';
import LearningPlans from '@/components/LearningPlans';
import SubsidyInformation from '@/components/SubsidyInformation';
import EnrollmentProcess from '@/components/EnrollmentProcess';
import EnhancedContactForm from '@/components/EnhancedContactForm';
import FixedButtons from '@/components/ui/FixedButtons';
import ConcernsSection from '@/components/common/ConcernsSection';
import AILaborMarketImpact from '@/components/AILaborMarketImpact';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import Footer from '@/components/common/Footer'; // フッターコンポーネントのインポート

const Home: React.FC = () => {
  // アニメーションの定義
  const fadeInProps = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 200 });
  const slideInProps = useSpring({ from: { opacity: 0, transform: 'translateY(-20px)' }, to: { opacity: 1, transform: 'translateY(0)' }, delay: 400 });

  return (
    <div className="flex flex-col">
      {/* ビデオセクション */}
      <div className="relative min-h-screen flex flex-col">
        <div className="absolute inset-0 z-0">
          <video 
            src="/images/background.mp4"
            autoPlay 
            muted 
            playsInline 
            className="w-full h-full object-cover"
            onEnded={(e) => e.currentTarget.pause()} // 再生終了時に停止
          />
        </div>
        <div className="relative z-10 flex flex-col min-h-screen text-black">
          <animated.div style={fadeInProps} className="flex flex-col items-center justify-center mt-32">
            <h1 className="text-xl sm:text-3xl font-bold mb-2">2025年</h1>
            <h2 className="text-xl sm:text-2xl font-bold">準備は万全ですか？</h2>
          </animated.div>
          <main className="flex-grow flex flex-col items-center justify-start p-2 space-y-4 text-center mt-4">
            <animated.h1 style={slideInProps} className="text-3xl md:text-4xl font-bold leading-tight">
              <br />
              <span className="text-4xl md:text-5xl"> </span>
            </animated.h1>
            <animated.p style={slideInProps} className="text-xl max-w-2xl">
              {/* テキストを追加 */}
            </animated.p>
          </main>
        </div>
      </div>

      <RefinedCourseDates />
      {/* SeminarBenefits セクションを追加 */}
      <SeminarBenefits />

      {/* About NANDS セクション */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">About NANDS</h2>
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-4">
              NANDS,  <br />
              NEXT SOLUTIONS
            </h3>
            <p className="text-xl mb-6" style={{ color: '#1D4ED8', fontWeight: 'bold' }}>"次のステージへ"</p>
            <p className="mb-4">
              全ての働く人たちに、次のステージへを合言葉に
            </p>
            <p className="mb-4">
              エヌアンドエスは、未来を切り開くワークテックソリューションを提供します。
            </p> 
            <p className="mb-4">
              私たちは、生成AIを中心に活用したリスキリング研修をはじめ、退職、転職支援まで一貫して対応する総合キャリア支援企業です。
            </p>
            <p className="mb-4">
              技術とキャリアを繋ぐ次世代企業として、どの段階でも安心して頼れるパートナーを目指します。
            </p>
            <button className="mt-6 bg-blue-600 text-white hover:bg-blue-500 font-bold py-2 px-4 rounded-full shadow-md">
              View More
            </button>
          </div>
        </div>
      </div>

      {/* その他のセクション */}
      
      <ConcernsSection />
      <AILaborMarketImpact />
      <CourseFeatures />
      <CourseList />
      <WhyChooseDmmAiCamp />
      <Testimonials />
      <MentorIntroduction />
      <SubsidyInformation />
      <EnrollmentProcess />
      <EnhancedContactForm />
      <FixedButtons />
      {/* フッター */}
      <Footer />
    </div>
  );
};

export default Home;
