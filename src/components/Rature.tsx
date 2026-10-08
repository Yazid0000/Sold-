"use client";

import { motion } from "motion/react";

// scaleX plutôt que la largeur : une transformation ne force pas le navigateur à recalculer la mise en page,
// le trait reste fluide même sur un téléphone.
export default function Rature({ barre, children }: { barre: boolean; children: React.ReactNode }) {
  return (
    <span className="relative">
      {children}
      <motion.span
        aria-hidden
        className="absolute inset-x-0 top-[52%] h-0.5 origin-left bg-current"
        initial={false}
        animate={{ scaleX: barre ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
      />
    </span>
  );
}
