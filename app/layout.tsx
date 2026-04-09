import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

const display = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "SMV-landingpage – Rådgivning om digitalisering og automatisering (tilskud)",
  description:
    "Få afklaring, analyse og planlægning af digitalisering og automatisering. I kan i mange tilfælde få tilskud til støtteberettiget rådgivning. Book en uforpligtende afklaringssamtale.",
  openGraph: {
    title: "SMV-landingpage – Afklaring af digitalisering og automatisering",
    description:
      "Afklaring, analyse og planlægning med fokus på jeres arbejdsgange og muligheder for støtteberettiget rådgivning.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da">
      <body className={`${raleway.variable} ${display.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
