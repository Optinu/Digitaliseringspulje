"use client";

import { Container } from "@/components/ui/container";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { content } from "@/lib/content";

export function FAQ() {
  return (
    <section id="faq" className="py-32 bg-muted/20">
      <Container>
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            {content.faq.title}
          </h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" defaultValue={content.faq.items[0].question}>
            {content.faq.items.map((item, i) => (
              <AccordionItem key={i} value={item.question}>
                <AccordionTrigger className="text-left text-lg font-semibold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
}
