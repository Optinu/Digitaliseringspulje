"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { content } from "@/lib/content";

export function LogoRow() {
  const companies = content.logos.companies;
  // Duplicate companies for seamless loop
  const duplicatedCompanies = [...companies, ...companies, ...companies];
  const itemWidth = 450;
  const gap = 20; // 1.25rem = 20px
  const scrollDistance = (itemWidth + gap) * companies.length;
  const animationDuration = companies.length * 3; // 3 seconds per company
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (companyName: string) => {
    setImageErrors((prev) => new Set(prev).add(companyName));
  };

  return (
    <section className="py-16 lg:py-20 overflow-hidden">
      <Container>
        <p className="text-center text-xl lg:text-2xl font-semibold text-foreground mb-8 lg:mb-10">
          {content.logos.title}
        </p>
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex gap-4 animate-scroll-left"
              style={{
                width: 'fit-content',
                '--scroll-distance': `-${scrollDistance}px`,
                '--scroll-duration': `${animationDuration}s`,
              } as React.CSSProperties}
            >
              {duplicatedCompanies.map((company, i) => {
                const hasError = imageErrors.has(`${company.name}-${i}`);
                return (
                  <div
                    key={`${company.name}-${i}`}
                    className="flex-shrink-0"
                    style={{ width: `${itemWidth}px` }}
                  >
                    <div className="h-[120px] lg:h-[140px] flex items-center justify-center p-2">
                      {hasError ? (
                        <span className="text-lg font-medium text-muted-foreground text-center">
                          {company.name}
                        </span>
                      ) : (
                        <Image
                          src={company.image}
                          alt={company.name}
                          width={itemWidth - 16}
                          height={140}
                          className="object-contain w-auto h-[110px] lg:h-[130px]"
                          unoptimized
                          onError={() => handleImageError(`${company.name}-${i}`)}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
