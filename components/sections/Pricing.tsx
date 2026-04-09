"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { content } from "@/lib/content";
import { Check } from "lucide-react";

export function Pricing() {
  const [selectedBase, setSelectedBase] = useState<string | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());
  const [selectedSupport, setSelectedSupport] = useState<string>("3months");

  const scrollToContact = () => {
    const element = document.querySelector("#kontakt");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(addonId)) {
        newSet.delete(addonId);
      } else {
        newSet.add(addonId);
      }
      return newSet;
    });
  };

  const calculateTotal = () => {
    let total = 0;

    if (selectedBase) {
      const base = content.pricing.calculator.baseTypes.find((b) => b.id === selectedBase);
      if (base) total += base.basePrice;
    }

    selectedAddons.forEach((addonId) => {
      const addon = content.pricing.calculator.addons.find((a) => a.id === addonId);
      if (addon) total += addon.price;
    });

    const support = content.pricing.calculator.support.find((s) => s.id === selectedSupport);
    if (support) total += support.price;

    return total;
  };

  const total = calculateTotal();

  return (
    <section id="priser" className="py-32 bg-muted/20">
      <Container>
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            {content.pricing.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {content.pricing.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left: Calculator Options */}
          <div className="lg:col-span-2 space-y-8">
            {/* Base Type Selection */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                1. Vælg grundpakke
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {content.pricing.calculator.baseTypes.map((base) => (
                  <motion.button
                    key={base.id}
                    onClick={() => setSelectedBase(base.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-6 rounded-xl border-2 text-left transition-all ${
                      selectedBase === base.id
                        ? "border-primary bg-primary/5 shadow-lg"
                        : "border-muted hover:border-primary/30 bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">
                          {base.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {base.description}
                        </p>
                        <div className="text-2xl font-bold text-primary">
                          {base.basePrice.toLocaleString("da-DK")} kr.
                        </div>
                      </div>
                      {selectedBase === base.id && (
                        <div className="rounded-full bg-primary p-1">
                          <Check className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Addons Selection */}
            {selectedBase && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  2. Vælg tilvalg
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {content.pricing.calculator.addons.map((addon) => {
                    const isSelected = selectedAddons.has(addon.id);
                    return (
                      <motion.button
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-5 rounded-xl border-2 text-left transition-all ${
                          isSelected
                            ? "border-primary bg-primary/5 shadow-lg"
                            : "border-muted hover:border-primary/30 bg-white"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-foreground">
                                {addon.name}
                              </h4>
                              {isSelected && (
                                <Check className="h-4 w-4 text-primary" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {addon.description}
                            </p>
                            <div className="text-lg font-bold text-primary">
                              +{addon.price.toLocaleString("da-DK")} kr.
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Support Selection */}
            {selectedBase && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  3. Vælg support periode
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {content.pricing.calculator.support.map((support) => (
                    <motion.button
                      key={support.id}
                      onClick={() => setSelectedSupport(support.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-5 rounded-xl border-2 text-left transition-all ${
                        selectedSupport === support.id
                          ? "border-primary bg-primary/5 shadow-lg"
                          : "border-muted hover:border-primary/30 bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">
                          {support.name}
                        </span>
                        {selectedSupport === support.id && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                        {support.price > 0 && (
                          <span className="text-primary font-bold">
                            +{support.price.toLocaleString("da-DK")} kr.
                          </span>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right: Price Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <Card className="border-primary/20 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Din pris
                  </h3>
                  
                  {!selectedBase ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">
                        Vælg en grundpakke for at se din pris
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        {(() => {
                          const base = content.pricing.calculator.baseTypes.find(
                            (b) => b.id === selectedBase
                          );
                          return base ? (
                            <div className="flex justify-between items-center pb-3 border-b">
                              <span className="text-muted-foreground">
                                {base.name}
                              </span>
                              <span className="font-semibold">
                                {base.basePrice.toLocaleString("da-DK")} kr.
                              </span>
                            </div>
                          ) : null;
                        })()}

                        {Array.from(selectedAddons).map((addonId) => {
                          const addon = content.pricing.calculator.addons.find(
                            (a) => a.id === addonId
                          );
                          return addon ? (
                            <div
                              key={addonId}
                              className="flex justify-between items-center text-sm"
                            >
                              <span className="text-muted-foreground">
                                {addon.name}
                              </span>
                              <span className="font-semibold">
                                +{addon.price.toLocaleString("da-DK")} kr.
                              </span>
                            </div>
                          ) : null;
                        })}

                        {(() => {
                          const support = content.pricing.calculator.support.find(
                            (s) => s.id === selectedSupport
                          );
                          return support && support.price > 0 ? (
                            <div className="flex justify-between items-center text-sm pt-3 border-t">
                              <span className="text-muted-foreground">
                                {support.name}
                              </span>
                              <span className="font-semibold">
                                +{support.price.toLocaleString("da-DK")} kr.
                              </span>
                            </div>
                          ) : null;
                        })()}
                      </div>

                      <div className="pt-4 border-t-2 border-primary/20">
                        <div className="flex justify-between items-center mb-6">
                          <span className="text-xl font-bold text-foreground">
                            I alt
                          </span>
                          <span className="text-3xl font-bold text-primary">
                            {total.toLocaleString("da-DK")} kr.
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-6">
                          Alle priser er ekskl. moms og inkluderer installation
                        </p>
                        <Button
                          onClick={scrollToContact}
                          className="w-full rounded-full"
                          size="lg"
                        >
                          {content.nav.cta}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
