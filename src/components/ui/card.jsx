// src/components/ui/card.jsx
import React from "react";

export const Card = ({ children, className }) => (
  <div className={`rounded-lg shadow-md ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className }) => (
  <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>
);

export const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);
