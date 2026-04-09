"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionContextValue {
  value: string[];
  onValueChange: (value: string[]) => void;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(
  null
);

const AccordionItemContext = React.createContext<{ value: string } | null>(
  null
);

interface AccordionProps {
  type?: "single" | "multiple";
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

const Accordion = ({
  type = "single",
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  className,
}: AccordionProps) => {
  const [internalValue, setInternalValue] = React.useState<string[]>(
    defaultValue ? [defaultValue] : []
  );
  const value = controlledValue ? [controlledValue] : internalValue;

  const handleValueChange = React.useCallback(
    (newValue: string[]) => {
      if (!controlledValue) {
        setInternalValue(newValue);
      }
      if (onValueChange && type === "single") {
        onValueChange(newValue[0] || "");
      }
    },
    [controlledValue, onValueChange, type]
  );

  return (
    <AccordionContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <div className={cn("space-y-2", className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const AccordionItem = ({ value, children, className }: AccordionItemProps) => {
  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div className={cn("border-b border-border", className)}>{children}</div>
    </AccordionItemContext.Provider>
  );
};

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ children, className, ...props }, ref) => {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("AccordionTrigger must be inside Accordion");

  const itemContext = React.useContext(AccordionItemContext);
  if (!itemContext)
    throw new Error("AccordionTrigger must be inside AccordionItem");

  const isOpen = context.value.includes(itemContext.value);

  const handleClick = () => {
    // For single type, only allow one item open at a time
    const newValue = isOpen
      ? []
      : [itemContext.value];
    context.onValueChange(newValue);
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleClick}
      className={cn(
        "flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-200",
          isOpen && "rotate-180"
        )}
      />
    </button>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ children, className, ...props }, ref) => {
  const context = React.useContext(AccordionContext);
  const itemContext = React.useContext(AccordionItemContext);
  if (!context || !itemContext)
    throw new Error("AccordionContent must be inside Accordion and AccordionItem");

  const isOpen = context.value.includes(itemContext.value);

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden text-sm transition-all",
        isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
      )}
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </div>
  );
});
AccordionContent.displayName = "AccordionContent";

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
};
