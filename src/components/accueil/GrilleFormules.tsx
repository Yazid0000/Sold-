"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Rouleau from "@/components/Rouleau";
import Segments from "@/components/Segments";
import { emailDevis, formules } from "@/data/formules";
import { centimesSiBesoin, euros } from "@/lib/euros";

// children : le titre h2, rendu par le serveur.
export default function GrilleFormules({ children }: { children: React.ReactNode }) {
  const t = useTranslations("Formules");
  const locale = useLocale();
  const [periode, setPeriode] = useState<"mensuel" | "annuel">("mensuel");
  const annuel = periode === "annuel";

  // formatToParts découpe "7,20 €" en morceaux. On regroupe ceux qui se suivent : le nombre ("7,20") en grand
  // dans un Rouleau, le symbole € et l'espace en petit, chacun à sa place selon la langue.
  const morceaux = (v: number) =>
    euros(locale, centimesSiBesoin(v))
      .formatToParts(v)
      .reduce<{ petit: boolean; texte: string }[]>((liste, p) => {
        const petit = p.type === "currency" || p.type === "literal";
        const dernier = liste.at(-1);
        if (dernier?.petit === petit) dernier.texte += p.value;
        else liste.push({ petit, texte: p.value });
        return liste;
      }, []);
  const totalAnnuel = euros(locale);

  const bouton = "mt-auto flex h-12 items-center justify-center whitespace-nowrap rounded-md text-[15px] font-semibold no-underline";
  const contour = `${bouton} border border-foreground text-foreground hover:bg-background hover:text-foreground`;
  const plein = `${bouton} bg-accent text-on-accent hover:bg-accent-hover hover:text-on-accent`;

  return (
    <>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        {children}
        <Segments
          name="periode"
          label={t("periode")}
          options={[
            { value: "mensuel", label: t("mensuel") },
            { value: "annuel", label: t("annuel") },
          ]}
          value={periode}
          onChange={setPeriode}
          className="bg-surface text-sm"
        />
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-stretch gap-4">
        {formules.map((f) => (
          <div
            key={f.id}
            className={`flex flex-col gap-5 rounded-md ${f.miseEnAvant ? "border-2 border-accent bg-soft px-[27px] py-[31px]" : "border border-border bg-surface px-7 py-8"}`}
          >
            <div>
              <h3 className="mb-1.5 font-display text-[22px] font-semibold">{t(`${f.id}.nom`)}</h3>
              <p className="text-[15px] text-muted">{t(`${f.id}.pour`)}</p>
            </div>
            {f.prix ? (
              <div className="font-mono tabular-nums">
                {morceaux(annuel ? f.prix.annuel : f.prix.mensuel).map((m, i) =>
                  m.petit ? (
                    <span key={i} className="text-lg">{m.texte}</span>
                  ) : (
                    <span key={i} className="text-[44px] font-medium tracking-[-0.04em]"><Rouleau texte={m.texte} /></span>
                  ),
                )}
                <div className="mt-1 font-sans text-[13px] text-muted">
                  {annuel ? t("parAn", { total: totalAnnuel.format(f.prix.annuel * 12) }) : t("sansEngagement")}
                </div>
              </div>
            ) : (
              <div>
                <span className="font-display text-4xl leading-[1.2] font-semibold tracking-[-0.02em]">{t("agence.prix")}</span>
                <div className="mt-1 text-[13px] text-muted">{t("agence.note")}</div>
              </div>
            )}
            <ul className="grid gap-2.5 text-[15px] leading-[1.4]">
              {(t.raw(`${f.id}.inclus`) as string[]).map((ligne) => <li key={ligne}>{ligne}</li>)}
            </ul>
            {f.prix ? (
              <a href="#essai" className={f.miseEnAvant ? plein : contour}>{t("essai")}</a>
            ) : (
              <a href={`mailto:${emailDevis}`} className={contour}>{t("devis")}</a>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
