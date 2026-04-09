"use client";

import { ArrowRight } from "lucide-react";
import { landingContent } from "@/lib/landing-content";
import { PrimaryCTA } from "@/components/landing/shared/CTAs";
import { Container } from "@/components/landing/shared/Container";

export function MobileStickyCTA() {
  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-50 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 bg-background/75 backdrop-blur border-t border-border/60">
      <Container>
        <PrimaryCTA className="w-full justify-center py-3 text-base">
          {landingContent.nav.primaryCta}
          <ArrowRight className="ml-2 h-4 w-4" />
        </PrimaryCTA>
        <p className="mt-2 text-[11px] leading-snug text-muted-foreground text-center">
          15–30 min. · Uforpligtende · Fokus på afklaring
        </p>
      </Container>
    </div>
  );
}

