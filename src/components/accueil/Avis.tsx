import { useTranslations } from "next-intl";
import { avis } from "@/data/avis";

export default function Avis() {
  const t = useTranslations("Avis");

  return (
    <section className="mx-auto max-w-page px-5 py-section">
      <h2 className="mb-10 font-display text-title font-semibold">{t("title")}</h2>
      <div className="border-t border-border">
        {avis.map((a) => (
          <figure key={a.id} className="flex flex-wrap items-baseline gap-x-8 gap-y-4 border-b border-border py-7">
            <blockquote className="flex-[1_1_480px] font-display text-[clamp(19px,2.2vw,26px)] leading-[1.35] tracking-[-0.01em]">
              {t(`${a.id}.texte`)}
            </blockquote>
            <figcaption className="flex flex-[0_0_240px] items-center gap-3">
              <span className="flex size-10 flex-none items-center justify-center rounded-md bg-soft text-sm font-semibold text-accent">{a.initiales}</span>
              <span className="text-sm leading-[1.4]">
                <strong className="font-semibold">{a.prenom}</strong>
                <br />
                <span className="text-muted">{t(`${a.id}.role`)}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
