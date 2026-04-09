import { NextResponse } from "next/server";

type CvrResponse = {
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

type GraphQLResponse<T> = { data?: T; errors?: Array<{ message?: string }> };

type EmploymentNode = {
  beskaeftigelsestalstype?: string;
  intervalFra?: number | string | null;
  intervalTil?: number | string | null;
  registreringsdato?: string | null;
  datoFra?: string | null;
  datoTil?: string | null;
};

async function datafordelerQuery<T>(apiUrl: string, query: string, variables: Record<string, unknown>) {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const rawText = await response.text();
  let payload: GraphQLResponse<T> | null = null;
  try {
    payload = rawText ? (JSON.parse(rawText) as GraphQLResponse<T>) : null;
  } catch {
    payload = null;
  }

  if (!response.ok) {
    return {
      ok: false as const,
      status: response.status,
      error: rawText || "Tomt svar fra Datafordeler.",
    };
  }

  const graphQLError = payload?.errors?.[0]?.message;
  if (graphQLError) {
    return {
      ok: false as const,
      status: 502,
      error: graphQLError,
    };
  }

  return {
    ok: true as const,
    data: payload?.data as T,
  };
}

function toNumber(value: number | string | null | undefined): number | null {
  if (value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function extractAnnualEmployees(nodes: EmploymentNode[]): number | null {
  if (!nodes.length) return null;

  const withIntervals = nodes
    .map((n) => ({
      ...n,
      intervalFromNum: toNumber(n.intervalFra),
      intervalToNum: toNumber(n.intervalTil),
      dateToMs: n.datoTil ? Date.parse(n.datoTil) : Number.NEGATIVE_INFINITY,
      regMs: n.registreringsdato ? Date.parse(n.registreringsdato) : Number.NEGATIVE_INFINITY,
    }))
    .filter((n) => n.intervalToNum !== null);

  const sortedNewestFirst = withIntervals.sort((a, b) => {
    if (b.dateToMs !== a.dateToMs) return b.dateToMs - a.dateToMs;
    return b.regMs - a.regMs;
  });

  const preferredTypeGroups = [
    ["AarsvaerkInterval", "AntalAarsvaerkInterval"],
    ["AntalAnsatteInterval"],
  ];

  for (const typeGroup of preferredTypeGroups) {
    const match = sortedNewestFirst.find((n) =>
      typeGroup.some((needle) => (n.beskaeftigelsestalstype ?? "").includes(needle))
    );
    if (match?.intervalToNum !== null && match?.intervalToNum !== undefined) {
      return match.intervalToNum;
    }
  }

  return sortedNewestFirst[0]?.intervalToNum ?? null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cvr = (searchParams.get("cvr") ?? "").replace(/\D/g, "");

  if (!/^\d{8}$/.test(cvr)) {
    return NextResponse.json({ error: "CVR skal være 8 cifre." }, { status: 400 });
  }

  const apiKey = process.env.DATAFORDELER_API_KEY ?? process.env.CVR_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Serveren mangler DATAFORDELER_API_KEY i environment variables." },
      { status: 500 }
    );
  }

  const apiUrl = new URL(
    process.env.DATAFORDELER_API_URL ?? "https://graphql.datafordeler.dk/CVR/v1"
  );
  apiUrl.searchParams.set("apiKey", apiKey);

  try {
    const virksomhedQuery = `
      query GetVirksomhed($cvr: Long!) {
        CVR_Virksomhed(first: 1, where: { CVRNummer: { eq: $cvr } }) {
          nodes {
            id
            CVRNummer
          }
        }
      }
    `;
    const virksomhedResult = await datafordelerQuery<{
      CVR_Virksomhed?: { nodes?: Array<{ id?: string; CVRNummer?: number }> };
    }>(apiUrl.toString(), virksomhedQuery, { cvr: Number(cvr) });

    if (!virksomhedResult.ok) {
      return NextResponse.json(
        {
          error: `Kunne ikke hente virksomhedsdata fra Datafordeler (HTTP ${virksomhedResult.status}).`,
          details: virksomhedResult.error,
        },
        { status: 502 }
      );
    }

    const virksomhedNode = virksomhedResult.data?.CVR_Virksomhed?.nodes?.[0];
    const enhedsId = virksomhedNode?.id;
    const cvrNummer = virksomhedNode?.CVRNummer ? String(virksomhedNode.CVRNummer) : cvr;
    if (!enhedsId) {
      return NextResponse.json({ found: false, cvr });
    }

    const navnQuery = `
      query GetNavn($id: String!) {
        CVR_Navn(first: 1, where: { CVREnhedsId: { eq: $id } }) {
          nodes {
            vaerdi
          }
        }
      }
    `;
    const navnResult = await datafordelerQuery<{
      CVR_Navn?: { nodes?: Array<{ vaerdi?: string }> };
    }>(apiUrl.toString(), navnQuery, { id: enhedsId });
    if (!navnResult.ok) {
      return NextResponse.json(
        {
          error: `Datafordeler returnerede en fejl ved navneopslag (HTTP ${navnResult.status}).`,
          details: navnResult.error,
        },
        { status: 502 }
      );
    }
    const companyName = navnResult.data?.CVR_Navn?.nodes?.[0]?.vaerdi ?? `CVR ${cvrNummer}`;

    const adresseQuery = `
      query GetAdresse($id: String!) {
        CVR_Adressering(
          first: 2
          where: {
            CVREnhedsId: { eq: $id }
            AdresseringAnvendelse: { in: ["postadresse", "beliggenhedsadresse"] }
          }
        ) {
          nodes {
            AdresseringAnvendelse
            CVRAdresse_vejnavn
            CVRAdresse_husnummerFra
            CVRAdresse_postnummer
            CVRAdresse_postdistrikt
            CVRAdresse_adresseFritekst
          }
        }
      }
    `;
    const adresseResult = await datafordelerQuery<{
      CVR_Adressering?: {
        nodes?: Array<{
          AdresseringAnvendelse?: string;
          CVRAdresse_vejnavn?: string;
          CVRAdresse_husnummerFra?: string;
          CVRAdresse_postnummer?: string;
          CVRAdresse_postdistrikt?: string;
          CVRAdresse_adresseFritekst?: string | null;
        }>;
      };
    }>(apiUrl.toString(), adresseQuery, { id: enhedsId });
    if (!adresseResult.ok) {
      return NextResponse.json(
        {
          error: `Datafordeler returnerede en fejl ved adresseopslag (HTTP ${adresseResult.status}).`,
          details: adresseResult.error,
        },
        { status: 502 }
      );
    }

    const adressenoder = adresseResult.data?.CVR_Adressering?.nodes ?? [];
    const beliggenhed =
      adressenoder.find((n) => n.AdresseringAnvendelse === "beliggenhedsadresse") ??
      adressenoder[0];
    const addressParts = [
      beliggenhed?.CVRAdresse_vejnavn,
      beliggenhed?.CVRAdresse_husnummerFra,
    ].filter(Boolean);

    const virksomhedsformQuery = `
      query GetCompanyType($id: String!) {
        CVR_Virksomhedsform(first: 1, where: { CVREnhedsId: { eq: $id } }) {
          nodes {
            vaerdiTekst
          }
        }
      }
    `;
    const virksomhedsformResult = await datafordelerQuery<{
      CVR_Virksomhedsform?: { nodes?: Array<{ vaerdiTekst?: string }> };
    }>(apiUrl.toString(), virksomhedsformQuery, { id: enhedsId });
    if (!virksomhedsformResult.ok) {
      return NextResponse.json(
        {
          error: `Datafordeler returnerede en fejl ved virksomhedsformsopslag (HTTP ${virksomhedsformResult.status}).`,
          details: virksomhedsformResult.error,
        },
        { status: 502 }
      );
    }
    const companyType = virksomhedsformResult.data?.CVR_Virksomhedsform?.nodes?.[0]?.vaerdiTekst ?? null;

    const brancheQuery = `
      query GetIndustry($id: String!) {
        CVR_Branche(first: 1, where: { CVREnhedsId: { eq: $id }, sekvens: { eq: 0 } }) {
          nodes {
            vaerdi
            vaerdiTekst
          }
        }
      }
    `;
    const brancheResult = await datafordelerQuery<{
      CVR_Branche?: { nodes?: Array<{ vaerdi?: string; vaerdiTekst?: string }> };
    }>(apiUrl.toString(), brancheQuery, { id: enhedsId });
    if (!brancheResult.ok) {
      return NextResponse.json(
        {
          error: `Datafordeler returnerede en fejl ved brancheopslag (HTTP ${brancheResult.status}).`,
          details: brancheResult.error,
        },
        { status: 502 }
      );
    }
    const mainIndustryCode = brancheResult.data?.CVR_Branche?.nodes?.[0]?.vaerdi ?? null;
    const mainIndustryText = brancheResult.data?.CVR_Branche?.nodes?.[0]?.vaerdiTekst ?? null;

    const beskaeftigelseQuery = `
      query GetEmployees($id: String!) {
        CVR_Beskaeftigelse(first: 1000, where: { CVREnhedsId: { eq: $id } }) {
          nodes {
            beskaeftigelsestalstype
            intervalFra
            intervalTil
            registreringsdato
            datoFra
            datoTil
          }
        }
      }
    `;
    const beskaeftigelseResult = await datafordelerQuery<{
      CVR_Beskaeftigelse?: {
        nodes?: EmploymentNode[];
      };
    }>(apiUrl.toString(), beskaeftigelseQuery, { id: enhedsId });
    if (!beskaeftigelseResult.ok) {
      return NextResponse.json(
        {
          error: `Datafordeler returnerede en fejl ved beskæftigelsesopslag (HTTP ${beskaeftigelseResult.status}).`,
          details: beskaeftigelseResult.error,
        },
        { status: 502 }
      );
    }
    const employees = beskaeftigelseResult.data?.CVR_Beskaeftigelse?.nodes ?? [];
    const annualEmployees = extractAnnualEmployees(employees);

    const industryText = (mainIndustryText ?? "").toLowerCase();
    const isPrimarySector =
      industryText.length > 0 &&
      (industryText.includes("landbrug") ||
        industryText.includes("fiskeri") ||
        industryText.includes("skovbrug"));

    const typeText = (companyType ?? "").toLowerCase();
    const commercialLike = [
      "anpartsselskab",
      "aktieselskab",
      "partnerselskab",
      "ivs",
      "enkeltmands",
      "personligt ejet",
    ];
    const nonCommercialLike = ["forening", "fond", "institution", "kommune", "offentlig"];
    let isLikelyCommercialEntity: boolean | null = null;
    if (commercialLike.some((v) => typeText.includes(v))) isLikelyCommercialEntity = true;
    if (nonCommercialLike.some((v) => typeText.includes(v))) isLikelyCommercialEntity = false;

    const company: CvrResponse = {
      found: true,
      cvr: cvrNummer,
      companyName,
      companyType,
      mainIndustryCode,
      mainIndustryText,
      annualEmployees,
      hasAnnualReport: null,
      isPrimarySector: industryText ? isPrimarySector : null,
      isLikelyCommercialEntity,
      address: addressParts.join(" ") || (beliggenhed?.CVRAdresse_adresseFritekst ?? undefined),
      zipcode: beliggenhed?.CVRAdresse_postnummer,
      city: beliggenhed?.CVRAdresse_postdistrikt,
    };

    return NextResponse.json(company);
  } catch {
    return NextResponse.json(
      { error: "Der opstod en fejl ved opslag hos Datafordeler." },
      { status: 500 }
    );
  }
}
