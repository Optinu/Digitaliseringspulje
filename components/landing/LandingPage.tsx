"use client";

import { Navbar } from "@/components/landing/sections/Navbar";
import { HeroSection } from "@/components/landing/sections/HeroSection";
import { RelevanceSection } from "@/components/landing/sections/RelevanceSection";
import { GrantCalculatorSection } from "@/components/landing/sections/GrantCalculatorSection";
import { FAQSection } from "@/components/landing/sections/FAQSection";
import { FinalCTASection } from "@/components/landing/sections/FinalCTASection";
import { Footer } from "@/components/landing/sections/Footer";
import { MobileStickyCTA } from "@/components/landing/sections/MobileStickyCTA";

export function LandingPage() {
  return (
    <div
      className="relative pb-28 lg:pb-0 bg-[linear-gradient(180deg,#f4faf7_0%,#eef7f4_42%,#edf8f5_100%)]"
    >
      <Navbar />
      <HeroSection />
      <GrantCalculatorSection />
      <RelevanceSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}

