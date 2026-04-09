"use client";

import { motion } from "framer-motion";
import { ArrowLeftRight, ClipboardList, Gauge, Layers } from "lucide-react";
import { landingContent } from "@/lib/landing-content";
import { Container } from "@/components/landing/shared/Container";
import { SectionHeader } from "@/components/landing/shared/SectionHeader";
import { LandingCard } from "@/components/landing/shared/LandingCard";

const icons = [ArrowLeftRight, ClipboardList, Gauge, Layers] as const;

export function ProblemSection() {
  return (
    <section id="problem" className="py-20 sm:py-24 bg-background">
      <Container>
        <SectionHeader
          eyebrow="Genkendelse"
          title={landingContent.problem.title}
          subtitle={landingContent.problem.subtitle}
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {landingContent.problem.cards.map((c, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: idx * 0.03 }}
              >
                <LandingCard className="h-full p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {c.text}
                  </p>
                </LandingCard>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

