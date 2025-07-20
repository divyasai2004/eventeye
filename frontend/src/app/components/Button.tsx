import React from "react";

export default function Button({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-3 rounded-xl font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
} 