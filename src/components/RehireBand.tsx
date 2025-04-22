import Link from 'next/link';

const RehireBand = () => {
  return (
    <section className="w-full bg-gradient-to-b from-white via-[#F0F9FF] to-white py-6 sm:py-8 md:max-h-[200px]">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:gap-6">
        {/* Left: Badge */}
        <div className="hidden sm:block">
          <span className="inline-block whitespace-nowrap rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            退職エージェント
          </span>
        </div>

        {/* Center: Text Content */}
        <div className="flex flex-grow flex-col items-center text-center sm:items-start sm:text-left">
          <h2 className="text-lg font-bold text-gray-900">
            退職 × AIスキルでキャリア再起動。
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            退職あんしん代行が生んだ"退職エージェント"モデル
          </p>
          <p className="mt-2 text-xs text-gray-500">
            例）元飲食スタッフが3か月でAI運用担当として年収＋120万円で再就職
          </p>
          {/* Badge for mobile */}
          <div className="mt-3 sm:hidden">
            <span className="inline-block whitespace-nowrap rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              退職エージェント
            </span>
          </div>
        </div>

        {/* Right: CTA Button */}
        <div className="mt-4 flex-shrink-0 sm:mt-0">
          <Link
            href="/agent"
            className="inline-flex items-center rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            詳しく見る →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RehireBand; 