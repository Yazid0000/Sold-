import { getTranslations } from "next-intl/server";
import { faq } from "@/data/faq";
import { formules } from "@/data/formules";
import { adresseComplete } from "./site";

// Données structurées (schema.org) : une description du site que Google lit sans interpréter la mise en page.
// Tout vient des mêmes sources que la page (messages, formules.ts, faq.ts) : impossible qu'elles se contredisent.

export async function logiciel(locale: string) {
  const meta = await getTranslations({ locale, namespace: "Meta" });
  const f = await getTranslations({ locale, namespace: "Formules" });

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Soldé",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: adresseComplete("/", locale),
    inLanguage: locale,
    description: meta("accueil.description"),
    // Agence (sur devis) n'a pas de prix : pas d'offre chiffrée pour elle.
    offers: formules.flatMap((offre) =>
      offre.prix
        ? [{ "@type": "Offer", name: f(`${offre.id}.nom`), price: offre.prix.mensuel, priceCurrency: "EUR", url: adresseComplete("/tarifs", locale) }]
        : [],
    ),
  };
}

export async function questionsFrequentes(locale: string) {
  const t = await getTranslations({ locale, namespace: "Faq" });

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: faq.map((cle) => ({
      "@type": "Question",
      name: t(`${cle}.q`),
      acceptedAnswer: { "@type": "Answer", text: t(`${cle}.r`) },
    })),
  };
}
