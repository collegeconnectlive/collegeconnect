import React, { useState, ChangeEvent } from "react";

interface PhoneNumberInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => {
  const [isValid, setIsValid] = useState(true);

  // Format the phone number as (XXX) XXX-XXXX
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, ""); // Remove non-numeric characters
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      const [, areaCode, prefix, lineNumber] = match;
      return `${areaCode ? `(${areaCode}) ` : ""}${prefix ? `${prefix}` : ""}${lineNumber ? `-${lineNumber}` : ""}`.trim();
    }
    return value;
  };

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formatted = formatPhoneNumber(rawValue);
    onChange(formatted);

    // Validate phone number
    const cleaned = rawValue.replace(/\D/g, "");
    const valid = cleaned.length === 10;
    setIsValid(valid);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="phone" className="text-gray-700 font-medium">
        {label}
      </label>
      <input
        id="phone"
        type="text"
        value={value}
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 text-black ${
          isValid ? "border-gray-300 focus:ring-green-500" : "border-red-500 focus:ring-red-500"
        }`}
        placeholder={placeholder}
      />
      {!isValid && (
        <p className="mt-1 text-sm text-red-500">Please enter a valid 10-digit phone number.</p>
      )}
    </div>
  );
};

export default PhoneNumberInput;
