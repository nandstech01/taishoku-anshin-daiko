import React from 'react';
import { MessageCircle, Calculator, Users, FileText, CheckCircle } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Users,
    title: '友だち登録',
    description: 'まずは、LINE公式アカウントを友だち登録してください',
    color: '[#4def07]',
  },
  {
    number: '02',
    icon: Calculator,
    title: '無料診断',
    description: '受給額がいくらくらいになるのか、無料で診断することができます',
    color: '[#4def07]',
  },
  {
    number: '03',
    icon: MessageCircle,
    title: '個別相談',
    description: '個別相談で、現在の状況に合わせたご提案と受給の流れを説明します',
    color: '[#4def07]',
  },
  {
    number: '04',
    icon: FileText,
    title: '書類準備',
    description: '失業保険の申請に必要な書類をご用意いただき、ハローワークに提出します',
    color: '[#4def07]',
  },
  {
    number: '05',
    icon: CheckCircle,
    title: '受給確定',
    description: '支給が確定すると、約1〜2週間で給付金が振り込まれます',
    color: '[#4def07]',
  },
];

export default function StepsSection() {
  return (
    <div className="mb-20">
      <div className="text-center mb-16">
        <div className="inline-flex items-center bg-[#4def07]/10 rounded-full px-6 py-2 mb-4">
          <span className="bg-[#4def07] text-white px-3 py-1 rounded-md mr-2">かんたん</span>
          <span className="text-4xl font-bold text-amber-500 mr-2">5</span>
          <span className="text-2xl font-bold text-[#4def07]">STEP</span>
          <span className="text-[#4def07] ml-2">受給までは</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className="absolute left-12 top-24 h-16 w-0.5 bg-[#4def07]/20"></div>
            )}
            
            <div className="flex items-start gap-8">
              {/* Step Circle */}
              <div className={`flex-shrink-0 w-24 h-24 rounded-full bg-[#4def07] flex items-center justify-center`}>
                <div className="text-center">
                  <div className="text-white text-sm font-bold">STEP</div>
                  <div className="text-white text-2xl font-bold">{step.number}</div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-grow pt-2">
                <h3 className={`text-2xl font-bold text-[#4def07] mb-2`}>
                  {step.title}
                </h3>
                <p className="text-gray-600 text-lg">
                  {step.description}
                </p>
              </div>

              {/* Icon */}
              <div className={`flex-shrink-0 w-16 h-16 bg-[#4def07]/10 rounded-full flex items-center justify-center`}>
                <step.icon className={`w-8 h-8 text-[#4def07]`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 