'use client';

import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import RefinedCourseDates from '@/components/RefinedCourseDates';
import TroubleSection from '@/components/TroubleSection';
import FeaturesSection from '@/components/FeaturesSection';
import PricingSection from '@/components/PricingSection';
import ComparisonSection from '@/components/ComparisonSection';
import ConsultationForm from '@/components/ConsultationForm';
import FixedButtons from '@/components/ui/FixedButtons';
import Footer from '@/components/common/Footer';
import ReasonsSection from '@/components/ReasonsSection';
import ProcessFlowSection from '@/components/ProcessFlowSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import PaymentSection from '@/components/PaymentSection';
import ContactSection from '@/components/ContactSection';
import FAQSection from '@/components/FAQSection';

const Home: React.FC = () => {
  const fadeInProps = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 200 });
  const slideInProps = useSpring({ from: { opacity: 0, transform: 'translateY(-20px)' }, to: { opacity: 1, transform: 'translateY(0)' }, delay: 400 });

  // videoの再生状態を管理
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // コンポーネントがマウントされた時に再生を試みる
  React.useEffect(() => {
    // ビデオ要素の設定を行う関数
    const setupVideo = async () => {
      if (videoRef.current) {
        // ビデオの属性を設定
        videoRef.current.defaultMuted = true;
        videoRef.current.muted = true;
        videoRef.current.playsInline = true;
        videoRef.current.setAttribute('playsinline', '');
        videoRef.current.setAttribute('webkit-playsinline', '');

        try {
          // 即座に再生を試みる
          await videoRef.current.play();
        } catch (error) {
          console.log("Auto-play failed", error);
        }
      }
    };

    // コンポーネントマウント時に実行
    setupVideo();
  }, []);

  return (
    <div className="flex flex-col">
      {/* ビデオセクション */}
      <div className="relative min-h-screen flex flex-col">
        <div className="absolute inset-0 z-0">
          <video 
            ref={videoRef}
            src="/images/background.mp4"
            autoPlay 
            muted 
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            onEnded={(e) => {
              e.currentTarget.pause()
              e.currentTarget.currentTime = e.currentTarget.duration
            }}
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%'
            }}
          />
        </div>
        <div className="relative z-10 flex flex-col min-h-screen text-black">
          <animated.div style={fadeInProps} className="flex flex-col items-center justify-center mt-32">
            <h1 className="text-xl sm:text-3xl font-bold mb-2">　</h1>
            <h2 className="text-xl sm:text-2xl font-bold">　</h2>
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
      <TroubleSection />
      <FeaturesSection />
      <PricingSection />
      <ComparisonSection />
      <ReasonsSection />
      <ProcessFlowSection />
      <TestimonialsSection />
      <PaymentSection />
      <ContactSection />
      <FAQSection />
      <ConsultationForm />
      <Footer />
      <FixedButtons />
    </div>
  );
};

export default Home;
