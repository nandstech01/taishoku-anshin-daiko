import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

export default function ContactSection() {
  return (
    <section id="contact" className="w-full bg-black py-12 sm:py-16 px-4 text-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
          WEBデジタル分析のスキルで<br className="sm:hidden"/>新たなキャリアを築きませんか？
        </h2>
        <p className="text-base sm:text-lg mb-6 sm:mb-8 max-w-3xl mx-auto opacity-90 px-1">
          デジタル分析スキルを活かして、<wbr/>より良い条件や働きがいのある環境へ。<br className="hidden xs:block sm:hidden"/>
          まずはあなたの現状や希望をお聞かせください。
        </p>
        
        <div className="mt-8 sm:mt-10">
          <a 
            href="https://lin.ee/U1FSjtv"
            className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4 font-bold text-black bg-white rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg mx-2 hover:bg-gray-200"
          >
            <span className="relative z-10 flex items-center">
              まずは退職相談する
              <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 transition-transform duration-300 ease-out transform group-hover:translate-x-1.5" />
            </span>
          </a>
        </div>
        <p className="mt-4 sm:mt-6 text-xs sm:text-sm opacity-70">
          相談は無料・匿名でも可能です。
        </p>
      </div>
    </section>
  );
} 