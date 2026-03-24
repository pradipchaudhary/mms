"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;