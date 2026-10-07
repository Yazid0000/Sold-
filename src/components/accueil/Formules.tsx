import { useFormatter, useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { emailDevis, formules } from "@/data/formules";

const annuel = false;

export default function Formules() {
  const t = useTranslations("Formules");
  const locale = useLocale();
  const format = useFormatter();
  // formatToParts découpe "9 €" en morceaux : le chiffre en grand, le symbole € en petit, à sa place selon la langue.
  const prix = (v: number) =>
    new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", minimumFractionDigits: Number.isInteger(v) ? 0 : 2 }).formatToParts(v);
  const euros = (v: number) => format.number(v, { style: "currency", currency: "EUR" });

  const bouton = "mt-auto flex h-12 items-center justify-center whitespace-nowrap rounded-md text-[15px] font-semibold no-underline";
  const contour = `${bouton} border border-foreground text-foreground hover:bg-background hover:text-foreground`;
  const plein = `${bouton} bg-accent text-on-accent hover:bg-accent-hover hover:text-on-accent`;

  return (
    <section id="tarifs" className="mx-auto max-w-page px-5 pb-section">
      <div className="mb-4 font-mono text-xs tracking-[.14em] text-muted uppercase">{t("eyebrow")}</div>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <h2 className="max-w-[18ch] text-balance font-display text-title font-semibold">{t("title")}</h2>
        <div role="radiogroup" aria-label={t("periode")} className="inline-flex gap-1 rounded-md border border-border bg-surface p-1">
          {[false, true].map((a) => (
            <button
              key={String(a)}
              type="button"
              role="radio"
              aria-checked={a === annuel}
              className="h-11 whitespace-nowrap rounded-md px-4 text-sm font-medium aria-checked:bg-foreground aria-checked:text-background"
            >
              {t(a ? "annuel" : "mensuel")}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-stretch gap-4">
        {formules.map((f) => (
          <div
            key={f.id}
            className={`flex flex-col gap-5 rounded-md ${f.miseEnAvant ? "border-2 border-accent bg-soft px-[27px] py-[31px]" : "border border-border bg-surface px-7 py-8"}`}
          >
            <div>
              <h3 className="mb-1.5 font-display text-[22px] font-semibold">{t(`${f.id}.nom`)}</h3>
              <p className="text-[15px] text-muted">{t(`${f.id}.pour`)}</p>
            </div>
            {f.prix ? (
              <div className="font-mono tabular-nums">
                {prix(annuel ? f.prix.annuel : f.prix.mensuel).map((p, i) => (
                  <span key={i} className={p.type === "currency" || p.type === "literal" ? "text-lg" : "text-[44px] font-medium tracking-[-0.04em]"}>
                    {p.value}
                  </span>
                ))}
                <div className="mt-1 font-sans text-[13px] text-muted">
                  {annuel ? t("parAn", { total: euros(f.prix.annuel * 12) }) : t("sansEngagement")}
                </div>
              </div>
            ) : (
              <div>
                <span className="font-display text-4xl leading-[1.2] font-semibold tracking-[-0.02em]">{t("agence.prix")}</span>
                <div className="mt-1 text-[13px] text-muted">{t("agence.note")}</div>
              </div>
            )}
            <ul className="grid gap-2.5 text-[15px] leading-[1.4]">
              {(t.raw(`${f.id}.inclus`) as string[]).map((ligne) => <li key={ligne}>{ligne}</li>)}
            </ul>
            {f.prix ? (
              <a href="#essai" className={f.miseEnAvant ? plein : contour}>{t("essai")}</a>
            ) : (
              <a href={`mailto:${emailDevis}`} className={contour}>{t("devis")}</a>
            )}
          </div>
        ))}
      </div>
      <p className="mt-6 text-[15px]">
        <Link href="/tarifs" className="underline-offset-[3px]">{t("comparer")}</Link>
      </p>
    </section>
  );
}
