// src/components/ui/card.jsx
import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg border bg-white p-4 shadow-sm", className)}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = ({ className, ...props }) => (
  <div className={cn("mb-2 font-semibold text-lg", className)} {...props} />
);

const CardContent = ({ className, ...props }) => (
  <div className={cn("text-sm text-muted-foreground", className)} {...props} />
);

export { Card, CardHeader, CardContent };
