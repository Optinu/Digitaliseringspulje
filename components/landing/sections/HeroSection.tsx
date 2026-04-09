"use client";

import { motion } from "framer-motion";
import { Play, ShieldCheck } from "lucide-react";
import { landingContent } from "@/lib/landing-content";
import { Container } from "@/components/landing/shared/Container";
import { PrimaryCTA, SecondaryCTA } from "@/components/landing/shared/CTAs";
import { HeroLogoCarousel } from "@/components/landing/sections/HeroLogoCarousel";

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
};

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center"
    >
      <div className="pointer-events-none fixed inset-0 -z-10">
        {/* Base aurora glow */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_20%,rgba(16,185,129,0.30),transparent_58%),radial-gradient(110%_70%_at_85%_15%,rgba(20,184,166,0.24),transparent_60%),radial-gradient(100%_70%_at_55%_90%,rgba(34,197,94,0.22),transparent_62%)]" />

        {/* Wave 1 */}
        <motion.div
          className="absolute inset-x-[-25%] top-[6%] h-[38%]"
          style={{
            background:
              "linear-gradient(100deg, rgba(16,185,129,0) 0%, rgba(16,185,129,0.34) 28%, rgba(20,184,166,0.46) 52%, rgba(16,185,129,0.30) 72%, rgba(16,185,129,0) 100%)",
            filter: "blur(28px)",
            mixBlendMode: "screen",
            borderRadius: "40% 60% 55% 45% / 55% 45% 60% 40%",
          }}
          animate={{
            x: ["-28%", "20%", "-28%"],
            y: ["-4%", "5%", "-4%"],
            rotate: [-3, 3, -3],
            opacity: [0.55, 0.95, 0.55],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Wave 2 */}
        <motion.div
          className="absolute inset-x-[-20%] top-[32%] h-[40%]"
          style={{
            background:
              "linear-gradient(82deg, rgba(20,184,166,0) 0%, rgba(20,184,166,0.30) 26%, rgba(34,197,94,0.40) 50%, rgba(16,185,129,0.30) 72%, rgba(16,185,129,0) 100%)",
            filter: "blur(30px)",
            mixBlendMode: "screen",
            borderRadius: "55% 45% 50% 50% / 45% 55% 45% 55%",
          }}
          animate={{
            x: ["24%", "-24%", "24%"],
            y: ["4%", "-6%", "4%"],
            rotate: [3, -3, 3],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Wave 3 */}
        <motion.div
          className="absolute inset-x-[-24%] bottom-[-8%] h-[42%]"
          style={{
            background:
              "linear-gradient(112deg, rgba(34,197,94,0) 0%, rgba(34,197,94,0.32) 30%, rgba(16,185,129,0.42) 50%, rgba(20,184,166,0.30) 72%, rgba(20,184,166,0) 100%)",
            filter: "blur(28px)",
            mixBlendMode: "screen",
            borderRadius: "48% 52% 45% 55% / 58% 42% 54% 46%",
          }}
          animate={{
            x: ["-22%", "24%", "-22%"],
            y: ["2%", "-5%", "2%"],
            rotate: [-2.5, 2.5, -2.5],
            opacity: [0.52, 0.92, 0.52],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <Container className="relative w-full pt-20 sm:pt-24 pb-6 sm:pb-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="max-w-xl lg:col-span-6 lg:pr-6">
            <motion.div {...fadeUp}>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/70 px-3 py-1.5 text-xs font-medium text-foreground/80 shadow-sm">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Støtteberettiget rådgivning – afklaring, analyse og planlægning
              </div>
            </motion.div>

            <motion.h1
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.06 }}
              className="mt-8 font-display text-4xl sm:text-5xl lg:text-[56px] leading-[1.06] font-semibold tracking-tight"
            >
              {landingContent.hero.headline}
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.12 }}
              className="mt-7 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-prose"
            >
              {landingContent.hero.subheadline}
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.18 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <PrimaryCTA className="px-7">
                {landingContent.hero.primaryCta}
              </PrimaryCTA>
              <SecondaryCTA href="#puljeberegner" className="px-7">
                {landingContent.hero.secondaryCta}
              </SecondaryCTA>
            </motion.div>

            <motion.p
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.23 }}
              className="mt-6 text-sm text-foreground/75"
            >
              {landingContent.hero.microcopy}
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.26 }}
            >
              <HeroLogoCarousel className="mt-10" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:col-span-6"
          >
            <div className="absolute -inset-5 -z-10 rounded-[44px] bg-white/35 blur-sm" />

            <div className="relative rounded-[36px] border border-border/60 bg-white/55 p-3 sm:p-4 shadow-[0_24px_64px_-48px_rgba(2,44,34,0.6)]">
              <div className="relative overflow-hidden rounded-[28px] bg-[#0b1f1a] aspect-[4/5] sm:aspect-[16/10]">
                {/* TODO: indsæt rigtig video (mp4/webm) + poster */}
                <video
                  className="absolute inset-0 h-full w-full object-cover opacity-95"
                  playsInline
                  muted
                  loop
                  autoPlay
                  preload="metadata"
                >
                  {/* <source src="/video/optinu-hero.webm" type="video/webm" /> */}
                  {/* <source src="/video/optinu-hero.mp4" type="video/mp4" /> */}
                </video>

                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

                <button
                  type="button"
                  className="absolute left-5 bottom-5 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-3 text-white/90 backdrop-blur-sm hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  aria-label="Afspil video (TODO)"
                  // TODO: åbn modal / lightbox video hvis ønsket
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                    <Play className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium">Se kort eksempel</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

