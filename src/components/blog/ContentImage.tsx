import React from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/supabase';

interface ContentImageProps {
  imageId: string;
  className?: string;
}

export default function ContentImage({ imageId, className = '' }: ContentImageProps) {
  console.log('ContentImage component mounted with ID:', imageId);

  const [imageData, setImageData] = React.useState<{
    image_url: string;
    alt_text: string;
    caption: string;
  } | null>(null);

  React.useEffect(() => {
    const fetchImageData = async () => {
      console.log('Fetching image data for ID:', imageId);
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
        console.log('Image data received:', data);
        setImageData(data);
      }
    };

    fetchImageData();
  }, [imageId]);

  if (!imageData) {
    console.log('No image data available yet');
    return null;
  }

  console.log('Rendering image with data:', imageData);
  return (
    <figure className={`my-8 ${className}`}>
      <div className="relative w-full h-[400px]">
        <Image
          src={imageData.image_url}
          alt={imageData.alt_text}
          fill
          className="object-contain"
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