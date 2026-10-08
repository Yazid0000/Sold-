import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/i18n/site";
import "../globals.css";
import ScriptTheme from "@/components/ScriptTheme";
import Mouvement from "@/components/Mouvement";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// metadataBase : les chemins relatifs des pages ("/en/tarifs") deviennent des URL complètes dans les balises.
// Le reste des métadonnées est propre à chaque page (src/i18n/metadonnees.ts).
export const metadata: Metadata = { metadataBase: new URL(siteUrl) };

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <ScriptTheme />
      </head>
      <body
        className={`${instrumentSans.variable} ${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider>
          <Mouvement>{children}</Mouvement>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
