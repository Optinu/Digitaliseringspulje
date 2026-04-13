"use client";

import { motion } from "framer-motion";
import { landingContent } from "@/lib/landing-content";
import { Container } from "@/components/landing/shared/Container";
import { SectionHeader } from "@/components/landing/shared/SectionHeader";
import { LandingCard } from "@/components/landing/shared/LandingCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export function FAQSection() {
  return (
    <section id="faq" className="py-10 sm:py-14">
      <Container>
        <SectionHeader
          eyebrow="FAQ"
          title={landingContent.faq.title}
          align="center"
        />

        <div className="mt-12 grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <LandingCard className="p-7">
              <p className="text-sm font-semibold tracking-tight">
                Kort svar, rolig tone
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Vi forsøger at gøre det nemt at forstå, hvad afklaringen indebærer
                – og hvad tilskuddet ikke dækker.
              </p>
            </LandingCard>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <LandingCard className="p-2 sm:p-3">
              <Accordion className="space-y-2">
                {landingContent.faq.items.map((it, idx) => (
                  <AccordionItem
                    key={it.q}
                    value={`faq-${idx}`}
                    className="rounded-3xl border border-border/60 bg-white/70 px-5 sm:px-6"
                  >
                    <AccordionTrigger
                      className={cn(
                        "py-5 text-base sm:text-lg font-semibold tracking-tight hover:no-underline",
                        "focus-visible:ring-2 focus-visible:ring-ring rounded-2xl"
                      )}
                    >
                      <span className="pr-3">{it.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                      {it.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </LandingCard>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

