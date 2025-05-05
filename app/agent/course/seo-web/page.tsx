import React from 'react';
import Header from '../../../../src/components/common/Header';
import HeroSection from './components/HeroSection';
import OverviewSection from './components/OverviewSection';
import PurposeSection from './components/PurposeSection';
import TargetAudienceSection from './components/TargetAudienceSection';
import CurriculumSection from './components/CurriculumSection';
import LearningFormatSection from './components/LearningFormatSection';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';

export default function CourseSeoPage() {
  const courseTitle = "WEBサイトのデジタル分析技術習得講座";
  const courseSubtitle = "Google Analytics・Search Console・SEOの基礎から実践までを学ぶ総合コース";
  
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-gray-50 to-white">
      <Header logoSrc="/images/agent-logo.svg" /> 
      <HeroSection courseTitle={courseTitle} courseSubtitle={courseSubtitle} />
      <OverviewSection />
      <PurposeSection />
      <TargetAudienceSection />
      <LearningFormatSection />
      <CurriculumSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
}