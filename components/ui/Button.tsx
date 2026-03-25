"use client";

import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  // variant?: "default" | "primary" | "secondary" | "ghost" | "danger";
  variant?: "default" | "primary" | "secondary" | "ghost" | "danger" | "outline";
}

const Button: React.FC<ButtonProps> = ({
  children,
  href,
  variant = "default",
  className = "",
  ...props
}) => {
  const base =
    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    default: "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200",

    primary:
      "bg-[#5a20cb] text-white shadow-sm hover:bg-[#4a1aa8] active:bg-[#3f168f] focus:ring-2 focus:ring-[#5a20cb]/30",

    secondary:
      "bg-slate-900 text-white hover:bg-slate-800 shadow-sm",

    ghost:
      "text-slate-500 hover:bg-slate-100",

    danger:
      "text-red-600 hover:bg-red-50",
    outline:
      "border border-[#5a20cb] text-[#5a20cb] hover:bg-[#5a20cb]/10",
  };

  const styles = `${base} ${variants[variant]} ${className}`;

  // 👉 If href exists → render Link
  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  // 👉 Otherwise → render button
  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
};

export default Button;