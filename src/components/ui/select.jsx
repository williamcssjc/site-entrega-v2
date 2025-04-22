import * as React from "react";
import {
  Select as RadixSelect,
  SelectTrigger as RadixSelectTrigger,
  SelectValue as RadixSelectValue,
  SelectContent as RadixSelectContent,
  SelectItem as RadixSelectItem,
  SelectViewport,
  ItemIndicator,
  ItemText,
} from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Select = RadixSelect;

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <RadixSelectTrigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-white px-3 py-2 text-sm text-black ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
  </RadixSelectTrigger>
));
SelectTrigger.displayName = RadixSelectTrigger.displayName;

const SelectValue = RadixSelectValue;

const SelectContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <RadixSelectContent
    ref={ref}
    className={cn(
      "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white text-black shadow-md",
      className
    )}
    {...props}
  >
    <SelectViewport className="p-1">{children}</SelectViewport>
  </RadixSelectContent>
));
SelectContent.displayName = RadixSelectContent.displayName;

const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <RadixSelectItem
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 focus:bg-gray-200 text-black",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ItemIndicator>
        <Check className="h-4 w-4" />
      </ItemIndicator>
    </span>
    <ItemText>{children}</ItemText>
  </RadixSelectItem>
));
SelectItem.displayName = RadixSelectItem.displayName;

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
};
