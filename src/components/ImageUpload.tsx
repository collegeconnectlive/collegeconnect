import React, { useState } from "react";
import Image from "next/image";

type ImageUploadProps = {
  label?: string;
  maxImages?: number;
  images: { file: File; order: number }[];
  setImages: React.Dispatch<React.SetStateAction<{ file: File; order: number }[]>>;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  label = "Upload Images",
  maxImages = 5,
  images = [],
  setImages,
}) => {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newImages = Array.from(e.target.files).map((file, index) => ({
      file,
      order: images.length + index,
    }));
    setImages((prev) => [...prev, ...newImages].slice(0, maxImages));
  };

  const handleRemoveImage = (event: React.MouseEvent, index: number) => {
    event.preventDefault();
    event.stopPropagation();
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggingIndex === null || draggingIndex === index) return;

    const reorderedImages = [...images];
    const [draggedImage] = reorderedImages.splice(draggingIndex, 1);
    reorderedImages.splice(index, 0, draggedImage);

    setImages(
      reorderedImages.map((img, idx) => ({
        ...img,
        order: idx,
      }))
    );
    setDraggingIndex(index);
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
  };

  const handleTouchStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!element) return;

    const parent = element.closest("[data-index]");
    if (parent) {
      const targetIndex = parseInt(parent.getAttribute("data-index") || "-1", 10);
      if (targetIndex !== draggingIndex && targetIndex >= 0) {
        const reorderedImages = [...images];
        const [draggedImage] = reorderedImages.splice(draggingIndex!, 1);
        reorderedImages.splice(targetIndex, 0, draggedImage);

        setImages(
          reorderedImages.map((img, idx) => ({
            ...img,
            order: idx,
          }))
        );
        setDraggingIndex(targetIndex);
      }
    }
  };

  const handleTouchEnd = () => {
    setDraggingIndex(null);
  };

  const preventContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col space-y-2 select-none">
      {label && <label className="text-gray-700 font-medium">{label}</label>}
      <div className="border border-gray-300 rounded p-4">
        <div className="flex flex-wrap gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              data-index={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              onTouchStart={() => handleTouchStart(index)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onContextMenu={preventContextMenu}
              className="relative w-24 h-24 cursor-move"
            >
              <Image
                src={URL.createObjectURL(image.file)}
                alt={`Uploaded ${index}`}
                fill
                className="object-cover rounded"
              />
              <button
                onClick={(e) => handleRemoveImage(e, index)}
                className="absolute top-0 right-0 bg-black text-white text-sm rounded-full w-6 h-6 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          ))}
          {images.length < maxImages && (
            <label
              htmlFor="file-upload"
              className="w-24 h-24 border border-dashed border-gray-300 rounded flex items-center justify-center text-gray-500 cursor-pointer hover:border-black"
            >
              +
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-2">You can upload up to {maxImages} images.</p>
      </div>
    </div>
  );
};

export default ImageUpload;
