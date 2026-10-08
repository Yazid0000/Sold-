import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { formules } from "@/data/formules";
import { euros } from "@/lib/euros";
import { chemin, type Page } from "./site";

const cles = { "/": "accueil", "/tarifs": "tarifs" } as const;

// Titre, description, canonical, hreflang et Open Graph d'une page dans une langue.
// L'image Open Graph n'est pas ici : Next.js la prend dans app/[locale]/opengraph-image.tsx.
export async function metadonnees(page: Page, locale: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Meta" });
  // Les prix de la description viennent de formules.ts : un changement de prix met aussi à jour le SEO.
  const prix = (id: string) => euros(locale, { maximumFractionDigits: 0 }).format(formules.find((f) => f.id === id)!.prix!.mensuel);
  const title = t(`${cles[page]}.title`);
  const description = t(`${cles[page]}.description`, { solo: prix("solo"), studio: prix("studio") });

  return {
    title,
    description,
    alternates: {
      canonical: chemin(page, locale),
      // hreflang : dit à Google que /tarifs et /en/tarifs sont la même page en deux langues.
      // x-default : la version à montrer quand la langue du visiteur n'est ni le français ni l'anglais.
      languages: { fr: chemin(page, "fr"), en: chemin(page, "en"), "x-default": chemin(page, "fr") },
    },
    openGraph: {
      type: "website",
      url: chemin(page, locale),
      siteName: "Soldé",
      title,
      description,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? "en_US" : "fr_FR",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
