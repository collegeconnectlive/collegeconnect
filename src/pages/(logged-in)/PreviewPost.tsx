"use client";

import React, { useState } from "react";
import ImageUpload from "@/components/ImageUpload";
import TextInput from "@/components/TextInput";
import Loading from "@/components/Loading";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useSharedPostContext } from "@/context/SharedPostContext";
import { SubmitToInstagram } from "@/app/api/(previewPost)/SubmitToInstagram";

type PreviewPostProps = {
  schoolID: string;
};
export const PreviewPost: React.FC<PreviewPostProps> = ({ schoolID }) => {
  const { caption, setCaption, images, setImages, progress, setProgress } = useSharedPostContext();
  const [message, setMessage]= useState("")
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      caption,
      images,
      schoolID
    };

    setLoading(true);
    setProgress(50);

    // Submit to StoreForm
    const response = await SubmitToInstagram(formData, setProgress);

    if (response.success) {
      router.push("upload-success");
    } else {
      setLoading(false);
      setMessage(response.message || "Error occurred during upload.");
    }
  };

  if (loading) return <Loading progress={progress} />

  return (
    <form onSubmit={handleSubmit}  className="p-6 space-y-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center text-black">
        Review Your Post
      </h1>

      <TextInput
        label="Review & Edit Your Caption"
        placeholder="Personal or school email"
        value={caption}
        multiLine
        rows={5}
        onChange={(e) => setCaption(e.target.value)}
      />
      <ImageUpload
        label="Review, Reorder, & Edit Your Pictures"
        maxImages={5}
        images={images}
        setImages={setImages}
      />
      <Button label="Submit" type="submit" />
      <div className="text-red-600 text-lg">{message}</div>
    </form>
  );
}
