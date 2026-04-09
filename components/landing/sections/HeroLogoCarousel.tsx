"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { landingContent } from "@/lib/landing-content";
import { cn } from "@/lib/utils";

export function HeroLogoCarousel({ className }: { className?: string }) {
  const companies = landingContent.hero.logos.customers;
  const duplicated = useMemo(
    () => [...companies, ...companies, ...companies],
    [companies]
  );

  const itemWidth = 190;
  const gap = 14;
  const scrollDistance = (itemWidth + gap) * companies.length;
  const duration = Math.max(18, companies.length * 3.2);

  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const handleImageError = (key: string) =>
    setImageErrors((prev) => new Set(prev).add(key));

  return (
    <div className={cn("mt-10", className)}>
      <p className="text-xs font-medium tracking-[0.16em] uppercase text-muted-foreground">
        {landingContent.hero.logos.title}
      </p>

      <div className="mt-4 relative">
        <div
          className="overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          <div
            className="flex items-center gap-3 py-4 px-4 animate-scroll-left"
            style={
              {
                width: "fit-content",
                ["--scroll-distance" as string]: `-${scrollDistance}px`,
                ["--scroll-duration" as string]: `${duration}s`,
              } as React.CSSProperties
            }
          >
            {duplicated.map((c, i) => {
              const key = `${c.name}-${i}`;
              const hasImage = Boolean(c.image);
              const hasError = imageErrors.has(key);

              return (
                <div
                  key={key}
                  className="flex-shrink-0"
                  style={{ width: `${itemWidth}px` }}
                >
                  <div className="h-14 sm:h-16 px-4 flex items-center justify-center">
                    {hasImage && !hasError ? (
                      <Image
                        src={c.image}
                        alt={c.name}
                        width={170}
                        height={48}
                        className="h-10 w-auto object-contain opacity-85"
                        unoptimized
                        onError={() => handleImageError(key)}
                      />
                    ) : (
                      <span className="text-sm font-medium text-foreground/65">
                        {c.name}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

