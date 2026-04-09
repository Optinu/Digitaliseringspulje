"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, FileText, X } from "lucide-react";
import { landingContent } from "@/lib/landing-content";
import { LandingCard } from "@/components/landing/shared/LandingCard";
import { SiteLogo } from "@/components/landing/shared/SiteLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitted";

function useEscape(handler: () => void, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handler();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled, handler]);
}

export function WhitepaperPopup() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const titleId = useId();
  const descId = useId();

  const pdfHref = landingContent.whitepaper.pdfHref;
  const hasPdf = typeof pdfHref === "string" && pdfHref.length > 0;

  const close = () => setIsOpen(false);
  useEscape(close, isOpen);

  const bullets = useMemo(() => landingContent.whitepaper.bullets, []);

  if (isDismissed) return null;

  return (
    <>
      {/* Collapsed launcher */}
      <div className="hidden lg:block fixed right-5 bottom-5 z-50">
        <AnimatePresence initial={false}>
          {!isOpen ? (
            <motion.div
              key="launcher"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <LandingCard className="w-[340px] p-4 shadow-[0_18px_40px_-26px_rgba(2,44,34,0.55)]">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <FileText className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold leading-tight">
                        Gratis whitepaper
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        3 skjulte tidsrøvere i din arbejdsgang
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-border/60 bg-white/70 hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Skjul whitepaper popup"
                    onClick={() => setIsDismissed(true)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <Button
                    type="button"
                    className="h-10 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => setIsOpen(true)}
                  >
                    Åbn
                  </Button>

                  {hasPdf ? (
                    <a
                      href={pdfHref}
                      className={cn(
                        "inline-flex h-10 items-center justify-center rounded-2xl border border-border/60 bg-white/70 px-4 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      )}
                      // TODO: analytics tracking (download click)
                    >
                      <Download className="mr-2 h-4 w-4" />
                      PDF
                    </a>
                  ) : null}
                </div>

                <p className="mt-3 text-[11px] leading-snug text-muted-foreground">
                  {/* TODO: cookie consent + privacy tekst/links */}
                  Ved download accepterer I at blive kontaktet i relation til indholdet (TODO:
                  præcisér privacy).
                </p>
              </LandingCard>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[60] flex items-end lg:items-center justify-center p-4 lg:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-[#071612]/55 backdrop-blur-[2px]"
              onClick={close}
              aria-label="Luk modal"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descId}
              className="relative w-full max-w-[780px]"
              initial={{ opacity: 0, y: 16, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.99 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <LandingCard className="overflow-hidden">
                <div className="flex items-start justify-between gap-4 border-b border-border/60 bg-white/70 px-6 sm:px-7 py-5">
                  <div>
                    <p
                      id={titleId}
                      className="font-display text-xl sm:text-2xl font-semibold tracking-tight"
                    >
                      {landingContent.whitepaper.title}
                    </p>
                    <p
                      id={descId}
                      className="mt-1 text-sm leading-relaxed text-muted-foreground max-w-2xl"
                    >
                      {landingContent.whitepaper.subtitle}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/60 bg-white/70 hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    onClick={close}
                    aria-label="Luk"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-0">
                  {/* Left: cover + bullets */}
                  <div className="relative p-6 sm:p-7 bg-[radial-gradient(700px_380px_at_25%_0%,rgba(15,118,110,0.14),transparent_60%),radial-gradient(520px_320px_at_85%_65%,rgba(34,197,94,0.10),transparent_60%)]">
                    <div className="rounded-3xl border border-border/60 bg-white/75 p-6 shadow-sm">
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                        <FileText className="h-4 w-4 text-primary" />
                        PDF – Whitepaper
                      </div>
                      <div className="mt-6">
                        <SiteLogo heightClassName="h-6" className="opacity-95" />
                        <p className="mt-3 text-xl font-semibold tracking-tight">
                          3 skjulte tidsrøvere
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          i din arbejdsgang
                        </p>
                      </div>
                      <div className="mt-8 grid gap-2 text-xs text-muted-foreground">
                        <div className="h-2 rounded-full bg-border/70" />
                        <div className="h-2 w-4/5 rounded-full bg-border/60" />
                        <div className="h-2 w-3/5 rounded-full bg-border/50" />
                      </div>
                      <p className="mt-8 text-xs text-muted-foreground">
                        {/* TODO: indsæt rigtigt PDF cover (image) */}
                        Cover mockup (TODO)
                      </p>
                    </div>

                    <div className="mt-6 space-y-3">
                      {bullets.map((b) => (
                        <div key={b} className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <span className="h-2 w-2 rounded-full bg-primary" />
                          </span>
                          <p className="text-sm leading-relaxed text-foreground/80">
                            {b}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: form */}
                  <div className="p-6 sm:p-7">
                    <p className="text-sm font-semibold tracking-tight">
                      Download gratis
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Udfyld felterne, så sender vi whitepaperet.
                    </p>

                    <form
                      className="mt-6 space-y-3"
                      onSubmit={(e) => {
                        e.preventDefault();
                        setStatus("submitted");
                        // TODO: CRM/form integration
                        // TODO: analytics tracking (lead submit)
                        if (hasPdf) {
                          window.open(pdfHref, "_blank", "noopener,noreferrer");
                        }
                      }}
                    >
                      <label className="block">
                        <span className="sr-only">
                          {landingContent.whitepaper.form.name}
                        </span>
                        <Input
                          required
                          name="name"
                          placeholder={landingContent.whitepaper.form.name}
                          className="rounded-2xl h-11"
                        />
                      </label>
                      <label className="block">
                        <span className="sr-only">
                          {landingContent.whitepaper.form.company}
                        </span>
                        <Input
                          required
                          name="company"
                          placeholder={landingContent.whitepaper.form.company}
                          className="rounded-2xl h-11"
                        />
                      </label>
                      <label className="block">
                        <span className="sr-only">
                          {landingContent.whitepaper.form.email}
                        </span>
                        <Input
                          required
                          type="email"
                          name="email"
                          placeholder={landingContent.whitepaper.form.email}
                          className="rounded-2xl h-11"
                        />
                      </label>

                      <Button
                        type="submit"
                        className="w-full rounded-2xl h-11 bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        {landingContent.whitepaper.form.cta}
                      </Button>
                    </form>

                    {status === "submitted" ? (
                      <div className="mt-5 rounded-3xl border border-primary/15 bg-primary/5 p-4">
                        <p className="text-sm text-foreground/80">
                          Tak. PDF’en er åbnet i en ny fane.
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {landingContent.whitepaper.todoNote}
                        </p>
                      </div>
                    ) : null}

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                      {hasPdf ? (
                        <a
                          href={pdfHref}
                          className="text-sm font-medium text-foreground/80 hover:text-foreground underline underline-offset-4 decoration-foreground/20 hover:decoration-foreground/50"
                        >
                          Åbn PDF direkte
                        </a>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          {/* TODO: indsæt whitepaper PDF-fil */}
                          TODO: Tilføj PDF-link.
                        </p>
                      )}

                      <button
                        type="button"
                        className="text-sm font-medium text-foreground/80 hover:text-foreground underline underline-offset-4 decoration-foreground/20 hover:decoration-foreground/50"
                        onClick={() => {
                          close();
                          setIsDismissed(true);
                        }}
                      >
                        Skjul pop-up
                      </button>
                    </div>
                  </div>
                </div>
              </LandingCard>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

