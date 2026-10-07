"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { faq } from "@/data/faq";

// Une seule question ouverte à la fois. Les réponses fermées restent dans le HTML (attribut hidden),
// pour les moteurs de recherche et la recherche Ctrl+F.
export default function Accordeon() {
  const t = useTranslations("Faq");
  const id = useId();
  const [ouverte, setOuverte] = useState(0);

  return (
    <div className="min-w-0 flex-[2_1_520px] border-t border-border">
      {faq.map((cle, i) => {
        const estOuverte = ouverte === i;
        return (
          <div key={cle} className="border-b border-border">
            <h3>
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={estOuverte}
                aria-controls={`${id}-r${i}`}
                onClick={() => setOuverte(estOuverte ? -1 : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 py-[22px] text-left text-lg leading-[1.35] font-medium"
              >
                <span>{t(`${cle}.q`)}</span>
                <span aria-hidden className="flex size-7 flex-none items-center justify-center rounded-md border border-border font-mono">
                  {estOuverte ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div id={`${id}-r${i}`} role="region" aria-labelledby={`${id}-q${i}`} hidden={!estOuverte}>
              <p className="max-w-[62ch] pr-11 pb-6 leading-[1.6] text-muted">{t(`${cle}.r`)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
