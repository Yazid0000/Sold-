"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import Rature from "@/components/Rature";

// "12 j → 3 j" : à l'arrivée à l'écran, le 12 j se fait rayer, puis le 3 j apparaît.
// Le déclencheur est "vu" et jamais le réglage de mouvement réduit : le serveur ne connaît pas ce réglage,
// le premier affichage doit être le même des deux côtés (sinon erreur d'hydratation).
export default function RetardCorrige({ avant, apres }: { avant: string; apres: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const vu = useInView(ref, { once: true, amount: 0.8 });
  const reduit = useReducedMotion();

  return (
    <span ref={ref}>
      <span className="text-muted"><Rature barre={vu}>{avant}</Rature></span>
      <motion.span initial={false} animate={{ opacity: vu ? 1 : 0 }} transition={reduit ? { duration: 0 } : { duration: 0.3, delay: 0.35 }}>
        {" → "}
        <span className="text-accent">{apres}</span>
      </motion.span>
    </span>
  );
}
