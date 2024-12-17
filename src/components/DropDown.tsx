"use client";
import React, { useState, useEffect, useRef } from "react";

type Option = {
  value: string;
  label: string;
};

type DropdownProps = {
  options?: Option[] | null;
  selected: string;
  onSelect: (value: string) => void;
  label?: string;
};

const Dropdown: React.FC<DropdownProps> = ({ options, selected, onSelect, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayLabel, setDisplayLabel] = useState<string>(
    options?.find((opt) => opt.value === selected)?.label || ""
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Safely filter options based on search term
  const filteredOptions = options?.filter(
    (opt) => opt.label && opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Update displayed label when selected changes
  useEffect(() => {
    const selectedOption = options?.find((opt) => opt.value === selected);
    setDisplayLabel(selectedOption?.label || "");
  }, [options, selected]);

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
        value={searchTerm || displayLabel}
        className="w-full text-black px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none"
        placeholder="Select or search..."
        onFocus={() => setIsOpen(true)}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsOpen(true);
        }}
      />
      {isOpen && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-40 overflow-y-auto z-10">
          {filteredOptions && filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <li
                key={opt.value}
                onClick={() => {
                  onSelect(opt.value);
                  setDisplayLabel(opt.label);
                  setSearchTerm("");
                  setIsOpen(false);
                }}
                className={`px-4 py-2 text-black hover:bg-yellow-300 cursor-pointer ${
                  opt.value === selected ? "bg-yellow-100" : ""
                }`}
              >
                {opt.label}
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
