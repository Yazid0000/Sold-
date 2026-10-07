"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Segments from "@/components/Segments";
import { formules } from "@/data/formules";
import { colonnes, enAvant, libelle, ligne } from "./colonnes";

// Seuls la bascule et les prix de l'en-tête dépendent de la période.
// children : le titre et le texte d'intro. corps : les lignes du tableau. Les deux sont rendus par le serveur.
export default function TableauTarifs({ children, corps }: { children: React.ReactNode; corps: React.ReactNode }) {
  const t = useTranslations("Tarifs");
  const f = useTranslations("Formules");
  const locale = useLocale();
  const [periode, setPeriode] = useState<"mensuel" | "annuel">("mensuel");
  const annuel = periode === "annuel";
  const euros = (v: number) =>
    new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", minimumFractionDigits: Number.isInteger(v) ? 0 : 2 }).format(v);

  return (
    <>
      <section className="mx-auto flex max-w-page flex-wrap items-end justify-between gap-8 px-5 pt-[clamp(48px,8vw,96px)] pb-10">
        <div className="flex-[1_1_480px]">{children}</div>
        <Segments
          name="periode"
          label={f("periode")}
          options={[
            { value: "mensuel", label: f("mensuel") },
            { value: "annuel", label: f("annuel") },
          ]}
          value={periode}
          onChange={setPeriode}
          className="bg-surface text-sm"
        />
      </section>

      <section className="mx-auto max-w-page px-5 pb-[clamp(64px,9vw,112px)]">
        <div role="table" aria-label={t("comparer")} className="rounded-md border border-border bg-surface">
          <div role="row" className={`${ligne} sticky top-0 z-2 rounded-t-md border-b border-border bg-surface`}>
            <div role="columnheader" className={`${libelle} sr-only wide:not-sr-only wide:p-6`}>
              <h2 className="mb-1.5 font-display text-2xl font-semibold">{t("comparer")}</h2>
              <p className="text-sm text-muted">{t("horsTaxes")}</p>
            </div>
            <div role="none" className={colonnes}>
              {formules.map((offre, i) => (
                <div
                  role="columnheader"
                  key={offre.id}
                  className={`px-[clamp(8px,1.5vw,20px)] py-[clamp(14px,2vw,24px)] ${enAvant(i)} ${offre.miseEnAvant ? "border-t-2 border-t-accent" : ""}`}
                >
                  <div className="font-display text-[clamp(16px,1.8vw,20px)] font-semibold">{f(`${offre.id}.nom`)}</div>
                  {offre.prix ? (
                    <>
                      <div className="mt-1 mb-0.5 font-mono text-[clamp(20px,3vw,32px)] font-medium tracking-[-0.03em] tabular-nums">
                        {euros(annuel ? offre.prix.annuel : offre.prix.mensuel)}
                      </div>
                      <div className="text-[12.5px] text-muted">{t(annuel ? "parMoisAnnuel" : "parMois")}</div>
                    </>
                  ) : (
                    <>
                      <div className="mt-1.5 mb-0.5 font-display text-[clamp(18px,2.4vw,26px)] leading-tight font-semibold">{f("agence.prix")}</div>
                      <div className="text-[12.5px] text-muted">{t("selonEquipe")}</div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          {corps}
        </div>
        <p className="mt-4 text-[13px] text-muted">{t("note")}</p>
      </section>
    </>
  );
}
