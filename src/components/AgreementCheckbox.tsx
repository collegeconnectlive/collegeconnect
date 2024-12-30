"use client";

import React from "react";
import Link from "next/link";

type AgreementCheckboxProps = {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  text: string;
  link: {
    href: string;
    label: string;
  };
};

const AgreementCheckbox: React.FC<AgreementCheckboxProps> = ({
  isChecked,
  onChange,
  text,
  link,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
        className="form-checkbox h-4 w-4 text-yellow-500"
      />
      <label className="text-gray-700 text-sm">
        {text}{" "}
        <Link href={link.href} className="text-yellow-500 underline">
          {link.label}
        </Link>
      </label>
    </div>
  );
};

export default AgreementCheckbox;
