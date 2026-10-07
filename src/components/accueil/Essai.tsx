import { useTranslations } from "next-intl";
import FormulaireEssai from "./FormulaireEssai";

export default function Essai() {
  const t = useTranslations("Essai");

  return (
    <section id="essai" className="mx-auto max-w-page scroll-mt-16 px-5 pb-[clamp(72px,10vw,120px)]">
      <div className="relative flex flex-wrap items-end justify-between gap-10 rounded-md border border-border bg-surface p-[clamp(32px,6vw,72px)]">
        <div className="flex-[1_1_380px]">
          <h2 className="mb-4 text-balance font-display text-[clamp(34px,4.6vw,60px)] leading-[1.02] font-semibold tracking-[-0.035em]">{t("title")}</h2>
          <p className="text-[17px] text-muted">{t("note")}</p>
        </div>
        <FormulaireEssai />
      </div>
    </section>
  );
}
