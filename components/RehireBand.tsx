import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';

const RehireBand = () => {
  return (
    <section className="relative w-full bg-black text-white py-12 sm:py-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/agent-hero-background.jpg"
          alt="背景"
          fill
          className="object-cover object-center"
          priority={false}
          quality={80}
        />
        <div className="absolute inset-0 bg-black/55"></div>
      </div>

      <div className="container relative z-10 mx-auto flex flex-col items-center justify-center gap-6 px-4 text-center">
        <h2 className="flex justify-center items-center text-2xl md:text-4xl font-bold">
          <GradientText 
            colors={["#FDB813", "#FFFACD", "#FFD700", "#DAA520", "#FDB813"]}
            className="mx-auto"
            showBorder={false}
            animationSpeed={5}
          >
            退職エージェント
          </GradientText>
        </h2>
        <p className="text-base text-gray-300 max-w-xl">
          退職のその先へ。AIスキルを武器に、新しいキャリアと収入の可能性を広げましょう。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link 
            href="/agent" 
            className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-semibold bg-white text-gray-900 hover:bg-gray-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-12"
          >
            収入アップを目指す <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link 
            href="/fukugyo" 
            className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-semibold bg-transparent border-2 border-white/50 text-white hover:bg-white/10 hover:border-white transition-all duration-300 h-12"
          >
            副収入を構築する <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RehireBand; 