import React from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/supabase';

interface ContentImageProps {
  imageId: string;
  className?: string;
}

export default function ContentImage({ imageId, className = '' }: ContentImageProps) {
  const [imageData, setImageData] = React.useState<{
    image_url: string;
    alt_text: string;
    caption: string;
  } | null>(null);

  React.useEffect(() => {
    const fetchImageData = async () => {
      const { data, error } = await supabase
        .from('post_images')
        .select('image_url, alt_text, caption')
        .eq('id', imageId)
        .single();

      if (error) {
        console.error('Error fetching image:', error);
        return;
      }

      if (data) {
        setImageData(data);
      }
    };

    fetchImageData();
  }, [imageId]);

  if (!imageData) {
    return null;
  }

  return (
    <figure className={`my-8 ${className}`}>
      <div className="relative w-full h-[400px]">
        <Image
          src={imageData.image_url}
          alt={imageData.alt_text}
          fill
          className="object-contain"
          loading="lazy"
          quality={75}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      {imageData.caption && (
        <figcaption className="text-center text-sm text-gray-600 mt-2">
          {imageData.caption}
        </figcaption>
      )}
    </figure>
  );
} 