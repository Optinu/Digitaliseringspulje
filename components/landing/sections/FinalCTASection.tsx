"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { landingContent } from "@/lib/landing-content";
import { Container } from "@/components/landing/shared/Container";
import { PrimaryCTA } from "@/components/landing/shared/CTAs";

export function FinalCTASection() {
  return (
    <section
      id="book"
      className="py-10 sm:py-14"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[40px] border border-primary/20 bg-white/78 backdrop-blur p-8 sm:p-10 lg:p-12 shadow-[0_28px_76px_-48px_rgba(15,118,110,0.5)]"
        >
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
                {landingContent.finalCta.title}
              </h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-foreground/75 max-w-2xl">
                {landingContent.finalCta.subtitle}
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <PrimaryCTA className="px-7">
                {landingContent.finalCta.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </PrimaryCTA>
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-3 gap-3 text-xs text-foreground/70">
            <div className="rounded-2xl border border-border/60 bg-white/70 px-4 py-3">
              15–30 min. afklaring
            </div>
            <div className="rounded-2xl border border-border/60 bg-white/70 px-4 py-3">
              Uforpligtende samtale
            </div>
            <div className="rounded-2xl border border-border/60 bg-white/70 px-4 py-3">
              Fokus på næste bedste skridt
            </div>
          </div>

          <p className="mt-6 text-xs text-foreground/55">
            {/* TODO: indsæt bookinglink / Calendly og evt. indlejret widget */}
            TODO: Tilslut bookinglink (Calendly) og tracking.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

