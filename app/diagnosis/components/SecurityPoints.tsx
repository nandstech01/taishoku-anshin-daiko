import React from 'react';
import { MapPin, Phone, Calendar, Heart } from 'lucide-react';

const points = [
  {
    icon: MapPin,
    title: '全国どこでも対応',
    color: 'text-[#4def07]',
  },
  {
    icon: Phone,
    title: '何度でも無料相談',
    color: 'text-[#4def07]',
  },
  {
    icon: Calendar,
    title: '土日祝もサポート',
    color: 'text-[#4def07]',
  },
  {
    icon: Heart,
    title: '社労士が監修',
    color: 'text-[#4def07]',
  },
];

export default function SecurityPoints() {
  return (
    <div className="mb-20">
      <h2 className="text-5xl font-bold text-[#4def07] text-center mb-16 relative">
        <span className="relative">
          4
          <span className="absolute -top-4 -right-4 w-6 h-6">
            <span className="absolute w-2 h-2 bg-[#4def07] rounded-full animate-ping"></span>
            <span className="absolute w-2 h-2 bg-[#4def07] rounded-full"></span>
          </span>
        </span>
        つの安心ポイント
      </h2>

      <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
        {points.map((point, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-24 h-24 bg-[#4def07]/10 rounded-full flex items-center justify-center">
                <point.icon className="w-12 h-12 text-[#4def07]" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{point.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 