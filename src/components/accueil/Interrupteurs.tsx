"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const relances = [
  { jour: "j1", canal: "email" },
  { jour: "j7", canal: "whatsapp" },
  { jour: "j15", canal: "email" },
] as const;

export default function Interrupteurs() {
  const jours = useTranslations("Jours");
  const canaux = useTranslations("Canaux");
  const [actives, setActives] = useState([true, true, true]);

  return (
    <div className="grid flex-[1_1_220px] gap-2 text-sm">
      {relances.map((r, i) => (
        <button
          key={r.jour}
          type="button"
          role="switch"
          aria-checked={actives[i]}
          onClick={() => setActives(actives.map((a, j) => (j === i ? !a : a)))}
          className="group flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-md border border-border bg-background px-3 py-2 text-left"
        >
          <span><span className="inline-block w-11 font-mono">{jours(r.jour)}</span>{canaux(r.canal)}</span>
          <span aria-hidden className="relative h-5 w-[34px] flex-none rounded-md bg-border transition-colors duration-200 group-aria-checked:bg-accent">
            <span className="absolute top-[3px] left-[3px] size-3.5 rounded-sm bg-surface transition-transform duration-200 group-aria-checked:translate-x-3.5" />
          </span>
        </button>
      ))}
    </div>
  );
}
