"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { content } from "@/lib/content";

export function CTA() {
  const scrollToContact = () => {
    const element = document.querySelector("#kontakt");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900 to-emerald-900"></div>
      <div className="absolute inset-0 bg-black/40"></div>
      <Container className="relative z-10">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            {content.cta.title}
          </h2>
          <p className="text-xl text-white/90 leading-relaxed">
            {content.cta.subtitle}
          </p>
          <Button
            onClick={scrollToContact}
            size="lg"
            className="rounded-full text-lg px-8 bg-white text-primary hover:bg-white/90"
          >
            {content.cta.button}
          </Button>
        </div>
      </Container>
    </section>
  );
}
