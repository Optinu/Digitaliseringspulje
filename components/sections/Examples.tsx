"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/container";
import { content } from "@/lib/content";
import { Calculator, Mail, Database, Phone, ArrowRight } from "lucide-react";

const iconMap = {
  calculator: Calculator,
  email: Mail,
  crm: Database,
  followup: Phone,
};

export function Examples() {
  const [currentStep, setCurrentStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const steps = content.examples.steps;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform for title size and position - animates in first 15% of scroll
  const titleScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.4]);
  // Start at 0 (centered at 50vh), move up as we scroll
  const titleY = useTransform(scrollYProgress, [0, 0.15], [0, -200]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 1]);

  // Transform for content - starts appearing after title animation
  const contentY = useTransform(scrollYProgress, [0.1, 0.2], [100, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);

  // Calculate which step to show based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Steps start after title animation (after 15% of scroll)
      // Each step gets equal time in the remaining 85% of scroll
      const adjustedProgress = Math.max(0, (latest - 0.15) / 0.85);
      
      // Calculate step index with better distribution
      // Each step should be visible for an equal portion of the scroll
      const stepSize = 1 / steps.length;
      let stepIndex = 0;
      
      for (let i = 0; i < steps.length; i++) {
        if (adjustedProgress >= i * stepSize && adjustedProgress < (i + 1) * stepSize) {
          stepIndex = i;
          break;
        }
      }
      
      // Ensure we show the last step when we reach the end
      if (adjustedProgress >= 1) {
        stepIndex = steps.length - 1;
      }
      
      setCurrentStep(stepIndex);
    });

    return () => unsubscribe();
  }, [scrollYProgress, steps.length]);

  const currentStepData = steps[currentStep];

  return (
    <section id="eksempler" className="relative min-h-screen">
      {/* Animated gradient background matching Hero */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            "linear-gradient(135deg, #f0fdfa 0%, #d1fae5 25%, #a7f3d0 50%, #d1fae5 75%, #f0fdfa 100%)",
            "linear-gradient(225deg, #f0fdfa 0%, #d1fae5 25%, #a7f3d0 50%, #d1fae5 75%, #f0fdfa 100%)",
            "linear-gradient(315deg, #f0fdfa 0%, #d1fae5 25%, #a7f3d0 50%, #d1fae5 75%, #f0fdfa 100%)",
            "linear-gradient(45deg, #f0fdfa 0%, #d1fae5 25%, #a7f3d0 50%, #d1fae5 75%, #f0fdfa 100%)",
            "linear-gradient(135deg, #f0fdfa 0%, #d1fae5 25%, #a7f3d0 50%, #d1fae5 75%, #f0fdfa 100%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Background with parallax effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      <Container>
        {/* Sticky container */}
        <div
          ref={containerRef}
          className="relative"
          style={{ height: "600vh" }} // 6x viewport height for smooth scrolling and to see all steps
        >
          <div className="sticky top-24 min-h-screen flex items-center justify-center relative overflow-visible">
            {/* Sticky large title - fixed at top of section, scales down slightly on scroll */}
            <motion.div
              style={{
                scale: titleScale,
                y: titleY,
                opacity: titleOpacity,
                position: "absolute",
                top: "1.5rem",
                left: "50%",
                x: "-50%",
              }}
              className="text-center origin-top w-full z-20 px-4"
            >
              <h2 className="text-5xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-tight mb-2">
                {content.examples.title}
              </h2>
              <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground/80">
                {content.examples.subtitle}
              </h3>
            </motion.div>

            <div className="w-full h-full relative overflow-visible">

              {/* Content area - scrolls through steps, appears after title animation */}
              <motion.div
                style={{
                  y: contentY,
                  opacity: contentOpacity,
                }}
                className="absolute inset-0 flex items-center justify-center z-10 overflow-visible"
              >
                {/* Main content area - shows one step at a time, centered */}
                <div className="relative w-full max-w-7xl mx-auto min-h-[320px] lg:min-h-[380px]">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ 
                        duration: 0.9, 
                        ease: [0.16, 1, 0.3, 1],
                        opacity: { duration: 0.7 }
                      }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full px-4 lg:px-8">
                        {/* Left: Visual/Animation - White card */}
                        <div className="flex items-center justify-center">
                          {currentStepData.visual === "calculator" && (
                            <CalculatorAnimation />
                          )}
                          {currentStepData.visual === "email" && (
                            <EmailAnimation />
                          )}
                          {currentStepData.visual === "crm" && (
                            <CRMAnimation />
                          )}
                          {currentStepData.visual === "followup" && (
                            <FollowUpAnimation />
                          )}
                        </div>

                        {/* Right: Content */}
                        <div className="space-y-6">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                              <span className="text-3xl font-bold text-primary">
                                {currentStepData.step}
                              </span>
                            </div>
                            {iconMap[currentStepData.visual as keyof typeof iconMap] && (
                              <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center">
                                {(() => {
                                  const Icon = iconMap[currentStepData.visual as keyof typeof iconMap];
                                  return <Icon className="h-8 w-8 text-primary" />;
                                })()}
                              </div>
                            )}
                          </div>

                          <h4 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground leading-tight">
                            {currentStepData.title}
                          </h4>
                          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                            {currentStepData.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// Calculator Animation Component
function CalculatorAnimation() {
  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md"
    >
      <div className="bg-white rounded-2xl p-8 lg:p-10 border-2 border-primary/20 shadow-xl">
        <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-6">
          <h4 className="font-bold text-lg mb-4 text-center text-foreground">Din prisberegner</h4>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-3 bg-muted rounded"
                style={{ width: i === 1 ? "75%" : i === 2 ? "100%" : "85%" }}
              />
            ))}
            <div className="h-12 bg-primary rounded-lg mt-6 flex items-center justify-center">
              <span className="text-white font-semibold">Beregn pris</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Email Animation Component
function EmailAnimation() {
  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md"
    >
      <div className="bg-white rounded-2xl p-8 lg:p-10 border-2 border-primary/20 shadow-xl">
        <div className="relative flex flex-col items-center">
          <Mail className="h-24 w-24 text-primary mb-4" strokeWidth={1.5} />
          <div className="absolute top-0 right-8 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        </div>
        <div className="text-center mt-6 pt-6 border-t border-primary/20">
          <p className="font-semibold text-foreground text-lg">Mail sendt!</p>
          <p className="text-sm text-muted-foreground mt-1">Tilbud modtaget</p>
        </div>
      </div>
    </motion.div>
  );
}

// CRM Animation Component
function CRMAnimation() {
  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md"
    >
      <div className="bg-white rounded-2xl p-8 lg:p-10 border-2 border-primary/20 shadow-xl">
        <div className="space-y-3">
          <Database className="h-20 w-20 text-primary mx-auto mb-6" strokeWidth={1.5} />
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
            >
              <div className="w-2 h-2 bg-primary rounded-full" />
              <div className="flex-1">
                <div className="h-2 bg-foreground/20 rounded w-3/4 mb-1"></div>
                <div className="h-2 bg-foreground/10 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6 pt-6 border-t border-primary/20">
          <p className="font-semibold text-foreground">Lead oprettet i CRM</p>
        </div>
      </div>
    </motion.div>
  );
}

// Follow Up Animation Component
function FollowUpAnimation() {
  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md"
    >
      <div className="bg-white rounded-2xl p-8 lg:p-10 border-2 border-primary/20 shadow-xl">
        <div className="relative mb-6 flex justify-center">
          <Phone className="h-24 w-24 text-primary" strokeWidth={1.5} />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-full border-2 border-primary/30"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
            className="absolute inset-0 rounded-full border-2 border-primary/20"
          />
        </div>
        <div className="text-center pt-6 border-t border-primary/20">
          <p className="font-semibold text-foreground text-lg">Kontakt leadet</p>
          <p className="text-sm text-muted-foreground mt-1">Ring eller send mail</p>
        </div>
      </div>
    </motion.div>
  );
}
