import * as React from 'react';
import dynamic from 'next/dynamic';
import Header from '../src/components/common/Header';
import TroubleSection from '../src/components/TroubleSection';
import FeaturesSection from '../src/components/FeaturesSection';
import NandsConfidenceSection from '../src/components/NandsConfidenceSection';
import PricingSection from '../src/components/PricingSection';
import ComparisonSection from '../src/components/ComparisonSection';
import ConsultationForm from '../src/components/ConsultationForm';
import Footer from '../src/components/common/Footer';
import ReasonsSection from '../src/components/ReasonsSection';
import ProcessFlowSection from '../src/components/ProcessFlowSection';
import TestimonialsSection from '../src/components/TestimonialsSection';
import PaymentSection from '../src/components/PaymentSection';
import ContactSection from '../src/components/ContactSection';
import FAQSection from '../src/components/FAQSection';
import HomePageBlogSection from '@/components/blog/HomePageBlogSection';
import FixedButtons from '@/components/ui/FixedButtons';

// Import type definitions
import '@/types/three-fiber.d.ts';

// クライアントコンポーネントを動的インポート（SSRを有効に）
const ClientSideComponents = dynamic(
  () => import('@/components/ClientSideComponents'),
  { ssr: true }
);

// メインのヒーローセクション（SSRで初期表示）
const InitialHeroContent = () => (
  <div className="w-full h-screen bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
    <div className="text-white text-center">
      <h1 className="text-4xl font-bold mb-4">退職代行サービス</h1>
      <p className="text-xl">業界最安値2,980円で即日対応</p>
    </div>
  </div>
);

// EnhancedHeroSectionもSSRを有効に
const EnhancedHeroSection = dynamic(
  () => import('@/components/EnhancedHeroSection'),
  {
    ssr: true,
    loading: () => <InitialHeroContent />
  }
);

export default function Home() {
  return (
    <>
      <ClientSideComponents />
      
      <div className="sticky top-0 z-[51]">
        <Header />
      </div>
      
      <main>
        <EnhancedHeroSection />
        
        <div className="relative z-30 bg-white">
          <TroubleSection />
          <FeaturesSection />
          <NandsConfidenceSection />
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
        </div>
      </main>

      <Footer />
      <FixedButtons />
    </>
  );
}
