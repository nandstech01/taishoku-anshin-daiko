import React from 'react';
import Header from '@/components/common/Header';
import HeroSection from './components/HeroSection';
import OverviewSection from './components/OverviewSection';
import PurposeSection from './components/PurposeSection';
import TargetAudienceSection from './components/TargetAudienceSection';
import LearningFormatSection from './components/LearningFormatSection';
import CurriculumSection from './components/CurriculumSection';
import SupportSection from './components/SupportSection';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';

export default function CourseLiteracyPage() {
  const courseTitle = "AIリテラシー基礎講座"; // より個人向けに
  const courseSubtitle = "AI時代を生き抜くための必須スキルを学ぶ"; // より個人向けに

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