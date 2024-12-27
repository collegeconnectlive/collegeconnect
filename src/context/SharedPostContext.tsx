"use client";
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

// Provide default values for the context
const defaultContextValue: SharedPostContextType = {
  caption: "",
  setCaption: () => {}, // No-op function for default
  images: [],
  setImages: () => {}, // No-op function for default
  progress: 0,
  setProgress: () => {}, // No-op function for default
};

const SharedPostContext = createContext<SharedPostContextType>(defaultContextValue);

export const SharedPostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [caption, setCaption] = useState<string>("");
  const [images, setImages] = useState<ImageData[]>([]);
  const [progress, setProgress] = useState<number>(0);

  return (
    <SharedPostContext.Provider
      value={{
        caption,
        setCaption,
        images,
        setImages,
        progress,
        setProgress,
      }}
    >
      {children}
    </SharedPostContext.Provider>
  );
};

export const useSharedPostContext = (): SharedPostContextType => {
  return useContext(SharedPostContext);
};
