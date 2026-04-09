# Optinu Beregner - Marketing Website

En moderne, interaktiv onepage marketing-hjemmeside bygget med Next.js, TypeScript, TailwindCSS og shadcn/ui.

## Features

- 🎨 Moderne design inspireret af bodil.energy/varmepumpe-stilen
- 🎯 Interaktive draggable chips i hero-sektionen
- 📱 Fuldt responsivt design
- ♿ Accessibility (a11y) med fokus states
- 🎭 Smooth scroll navigation
- 🎪 Framer Motion animationer og interaktioner

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **shadcn/ui** komponenter
- **Framer Motion** for animationer
- **Lucide React** for ikoner

## Kom i gang

1. Installer dependencies:
```bash
npm install
```

2. Kør development server:
```bash
npm run dev
```

3. Åbn [http://localhost:3000](http://localhost:3000) i din browser

## Projektstruktur

```
├── app/
│   ├── layout.tsx          # Root layout med metadata
│   ├── page.tsx            # Hovedside
│   └── globals.css         # Global styling
├── components/
│   ├── sections/           # Alle sektionskomponenter
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── LogoRow.tsx
│   │   ├── Solutions.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Integrations.tsx
│   │   ├── Pricing.tsx
│   │   ├── Cases.tsx
│   │   ├── FAQ.tsx
│   │   ├── CTA.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   └── ui/                 # shadcn/ui komponenter
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       ├── accordion.tsx
│       ├── input.tsx
│       ├── textarea.tsx
│       ├── separator.tsx
│       └── container.tsx
└── lib/
    ├── content.ts          # Alt indhold på dansk
    └── utils.ts            # Utility funktioner
```

## Design Guide

- **Farver**: Dyb teal/grøn som primary (teal-900/emerald-900 vibe) + offwhite og lys mint-sektioner
- **Rounded corners**: Store afrundede hjørner (rounded-3xl)
- **Shadows**: Bløde skygger
- **Interaktioner**: Playful og premium, men uden at påvirke funktionalitet

## Interaktive Elementer

Hero-sektionen indeholder draggable chips der kan:
- Dragges rundt i containeren
- Snappe blødt tilbage til startposition
- Vise tooltip ved klik
- Hover-effekter med tilt og shadow

## Kontaktformular

Kontaktformularen er mock og logger til console ved submit. Den viser en success state efter indsendelse.

## Build

```bash
npm run build
```

## License

MIT
