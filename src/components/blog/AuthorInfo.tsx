'use client';

import React from 'react';
import Image from 'next/image';

interface AuthorInfoProps {
  author: {
    name: string;
    avatar?: string;
  };
}

export function AuthorInfo({ author }: AuthorInfoProps) {
  return (
    <div className="mt-12 p-6 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-4">
        {author.avatar ? (
          <Image
            src={author.avatar}
            alt={author.name}
            width={64}
            height={64}
            className="rounded-full"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-2xl text-gray-500">
              {author.name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <h3 className="text-lg font-bold">{author.name}</h3>
          <p className="text-sm text-gray-600">
            退職代行のプロフェッショナル。数多くの退職相談に対応してきた経験を活かし、実践的なアドバイスを提供しています。
          </p>
        </div>
      </div>
    </div>
  );
} 