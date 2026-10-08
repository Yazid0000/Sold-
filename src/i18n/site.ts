import { getPathname } from "./navigation";

// Adresse publique du site.
// Sur Vercel, VERCEL_PROJECT_PRODUCTION_URL est fourni automatiquement (ex. solde-xxx.vercel.app).
// Quand tu auras ton nom de domaine, ajoute NEXT_PUBLIC_SITE_URL=https://ton-domaine dans Vercel.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

// Les pages du site. Le sitemap et les balises hreflang en sont tirés : une page ajoutée ici y apparaît partout.
export const pages = ["/", "/tarifs"] as const;
export type Page = (typeof pages)[number];

// Chemin d'une page dans une langue : "/tarifs" en français, "/en/tarifs" en anglais.
export const chemin = (page: Page, locale: string) => getPathname({ href: page, locale });

// Adresse complète, pour le sitemap et les données structurées, qui exigent des URL absolues.
export const adresseComplete = (page: Page, locale: string) => new URL(chemin(page, locale), siteUrl).toString();
