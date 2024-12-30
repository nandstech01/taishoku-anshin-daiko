'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadImage } from '@/utils/supabase-storage';

interface ImageUploaderProps {
  onUpload: (url: string) => void;
  onError?: (error: Error) => void;
}

export default function ImageUploader({ onUpload, onError }: ImageUploaderProps) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const file = acceptedFiles[0];
      if (!file) return;

      const url = await uploadImage(file);
      onUpload(url);
    } catch (error) {
      console.error('Upload error:', error);
      onError?.(error as Error);
    }
  }, [onUpload, onError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false
  });

  const inputProps = getInputProps() as any;
  const rootProps = getRootProps() as any;

  return (
    <div
      {...rootProps}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}
    >
      <input {...inputProps} aria-label="画像アップロード" />
      {isDragActive ? (
        <p className="text-indigo-500">ドロップして画像をアップロード</p>
      ) : (
        <div>
          <p className="text-gray-600">クリックまたはドラッグ＆ドロップで画像をアップロード</p>
          <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF (最大5MB)</p>
        </div>
      )}
    </div>
  );
} 