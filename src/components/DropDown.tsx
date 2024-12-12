"use client";
import React, { useState, useEffect, useRef } from "react";

type DropdownProps = {
  options: string[];
  option?: string | null; // Predefined option, optional
  selected: string;
  onSelect: (value: string) => void;
  label?: string;
};

const Dropdown: React.FC<DropdownProps> = ({ options, option, selected, onSelect, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(option || selected || "");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {label && <label className="text-black font-medium mb-2 block">{label}</label>}
      <input
        type="text"
        value={option || searchTerm} // Use the static `option` if provided
        className={`w-full text-black px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none ${
          option ? "bg-gray-200 cursor-not-allowed" : ""
        }`}
        placeholder="Select or search..."
        readOnly={!!option} // Make input read-only if `option` exists
        onFocus={() => !option && setIsOpen(true)} // Allow focus only if `option` is not preset
        onChange={(e) => !option && setSearchTerm(e.target.value)} // Update search term only if `option` is not preset
      />
      {isOpen && !option && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-40 overflow-y-auto z-10">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, index) => (
              <li
                key={index}
                onClick={() => {
                  onSelect(opt); // Select the option
                  setSearchTerm(opt); // Update input with the selected option
                  setIsOpen(false); // Close the dropdown
                }}
                className="px-4 py-2 text-black hover:bg-yellow-300 cursor-pointer"
              >
                {opt}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No options found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
