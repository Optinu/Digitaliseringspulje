"use client";

import { motion } from "framer-motion";
import { Building2, MapPinned, Puzzle, ShieldCheck } from "lucide-react";
import { landingContent } from "@/lib/landing-content";
import { Container } from "@/components/landing/shared/Container";
import { SectionHeader } from "@/components/landing/shared/SectionHeader";
import { LandingCard } from "@/components/landing/shared/LandingCard";

const icons = [Building2, Puzzle, MapPinned, ShieldCheck] as const;

export function RelevanceSection() {
  return (
    <section
      id="relevans"
      className="py-10 sm:py-14"
    >
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Vurdering"
              title={landingContent.relevance.title}
              subtitle={landingContent.relevance.subtitle}
            />
            <div className="mt-8 rounded-3xl border border-border/60 bg-white/70 p-6 shadow-sm">
              <p className="text-sm leading-relaxed text-foreground/80">
                Det vigtigste er ikke at “gøre noget digitalt”. Det vigtigste er
                at vælge det rigtige første skridt – med et beslutningsgrundlag,
                der passer til jeres virkelighed.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-5">
              {landingContent.relevance.items.map((it, idx) => {
                const Icon = icons[idx % icons.length];
                return (
                  <motion.div
                    key={it.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: idx * 0.03 }}
                    className={idx === 1 ? "sm:translate-y-6" : undefined}
                  >
                    <LandingCard className="h-full p-6 sm:p-7">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-5 text-lg font-semibold tracking-tight">
                        {it.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {it.text}
                      </p>
                    </LandingCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

