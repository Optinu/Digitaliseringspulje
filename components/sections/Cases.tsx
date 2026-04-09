"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { content } from "@/lib/content";
import { ArrowRight } from "lucide-react";

export function Cases() {
  return (
    <section id="cases" className="py-32 bg-muted/30">
      <Container>
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            {content.cases.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {content.cases.subtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {content.cases.items.map((caseItem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border-primary/10 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      Problem
                    </h3>
                    <p className="text-lg text-foreground">{caseItem.problem}</p>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="h-6 w-6 text-primary rotate-90 md:rotate-0" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      Løsning
                    </h3>
                    <p className="text-lg text-foreground">{caseItem.solution}</p>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="h-6 w-6 text-primary rotate-90 md:rotate-0" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      Resultat
                    </h3>
                    <p className="text-lg font-semibold text-primary">
                      {caseItem.result}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
