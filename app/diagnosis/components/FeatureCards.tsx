import { Calendar, Coins, Phone } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "受給まで",
    subtitle: "最短1ヶ月",
  },
  {
    icon: Coins,
    title: "受給期間を",
    subtitle: "10ヶ月に延長",
  },
  {
    icon: Phone,
    title: "50,000件の",
    subtitle: "相談実績",
  },
];

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-6 text-center flex flex-col items-center shadow-lg"
        >
          <feature.icon className="w-16 h-16 text-[#4def07] mb-4" strokeWidth={1.5} />
          <div className="text-[#4def07]">
            <div className="text-xl font-bold">{feature.title}</div>
            <div className="text-xl">{feature.subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
} 