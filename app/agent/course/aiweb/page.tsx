import React from 'react';
import Header from '../../../../src/components/common/Header';
// Import section components
import HeroSection from './components/HeroSection';
import OverviewSection from './components/OverviewSection';
import PurposeSection from './components/PurposeSection';
import TargetAudienceSection from './components/TargetAudienceSection';
import LearningFormatSection from './components/LearningFormatSection';
import CurriculumSection from './components/CurriculumSection';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';

export default function CourseWebContentPage() {
  const courseTitle = "AIを活用したWEBコンテンツ制作のDX化講座";
  const courseSubtitle = "AIツールによる効率的な記事作成・リライト・キーワード選定を学ぶ";

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-gray-50 to-white text-gray-800">
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