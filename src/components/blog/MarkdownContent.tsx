import React from 'react';
import ContentImage from './ContentImage';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

interface ContentPart {
  type: 'text' | 'image';
  content?: string;
  imageId?: string;
}

export default function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  console.log('MarkdownContent received:', content);

  const renderContent = () => {
    // 画像IDを抽出する正規表現
    const imageRegex = /!\[\[([a-f0-9-]+)\]\]/g;
    
    // コンテンツを分割して配列に格納
    const parts: ContentPart[] = [];
    let lastIndex = 0;
    let match;

    while ((match = imageRegex.exec(content)) !== null) {
      console.log('Found image match:', match);
      // マッチした部分の前のテキストを追加
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.slice(lastIndex, match.index)
        });
      }

      // 画像を追加
      parts.push({
        type: 'image',
        imageId: match[1]
      });

      lastIndex = match.index + match[0].length;
    }

    // 残りのテキストを追加
    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex)
      });
    }

    console.log('Parsed content parts:', parts);

    // 各パーツをレンダリング
    return parts.map((part, index) => {
      if (part.type === 'text' && part.content) {
        return (
          <div key={index} className="prose max-w-none">
            {part.content.split('\n').map((paragraph, pIndex) => {
              // 見出しの処理
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={pIndex} className="text-2xl font-bold mt-8 mb-4">
                    {paragraph.slice(3)}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={pIndex} className="text-xl font-bold mt-6 mb-3">
                    {paragraph.slice(4)}
                  </h3>
                );
              }
              if (paragraph.startsWith('#### ')) {
                return (
                  <h4 key={pIndex} className="text-lg font-bold mt-4 mb-2">
                    {paragraph.slice(5)}
                  </h4>
                );
              }

              // 通常の段落
              return paragraph ? (
                <p key={pIndex} className="mb-4">
                  {paragraph}
                </p>
              ) : null;
            })}
          </div>
        );
      } else if (part.type === 'image' && part.imageId) {
        console.log('Rendering image with ID:', part.imageId);
        return <ContentImage key={index} imageId={part.imageId} />;
      }
      return null;
    });
  };

  return (
    <div className={className}>
      {renderContent()}
    </div>
  );
} 