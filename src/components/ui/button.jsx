import * as React from "react";

export const Button = React.forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`bg-[#7b4b2b] text-white px-4 py-2 rounded hover:bg-[#5f3a21] transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
