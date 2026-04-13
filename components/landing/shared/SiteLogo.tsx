"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export const SITE_LOGO_SRC = "/logo-optinu.svg";

type SiteLogoProps = {
  className?: string;
  /** Applied to the inner <Image> (e.g. max-width overrides) */
  imageClassName?: string;
  /** Tailwind height classes; width follows aspect ratio */
  heightClassName?: string;
  priority?: boolean;
};

export function SiteLogo({
  className,
  imageClassName,
  heightClassName = "h-8 sm:h-9",
  priority,
}: SiteLogoProps) {
  return (
    <span
      className={cn("relative inline-flex items-center align-middle", heightClassName, className)}
    >
      <Image
        src={SITE_LOGO_SRC}
        alt="Optinu.dk"
        width={2560}
        height={1400}
        priority={priority}
        unoptimized
        className={cn(
          "h-full w-auto max-w-[min(240px,72vw)] object-contain object-left",
          imageClassName
        )}
      />
    </span>
  );
}
