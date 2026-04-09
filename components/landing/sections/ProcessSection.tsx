"use client";

import { motion } from "framer-motion";
import { landingContent } from "@/lib/landing-content";
import { Container } from "@/components/landing/shared/Container";
import { SectionHeader } from "@/components/landing/shared/SectionHeader";
import { LandingCard } from "@/components/landing/shared/LandingCard";
import { cn } from "@/lib/utils";

export function ProcessSection() {
  return (
    <section id="proces" className="py-20 sm:py-24 bg-background">
      <Container>
        <SectionHeader
          eyebrow="Proces"
          title={landingContent.process.title}
          subtitle={landingContent.process.subtitle}
          align="center"
        />

        {/* Desktop: horizontal timeline */}
        <div className="mt-12 hidden lg:block">
          <div className="relative">
            <div className="absolute left-6 right-6 top-7 h-px bg-border/70" />
            <div className="grid grid-cols-4 gap-6">
              {landingContent.process.steps.map((s, idx) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                    delay: idx * 0.03,
                  }}
                >
                  <LandingCard className="h-full p-6">
                    <div className="flex items-start justify-between gap-4">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary font-semibold">
                        {idx + 1}
                      </span>
                      <span className="mt-2 text-xs font-medium tracking-[0.16em] uppercase text-muted-foreground">
                        Trin {idx + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {s.text}
                    </p>
                  </LandingCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/tablet: vertical timeline */}
        <div className="mt-10 lg:hidden">
          <div className="relative">
            <div className="absolute left-5 top-2 bottom-2 w-px bg-border/70" />
            <div className="space-y-4">
              {landingContent.process.steps.map((s, idx) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                    delay: idx * 0.03,
                  }}
                  className="relative pl-10"
                >
                  <span
                    className={cn(
                      "absolute left-1.5 top-6 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-sm font-semibold shadow-sm"
                    )}
                  >
                    {idx + 1}
                  </span>
                  <LandingCard className="p-6">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {s.text}
                    </p>
                  </LandingCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

