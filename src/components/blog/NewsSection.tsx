import { newsItems } from '@/mock/posts';

export function NewsSection() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">ニュース・お知らせ</h2>
      <div className="space-y-4">
        {newsItems.map((news, index) => (
          <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
            <h3 className="font-bold text-gray-900">{news.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{news.content}</p>
            <p className="text-xs text-gray-400 mt-2">{news.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 