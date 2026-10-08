"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import Rature from "@/components/Rature";

const FRAPPE = 28; // ms par caractère
const HESITATION = 450; // ms avant de barrer une phrase
const APRES_RATURE = 500; // ms avant de recommencer

// Le brouillon se tape à l'arrivée à l'écran : chaque phrase est tapée, puis barrée, puis la suivante,
// jusqu'à la dernière ligne ("Bonjour,") où le curseur se met à clignoter.
// Le texte pas encore tapé est déjà là, invisible : la carte garde sa taille et rien ne saute.
export default function Brouillon({ lignes }: { lignes: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const vu = useInView(ref, { once: true, amount: 0.5 });
  const reduit = useReducedMotion();
  const derniere = lignes.length - 1;
  const [etat, setEtat] = useState({ ligne: 0, car: 0, barrees: 0 });

  useEffect(() => {
    if (!vu || reduit) return;
    let arrete = false;
    const attendre = (ms: number) => new Promise((fin) => setTimeout(fin, ms));

    (async () => {
      for (let j = 0; j <= derniere; j++) {
        for (let c = 1; c <= lignes[j].length; c++) {
          await attendre(FRAPPE);
          if (arrete) return;
          setEtat((e) => ({ ...e, ligne: j, car: c }));
        }
        if (j === derniere) return;
        await attendre(HESITATION);
        if (arrete) return;
        setEtat((e) => ({ ...e, barrees: j + 1 }));
        await attendre(APRES_RATURE);
        if (arrete) return;
        setEtat((e) => ({ ...e, ligne: j + 1, car: 0 }));
      }
    })();
    return () => {
      arrete = true;
    };
  }, [vu, reduit, lignes, derniere]);

  // Mouvement réduit : l'état final, dès que la carte arrive à l'écran. Pas avant : au premier affichage,
  // le HTML doit être le même que celui du serveur, qui ne connaît pas le réglage du visiteur.
  const { ligne, car, barrees } = reduit && vu ? { ligne: derniere, car: lignes[derniere].length, barrees: derniere } : etat;
  const fini = ligne === derniere && car === lignes[derniere].length;

  return (
    <>
    {/* Le texte complet, lisible tout de suite par les lecteurs d'écran et les moteurs de recherche.
        La version animée en dessous leur est cachée : elle est faite de texte invisible et de morceaux en cours de frappe. */}
    <div className="sr-only">
      {lignes.map((texte, j) => (j < derniere ? <s key={j}>{texte}</s> : <p key={j}>{texte}</p>))}
    </div>
    <div ref={ref} aria-hidden className="grid gap-3.5 px-5 pt-6 pb-7 text-[clamp(16px,1.8vw,19px)] leading-[1.45]">
      {lignes.map((texte, j) => {
        const tapes = j < ligne ? texte.length : j === ligne ? car : 0;
        const barree = j < barrees;
        return (
          <div key={j} className={barree ? "text-muted transition-colors duration-300" : ""}>
            {j < derniere ? <Rature barre={barree}>{texte.slice(0, tapes)}</Rature> : texte.slice(0, tapes)}
            {j === ligne && (
              <span
                aria-hidden
                className={`ml-[3px] inline-block h-[1.1em] w-0.5 bg-foreground align-[-3px] ${fini ? "animate-clignote" : ""}`}
              />
            )}
            <span className="invisible">{texte.slice(tapes)}</span>
          </div>
        );
      })}
    </div>
    </>
  );
}
