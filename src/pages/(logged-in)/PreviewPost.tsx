"use client";
import React, { useState, useEffect } from "react";
import ImageUpload from "@/components/ImageUpload"; // Reuse your ImageUpload component
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { useRouter } from "next/navigation";
import Image from "next/image";

const PreviewPage = ({ studentId }: { studentId: string }) => {
  const [submission, setSubmission] = useState<any>(null);
  const [caption, setCaption] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const router = useRouter();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Fetch the current submission
  useEffect(() => {
    const fetchSubmission = async () => {
      const response = await fetch(`/api/get-submission?studentId=${studentId}`);
      if (response.ok) {
        const data = await response.json();
        setSubmission(data);
        setCaption(data.caption || "");
        setImages(data.images.map((img: any) => img.url));
      }

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating submission:", errorData?.error || "Unknown error");
        alert("Failed to update submission. Please try again.");
      }
      
    };

    fetchSubmission();
  }, [studentId]);

  // Save updated data
  const handleSave = async () => {
    
    const response = await fetch(`/api/update-submission`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, caption, imageUrls: images }),
    });

    if (response.ok) {
      router.push("/final-preview"); // Navigate to the final preview or success page
    } else {
      console.error("Failed to update submission");
    }
  };

  // Handle drag start
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  // Handle drag over
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    event.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const reorderedImages = Array.from(images);
    const [movedItem] = reorderedImages.splice(draggedIndex, 1);
    reorderedImages.splice(index, 0, movedItem);
    setDraggedIndex(index);
    setImages(reorderedImages);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  if (!submission) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-center text-xl font-bold">Review Your Submission</h1>
      <TextInput
        label="Caption"
        placeholder="Edit your caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        multiLine
        rows={4}
      />
      <div className="space-y-4">
        {images.map((url, index) => (
          <div
            key={url}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className="flex items-center space-x-4 border p-2 rounded cursor-move"
          >
            <Image
              src={url}
              alt={`Uploaded ${index}`}
              className="w-20 h-20 object-cover rounded"
              width={80}
              height={80}
            />
            <button
              onClick={() => setImages(images.filter((_, i) => i !== index))}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <ImageUpload
        label="Edit Pictures ..."
        images={[]}
        setImages={(newImages: File[]) =>
          setImages([...images, ...newImages.map((img) => URL.createObjectURL(img))])
        }
      />
      <Button label="Save and Submit" onClick={handleSave} />
    </div>
  );
};

export default PreviewPage;
