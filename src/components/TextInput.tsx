"use client";
import React from "react";

type InputProps = {
  type?: string; // Input type for single-line input
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  label?: string;
  multiLine?: boolean; // New prop to enable multiline input
  rows?: number; // Number of rows for the multiline textarea
};

const TextInput: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  label,
  multiLine = false,
  rows = 3, // Default rows for textarea
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && <label className="text-gray-700 font-medium">{label}</label>}
      {multiLine ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          className="px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none text-black resize-none"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none text-black"
        />
      )}
    </div>
  );
};

export default TextInput;
