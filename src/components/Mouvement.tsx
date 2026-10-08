"use client";

import { MotionConfig } from "motion/react";

// reducedMotion="user" : si le visiteur a demandé moins d'animations à son système,
// Motion saute directement à l'état final de toutes ses transformations.
export default function Mouvement({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
