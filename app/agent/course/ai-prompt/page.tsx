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
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';

export default function CoursePromptEngineerPage() {
  const courseTitle = "高度AI活用・プロンプトエンジニアリング実践講座";
  const courseSubtitle = "AIモデルの選択・統合と実務に役立つプロンプト設計を学び、業務改善へ活かす";

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
      <FaqSection />
      <ContactSection />
      
    </main>
  );
} 