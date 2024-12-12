import React, { ChangeEvent } from "react";

type TextInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  multiLine?: boolean;
  rows?: number;
  prefix?: string; // Optional prefix prop
};

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  multiLine = false,
  rows = 3,
  prefix,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-gray-700 font-medium">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
            {prefix}
          </span>
        )}
        {multiLine ? (
          <textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            rows={rows}
            className={`${
              prefix ? "pl-10" : ""
            } outline-none px-4 py-2 w-full border border-gray-300 rounded focus:ring-2 focus:ring-black text-black`}
          />
        ) : (
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${
              prefix ? "pl-10" : ""
            } outline-none px-4 py-2 w-full border border-gray-300 rounded focus:ring-2 focus:ring-black text-black`}
          />
        )}
      </div>
    </div>
  );
};

export default TextInput;
