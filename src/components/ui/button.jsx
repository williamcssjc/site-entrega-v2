import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-xl bg-[#8b5e3c] hover:bg-[#704429] text-white font-medium transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
