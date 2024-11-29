"use client";
import React, { useState, useEffect, useRef } from "react";

type DropdownProps = {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  label?: string;
};

const Dropdown: React.FC<DropdownProps> = ({ options, selected, onSelect, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(selected || "");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
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
        value={searchTerm}
        onFocus={() => setIsOpen(true)} // Open dropdown on focus
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        className="w-full text-black px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none"
        placeholder="Select or search..."
      />
      {isOpen && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-40 overflow-y-auto z-10">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  onSelect(option); // Select the option
                  setSearchTerm(option); // Update input with the selected option
                  setIsOpen(false); // Close the dropdown
                }}
                className="px-4 py-2 text-black hover:bg-yellow-300 cursor-pointer"
              >
                {option}
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
