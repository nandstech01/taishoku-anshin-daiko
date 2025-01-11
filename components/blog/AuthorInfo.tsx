import Link from 'next/link';
import Image from 'next/image';

export interface AuthorInfoProps {
  author: {
    name: string;
    description: string;
    imageUrl: string;
  };
}

export const AuthorInfo = ({ author }: AuthorInfoProps) => {
  return (
    <div className="border-t border-gray-200 mt-12 pt-8">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <Image
            src={author.imageUrl}
            alt={author.name}
            width={64}
            height={64}
            className="rounded-full"
          />
        </div>
        <div className="flex-grow">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-gray-900">{author.name}</h3>
          </div>
          <p className="mt-1 text-gray-600 text-sm">
            {author.description}
          </p>
          <div className="mt-2">
            <Link
              href="/blog/about"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              編集部について詳しく →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 