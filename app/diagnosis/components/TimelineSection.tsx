import React from 'react';

export default function TimelineSection() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
        最短1ヶ月で受給開始
      </h2>
      
      <p className="text-xl text-gray-600 text-center mb-12">
        通常、受給開始まで3ヶ月かかるところを、最短で1ヶ月にまで短縮できます
      </p>

      <div className="relative">
        {/* Timeline Grid */}
        <div className="grid grid-cols-11 gap-0 mb-4">
          {[...Array(11)].map((_, i) => (
            <div key={i} className="text-center text-gray-500">{i + 1}</div>
          ))}
        </div>

        {/* Timeline Lines */}
        <div className="absolute left-0 right-0 h-[2px] bg-gray-200"></div>

        {/* Normal Application Timeline */}
        <div className="relative mb-12 mt-8">
          <div className="absolute right-0 -top-6 bg-emerald-100 px-3 py-1 rounded-md text-emerald-700">
            通常申請
          </div>
          <div className="flex">
            <div className="w-1/6 bg-emerald-500 h-12 rounded-l-md flex items-center justify-center text-white">
              申請
            </div>
            <div className="w-1/6 bg-gray-400 h-12 flex items-center justify-center text-white">
              制限期間
            </div>
            <div className="w-2/6 bg-amber-400 h-12 rounded-r-md flex items-center justify-center text-white">
              受給期間
            </div>
          </div>
        </div>

        {/* Bank Application Timeline */}
        <div className="relative mt-8">
          <div className="absolute right-0 -top-6 bg-emerald-100 px-3 py-1 rounded-md text-emerald-700">
            給付金診断
          </div>
          <div className="flex items-center">
            <div className="w-1/12 bg-emerald-500 h-12 rounded-l-md flex items-center justify-center text-white">
              申請
            </div>
            <div className="absolute left-24 -top-4">
              <div className="bg-rose-500 text-white rounded-full px-3 py-1 text-sm">
                制限なし
              </div>
            </div>
            <div className="flex-1 bg-amber-400 h-12 rounded-r-md flex items-center justify-center text-white">
              受給期間
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 