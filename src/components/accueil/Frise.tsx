"use client";

import { Children, createContext, use, useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

// Une seule mesure du défilement pour toute la liste, partagée par contexte : chaque Trait en prend sa tranche,
// ce qui garantit l'ordre de remplissage. total vient du nombre d'étapes, rien à tenir à jour à la main.
const Progression = createContext<{ progression: MotionValue<number>; total: number } | null>(null);

export function Frise({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLOListElement>(null);
  // Départ à 85 % de l'écran : la ligne commence à se remplir dès que la liste apparaît en bas.
  // Fin à 60 % : elle est pleine avant que la dernière étape quitte le centre de l'écran.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 60%"] });

  return (
    <ol ref={ref} className={className}>
      <Progression value={{ progression: scrollYProgress, total: Children.count(children) }}>{children}</Progression>
    </ol>
  );
}

// Une tranche par étape plutôt qu'une ligne par étape mesurée à part : en desktop les traits sont côte à côte
// (même hauteur), ils se rempliraient tous en même temps.
export function Trait({ index, accent = false }: { index: number; accent?: boolean }) {
  const { progression, total } = use(Progression)!;
  const debut = index / total;
  const remplissage = useTransform(progression, [debut, (index + 1) / total], [0, 1]);
  const pastille = useTransform(progression, [debut, debut + 0.02], [0, 1]);
  const couleur = accent ? "bg-accent" : "bg-foreground";

  // Mouvement réduit : traits pleins et pastilles allumées par le CSS (motion-reduce:), qui l'emporte sur le style
  // posé par Motion grâce au "!". Le HTML reste identique entre serveur et navigateur.
  return (
    <>
      <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-border" />
      <motion.span
        aria-hidden
        style={{ scaleX: remplissage }}
        className={`absolute inset-x-0 top-0 h-0.5 origin-left motion-reduce:transform-none! ${couleur}`}
      />
      <span aria-hidden className="absolute -top-[5px] left-0 size-3 rounded-md bg-border" />
      <motion.span
        aria-hidden
        style={{ opacity: pastille }}
        className={`absolute -top-[5px] left-0 size-3 rounded-md motion-reduce:opacity-100! ${couleur}`}
      />
    </>
  );
}
