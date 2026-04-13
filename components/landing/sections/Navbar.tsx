"use client";

import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { landingContent } from "@/lib/landing-content";
import { Container } from "@/components/landing/shared/Container";
import { PrimaryCTA } from "@/components/landing/shared/CTAs";
import { SiteLogo } from "@/components/landing/shared/SiteLogo";
import { cn } from "@/lib/utils";

function scrollToHash(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const scroller = document.getElementById("landing-scroll");
    const onScroll = () => setIsScrolled((scroller?.scrollTop ?? window.scrollY) > 16);
    onScroll();
    if (scroller) {
      scroller.addEventListener("scroll", onScroll, { passive: true });
      return () => scroller.removeEventListener("scroll", onScroll);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = useMemo(() => landingContent.nav.links, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors",
        isScrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/60"
          : "bg-transparent"
      )}
    >
      <Container>
        <nav className="h-16 sm:h-20 flex items-center justify-between">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              const scroller = document.getElementById("landing-scroll");
              if (scroller) {
                scroller.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
              setMobileOpen(false);
            }}
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            aria-label="Optinu.dk (til toppen)"
          >
            <SiteLogo
              priority
              heightClassName="h-[3.75rem] sm:h-[4.75rem]"
              imageClassName="max-w-none"
            />
            <span className="sr-only">{landingContent.site.name}</span>
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHash(l.href);
                }}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <PrimaryCTA className="px-6">
              {landingContent.nav.primaryCta}
            </PrimaryCTA>
          </div>

          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center rounded-xl border border-border/60 bg-background/70 backdrop-blur px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Luk menu" : "Åbn menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {mobileOpen ? (
          <div className="lg:hidden pb-5">
            <div className="rounded-3xl border border-border/60 bg-background/90 backdrop-blur p-3 shadow-sm">
              <div className="grid gap-1">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToHash(l.href);
                      setMobileOpen(false);
                    }}
                    className="rounded-2xl px-4 py-3 text-sm font-medium text-foreground/85 hover:bg-accent/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
              <div className="mt-3 px-1 pb-1">
                <PrimaryCTA className="w-full justify-center">
                  {landingContent.nav.primaryCta}
                </PrimaryCTA>
              </div>
            </div>
          </div>
        ) : null}
      </Container>
    </header>
  );
}

