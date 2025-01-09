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
import Header from '../src/components/common/Header';
import { PageViewTracker } from '@/components/blog/PageViewTracker';
import HomePageBlogSection from '@/components/blog/HomePageBlogSection';

declare module 'react' {
  interface JSX {
    IntrinsicElements: any;
  }
}

const Home: React.FC = () => {
  const [showMainContent, setShowMainContent] = React.useState(false);

  const handleEvent = React.useCallback(() => {
    // 処理内容
  }, []);

  const LineButton = () => (
    <motion.div 
      className="absolute bottom-8 left-0 right-0 z-[60] px-4 mx-auto max-w-3xl"
    >
      <a
        href="https://lin.ee/h1kk42r"
        target="_blank"
        rel="noopener noreferrer"
        className="
          block w-full py-4 px-8
          text-center text-white text-xl font-bold
          bg-gradient-to-r from-[#ff8210] to-[#f59e0b]
          rounded-full shadow-lg
          hover:shadow-2xl hover:scale-105
          transform transition-all duration-300
          relative overflow-hidden
          border-2 border-white/20
        "
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0"
          animate={{
            x: ['-200%', '200%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              '0 0 20px rgba(255,130,16,0.5)',
              '0 0 40px rgba(245,158,11,0.8)',
              '0 0 20px rgba(255,130,16,0.5)'
            ]
          }}
          transition={{
            duration: 2,
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
  );

  return (
    <div className="flex flex-col">
      <PageViewTracker page_type="lp" />
      {!showMainContent ? (
        <>
          <div className="sticky top-0 z-[51]">
            <Header />
          </div>
          <div className="relative h-screen z-40">
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url("/images/backgrounds.jpg")' }}
            />
            <div className="absolute inset-0">
              <LineButton />
            </div>
          </div>
          <div className="relative z-30">
            <div className="bg-white">
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
              <HomePageBlogSection />
              <Footer />
              <FixedButtons />
            </div>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative min-h-screen flex flex-col">
            <div className="absolute inset-0 z-0">
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url("/images/backgrounds.jpg")' }}
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
          <HomePageBlogSection />
          <Footer />
          <FixedButtons />
        </motion.div>
      )}
    </div>
  );
};

export default Home;
