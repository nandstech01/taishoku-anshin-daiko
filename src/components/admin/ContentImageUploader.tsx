import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { formatFileSize, optimizeImage, ImageDimensions } from '@/utils/image-optimizer';
import { processImages } from '@/services/image-service';

interface PreviewFile extends File {
  preview: string;
  optimizedPreview?: string;
  optimizedSize?: number;
  dimensions?: ImageDimensions;
  optimizedFile?: File;
  alt_text?: string;
  caption?: string;
  display_order: number;
}

interface ContentImageUploaderProps {
  postId: string;
  onImagesUploaded: (images: Array<{
    id: string;
    url: string;
    alt_text: string;
    caption: string;
    display_order: number;
  }>) => void;
}

interface ImageUploadProgress {
  onProgress: (fileName: string, progress: number) => void;
  onError: (error: Error, fileName: string) => void;
}

interface UploadError {
  fileName: string;
  error: Error;
  retries: number;
  message: string;
}

export default function ContentImageUploader({ postId, onImagesUploaded }: ContentImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [totalFiles, setTotalFiles] = useState(0);
  const [completedFiles, setCompletedFiles] = useState(0);
  const [previewFiles, setPreviewFiles] = useState<PreviewFile[]>([]);
  const [failedUploads, setFailedUploads] = useState<UploadError[]>([]);
  const [editingFile, setEditingFile] = useState<string | null>(null);
  const [deletingFile, setDeletingFile] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isBulkEditing, setIsBulkEditing] = useState(false);
  const maxRetries = 3;

  // プレビューのクリーンアップ
  React.useEffect(() => {
    return () => {
      previewFiles.forEach(file => {
        URL.revokeObjectURL(file.preview);
        if (file.optimizedPreview) {
          URL.revokeObjectURL(file.optimizedPreview);
        }
      });
    };
  }, [previewFiles]);

  const handleRetry = async (fileName: string) => {
    const failedFile = previewFiles.find(file => file.name === fileName);
    if (!failedFile) return;

    const error = failedUploads.find(upload => upload.fileName === fileName);
    if (!error || error.retries >= maxRetries) return;

    setFailedUploads(prev => prev.filter(upload => upload.fileName !== fileName));
    setUploadProgress(prev => ({ ...prev, [fileName]: 0 }));

    try {
      const fileToRetry = failedFile.optimizedFile || failedFile;
      const [uploadedImage] = await processImages([fileToRetry], {
        postId,
        onProgress: (name: string, progress: number) => {
          setUploadProgress(prev => ({
            ...prev,
            [name]: progress
          }));
          if (progress === 100) {
            setCompletedFiles(prev => prev + 1);
          }
        },
        onError: (err: Error, name: string) => {
          console.error(`Error uploading ${name}:`, err);
          setUploadProgress(prev => ({
            ...prev,
            [name]: -1
          }));
          const newError: UploadError = {
            fileName: name,
            error: err,
            retries: (error?.retries || 0) + 1,
            message: err.message || 'アップロードに失敗しました'
          };
          setFailedUploads(prev => [
            ...prev.filter(upload => upload.fileName !== name),
            newError
          ]);
        }
      });

      if (uploadedImage) {
        onImagesUploaded([uploadedImage]);
      }
    } catch (err) {
      console.error('Retry failed:', err);
    }
  };

  // ドラッグ&ドロップによる並び替え処理
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(previewFiles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // display_orderを更新
    const updatedItems = items.map((item, index) => ({
      ...item,
      display_order: index
    }));

    setPreviewFiles(updatedItems);
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // プレビューの作成
    const filesWithPreview = acceptedFiles.map((file, index) => 
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        display_order: index
      })
    );
    setPreviewFiles(filesWithPreview);

    // 画像の最適化とプレビューの更新
    try {
      const optimizedFiles = await Promise.all(
        filesWithPreview.map(async (file) => {
          const optimized = await optimizeImage(file);
          return Object.assign(file, {
            optimizedPreview: optimized.preview,
            optimizedSize: optimized.optimizedSize,
            dimensions: optimized.dimensions,
            optimizedFile: optimized.file
          });
        })
      );
      setPreviewFiles(optimizedFiles);

      setIsUploading(true);
      setTotalFiles(acceptedFiles.length);
      setCompletedFiles(0);
      setFailedUploads([]);

      // 最適化された画像をアップロード
      const optimizedFilesForUpload = optimizedFiles.map(file => file.optimizedFile || file);
      const uploadedImages = await processImages(optimizedFilesForUpload, {
        postId,
        onProgress: (fileName: string, progress: number) => {
          setUploadProgress(prev => ({
            ...prev,
            [fileName]: progress
          }));
          if (progress === 100) {
            setCompletedFiles(prev => prev + 1);
          }
        },
        onError: (error: Error, fileName: string) => {
          console.error(`Error uploading ${fileName}:`, error);
          setUploadProgress(prev => ({
            ...prev,
            [fileName]: -1
          }));
          const newError: UploadError = {
            fileName,
            error,
            retries: 0,
            message: error.message || 'アップロードに失敗しました'
          };
          setFailedUploads(prev => [...prev, newError]);
        }
      });

      if (uploadedImages.length > 0) {
        onImagesUploaded(uploadedImages);
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      if (failedUploads.length === 0) {
        setIsUploading(false);
        setPreviewFiles([]);
        setTimeout(() => {
          setUploadProgress({});
          setTotalFiles(0);
          setCompletedFiles(0);
        }, 3000);
      }
    }
  }, [postId, onImagesUploaded, failedUploads.length]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxSize: 10 * 1024 * 1024,
    multiple: true
  });

  // メタデータ更新関数
  const updateMetadata = (fileName: string, data: { alt_text?: string; caption?: string }) => {
    setPreviewFiles(prev => prev.map(file => {
      if (file.name === fileName) {
        return { ...file, ...data };
      }
      return file;
    }));
  };

  // 削除確認モーダル
  const DeleteConfirmDialog = ({ fileName, onConfirm, onCancel }: {
    fileName: string;
    onConfirm: () => void;
    onCancel: () => void;
  }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          画像を削除しますか？
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          「{fileName}」を削除します。この操作は取り消せません。
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
          >
            キャンセル
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );

  // 画像削除処理
  const handleDelete = (fileName: string) => {
    setDeletingFile(fileName);
  };

  const confirmDelete = async () => {
    if (!deletingFile) return;

    // プレビューURLの解放
    const fileToDelete = previewFiles.find(file => file.name === deletingFile);
    if (fileToDelete) {
      URL.revokeObjectURL(fileToDelete.preview);
      if (fileToDelete.optimizedPreview) {
        URL.revokeObjectURL(fileToDelete.optimizedPreview);
      }
    }

    // プレビューファイルの更新
    const updatedFiles = previewFiles
      .filter(file => file.name !== deletingFile)
      .map((file, index) => ({
        ...file,
        display_order: index
      }));

    setPreviewFiles(updatedFiles);
    setDeletingFile(null);
  };

  // 一括選択の切り替え
  const toggleFileSelection = (fileName: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileName)
        ? prev.filter(name => name !== fileName)
        : [...prev, fileName]
    );
  };

  // 一括メタデータ更新
  const updateBulkMetadata = (data: { alt_text?: string; caption?: string }) => {
    setPreviewFiles(prev => prev.map(file => {
      if (selectedFiles.includes(file.name)) {
        return { ...file, ...data };
      }
      return file;
    }));
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}
      >
        <input {...getInputProps()} aria-label="画像アップロード" />
        {isDragActive ? (
          <p className="text-indigo-500">ドロップして画像をアップロード</p>
        ) : (
          <div>
            <p className="text-gray-600">クリックまたはドラッグ＆ドロップで画像をアップロード</p>
            <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF (最大10MB)</p>
            <p className="text-xs text-gray-500">※画像は自動的に最適化されます</p>
            {isUploading && (
              <p className="text-sm text-gray-500 mt-2">
                {completedFiles} / {totalFiles} 完了
              </p>
            )}
          </div>
        )}
      </div>

      {/* プレビュー表示 */}
      {previewFiles.length > 0 && !isUploading && (
        <>
          {/* 一括編集コントロール */}
          {selectedFiles.length > 0 && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-600">
                  {selectedFiles.length}個の画像を選択中
                </span>
                <button
                  onClick={() => setIsBulkEditing(!isBulkEditing)}
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  {isBulkEditing ? '完了' : '一括編集'}
                </button>
              </div>

              {isBulkEditing && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      代替テキスト
                    </label>
                    <input
                      type="text"
                      onChange={(e) => updateBulkMetadata({ alt_text: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="選択した画像の代替テキストを一括設定"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      キャプション
                    </label>
                    <textarea
                      onChange={(e) => updateBulkMetadata({ caption: e.target.value })}
                      rows={2}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="選択した画像のキャプションを一括設定"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="image-list">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="mt-4 space-y-6"
                >
                  {previewFiles
                    .sort((a, b) => a.display_order - b.display_order)
                    .map((file, index) => (
                      <Draggable
                        key={file.name}
                        draggableId={file.name}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`border rounded-lg p-4 ${
                              snapshot.isDragging ? 'shadow-lg bg-white' : ''
                            } ${selectedFiles.includes(file.name) ? 'ring-2 ring-indigo-500' : ''}`}
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={selectedFiles.includes(file.name)}
                                  onChange={() => toggleFileSelection(file.name)}
                                  className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <div
                                  {...provided.dragHandleProps}
                                  className="mr-2 text-gray-400 hover:text-gray-600 cursor-move"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
                                  </svg>
                                </div>
                                <h3 className="font-medium text-gray-900">
                                  {file.name}
                                  <span className="ml-2 text-sm text-gray-500">
                                    (表示順: {file.display_order + 1})
                                  </span>
                                </h3>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => setEditingFile(editingFile === file.name ? null : file.name)}
                                  className="text-sm text-indigo-600 hover:text-indigo-800"
                                >
                                  {editingFile === file.name ? '完了' : 'メタデータを編集'}
                                </button>
                                <button
                                  onClick={() => handleDelete(file.name)}
                                  className="text-sm text-red-600 hover:text-red-800"
                                >
                                  削除
                                </button>
                              </div>
                            </div>

                            {editingFile === file.name && (
                              <div className="mb-4 space-y-4">
                                <div>
                                  <label htmlFor={`alt-${file.name}`} className="block text-sm font-medium text-gray-700">
                                    代替テキスト
                                  </label>
                                  <input
                                    type="text"
                                    id={`alt-${file.name}`}
                                    value={file.alt_text || ''}
                                    onChange={(e) => updateMetadata(file.name, { alt_text: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="画像の説明を入力"
                                  />
                                  <p className="mt-1 text-xs text-gray-500">
                                    画像が表示できない場合や、スクリーンリーダーで読み上げる際に使用されます
                                  </p>
                                </div>
                                <div>
                                  <label htmlFor={`caption-${file.name}`} className="block text-sm font-medium text-gray-700">
                                    キャプション
                                  </label>
                                  <textarea
                                    id={`caption-${file.name}`}
                                    value={file.caption || ''}
                                    onChange={(e) => updateMetadata(file.name, { caption: e.target.value })}
                                    rows={2}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="画像の説明や補足情報を入力"
                                  />
                                </div>
                              </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                              {/* オリジナル画像 */}
                              <div>
                                <p className="text-sm text-gray-500 mb-2">オリジナル ({formatFileSize(file.size)})</p>
                                <div className="relative group">
                                  <img
                                    src={file.preview}
                                    alt={file.alt_text || `Original: ${file.name}`}
                                    className="w-full h-40 object-cover rounded border border-gray-200"
                                  />
                                </div>
                              </div>
                              {/* 最適化後の画像 */}
                              {file.optimizedPreview && (
                                <div>
                                  <p className="text-sm text-gray-500 mb-2">
                                    最適化後 ({formatFileSize(file.optimizedSize || 0)})
                                    {file.dimensions && ` - ${file.dimensions.width}x${file.dimensions.height}`}
                                  </p>
                                  <div className="relative group">
                                    <img
                                      src={file.optimizedPreview}
                                      alt={file.alt_text || `Optimized: ${file.name}`}
                                      className="w-full h-40 object-cover rounded border border-gray-200"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                                      <div className="text-white text-xs text-center p-2">
                                        <p>サイズ削減: {formatFileSize(file.size - (file.optimizedSize || 0))}</p>
                                        <p>削減率: {Math.round((1 - (file.optimizedSize || 0) / file.size) * 100)}%</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            {file.caption && (
                              <p className="mt-2 text-sm text-gray-600">{file.caption}</p>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </>
      )}

      {/* 削除確認モーダル */}
      {deletingFile && (
        <DeleteConfirmDialog
          fileName={deletingFile}
          onConfirm={confirmDelete}
          onCancel={() => setDeletingFile(null)}
        />
      )}

      {/* アップロード進捗表示 */}
      {isUploading && (
        <div className="mt-4 space-y-2">
          {Object.entries(uploadProgress).map(([fileName, progress]) => (
            <div key={fileName} className="text-sm">
              <div className="flex justify-between mb-1">
                <span className="text-gray-700">{fileName}</span>
                <div className="flex items-center">
                  <span className={`${progress === -1 ? 'text-red-500' : 'text-gray-500'}`}>
                    {progress === -1 ? 'エラー' : `${progress}%`}
                  </span>
                  {progress === -1 && (
                    <button
                      onClick={() => handleRetry(fileName)}
                      className="ml-2 text-indigo-600 hover:text-indigo-800"
                      disabled={(failedUploads.find(u => u.fileName === fileName)?.retries ?? 0) >= maxRetries}
                    >
                      再試行
                    </button>
                  )}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    progress === -1 ? 'bg-red-500' : 'bg-indigo-600'
                  }`}
                  style={{ width: `${progress === -1 ? 100 : progress}%` }}
                />
              </div>
              {progress === -1 && (
                <div className="mt-1 text-xs">
                  <p className="text-red-500">
                    {failedUploads.find(u => u.fileName === fileName)?.message || 'アップロードに失敗しました'}
                  </p>
                  {(failedUploads.find(u => u.fileName === fileName)?.retries ?? 0) >= maxRetries && (
                    <p className="text-red-500 mt-1">
                      最大試行回数に達しました。後でもう一度お試しください。
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 