import React from "react";

export const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-md p-6 ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children }) => {
  return <h2 className="text-2xl font-bold mb-4 text-[#5C3A1C]">{children}</h2>;
};

export const CardContent = ({ children }) => {
  return <div className="text-gray-700">{children}</div>;
};
