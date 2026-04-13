"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import { landingContent } from "@/lib/landing-content";
import { Container } from "@/components/landing/shared/Container";
import { SectionHeader } from "@/components/landing/shared/SectionHeader";
import { LandingCard } from "@/components/landing/shared/LandingCard";
import { PrimaryCTA, SecondaryCTA } from "@/components/landing/shared/CTAs";
import { cn } from "@/lib/utils";

type CompanyLookup = {
  found: boolean;
  companyName: string;
  cvr: string;
  companyType: string | null;
  mainIndustryCode: string | null;
  mainIndustryText: string | null;
  annualEmployees: number | null;
  hasAnnualReport: boolean | null;
  isPrimarySector: boolean | null;
  isLikelyCommercialEntity: boolean | null;
  address?: string;
  zipcode?: string;
  city?: string;
};
type ManualAnswer = "yes" | "no" | "unknown";
type CriterionState = "met" | "needs_clarification" | "unmet";
type EmployeeRange = "1" | "2-9" | "10-49" | "50-249" | "+250";

type ManualQuestion = {
  id: string;
  title: string;
  disqualifyingAnswer: ManualAnswer;
  helper?: string;
};

const manualQuestions: ManualQuestion[] = [
  {
    id: "public_income",
    title:
      "Modtager virksomheden 50% eller mere af sine indtægter fra offentlige tilskud, bidrag, donationer eller medlemskontingenter?",
    disqualifyingAnswer: "yes" as ManualAnswer,
  },
  {
    id: "active_course",
    title:
      "Deltager virksomheden allerede i et aktivt SMV:Digital-forløb inden for samme spor?",
    disqualifyingAnswer: "yes" as ManualAnswer,
  },
];

export function GrantCalculatorSection() {
  const [hasDanishCvr, setHasDanishCvr] = useState<boolean | null>(null);
  const [cvrInput, setCvrInput] = useState("");
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [company, setCompany] = useState<CompanyLookup | null>(null);
  const [employeeRange, setEmployeeRange] = useState<EmployeeRange | null>(null);
  const [manualAnswers, setManualAnswers] = useState<Record<string, ManualAnswer | null>>(
    Object.fromEntries(manualQuestions.map((q) => [q.id, null]))
  );

  const personalizeQuestion = (title: string, companyName: string) =>
    title.replace(/virksomheden/gi, companyName);

  const reset = () => {
    setHasDanishCvr(null);
    setCvrInput("");
    setLookupLoading(false);
    setLookupError(null);
    setCompany(null);
    setEmployeeRange(null);
    setManualAnswers(Object.fromEntries(manualQuestions.map((q) => [q.id, null])));
  };

  const sanitizedCvr = cvrInput.replace(/\D/g, "").slice(0, 8);

  const lookupCompany = async () => {
    if (!/^\d{8}$/.test(sanitizedCvr)) {
      setLookupError("Indtast et gyldigt CVR-nummer (8 cifre).");
      return;
    }

    setLookupLoading(true);
    setLookupError(null);
    setCompany(null);

    try {
      const response = await fetch(`/api/cvr?cvr=${sanitizedCvr}`);
      const data = (await response.json()) as Partial<CompanyLookup> & {
        error?: string;
      };

      if (!response.ok) {
        setLookupError(data.error ?? "Kunne ikke finde virksomheden.");
        return;
      }

      if (!data.found) {
        setLookupError("CVR-nummeret blev ikke fundet i CVR-registeret.");
        return;
      }

      setCompany(data as CompanyLookup);
    } catch {
      setLookupError("Der opstod en fejl ved opslag hos Datafordeler.");
    } finally {
      setLookupLoading(false);
    }
  };

  const autoCriteria = useMemo(() => {
    if (!company) return null;
    const annualEmployees = company.annualEmployees;
    const annualEmployeesFromRange =
      employeeRange === "1"
        ? 1
        : employeeRange === "2-9"
          ? 2
          : employeeRange === "10-49"
            ? 10
            : employeeRange === "50-249"
              ? 50
              : employeeRange === "+250"
                ? 250
                : null;
    const effectiveEmployees = annualEmployees ?? annualEmployeesFromRange;

    const smvState: CriterionState =
      effectiveEmployees !== null && effectiveEmployees > 249
        ? "unmet"
        : "needs_clarification";

    const isPrimary = company.isPrimarySector;
    const primaryState: CriterionState =
      isPrimary === null ? "needs_clarification" : isPrimary ? "unmet" : "met";

    const commercialState: CriterionState =
      company.isLikelyCommercialEntity === null
        ? "needs_clarification"
        : company.isLikelyCommercialEntity
          ? "met"
          : "unmet";

    const annualReportState: CriterionState =
      company.hasAnnualReport === null
        ? "needs_clarification"
        : company.hasAnnualReport
          ? "met"
          : "unmet";

    const employeesState: CriterionState =
      effectiveEmployees === null ? "needs_clarification" : effectiveEmployees >= 2 ? "met" : "unmet";

    return [
      { id: "krav1", label: "Dansk CVR-nummer", state: "met" as CriterionState },
      { id: "krav2", label: "SMV-status", state: smvState },
      { id: "krav3", label: "Ikke primær erhverv", state: primaryState },
      { id: "krav4", label: "Erhvervsvirksomhed", state: commercialState },
      { id: "krav7", label: "Minimum ét årsregnskab", state: annualReportState },
      { id: "krav8", label: "Minimum 2 årsværk", state: employeesState },
    ];
  }, [company, employeeRange]);

  const hasAutoDisqualifying = useMemo(
    () => (autoCriteria ?? []).some((c) => c.state === "unmet"),
    [autoCriteria]
  );

  const manualComplete = useMemo(
    () =>
      manualQuestions.every((q) => manualAnswers[q.id] !== null) &&
      (company?.annualEmployees !== null || employeeRange !== null),
    [manualAnswers, company?.annualEmployees, employeeRange]
  );

  const manualHasDisqualifying = useMemo(
    () =>
      manualQuestions.some((q) => manualAnswers[q.id] === q.disqualifyingAnswer),
    [manualAnswers]
  );

  const manualHasUnknown = useMemo(
    () => manualQuestions.some((q) => manualAnswers[q.id] === "unknown"),
    [manualAnswers]
  );

  const autoHasClarification = useMemo(
    () => (autoCriteria ?? []).some((c) => c.state === "needs_clarification"),
    [autoCriteria]
  );

  const showManualQuestions = !!company && !hasAutoDisqualifying;
  const needsEmployeeFallback = company?.annualEmployees === null;
  const currentManualQuestion = useMemo(
    () => manualQuestions.find((q) => manualAnswers[q.id] === null) ?? null,
    [manualAnswers]
  );

  const conclusion = useMemo(() => {
    if (hasDanishCvr === false) {
      return {
        title: "Virksomheden opfylder ikke adgangskravene",
        text: "Virksomheden kan ikke søge, fordi et dansk CVR-nummer er et krav.",
        tone: "negative" as const,
      };
    }

    if (!company) return null;
    if (hasAutoDisqualifying) {
      return {
        title: "Virksomheden opfylder ikke adgangskravene",
        text: "Ét eller flere automatiske adgangskrav er ikke opfyldt ud fra CVR-opslaget.",
        tone: "negative" as const,
      };
    }
    if (!manualComplete) return null;
    if (manualHasDisqualifying) {
      return {
        title: "Virksomheden opfylder ikke adgangskravene",
        text: "Ét eller flere manuelle svar er diskvalificerende.",
        tone: "negative" as const,
      };
    }
    if (manualHasUnknown || autoHasClarification) {
      return {
        title: "Virksomheden kan muligvis søge, men kræver afklaring",
        text: "Der er forhold, som kræver manuel afklaring før en endelig vurdering.",
        tone: "neutral" as const,
      };
    }
    return {
      title: "Virksomheden opfylder sandsynligvis adgangskravene",
      text: "Automatiske krav er opfyldt, og de manuelle svar er ikke diskvalificerende.",
      tone: "positive" as const,
    };
  }, [
    hasDanishCvr,
    company,
    hasAutoDisqualifying,
    manualComplete,
    manualHasDisqualifying,
    manualHasUnknown,
    autoHasClarification,
  ]);

  const progressPercent = hasDanishCvr === null
    ? 10
    : hasDanishCvr === false
      ? 100
      : !company
        ? 25
        : showManualQuestions && !manualComplete
          ? 70
          : 100;

  return (
    <section
      id="puljeberegner"
      className="relative overflow-hidden py-14 sm:py-20 border-y border-border/60"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src="/hero-meeting.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/52 backdrop-blur-[7px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/66 via-white/58 to-white/70" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-5xl">
          <LandingCard className="overflow-hidden border border-border/60 bg-[#f3f4f6] p-0 shadow-none">
            <div className="px-6 py-6 sm:px-8 sm:py-7 border-b border-border/60 bg-transparent">
              <SectionHeader
                title={landingContent.calculator.title}
                subtitle={landingContent.calculator.subtitle}
              />
              <p className="mt-4 text-sm leading-relaxed text-foreground/80">
                {landingContent.calculator.disclaimer}
              </p>
            </div>

            <div>
              <div className="p-7 sm:p-8" role="region" aria-label="Puljeberegner – trin og spørgsmål">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-foreground/80">
                    Fremdrift
                  </p>
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-white px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <RotateCcw className="h-4 w-4" />
                  Nulstil
                </button>
              </div>

              <div className="mt-4">
                <div className="h-2 rounded-full bg-border/70 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
                    style={{ width: `${progressPercent}%` }}
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-border/70 bg-white p-6 sm:p-7">
                <AnimatePresence mode="wait">
                  {hasDanishCvr === null ? (
                    <motion.div
                      key="cvr-gate"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
                        Har virksomheden et dansk CVR-nummer?
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        Dette er et krav for at kunne få støtte via denne pulje.
                      </p>
                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <button
                          type="button"
                          onClick={() => setHasDanishCvr(true)}
                          className="group w-full text-left rounded-3xl border border-border/60 bg-white/70 px-5 py-4 transition-colors hover:bg-accent/10 hover:border-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <p className="text-sm font-semibold text-foreground/90">Ja</p>
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
                              <ArrowRight className="h-4 w-4" />
                            </span>
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setHasDanishCvr(false)}
                          className="group w-full text-left rounded-3xl border border-border/60 bg-white/70 px-5 py-4 transition-colors hover:bg-accent/10 hover:border-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <p className="text-sm font-semibold text-foreground/90">Nej</p>
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
                              <ArrowRight className="h-4 w-4" />
                            </span>
                          </div>
                        </button>
                      </div>
                    </motion.div>
                  ) : hasDanishCvr === false ? (
                    <motion.div
                      key="not-eligible"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="rounded-3xl border border-border/60 bg-white/70 p-6 sm:p-7">
                        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
                          Du kan ikke få støtte.
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          For at fortsætte kræves et dansk CVR-nummer.
                        </p>
                      </div>
                    </motion.div>
                  ) : !company ? (
                    <motion.div
                      key="cvr-lookup"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
                        Indtast CVR-nummer
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        Vi slår virksomheden op i CVR-registeret, før du går videre.
                      </p>
                      <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <input
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={8}
                          value={cvrInput}
                          onChange={(e) => {
                            setCvrInput(e.target.value.replace(/\D/g, "").slice(0, 8));
                            setLookupError(null);
                          }}
                          placeholder="Fx 12345678"
                          className="h-12 w-full rounded-2xl border border-border/70 bg-white/70 px-4 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                        <button
                          type="button"
                          onClick={lookupCompany}
                          disabled={lookupLoading}
                          className="inline-flex h-12 min-w-[92px] items-center justify-center whitespace-nowrap rounded-2xl bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-95 disabled:opacity-60"
                        >
                          {lookupLoading ? "Søger..." : "Slå op"}
                        </button>
                      </div>
                      {lookupLoading ? (
                        <p className="mt-3 text-sm text-muted-foreground">
                          Vi slår virksomheden op i CVR-registeret...
                        </p>
                      ) : null}
                      {lookupError ? (
                        <p className="mt-3 text-sm text-red-600">{lookupError}</p>
                      ) : null}
                    </motion.div>
                  ) : showManualQuestions && !manualComplete ? (
                    <motion.div
                      key="manual-questions"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
                        Manuel afklaring
                      </h3>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Virksomhed: {company.companyName} (CVR: {company.cvr})
                      </p>

                      <div className="mt-6 grid gap-3">
                        {needsEmployeeFallback && employeeRange === null ? (
                          <div className="rounded-3xl border border-border/60 bg-white/70 px-5 py-4">
                            <p className="text-sm font-semibold text-foreground/90">
                              Hvor mange ansatte har {company.companyName}?
                            </p>
                            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                              Vi kunne ikke hente antal ansatte automatisk fra CVR-data.
                            </p>
                            <div className="mt-3 grid grid-cols-2 sm:grid-cols-5 gap-2">
                              {[
                                { id: "1", label: "1" },
                                { id: "2-9", label: "2-9" },
                                { id: "10-49", label: "10-49" },
                                { id: "50-249", label: "50-249" },
                                { id: "+250", label: "+250" },
                              ].map((range) => (
                                <button
                                  key={range.id}
                                  type="button"
                                  onClick={() => setEmployeeRange(range.id as EmployeeRange)}
                                  className={cn(
                                    "rounded-2xl border px-3 py-2 text-sm transition-colors",
                                    employeeRange === range.id
                                      ? "border-primary bg-primary/10 text-primary"
                                      : "border-border/60 bg-white hover:bg-accent/10"
                                  )}
                                >
                                  {range.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : currentManualQuestion ? (
                          <div
                            key={currentManualQuestion.id}
                            className="rounded-3xl border border-border/60 bg-white/70 px-5 py-4"
                          >
                            <p className="text-sm font-semibold text-foreground/90">
                              {personalizeQuestion(
                                currentManualQuestion.title,
                                company.companyName
                              )}
                            </p>
                            {currentManualQuestion.helper ? (
                              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                                {currentManualQuestion.helper}
                              </p>
                            ) : null}
                            <div className="mt-3 grid grid-cols-3 gap-2">
                              {[
                                { id: "no", label: "Nej" },
                                { id: "yes", label: "Ja" },
                                { id: "unknown", label: "Ved ikke" },
                              ].map((choice) => (
                                <button
                                  key={choice.id}
                                  type="button"
                                  onClick={() =>
                                    setManualAnswers((prev) => ({
                                      ...prev,
                                      [currentManualQuestion.id]:
                                        choice.id as ManualAnswer,
                                    }))
                                  }
                                  className={cn(
                                    "rounded-2xl border px-3 py-2 text-sm transition-colors",
                                    manualAnswers[currentManualQuestion.id] ===
                                      choice.id
                                      ? "border-primary bg-primary/10 text-primary"
                                      : "border-border/60 bg-white hover:bg-accent/10"
                                  )}
                                >
                                  {choice.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div
                        className={cn(
                          "rounded-3xl border p-6 sm:p-7",
                          conclusion?.tone === "positive" && "border-primary/25 bg-primary/5",
                          conclusion?.tone === "neutral" && "border-border/60 bg-white/70",
                          conclusion?.tone === "negative" && "border-red-200 bg-red-50"
                        )}
                      >
                        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
                          {conclusion?.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {conclusion?.text}
                        </p>
                        {company ? (
                          <div className="mt-4 rounded-2xl border border-border/50 bg-white/70 p-4 text-sm text-foreground/80">
                            <p>
                              <strong>Virksomhed:</strong> {company.companyName} ({company.cvr})
                            </p>
                            {company.mainIndustryText ? (
                              <p className="mt-1">
                                <strong>Hovedbranche:</strong> {company.mainIndustryText}
                                {company.mainIndustryCode ? ` (${company.mainIndustryCode})` : ""}
                              </p>
                            ) : null}
                            {company.companyType ? (
                              <p className="mt-1">
                                <strong>Virksomhedsform:</strong> {company.companyType}
                              </p>
                            ) : null}
                            <p className="mt-1">
                              <strong>Årsværk:</strong>{" "}
                              {company.annualEmployees !== null
                                ? company.annualEmployees
                                : employeeRange ?? "Kræver afklaring"}
                            </p>
                          </div>
                        ) : null}
                      </div>

                      <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <PrimaryCTA className="justify-center">
                          {landingContent.calculator.primaryCta}
                        </PrimaryCTA>
                        <SecondaryCTA
                          href="#puljeberegner"
                          onClick={(e) => {
                            e.preventDefault();
                            reset();
                          }}
                          className="justify-center"
                        >
                          Tilbage
                        </SecondaryCTA>
                      </div>

                      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                        {landingContent.calculator.disclaimer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            </div>
          </LandingCard>
        </div>
      </Container>
    </section>
  );
}

