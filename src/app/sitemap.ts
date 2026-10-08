import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { adresseComplete, pages } from "@/i18n/site";

// Généré automatiquement à l'adresse /sitemap.xml : chaque page dans chaque langue,
// avec le lien vers sa version dans l'autre langue (hreflang).
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((page) =>
    routing.locales.map((locale) => ({
      url: adresseComplete(page, locale),
      changeFrequency: "monthly" as const,
      priority: page === "/" ? 1 : 0.8,
      alternates: { languages: Object.fromEntries(routing.locales.map((l) => [l, adresseComplete(page, l)])) },
    })),
  );
}
