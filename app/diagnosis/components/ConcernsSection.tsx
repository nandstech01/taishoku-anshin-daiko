import React from 'react';

export default function ConcernsSection() {
  const concerns = [
    "退職後の生活費が不安",
    "じっくり転職活動をしたい",
    "しばらく働かずに休みたい",
    "ストレスで今すぐ会社を辞めたい"
  ];

  return (
    <div className="mb-20 bg-gradient-to-b from-gray-900 to-gray-800 rounded-3xl overflow-hidden">
      <div className="p-12 text-center">
        <h2 className="text-4xl font-bold text-white mb-16">
          こんなお悩みは<br />ありませんか？
        </h2>

        <div className="grid grid-cols-2 gap-6 mb-16 max-w-3xl mx-auto">
          {concerns.map((concern, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform"
            >
              <p className="text-gray-800 text-lg font-medium">{concern}</p>
            </div>
          ))}
        </div>

        <div className="relative">
          <div className="flex justify-center mb-8">
            <img
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDMwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNFMEYyRjEiLz48L3N2Zz4="
              alt="Stressed workers illustration"
              className="w-full max-w-md"
            />
          </div>

          <div className="bg-emerald-500 text-white py-4 px-8 rounded-full text-xl font-bold inline-block mb-8">
            もしかしたら
          </div>

          <h3 className="text-3xl font-bold text-emerald-400 mb-8">
            受給額を増額できる<br />かもしれません
          </h3>

          <div className="max-w-2xl mx-auto bg-white/10 rounded-2xl p-8">
            <div className="flex items-end justify-center gap-8">
              <div className="text-center">
                <div className="h-32 w-24 bg-emerald-500 relative">
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-emerald-600"></div>
                </div>
                <p className="text-white mt-2">通常申請</p>
              </div>

              <div className="text-center mb-4">
                <div className="text-pink-500 text-4xl font-bold mb-2">
                  約3.3倍
                </div>
              </div>

              <div className="text-center">
                <div className="h-32 w-24 bg-emerald-500 relative">
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-emerald-600"></div>
                  <div className="absolute bottom-1/3 left-0 right-0 h-2/3 bg-amber-400"></div>
                </div>
                <p className="text-white mt-2">退職バンク</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 