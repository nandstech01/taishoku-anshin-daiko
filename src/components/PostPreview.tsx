import React from 'react';
import Image from 'next/image';
import SeoMeta from './blog/SeoMeta';

type PostPreviewProps = {
  title: string;
  content: string;
  thumbnailUrl?: string;
  metaDescription?: string;
};

export default function PostPreview({ title, content, thumbnailUrl, metaDescription }: PostPreviewProps) {
  return (
    <>
      <SeoMeta
        title={title}
        description={metaDescription || content.slice(0, 120)}
        ogImage={thumbnailUrl}
        type="article"
      />
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {thumbnailUrl && (
          <div className="relative w-full h-64">
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">{title}</h1>
          <div className="prose max-w-none">
            {content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
          {metaDescription && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-sm font-medium text-gray-700 mb-2">メタディスクリプション プレビュー</h2>
              <p className="text-sm text-gray-600">{metaDescription}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 