"use client";

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
import RehireBand from '../components/RehireBand';
import { Metadata } from 'next';
import { Suspense, useState } from 'react';
import { WorkflowBotTrigger } from "../components";

// EnhancedHeroSectionをSSR有効で動的インポート
const EnhancedHeroSection = dynamic(
  () => import('@/components/EnhancedHeroSection'),
  {
    ssr: true
  }
);

export default function Home() {
  const handleChatComplete = (result: any) => {
    console.log("ワークフロー完了:", result);
  };

  return (
    <>
      <div className="sticky top-0 z-[51]">
        <Header />
      </div>
      
      <main>
        <article>
          <EnhancedHeroSection />
          
          {/* ヒーロー直下にボタンセクションを追加 */}
          <div className="bg-gray-50 py-10">
            <div className="container mx-auto text-center px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-snug">
                <span className="block sm:inline">
                  <span className="text-base sm:text-2xl md:text-3xl font-normal">退職は </span>
                  <span className="text-rose-600">『労働者の法的権利』</span>
                  <span className="text-base sm:text-2xl md:text-3xl font-normal"> です</span>
                </span>
                <span className="block sm:inline"> あんしんサポートします</span>
              </h2>
              <p className="text-gray-700 mb-10 max-w-3xl mx-auto text-sm md:text-lg leading-relaxed">
                <span className="hidden md:inline">
                  民法第627条で保障される
                  <span className="font-semibold text-rose-600 mx-1">「退職の自由」に基づきすべての労働者には退職の権利</span>
                  があります。
                  <span className="font-semibold text-emerald-700 mx-1">専門知識と過去の判例</span>
                  などを元にあなたの新しい一歩を支えます
                </span>
                {/* モバイル用（4行） */}
                <span className="md:hidden">
                  <span className="block">民法第627条で保障される <span className="font-semibold text-rose-600">「退職の自由」に基づき</span></span>
                  <span className="block">すべての労働者には <span className="font-semibold text-rose-600">退職の権利</span> があります。</span>
                  <span className="block"><span className="font-semibold text-emerald-700">専門知識と過去の判例</span> などを元に</span>
                  <span className="block">あなたの新しい一歩を支えます</span>
                </span>
              </p>
              <div className="w-full flex justify-center">
                <WorkflowBotTrigger 
                  buttonLabel={
                    <span className="flex flex-col leading-tight text-left">
                      <span className="text-sm sm:text-base">＼ 最速１分でかんたん手続き ／</span>
                      <span className="text-base sm:text-lg font-semibold">すぐに退職代行の依頼をする</span>
                    </span>
                  }
                  buttonClassName="relative flex items-center justify-center gap-3 w-full max-w-[360px] sm:min-w-[380px] px-6 py-3 sm:px-10 sm:py-4 pr-12 bg-gradient-to-r from-rose-600 to-red-500 text-white rounded-xl font-bold hover:brightness-110 transition-all shadow-md"
                  onComplete={handleChatComplete} 
                />
              </div>
            </div>
          </div>
          
          <RehireBand />
          
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
