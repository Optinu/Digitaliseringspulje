"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { content } from "@/lib/content";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [selectedOption, setSelectedOption] = useState("option2");
  const [buildStep, setBuildStep] = useState(0);

  // Auto-build animation sequence - loops continuously
  useEffect(() => {
    // Start immediately with step 0
    setBuildStep(0);
    
    const steps = [0, 1, 2, 3, 4, 5, 6]; // 0 = title only, 6 = complete
    let currentStep = 0;
    let intervalId: NodeJS.Timeout | null = null;
    let restartTimeout: NodeJS.Timeout | null = null;

    const startAnimation = () => {
      // Clear any existing interval
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      if (restartTimeout) {
        clearTimeout(restartTimeout);
        restartTimeout = null;
      }
      
      currentStep = 0;
      setBuildStep(0);
      
      intervalId = setInterval(() => {
        if (currentStep < steps.length - 1) {
          currentStep++;
          setBuildStep(steps[currentStep]);
        } else {
          // Stop interval and restart after pause
          if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
          }
          // Reset and start over after a brief pause
          restartTimeout = setTimeout(() => {
            startAnimation();
          }, 2000); // Wait 2 seconds before restarting
        }
      }, 1000); // Change step every 1000ms for smoother transitions
    };

    // Start after initial render
    const timeout = setTimeout(() => {
      startAnimation();
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (intervalId) {
        clearInterval(intervalId);
      }
      if (restartTimeout) {
        clearTimeout(restartTimeout);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const backgroundX = useTransform(mouseX, [0, 1], [-20, 20]);
  const backgroundY = useTransform(mouseY, [0, 1], [-20, 20]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32"
    >
      {/* Animated gradient background */}
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
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Background with parallax effect */}
      <motion.div
        style={{
          x: backgroundX,
          y: backgroundY,
        }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </motion.div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            <Badge className="rounded-full bg-primary/10 text-primary border-primary/20">
              {content.hero.badge}
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              {content.hero.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {content.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => scrollToSection("#kontakt")}
                size="lg"
                className="rounded-full text-lg px-8"
              >
                {content.hero.buttons.primary}
              </Button>
              <Button
                onClick={() => scrollToSection("#priser")}
                variant="outline"
                size="lg"
                className="rounded-full text-lg px-8"
              >
                {content.hero.buttons.secondary}
              </Button>
            </div>
            <p className="pt-2 text-sm text-muted-foreground">
              {content.hero.microcopy}
            </p>
          </div>

          {/* Right: Price Calculator Form - Progressive Build */}
          <div className="relative h-[450px] lg:h-[550px] flex items-center justify-center overflow-visible">
            {/* Code Window - Behind calculator, more visible */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: -10 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -z-0 hidden lg:block w-[500px] lg:w-[580px] h-[360px] lg:h-[420px] bg-[#1e1e1e] rounded-lg shadow-2xl border-2 border-gray-500/70 overflow-hidden"
              style={{
                top: "-5%",
                left: "-15%",
                transform: "rotate(-12deg)",
              }}
            >
              {/* Code Editor Header */}
              <div className="flex items-center gap-2 px-5 py-3 bg-[#252526] border-b border-gray-700/50">
                <div className="flex gap-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-500"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-yellow-500"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-green-500"></div>
                </div>
                <span className="ml-4 text-sm text-gray-200 font-mono font-semibold">calculator.tsx</span>
              </div>
              
              {/* Code Content */}
              <div className="flex-1 p-6 font-mono text-base lg:text-[16px] text-gray-200 overflow-auto">
                <div className="space-y-1">
                  {/* Line numbers and code */}
                  {buildStep >= 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="flex gap-4"
                    >
                      <span className="text-gray-600 select-none">1</span>
                      <span className="text-blue-400">const</span>{" "}
                      <span className="text-orange-400">Calculator</span>{" "}
                      <span className="text-gray-400">=</span>{" "}
                      <span className="text-gray-400">()</span>{" "}
                      <span className="text-gray-400">=&gt;</span>{" "}
                      <span className="text-gray-400">{"{"}</span>
                    </motion.div>
                  )}
                  
                  {buildStep >= 1 && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-4"
                      >
                        <span className="text-gray-600 select-none">2</span>
                        <span className="text-gray-400">  </span>
                        <span className="text-blue-400">return</span>{" "}
                        <span className="text-gray-400">(</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-4"
                      >
                        <span className="text-gray-600 select-none">3</span>
                        <span className="text-gray-400">    {"<"}</span>
                        <span className="text-orange-400">div</span>
                        <span className="text-gray-400"> </span>
                        <span className="text-purple-400">className</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-green-400">&quot;calculator&quot;</span>
                        <span className="text-gray-400">{">"}</span>
                      </motion.div>
                    </>
                  )}
                  
                  {buildStep >= 2 && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-4"
                      >
                        <span className="text-gray-600 select-none">4</span>
                        <span className="text-gray-400">      {"<"}</span>
                        <span className="text-orange-400">ProgressIndicator</span>
                        <span className="text-gray-400"> {" />"}</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-4"
                      >
                        <span className="text-gray-600 select-none">5</span>
                        <span className="text-gray-400">      {"<"}</span>
                        <span className="text-orange-400">Option</span>
                        <span className="text-gray-400"> </span>
                        <span className="text-purple-400">value</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-green-400">&quot;1&quot;</span>
                        <span className="text-gray-400"> {" />"}</span>
                      </motion.div>
                    </>
                  )}
                  
                  {buildStep >= 3 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-4"
                    >
                      <span className="text-gray-600 select-none">6</span>
                      <span className="text-gray-400">      {"<"}</span>
                      <span className="text-orange-400">Option</span>
                      <span className="text-gray-400"> </span>
                      <span className="text-purple-400">value</span>
                      <span className="text-gray-400">=</span>
                      <span className="text-green-400">&quot;2&quot;</span>
                      <span className="text-gray-400"> </span>
                      <span className="text-purple-400">selected</span>
                      <span className="text-gray-400"> {" />"}</span>
                    </motion.div>
                  )}
                  
                  {buildStep >= 4 && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-4"
                      >
                        <span className="text-gray-600 select-none">7</span>
                        <span className="text-gray-400">      {"<"}</span>
                        <span className="text-orange-400">Option</span>
                        <span className="text-gray-400"> </span>
                        <span className="text-purple-400">value</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-green-400">&quot;3&quot;</span>
                        <span className="text-gray-400"> {" />"}</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-4"
                      >
                        <span className="text-gray-600 select-none">8</span>
                        <span className="text-gray-400">      {"<"}</span>
                        <span className="text-orange-400">Button</span>
                        <span className="text-gray-400">{" >"}</span>
                        <span className="text-gray-300">Næste</span>
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-orange-400">Button</span>
                        <span className="text-gray-400">{">"}</span>
                      </motion.div>
                    </>
                  )}
                  
                  {buildStep >= 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="flex gap-4"
                    >
                      <span className="text-gray-600 select-none">9</span>
                      <span className="text-gray-400">    {"</"}</span>
                      <span className="text-orange-400">div</span>
                      <span className="text-gray-400">{">"}</span>
                    </motion.div>
                  )}
                  
                  {buildStep >= 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="flex gap-4"
                    >
                      <span className="text-gray-600 select-none">10</span>
                      <span className="text-gray-400">  {"}"}</span>
                    </motion.div>
                  )}
                  
                  {buildStep >= 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="flex gap-4"
                    >
                      <span className="text-gray-600 select-none">11</span>
                      <span className="text-gray-400">{"}"}</span>
                    </motion.div>
                  )}
                  
                  {/* Cursor blink effect */}
                  {buildStep >= 0 && (
                    <motion.div
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="flex gap-4"
                    >
                      <span className="text-gray-600 select-none">12</span>
                      <span className="text-gray-300">_</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              layout
              className="relative w-full max-w-sm rounded-3xl bg-white border border-primary/10 shadow-xl p-6 lg:p-7 flex flex-col z-10 ml-auto mr-8 pointer-events-none" 
              style={{ transform: "rotate(3deg)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Step 1: Progress Indicator - Reserve space to prevent layout shift */}
              <div className="mb-6 min-h-[40px] flex items-center justify-center">
                {buildStep >= 1 && (
                  <motion.div
                    key="progress"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full"
                  >
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <div className="w-8 h-0.5 bg-primary/20"></div>
                      <div className="w-3 h-3 rounded-full border-2 border-primary/30 bg-transparent"></div>
                      <div className="w-8 h-0.5 bg-primary/20"></div>
                      <div className="w-3 h-3 rounded-full border-2 border-primary/30 bg-transparent"></div>
                      <div className="w-8 h-0.5 bg-primary/20"></div>
                      <div className="w-3 h-3 rounded-full border-2 border-primary/30 bg-transparent"></div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Step 0: Form Title and Subtitle - Always visible */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
                  Din prisberegner
                </h2>
                <p className="text-sm text-muted-foreground mb-6 text-center">
                  Vælg mellem de tre muligheder herunder
                </p>
              </div>

              {/* Step 1-3: Options Container - Reserve space to prevent layout shift */}
              <motion.div 
                layout
                className="flex-1 space-y-4 mb-6"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                  {/* Step 1: Option 1 */}
                  {buildStep >= 1 && (
                  <motion.div
                    layout
                    initial={{ y: 20, scaleY: 0, opacity: 0 }}
                    animate={{ y: 0, scaleY: 1, opacity: 1 }}
                    exit={{ scaleY: 0, opacity: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.16, 1, 0.3, 1],
                      opacity: { duration: 0.05 }
                    }}
                    className="flex items-start gap-3 p-4 rounded-xl border-2 border-muted"
                    style={{ 
                      transformOrigin: "top",
                      overflow: "hidden"
                    }}
                  >
                    <div className="mt-1 w-4 h-4 rounded-full border-2 border-muted flex items-center justify-center flex-shrink-0">
                      {selectedOption === "option1" && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                    </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground mb-1">Mulighed 1</div>
                        <div className="text-sm text-muted-foreground">Beskrivelse af mulighed</div>
                      </div>
                  </motion.div>
                  )}

                  {/* Step 2: Option 2 (selected) */}
                  {buildStep >= 2 && (
                  <motion.div
                    layout
                    initial={{ y: 20, scaleY: 0, opacity: 0 }}
                    animate={{ y: 0, scaleY: 1, opacity: 1 }}
                    exit={{ scaleY: 0, opacity: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.1,
                      opacity: { duration: 0.05, delay: 0.1 }
                    }}
                    className="flex items-start gap-3 p-4 rounded-xl border-2 border-primary bg-primary/5"
                    style={{ 
                      transformOrigin: "top",
                      overflow: "hidden"
                    }}
                  >
                    <div className="mt-1 w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center flex-shrink-0">
                      {selectedOption === "option2" && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                    </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground mb-1">Mulighed 2</div>
                        <div className="text-sm text-muted-foreground">Beskrivelse af mulighed</div>
                      </div>
                  </motion.div>
                  )}

                  {/* Step 3: Option 3 */}
                  {buildStep >= 3 && (
                  <motion.div
                    layout
                    initial={{ y: 20, scaleY: 0, opacity: 0 }}
                    animate={{ y: 0, scaleY: 1, opacity: 1 }}
                    exit={{ scaleY: 0, opacity: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.2,
                      opacity: { duration: 0.05, delay: 0.2 }
                    }}
                    className="flex items-start gap-3 p-4 rounded-xl border-2 border-muted"
                    style={{ 
                      transformOrigin: "top",
                      overflow: "hidden"
                    }}
                  >
                    <div className="mt-1 w-4 h-4 rounded-full border-2 border-muted flex items-center justify-center flex-shrink-0">
                      {selectedOption === "option3" && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                    </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground mb-1">Mulighed 3</div>
                        <div className="text-sm text-muted-foreground">Beskrivelse af mulighed</div>
                      </div>
                  </motion.div>
                  )}
              </motion.div>

              {/* Step 4: Next Button */}
              {buildStep >= 4 && (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto", marginTop: 16 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="w-full rounded-xl bg-primary text-primary-foreground py-3 px-4 text-center font-medium">
                    Næste
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
