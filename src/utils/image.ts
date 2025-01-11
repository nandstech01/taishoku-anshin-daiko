import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

interface ImageSize {
  width: number;
  height: number;
  suffix: string;
}

const SIZES: ImageSize[] = [
  { width: 1200, height: 675, suffix: '16x9' },  // 16:9
  { width: 1200, height: 900, suffix: '4x3' },   // 4:3
  { width: 1200, height: 1200, suffix: '1x1' }   // 1:1
];

export async function processImage(inputBuffer: Buffer, originalFilename: string): Promise<string[]> {
  const timestamp = Date.now();
  const extension = path.extname(originalFilename);
  const basename = path.basename(originalFilename, extension);
  const publicDir = path.join(process.cwd(), 'public');
  const uploadDir = path.join(publicDir, 'uploads', 'blog');

  // アップロードディレクトリの作成
  await fs.mkdir(uploadDir, { recursive: true });

  // オリジナル画像の保存
  const originalFilePath = path.join(uploadDir, `${basename}-${timestamp}${extension}`);
  await fs.writeFile(originalFilePath, inputBuffer);

  // 各サイズの画像を生成
  const generatedPaths: string[] = [];
  for (const size of SIZES) {
    const resizedFilename = `${basename}-${timestamp}-${size.suffix}${extension}`;
    const resizedFilePath = path.join(uploadDir, resizedFilename);

    await sharp(inputBuffer)
      .resize(size.width, size.height, {
        fit: 'cover',
        position: 'centre'
      })
      .toFile(resizedFilePath);

    // publicディレクトリからの相対パスを返す
    generatedPaths.push(`/uploads/blog/${resizedFilename}`);
  }

  return generatedPaths;
} 