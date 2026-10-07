import { useFormatter, useTranslations } from "next-intl";
import Tampon from "@/components/Tampon";

export default function Garantie() {
  const t = useTranslations("Tarifs.garantie");
  const format = useFormatter();

  return (
    <section className="mx-auto max-w-page px-5 pb-[clamp(64px,9vw,112px)]">
      <div className="flex flex-wrap items-center gap-x-16 gap-y-8 border-t border-border pt-[clamp(40px,6vw,64px)]">
        <div className="flex-[1_1_400px]">
          <h2 className="mb-3.5 text-balance font-display text-[clamp(28px,3.4vw,42px)] leading-[1.08] font-semibold tracking-[-0.03em]">{t("title")}</h2>
          <p className="max-w-[48ch] text-[17px] leading-[1.55] text-muted">{t("text")}</p>
        </div>
        <div className="relative min-w-[260px] flex-[0_1_340px] rounded-md border border-border bg-surface px-[22px] pt-[22px] pb-[84px]">
          <div className="flex justify-between text-[13px] text-muted"><span>{t("abonnement")}</span><span className="font-mono">{t("essai")}</span></div>
          <div className="mt-[18px] grid gap-2 font-mono text-sm tabular-nums">
            <div className="flex justify-between"><span className="font-sans text-muted">{t("ligne")}</span><span>{format.number(0, { minimumFractionDigits: 2 })}</span></div>
            <div className="flex justify-between border-t border-rule pt-2.5 text-lg font-semibold">
              <span className="font-sans">{t("total")}</span>
              <span>{format.number(0, { style: "currency", currency: "EUR" })}</span>
            </div>
          </div>
          <Tampon
            label={t("tampon")}
            className="absolute right-[22px] bottom-[18px] -rotate-9 border-[2.5px] px-3 py-[5px] text-2xl opacity-95 shadow-[inset_0_0_0_1.5px_var(--color-surface),inset_0_0_0_3.5px_var(--color-accent)]"
          />
        </div>
      </div>
    </section>
  );
}
