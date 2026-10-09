"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useFormatter, useTranslations } from "next-intl";
import Tampon from "@/components/Tampon";
import Montant from "@/components/Montant";

const lignes = [
  { cle: "ligne1", montant: 1920 },
  { cle: "ligne2", montant: 560 },
] as const;

// La facture vit 3 étapes : 0 en retard, 1 relance J+7 envoyée (0,6 s), 2 payée avec le tampon (1,4 s).
export default function FactureHero() {
  const t = useTranslations("Hero");
  const jours = useTranslations("Jours");
  const format = useFormatter();
  const [etape, setEtape] = useState(0);
  // Changer "tour" relance l'effet, donc les minuteurs : c'est le bouton Rejouer.
  const [tour, setTour] = useState(0);

  const reduit = useReducedMotion();

  // Mouvement réduit : la facture passe tout de suite à son état final (payée), sans séquence.
  // Ce passage se fait après l'hydratation, jamais au premier affichage : le serveur ne connaît pas ce réglage.
  useEffect(() => {
    const minuteurs = reduit
      ? [setTimeout(() => setEtape(2), 0)]
      : [setTimeout(() => setEtape(1), 600), setTimeout(() => setEtape(2), 1400)];
    return () => minuteurs.forEach(clearTimeout);
  }, [tour, reduit]);

  const rejouer = () => {
    setEtape(0);
    setTour(tour + 1);
  };

  const payee = etape === 2;
  const relances = [
    { jour: jours("j1"), canal: t("relance1"), etat: t("envoye") },
    { jour: jours("j7"), canal: t("relance2"), etat: t(etape >= 1 ? "envoye" : "prevu") },
    { jour: jours("j15"), canal: t("relance3"), etat: t(payee ? "annule" : "prevu") },
  ];
  const decimales = { minimumFractionDigits: 2, maximumFractionDigits: 2 };

  return (
    <div className="flex min-w-0 max-w-[520px] flex-[1_1_380px] flex-col gap-2.5">
      <div className="relative pt-10">
        {/* La pile des autres factures : de simples feuilles. Leur texte était toujours à moitié caché par la carte de devant. */}
        <div aria-hidden className="absolute top-0 right-[2%] left-[8%] h-[300px] rotate-4 rounded-md border border-border bg-surface shadow-[0_1px_0_var(--color-border)]" />
        <div aria-hidden className="absolute top-3.5 right-[6%] left-[3%] h-[300px] -rotate-[2.5deg] rounded-md border border-border bg-surface" />

        <div className="relative rounded-md border border-border bg-surface p-6 shadow-carte">
          <div className="mb-5 flex min-h-11 items-start justify-between gap-3">
            <div>
              <div className="font-display text-lg font-semibold">Atelier Morel</div>
              <div className="mt-1 text-[13px] text-muted">{t("echeance")}</div>
            </div>
            <AnimatePresence>
              {!payee && (
                <motion.span
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: reduit ? 0 : 0.2 }}
                  className="flex-none rounded-md bg-late-soft px-[9px] py-[5px] text-[13px] font-semibold text-late"
                >
                  {t("retard")}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <div className="border-t border-rule font-mono text-sm tabular-nums">
            {lignes.map(({ cle, montant }) => (
              <div key={cle} className="flex justify-between gap-3 border-b border-rule py-2.5">
                <span className="font-sans text-muted">{t(cle)}</span>
                <span><Montant texte={format.number(montant, decimales)} /></span>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-3 pt-3.5 pb-1">
              <span className="font-sans font-medium">{t("total")}</span>
              <span className="text-2xl font-semibold"><Montant texte={format.number(2480, { style: "currency", currency: "EUR" })} /></span>
            </div>
          </div>
          <ul className="mt-[18px] grid gap-2 border-t border-dashed border-border pt-3.5 text-[13px]">
            {relances.map((r) => (
              <li key={r.jour} className="flex justify-between gap-2">
                <span><span className="inline-block w-11 font-mono text-muted">{r.jour}</span>{r.canal}</span>
                <span className="text-muted">{r.etat}</span>
              </li>
            ))}
          </ul>
          {payee && (
            <Tampon className="absolute top-2 right-2.5 animate-tampon border-[3px] bg-surface px-3 pt-[7px] pb-[5px] text-[26px] shadow-[inset_0_0_0_2px_var(--color-surface),inset_0_0_0_4px_var(--color-accent)]">
              <div className="mt-1 font-mono text-[11px] font-medium tracking-[.08em]">{t("datePaiement")}</div>
            </Tampon>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={rejouer}
        className="min-h-11 cursor-pointer self-end py-2 motion-reduce:hidden text-[13px] font-medium text-muted underline underline-offset-[3px] hover:text-foreground"
      >
        {t("rejouer")}
      </button>
    </div>
  );
}
