"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Segments from "@/components/Segments";

const tons = ["cordial", "neutre", "ferme"] as const;
type TonRelance = (typeof tons)[number];

export default function ChoixTon() {
  const t = useTranslations("Ton");
  const noms = useTranslations("Tons");
  const [ton, setTon] = useState<TonRelance>("cordial");

  return (
    <>
      <Segments
        name="ton"
        label={t("groupe")}
        options={tons.map((value) => ({ value, label: noms(value) }))}
        value={ton}
        onChange={setTon}
        className="mb-6 bg-background text-[15px]"
      />
      <div className="overflow-hidden rounded-md border border-border bg-paper text-left">
        <div className="grid gap-1.5 border-b border-rule px-5 py-3.5 text-sm">
          <div><span className="inline-block w-14 text-muted">{t("de")}</span>Léa Martin</div>
          <div><span className="inline-block w-14 text-muted">{t("a")}</span>{t("destinataire")}</div>
          <div><span className="inline-block w-14 text-muted">{t("objet")}</span><span className="font-medium">{t(`messages.${ton}.subject`)}</span></div>
        </div>
        <div className="grid min-h-[220px] gap-3 px-5 py-[22px] leading-[1.55]">
          {(t.raw(`messages.${ton}.body`) as string[]).map((p) => <p key={p}>{p}</p>)}
          <div>
            <span className="inline-flex h-10 items-center rounded-md bg-accent px-4 text-sm font-semibold text-on-accent">{t("regler")}</span>
          </div>
        </div>
        <div className="border-t border-rule px-5 py-2.5 font-mono text-[13px] text-muted">{t(`messages.${ton}.meta`)}</div>
      </div>
    </>
  );
}
