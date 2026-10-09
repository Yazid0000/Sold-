import { useTranslations } from "next-intl";
import RecuEssai from "@/components/RecuEssai";

export default function Garantie() {
  const t = useTranslations("Tarifs.garantie");

  return (
    <section className="mx-auto max-w-page px-5 pb-[clamp(64px,9vw,112px)]">
      <div className="flex flex-wrap items-center gap-x-16 gap-y-8 border-t border-border pt-[clamp(40px,6vw,64px)]">
        <div className="flex-[1_1_400px]">
          <h2 className="mb-3.5 text-balance font-display text-[clamp(28px,3.4vw,42px)] leading-[1.08] font-semibold tracking-[-0.03em]">{t("title")}</h2>
          <p className="max-w-[48ch] text-[17px] leading-[1.55] text-muted">{t("text")}</p>
        </div>
        <RecuEssai paye chute="animate-tampon-retard" className="min-w-[260px] flex-[0_1_340px]" />
      </div>
    </section>
  );
}
