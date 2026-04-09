"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { content } from "@/lib/content";
import { Zap, Mail, FileText, Server, Code } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  CRM: Zap,
  "E-mail flows": Mail,
  PDF: FileText,
  Backend: Server,
  Embed: Code,
};

export function Integrations() {
  return (
    <section id="integrationer" className="py-32">
      <Container>
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            {content.integrations.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {content.integrations.subtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {content.integrations.items.map((item, i) => {
            const Icon = iconMap[item.name];
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="border-primary/10 hover:border-primary/30 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      {Icon && (
                        <div className="rounded-xl bg-primary/10 p-3">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                      )}
                      <CardTitle className="text-xl">{item.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
        {/* Network visualization */}
        <div className="relative h-64 rounded-3xl bg-gradient-to-br from-teal-50 to-emerald-50 border border-primary/10 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-5 gap-4 p-8">
              {content.integrations.items.slice(0, 5).map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="bg-white rounded-2xl px-4 py-2 text-sm font-medium text-center shadow-md border border-primary/10 cursor-grab active:cursor-grabbing"
                >
                  {item.name}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
