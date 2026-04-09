"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, Check } from "lucide-react";
import { landingContent } from "@/lib/landing-content";
import { Container } from "@/components/landing/shared/Container";
import { SectionHeader } from "@/components/landing/shared/SectionHeader";
import { LandingCard } from "@/components/landing/shared/LandingCard";
import { SiteLogo } from "@/components/landing/shared/SiteLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function WhitepaperSection() {
  const [status, setStatus] = useState<"idle" | "success">("idle");

  return (
    <section
      id="whitepaper"
      className="py-20 sm:py-24 bg-[linear-gradient(180deg,transparent,rgba(16,185,129,0.05),transparent)]"
    >
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Whitepaper"
              title={landingContent.whitepaper.title}
              subtitle={landingContent.whitepaper.subtitle}
            />

            <div className="mt-8 space-y-3">
              {landingContent.whitepaper.bullets.map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="text-sm leading-relaxed text-foreground/80">{b}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid md:grid-cols-2 gap-5 items-stretch">
              {/* PDF mock */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <LandingCard className="h-full p-6 sm:p-7 overflow-hidden">
                  <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-primary/10 blur-2xl" />
                  <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-accent/10 blur-2xl" />
                  <div className="relative h-full min-h-[260px] rounded-3xl border border-border/60 bg-white/70 p-6 shadow-sm">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                      <FileText className="h-4 w-4 text-primary" />
                      PDF – Whitepaper
                    </div>
                    <div className="mt-6">
                      <SiteLogo heightClassName="h-6" className="opacity-95" />
                      <p className="mt-3 text-xl font-semibold tracking-tight">
                        3 skjulte tidsrøvere
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        i din arbejdsgang
                      </p>
                    </div>
                    <div className="mt-8 grid gap-2 text-xs text-muted-foreground">
                      <div className="h-2 rounded-full bg-border/70" />
                      <div className="h-2 w-4/5 rounded-full bg-border/60" />
                      <div className="h-2 w-3/5 rounded-full bg-border/50" />
                    </div>
                    <p className="mt-8 text-xs text-muted-foreground">
                      {/* TODO: indsæt rigtigt PDF cover (image) */}
                      Cover mockup (TODO)
                    </p>
                  </div>
                </LandingCard>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.04 }}
              >
                <LandingCard className="h-full p-6 sm:p-7">
                  <p className="text-sm font-semibold tracking-tight">
                    Download gratis
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Udfyld felterne, så sender vi whitepaperet.
                  </p>

                  <form
                    className="mt-6 space-y-3"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setStatus("success");
                      // TODO: CRM/form integration + faktisk levering af PDF
                      // TODO: analytics tracking (download intent)
                    }}
                  >
                    <label className="block">
                      <span className="sr-only">{landingContent.whitepaper.form.name}</span>
                      <Input
                        required
                        name="name"
                        placeholder={landingContent.whitepaper.form.name}
                        className="rounded-2xl h-11"
                      />
                    </label>
                    <label className="block">
                      <span className="sr-only">{landingContent.whitepaper.form.company}</span>
                      <Input
                        required
                        name="company"
                        placeholder={landingContent.whitepaper.form.company}
                        className="rounded-2xl h-11"
                      />
                    </label>
                    <label className="block">
                      <span className="sr-only">{landingContent.whitepaper.form.email}</span>
                      <Input
                        required
                        type="email"
                        name="email"
                        placeholder={landingContent.whitepaper.form.email}
                        className="rounded-2xl h-11"
                      />
                    </label>

                    <Button
                      type="submit"
                      className={cn(
                        "w-full rounded-2xl h-11 bg-primary text-primary-foreground hover:bg-primary/90"
                      )}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {landingContent.whitepaper.form.cta}
                    </Button>
                  </form>

                  {status === "success" ? (
                    <div className="mt-5 rounded-3xl border border-primary/15 bg-primary/5 p-4">
                      <p className="text-sm text-foreground/80">
                        Tak. Næste step er at forbinde formularen til PDF-levering.
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {landingContent.whitepaper.todoNote}
                      </p>
                    </div>
                  ) : null}

                  <p className="mt-5 text-xs text-muted-foreground">
                    {/* TODO: cookie consent + privacy tekst/links */}
                    Ved download accepterer I at blive kontaktet i relation til indholdet (TODO:
                    præcisér privacy).
                  </p>
                </LandingCard>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

