import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { supabase } from '@/lib/supabase/supabase';
import ContentImageUploader from './ContentImageUploader';

interface ContentImage {
  id: string;
  image_url: string;
  alt_text: string;
  caption: string;
  display_order: number;
}

interface ContentImageManagerProps {
  postId: string;
  onImageSelect?: (imageId: string) => void;
}

export default function ContentImageManager({ 
  postId, 
  onImageSelect = () => {} 
}: ContentImageManagerProps) {
  const [images, setImages] = useState<ContentImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetchImages();
  }, [postId]);

  const fetchImages = async () => {
    if (!postId) {
      setImages([]);
      return;
    }

    const { data, error } = await supabase
      .from('post_images')
      .select('*')
      .eq('post_id', postId)
      .order('display_order');

    if (error) {
      console.error('Error fetching images:', error);
      return;
    }

    setImages(data || []);
  };

  const handleImagesUploaded = (newImages: Array<{
    id: string;
    url: string;
    alt_text: string;
    caption: string;
    display_order: number;
  }>) => {
    setImages(prev => [...prev, ...newImages.map(img => ({
      ...img,
      image_url: img.url
    }))]);
  };

  const handleImageClick = (imageId: string) => {
    setSelectedImage(imageId);
    onImageSelect(imageId);
  };

  const handleUpdateAltText = async (imageId: string, altText: string) => {
    const { error } = await supabase
      .from('post_images')
      .update({ alt_text: altText })
      .eq('id', imageId);

    if (error) {
      console.error('Error updating alt text:', error);
      return;
    }

    setImages(prev =>
      prev.map(img =>
        img.id === imageId ? { ...img, alt_text: altText } : img
      )
    );
  };

  const handleUpdateCaption = async (imageId: string, caption: string) => {
    const { error } = await supabase
      .from('post_images')
      .update({ caption })
      .eq('id', imageId);

    if (error) {
      console.error('Error updating caption:', error);
      return;
    }

    setImages(prev =>
      prev.map(img =>
        img.id === imageId ? { ...img, caption } : img
      )
    );
  };

  const handleDeleteImage = async (imageId: string) => {
    const { error } = await supabase
      .from('post_images')
      .delete()
      .eq('id', imageId);

    if (error) {
      console.error('Error deleting image:', error);
      return;
    }

    setImages(prev => prev.filter(img => img.id !== imageId));
    if (selectedImage === imageId) {
      setSelectedImage(null);
    }
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update display_order for all affected images
    const updatedItems = items.map((item, index) => ({
      ...item,
      display_order: index
    }));

    setImages(updatedItems);

    // Update the database
    const { error } = await supabase
      .from('post_images')
      .upsert(
        updatedItems.map(({ id, display_order }) => ({
          id,
          display_order,
          updated_at: new Date().toISOString()
        }))
      );

    if (error) {
      console.error('Error updating image order:', error);
      fetchImages(); // Revert to original order on error
    }
  };

  return (
    <div className="space-y-6">
      <ContentImageUploader
        postId={postId}
        onImagesUploaded={handleImagesUploaded}
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="images">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6"
            >
              {images.map((image, index) => (
                <Draggable
                  key={image.id}
                  draggableId={image.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`relative group border rounded-lg p-2 ${
                        selectedImage === image.id ? 'ring-2 ring-indigo-500' : ''
                      } ${snapshot.isDragging ? 'shadow-lg' : ''}`}
                    >
                      <img
                        src={image.image_url}
                        alt={image.alt_text}
                        className="w-full h-40 object-cover rounded cursor-pointer"
                        onClick={() => handleImageClick(image.id)}
                      />
                      
                      <div className="mt-2 space-y-2">
                        <input
                          type="text"
                          value={image.alt_text}
                          onChange={(e) => handleUpdateAltText(image.id, e.target.value)}
                          className="w-full text-sm border-gray-300 rounded-md"
                          placeholder="代替テキスト"
                        />
                        
                        <input
                          type="text"
                          value={image.caption}
                          onChange={(e) => handleUpdateCaption(image.id, e.target.value)}
                          className="w-full text-sm border-gray-300 rounded-md"
                          placeholder="キャプション"
                        />
                        
                        <button
                          onClick={() => handleDeleteImage(image.id)}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          削除
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
} 