import React from 'react';
import Header from '../../../../src/components/common/Header';
// Import section components
import HeroSection from './components/HeroSection';
import OverviewSection from './components/OverviewSection';
import PurposeSection from './components/PurposeSection';
import TargetAudienceSection from './components/TargetAudienceSection';
import LearningFormatSection from './components/LearningFormatSection';
import CurriculumSection from './components/CurriculumSection';
import SupportSection from './components/SupportSection';
// import PricingSection from './components/PricingSection'; // Removed import
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';

export default function CourseExpertAiPage() {
  const courseTitle = "AIエキスパート～生成AIエンジニア～";
  const courseSubtitle = "Next.js & AIエージェント連携で学ぶモダンフロントエンドと生成AIの開発基礎";

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-gray-50 to-white text-gray-800">
      <Header logoSrc="/images/agent-logo.svg" /> 
      
      <HeroSection courseTitle={courseTitle} courseSubtitle={courseSubtitle} />
      <OverviewSection />
      <PurposeSection />
      <TargetAudienceSection />
      <LearningFormatSection />
      <CurriculumSection />
      <SupportSection />
      {/* <PricingSection /> */}{/* Removed usage */}
      <FaqSection />
      <ContactSection />
      
    </main>
  );
} 