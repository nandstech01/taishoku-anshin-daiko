export interface ImageDimensions {
  width: number;
  height: number;
}

export interface OptimizedImage {
  file: File;
  dimensions: ImageDimensions;
  preview: string;
  originalSize: number;
  optimizedSize: number;
}

interface OptimizeOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

const DEFAULT_OPTIONS: Required<OptimizeOptions> = {
  maxWidth: 1920,
  maxHeight: 1080,
  quality: 0.8
};

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export async function optimizeImage(
  file: File,
  options: OptimizeOptions = {}
): Promise<OptimizedImage> {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  const originalSize = file.size;

  // 画像をロード
  const img = await createImageBitmap(file);
  
  // サイズを計算
  const { width, height } = calculateDimensions(
    img.width,
    img.height,
    mergedOptions.maxWidth,
    mergedOptions.maxHeight
  );

  // Canvas作成
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');

  // 画像を描画
  ctx.drawImage(img, 0, 0, width, height);

  // 画像をBlobに変換
  const blob = await new Promise<Blob>((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else throw new Error('Failed to convert canvas to blob');
      },
      'image/jpeg',
      mergedOptions.quality
    );
  });

  // プレビューURLを生成
  const preview = URL.createObjectURL(blob);

  // 新しいFileオブジェクトを作成
  const optimizedFile = new File([blob], file.name, {
    type: 'image/jpeg',
    lastModified: file.lastModified
  });

  return {
    file: optimizedFile,
    dimensions: { width, height },
    preview,
    originalSize,
    optimizedSize: optimizedFile.size
  };
}

function calculateDimensions(
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number
): ImageDimensions {
  const ratio = Math.min(1, maxWidth / width, maxHeight / height);
  return {
    width: Math.round(width * ratio),
    height: Math.round(height * ratio)
  };
} 