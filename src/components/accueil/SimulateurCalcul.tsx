"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Rouleau from "@/components/Rouleau";
import Montant from "@/components/Montant";
import { euros } from "@/lib/euros";

// Hypothèses de la maquette : 4 factures sur 10 en retard, 12 jours de retard (3 avec Soldé),
// 2 relances par retard, 12 minutes par relance.
function simuler(factures: number, montant: number) {
  const enRetard = factures * montant * 0.4;
  return {
    dortSans: (enRetard * 12) / 30,
    dortAvec: (enRetard * 3) / 30,
    minutes: Math.round(factures * 0.4 * 2 * 12),
  };
}

// children : le titre et le texte, rendus par le serveur et passés tels quels.
export default function SimulateurCalcul({ children }: { children: React.ReactNode }) {
  const t = useTranslations("Simulateur");
  const cta = useTranslations("Nav");
  const [factures, setFactures] = useState(12);
  const [montant, setMontant] = useState(1800);

  const arrondi = euros(useLocale(), { maximumFractionDigits: 0 });
  const { dortSans, dortAvec, minutes } = simuler(factures, montant);
  const duree = (m: number) =>
    m >= 60 ? t("heures", { h: Math.floor(m / 60), m: String(m % 60).padStart(2, "0") }) : t("minutes", { m });

  const curseur = "h-7 w-full cursor-pointer accent-accent";
  const label = "flex justify-between gap-3 font-medium";

  return (
    <>
      <div className="min-w-0 flex-[1_1_420px]">
        {children}
        <div className="grid gap-8">
          <label className="grid gap-3">
            <span className={label}><span>{t("factures")}</span><span className="font-mono tabular-nums">{factures}</span></span>
            <input type="range" min={1} max={60} step={1} value={factures} onChange={(e) => setFactures(+e.target.value)} className={curseur} />
          </label>
          <label className="grid gap-3">
            <span className={label}><span>{t("montant")}</span><span className="font-mono tabular-nums"><Montant texte={arrondi.format(montant)} /></span></span>
            <input
              type="range"
              min={100}
              max={10000}
              step={100}
              value={montant}
              aria-valuetext={arrondi.format(montant)}
              onChange={(e) => setMontant(+e.target.value)}
              className={curseur}
            />
          </label>
        </div>
      </div>
      <div className="grid min-w-0 flex-[1_1_380px] gap-5">
        {/* aria-live : un lecteur d'écran annonce les nouveaux résultats. Chaque Rouleau lui donne la valeur finale
            et lui cache ses colonnes de chiffres. */}
        <div aria-live="polite" className="rounded-md border border-border bg-surface p-[clamp(24px,3vw,36px)] font-mono tabular-nums">
          <div className="mb-2 font-sans text-[15px] text-muted">{t("dort")}</div>
          <div className="text-[clamp(40px,5.5vw,64px)] leading-none font-medium tracking-[-0.04em]">
            <Rouleau texte={arrondi.format(dortSans)} />
          </div>
          <div className="mt-3 mb-7 font-sans text-[15px]">
            {t("avecSolde")} <span className="font-mono font-semibold text-accent"><Rouleau texte={arrondi.format(dortAvec)} /></span>
          </div>
          <div className="flex items-baseline justify-between gap-3 border-t border-dashed border-border pt-6">
            <span className="font-sans text-[15px] text-muted">{t("temps")}</span>
            <span className="text-[28px] font-medium"><Rouleau texte={duree(minutes)} /></span>
          </div>
          <p className="mt-6 font-sans text-[12.5px] leading-normal text-muted">{t("hypotheses")}</p>
        </div>
        {/* Le moment où le visiteur voit son propre chiffre : on lui donne tout de suite l'action, hors de la zone
            aria-live pour que cette phrase ne soit pas relue à chaque mouvement de curseur. */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <p className="min-w-0 flex-[1_1_240px] text-[15px] leading-normal text-pretty">
            {t.rich("ecart", {
              valeur: arrondi.format(dortSans - dortAvec),
              montant: (chunks) => <span className="whitespace-nowrap font-mono font-semibold text-accent tabular-nums">{chunks}</span>,
            })}
          </p>
          <a
            href="#essai"
            className="inline-flex h-12 w-full items-center justify-center whitespace-nowrap rounded-md bg-accent px-5 text-[15px] font-semibold text-on-accent no-underline transition-colors hover:bg-accent-hover hover:text-on-accent wide:w-auto"
          >
            {cta("cta")}
          </a>
        </div>
      </div>
    </>
  );
}
