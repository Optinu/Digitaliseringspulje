"use client";

import { Container } from "@/components/landing/shared/Container";

export function Footer() {
  return (
    <footer className="py-10 border-t border-border/60">
      <Container>
        <div className="space-y-2 text-sm text-foreground/85">
          <p>
            Email:{" "}
            <a className="underline underline-offset-4" href="mailto:kontakt@optinu.dk">
              kontakt@optinu.dk
            </a>
          </p>
          <p>
            Telefon:{" "}
            <a className="underline underline-offset-4" href="tel:+4542909092">
              +45 42 90 90 92
            </a>
          </p>
          <p>CVR: 45 77 09 23</p>
        </div>
        <div className="mt-6 border-t border-border/60 pt-4">
          <p className="text-xs text-muted-foreground">
            Copyright 2025, Optinu.dk All Rights Reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

