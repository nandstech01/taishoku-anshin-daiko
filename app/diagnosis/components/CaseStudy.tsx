import { ArrowUpCircle } from "lucide-react";

export default function CaseStudy() {
  return (
    <div className="text-center mb-20">
      <h2 className="text-4xl font-bold text-emerald-500 mb-12">
        失業保険の受給事例
      </h2>

      <div className="max-w-2xl mx-auto bg-white rounded-3xl border-2 border-emerald-500 p-8 mb-16">
        <div className="bg-emerald-500 text-white text-2xl font-bold py-3 rounded-full mb-8">
          CASE 01
        </div>

        <div className="flex justify-center items-end gap-8 mb-8">
          {/* Before */}
          <div className="text-center">
            <div className="bg-gray-100 p-4 rounded-lg mb-2">
              <div className="text-3xl font-bold text-gray-600">¥650,000</div>
            </div>
            <div className="text-gray-600">通常申請</div>
          </div>

          {/* Increase Arrow */}
          <div className="flex flex-col items-center mb-8">
            <div className="text-3xl font-bold text-pink-500 mb-2">¥1,350,000</div>
            <div className="text-white bg-pink-500 px-4 py-1 rounded-full text-sm">
              増額！
            </div>
            <ArrowUpCircle className="text-pink-500 w-8 h-8 mt-2" />
          </div>

          {/* After */}
          <div className="text-center">
            <div className="bg-emerald-500 p-4 rounded-lg mb-2">
              <div className="text-3xl font-bold text-white">¥2,000,000</div>
            </div>
            <div className="text-emerald-600">退職バンク</div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative">
        {/* Arrows */}
        <div className="absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-t-[40px] border-emerald-300"></div>
        <div className="absolute left-1/2 -translate-x-1/2 top-8 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[25px] border-emerald-200"></div>

        {/* Bottom Content */}
        <div className="pt-32 text-center">
          <div className="max-w-sm mx-auto">
            <img 
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFMEYyRjEiLz48L3N2Zz4="
              alt="Illustration"
              className="w-48 h-48 mx-auto mb-6"
            />
            <h3 className="text-2xl font-bold text-emerald-600 mb-2">
              あなたが受給できる
            </h3>
            <h3 className="text-2xl font-bold text-emerald-600 mb-4">
              金額はいくら？
            </h3>
            <div className="inline-flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-full">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg"
                alt="LINE"
                className="w-6 h-6"
              />
              <span>無料診断</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 