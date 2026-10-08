"use client";

import { motion } from "motion/react";

const chiffres = "0123456789";

// Défilement façon compteur mécanique : chaque chiffre est une colonne 0-9 vue par une fenêtre d'une ligne.
// Quand le texte change, chaque colonne glisse jusqu'au nouveau chiffre, avec un léger rebond.
// Les autres caractères (espace, virgule, €) restent fixes. Police à chiffres de largeur égale requise (font-mono, tabular-nums).
// Mouvement réduit : rien à faire ici, Mouvement.tsx (MotionConfig) fait sauter le glissement à son arrivée.
export default function Rouleau({ texte }: { texte: string }) {
  const caracteres = [...texte];

  return (
    <>
      <span className="sr-only">{texte}</span>
      <span aria-hidden className="inline-flex">
        {caracteres.map((c, i) => {
          // Clé comptée depuis la droite : les unités restent les unités quand le nombre gagne un chiffre.
          const cle = caracteres.length - i;
          const n = chiffres.indexOf(c);
          if (n === -1) return <span key={cle} className="whitespace-pre">{c}</span>;
          return (
            // clip-path coupe ce qui dépasse sans changer la ligne de base (overflow: hidden la décalerait).
            // items-start : sans lui, la colonne serait étirée à la hauteur de la fenêtre (1 ligne au lieu de 10).
            <span key={cle} className="inline-flex h-[1lh] items-start [clip-path:inset(0)]">
              <motion.span
                className="flex flex-col"
                initial={false}
                animate={{ y: `${-n * 10}%` }}
                transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              >
                {[...chiffres].map((d) => <span key={d} className="h-[1lh]">{d}</span>)}
              </motion.span>
            </span>
          );
        })}
      </span>
    </>
  );
}
