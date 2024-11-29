"use client"
import React from "react";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
};

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = "primary", disabled = false, type }) => {
  const baseStyles = "px-4 py-2 rounded font-medium focus:outline-none";
  const variants = {
    primary: "bg-black text-white hover:bg-yellow-400 hover:text-black hover:scale-110 disabled:bg-blue-300 ease-in-out transition delay-50 cursor-pointerease-in-out transition delay-50 cursor-pointer",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 disabled:bg-gray-300",
    outline: "border border-gray-500 text-gray-500 hover:bg-gray-100 disabled:border-gray-300 disabled:text-gray-300",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? "cursor-not-allowed" : ""}`}
      type = {type}
    >
      {label}
    </button>
  );
};

export default Button;