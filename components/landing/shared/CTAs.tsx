"use client";

import * as React from "react";
import { buttonVariants, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const BOOKING_HREF = "https://calendar.app.google/zdKKX2L8PtMRNXRB8";
// TODO: tilføj analytics tracking på CTA klik

type CTAProps = {
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  children: React.ReactNode;
  className?: string;
  size?: ButtonProps["size"];
};

export function PrimaryCTA({
  href = BOOKING_HREF,
  onClick,
  children,
  className,
  size = "lg",
}: CTAProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        buttonVariants({ size, variant: "default" }),
        "rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        className
      )}
    >
      {children}
    </a>
  );
}

export function SecondaryCTA({
  href,
  onClick,
  children,
  className,
  size = "lg",
}: CTAProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        buttonVariants({ size, variant: "outline" }),
        "rounded-full border-primary/25 bg-background/60 hover:bg-accent/15 hover:text-foreground",
        className
      )}
    >
      {children}
    </a>
  );
}

export function TertiaryCTA({
  href,
  onClick,
  children,
  className,
}: Omit<CTAProps, "size">) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "text-sm font-medium text-foreground/80 hover:text-foreground underline underline-offset-4 decoration-foreground/20 hover:decoration-foreground/50 transition-colors",
        className
      )}
    >
      {children}
    </a>
  );
}

