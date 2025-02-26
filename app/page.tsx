import * as React from 'react';
import dynamic from 'next/dynamic';
import Header from '../src/components/common/Header';
import TroubleSection from '../src/components/TroubleSection';
import FeaturesSection from '../src/components/FeaturesSection';
import NandsConfidenceSection from '../src/components/NandsConfidenceSection';
import PricingSection from '../src/components/PricingSection';
import ComparisonSection from '../src/components/ComparisonSection';
import ReasonsSection from '../src/components/ReasonsSection';
import ProcessFlowSection from '../src/components/ProcessFlowSection';
import TestimonialsSection from '../src/components/TestimonialsSection';
import PaymentSection from '../src/components/PaymentSection';
import ContactSection from '../src/components/ContactSection';
import FAQSection from '../src/components/FAQSection';
import ConsultationForm from '../src/components/ConsultationForm';
import Footer from '../src/components/common/Footer';
import HomePageBlogSection from '@/components/blog/HomePageBlogSection';
import FixedButtons from '@/components/ui/FixedButtons';
import LoadingScreen from '@/components/loading/LoadingScreen';
import { Metadata } from 'next';
import { Suspense } from 'react';

// EnhancedHeroSectionをSSR有効で動的インポート
const EnhancedHeroSection = dynamic(
  () => import('@/components/EnhancedHeroSection'),
  {
    ssr: true
  }
);

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <div className="sticky top-0 z-[51]">
        <Header />
      </div>
      
      <main>
        <article>
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
        </article>
      </main>

      <Footer />
      <FixedButtons />
    </>
  );
}
