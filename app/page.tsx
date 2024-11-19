'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import RefinedCourseDates from '../src/components/RefinedCourseDates';
import TroubleSection from '../src/components/TroubleSection';
import FeaturesSection from '../src/components/FeaturesSection';
import PricingSection from '../src/components/PricingSection';
import ComparisonSection from '../src/components/ComparisonSection';
import ConsultationForm from '../src/components/ConsultationForm';
import FixedButtons from '../src/components/ui/FixedButtons';
import Footer from '../src/components/common/Footer';
import ReasonsSection from '../src/components/ReasonsSection';
import ProcessFlowSection from '../src/components/ProcessFlowSection';
import TestimonialsSection from '../src/components/TestimonialsSection';
import PaymentSection from '../src/components/PaymentSection';
import ContactSection from '../src/components/ContactSection';
import FAQSection from '../src/components/FAQSection';
import { openChat } from '@/components/ChatBot';

const Home: React.FC = () => {
  const [showMainContent, setShowMainContent] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const setupVideo = async () => {
      if (videoRef.current) {
        videoRef.current.defaultMuted = true;
        videoRef.current.muted = true;
        videoRef.current.playsInline = true;
        videoRef.current.setAttribute('playsinline', '');
        videoRef.current.setAttribute('webkit-playsinline', '');
        try {
          await videoRef.current.play();
        } catch (error) {
          console.log("Auto-play failed", error);
        }
      }
    };
    setupVideo();
  }, []);

  const handleEvent = React.useCallback(() => {
    // 処理内容
  }, []);

  return (
    <div className="flex flex-col">
      {!showMainContent ? (
        <div className="fixed inset-0 z-50">
          <video 
            ref={videoRef}
            src="/images/background.mp4"
            autoPlay 
            muted 
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            onEnded={() => setShowMainContent(true)}
          />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
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
                  e.currentTarget.pause();
                  e.currentTarget.currentTime = e.currentTarget.duration;
                }}
              />
            </div>
            <div className="relative z-10 flex flex-col min-h-screen text-white">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center justify-center mt-32"
              >
                <h1 className="text-xl sm:text-3xl font-bold mb-2">　</h1>
                <h2 className="text-xl sm:text-2xl font-bold">　</h2>
              </motion.div>
              <main className="flex-grow flex flex-col items-center justify-start p-2 space-y-4 text-center mt-4">
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl md:text-4xl font-bold leading-tight"
                >
                  　
                  <br />
                  <span className="text-4xl md:text-5xl">　</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-xl max-w-2xl"
                >
                  　
                </motion.p>
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
          
          <motion.div 
            className="fixed bottom-8 left-0 right-0 z-50 px-4 mx-auto max-w-3xl"
            animate={{ 
              y: [0, -10, 0],
              scale: [1, 1.02, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <a
              href="https://lin.ee/89OkzJ7"
              target="_blank"
              rel="noopener noreferrer"
              className="
                block w-full py-4 px-8
                text-center text-white text-xl font-bold
                bg-gradient-to-r from-[#ff8210] to-[#f59e0b]
                rounded-full shadow-lg
                hover:shadow-2xl hover:scale-[1.02]
                transform transition-all duration-300
                animate-pulse
                relative
                overflow-hidden
              "
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span className="relative flex items-center justify-center gap-2">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z"/>
                </svg>
                まずはLINEで無料相談
              </span>
            </a>
          </motion.div>

          <Footer />
          <FixedButtons />
          <div className="text-center my-8">
            <button
              onClick={() => {
                const event = new CustomEvent('openChatBot');
                window.dispatchEvent(event);
              }}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
            >
              ＼ 今すぐ無料相談 24時間受付 ／<br />
              専門家にまるッと相談
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Home;
