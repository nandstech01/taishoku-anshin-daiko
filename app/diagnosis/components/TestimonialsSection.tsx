import React from 'react';
import { MessageCircle } from 'lucide-react';

interface Testimonial {
  age: string;
  gender: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    age: '50代',
    gender: '男性',
    content: 'たまたま「退職バンク」の存在を知り無料診断を受けたところ、想像以上の失業手当を受け取れることがわかりました。',
  },
  {
    age: '40代',
    gender: '女性',
    content: '忙しい中で無理に次の仕事を探すのではなく、手当を受給しながらゆっくり準備ができることを教えていただき、サービスに申し込みました。',
  },
  {
    age: '30代',
    gender: '男性',
    content: '結果的に半年ほどの期間をかけて転職活動を行い、良い職場・良い上司に出会うことができました！',
  },
];

export default function TestimonialsSection() {
  return (
    <div className="mb-20 relative overflow-hidden">
      {/* Background with diagonal stripes */}
      <div className="absolute inset-0 bg-amber-400">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)'
        }}></div>
      </div>

      <div className="relative pt-16 pb-24 px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-full inline-block px-6 py-2 mb-4">
            <span className="text-amber-500 font-bold">受給額の増額に成功した</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-12">
            お客様の<span className="inline-block">声</span>
          </h2>
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto space-y-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex items-start gap-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="bg-amber-500 rounded-full p-4 w-20">
                  <div className="aspect-square bg-white rounded-full flex items-center justify-center">
                    <img
                      src={`data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNFMEYyRjEiLz48L3N2Zz4=`}
                      alt={`${testimonial.age}${testimonial.gender}`}
                      className="w-12 h-12"
                    />
                  </div>
                  <div className="text-center text-white text-sm mt-2">
                    {testimonial.age}
                    {testimonial.gender}
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="flex-grow bg-white rounded-2xl p-6 shadow-lg relative">
                {/* Triangle */}
                <div className="absolute -left-4 top-6 w-0 h-0 border-t-[8px] border-t-transparent border-r-[16px] border-r-white border-b-[8px] border-b-transparent"></div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {testimonial.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Illustration */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <img
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDMwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNGRkZGRkYiLz48L3N2Zz4="
              alt="Happy customers"
              className="w-full max-w-md"
            />
            {/* LINE Button */}
            <div className="absolute bottom-4 right-4">
              <button className="bg-[#00B900] text-white rounded-full px-6 py-3 flex items-center gap-2 hover:bg-[#009900] transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>無料診断</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 