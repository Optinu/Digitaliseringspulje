import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function LandingCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border/70 bg-white/80 backdrop-blur-sm shadow-[0_12px_30px_-24px_rgba(2,44,34,0.45)]",
        className
      )}
    >
      {children}
    </div>
  );
}

