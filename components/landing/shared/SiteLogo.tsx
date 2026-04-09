"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export const SITE_LOGO_SRC = "/logo-optinu.png";

type SiteLogoProps = {
  className?: string;
  /** Tailwind height classes; width follows aspect ratio */
  heightClassName?: string;
  priority?: boolean;
};

export function SiteLogo({
  className,
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
        width={640}
        height={160}
        priority={priority}
        className="h-full w-auto max-w-[min(240px,72vw)] object-contain object-left"
      />
    </span>
  );
}
