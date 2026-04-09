"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { content } from "@/lib/content";
import { 
  MessageCircle, 
  Palette, 
  Code, 
  CheckCircle, 
  Rocket, 
  TrendingUp,
  ArrowRight,
  Check
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageCircle,
  Palette,
  Code,
  CheckCircle,
  Rocket,
  TrendingUp,
};

export function HowItWorks() {
  const scrollToContact = () => {
    const element = document.querySelector("#kontakt");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="sådan-virker-det" className="py-32 bg-muted/30">
      <Container>
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            {content.howItWorks.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {content.howItWorks.subtitle}
          </p>
        </div>
        
        {content.howItWorks.intro && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-16"
          >
            <p className="text-lg text-muted-foreground leading-relaxed text-center">
              {content.howItWorks.intro}
            </p>
          </motion.div>
        )}

        <div className="space-y-12 lg:space-y-16">
          {content.howItWorks.steps.map((step, i) => {
            const Icon = iconMap[step.icon];
            const isEven = i % 2 === 0;
            
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                {/* Connecting line between steps */}
                {i < content.howItWorks.steps.length - 1 && (
                  <div className="hidden lg:block absolute left-1/2 top-full w-0.5 h-12 bg-gradient-to-b from-primary/30 to-primary/10 -translate-x-1/2 z-0"></div>
                )}

                <div className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-start ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  {/* Left/Right: Icon and Number */}
                  <div className="flex-shrink-0 w-full lg:w-auto">
                    <div className="relative">
                      <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-primary/20 flex flex-col items-center justify-center min-h-[200px] lg:min-w-[200px]">
                        {Icon && (
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="mb-4"
                          >
                            <div className="rounded-2xl bg-primary/10 p-6">
                              <Icon className="h-12 w-12 text-primary" />
                            </div>
                          </motion.div>
                        )}
                        <div className="text-5xl font-bold text-primary mb-2">
                          {step.number}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center: Content */}
                  <div className="flex-1 bg-white rounded-3xl p-8 lg:p-10 shadow-lg border border-primary/10">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                          {step.title}
                        </h3>
                        <p className="text-lg font-semibold text-primary mb-4">
                          {step.subtitle}
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {step.description}
                        </p>
                      </div>

                      {step.bullets && step.bullets.length > 0 && (
                        <div className="space-y-3 mb-6">
                          {step.bullets.map((bullet, j) => (
                            <div key={j} className="flex items-start gap-3">
                              <div className="rounded-full bg-primary/10 p-1 mt-0.5 flex-shrink-0">
                                <Check className="h-4 w-4 text-primary" />
                              </div>
                              <span className="text-muted-foreground">{bullet}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {step.result && (
                        <div className="pt-4 border-t border-primary/10">
                          <div className="flex items-start gap-3">
                            <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                                Resultat:
                              </span>
                              <p className="text-foreground font-semibold mt-1">
                                {step.result}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-br from-primary/10 to-emerald-50 rounded-3xl p-12 border border-primary/20">
            <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Klar til at komme i gang?
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Book en demo, og få en konkret vurdering af, hvordan jeres beregner eller tilbudssystem kan se ud — og hvor hurtigt det kan være live.
            </p>
            <Button
              onClick={scrollToContact}
              size="lg"
              className="rounded-full text-lg px-8"
            >
              {content.nav.cta}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
