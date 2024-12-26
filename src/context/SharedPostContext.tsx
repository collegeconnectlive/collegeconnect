"use client"
import React, { createContext, useContext, useState } from "react";

type ImageData = { file: File; order: number };

type SharedPostContextType = {
  caption: string;
  setCaption: React.Dispatch<React.SetStateAction<string>>;
  images: ImageData[];
  setImages: React.Dispatch<React.SetStateAction<ImageData[]>>;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
};

const SharedPostContext = createContext<SharedPostContextType | undefined>(undefined);

export const SharedPostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [caption, setCaption] = useState<string>("");
  const [images, setImages] = useState<ImageData[]>([]);
  const [progress, setProgress]= useState<number>(0);

  return (
    <SharedPostContext.Provider value={{ caption, setCaption, images, setImages, setProgress, progress }}>
      {children}
    </SharedPostContext.Provider>
  );
};

export const useSharedPostContext = () => {
  const context = useContext(SharedPostContext);
  if (!context) {
    throw new Error("useSharedPostContext must be used within a SharedPostProvider");
  }
  return context;
};
