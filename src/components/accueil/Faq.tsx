import { useTranslations } from "next-intl";
import { faq } from "@/data/faq";

// Version statique : toutes les questions, la première ouverte. L'accordéon arrive en phase 3.
export default function Faq() {
  const t = useTranslations("Faq");

  return (
    <section id="faq" className="scroll-mt-16 border-t border-border">
      <div className="mx-auto flex max-w-page flex-wrap items-start gap-x-16 gap-y-8 px-5 py-[clamp(72px,10vw,120px)]">
        <h2 className="flex-[1_1_280px] font-display text-title font-semibold wide:sticky wide:top-24">{t("title")}</h2>
        <div className="min-w-0 flex-[2_1_520px] border-t border-border">
          {faq.map((cle, i) => (
            <div key={cle} className="border-b border-border">
              <h3 className="flex items-center justify-between gap-4 py-[22px] text-lg leading-[1.35] font-medium">
                <span>{t(`${cle}.q`)}</span>
                <span aria-hidden className="flex size-7 flex-none items-center justify-center rounded-md border border-border font-mono">
                  {i === 0 ? "−" : "+"}
                </span>
              </h3>
              {i === 0 && <p className="max-w-[62ch] pr-11 pb-6 leading-[1.6] text-muted">{t(`${cle}.r`)}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
