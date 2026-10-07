import { useFormatter, useTranslations } from "next-intl";

const lignes = [
  { cle: "ligne1", montant: 1920 },
  { cle: "ligne2", montant: 560 },
] as const;

export default function Hero() {
  const t = useTranslations("Hero");
  const jours = useTranslations("Jours");
  const format = useFormatter();
  const decimales = { minimumFractionDigits: 2, maximumFractionDigits: 2 };

  const relances = [
    { jour: jours("j1"), canal: t("relance1"), etat: t("envoye") },
    { jour: jours("j7"), canal: t("relance2"), etat: t("prevu") },
    { jour: jours("j15"), canal: t("relance3"), etat: t("prevu") },
  ];

  return (
    <section className="mx-auto flex max-w-page flex-wrap items-center gap-[clamp(40px,6vw,80px)] px-5 pt-[clamp(32px,5vw,64px)] pb-[clamp(48px,6vw,72px)]">
      <div className="min-w-0 flex-[1_1_440px]">
        <h1 className="mb-6 text-balance font-display text-display font-semibold">{t("title")}</h1>
        <p className="mb-8 max-w-[34ch] text-pretty text-[clamp(17px,1.6vw,20px)] leading-normal text-muted">{t("lead")}</p>
        <div className="flex flex-col items-start gap-3.5">
          <a
            href="#essai"
            className="inline-flex h-13 items-center whitespace-nowrap rounded-md bg-accent px-6.5 text-[17px] font-semibold text-on-accent no-underline hover:bg-accent-hover hover:text-on-accent"
          >
            {t("cta")}
          </a>
          <span className="text-sm text-muted">{t("note")}</span>
        </div>
      </div>

      <div className="relative min-w-0 max-w-[520px] flex-[1_1_380px] pt-10">
        <div aria-hidden className="absolute top-0 right-[2%] left-[8%] h-[300px] rotate-4 rounded-md border border-border bg-surface p-5 shadow-[0_1px_0_var(--color-border)]">
          <div className="flex justify-between text-[13px] text-muted"><span>Studio Bléone</span><span className="font-mono">2026-038</span></div>
        </div>
        <div aria-hidden className="absolute top-3.5 right-[6%] left-[3%] h-[300px] -rotate-[2.5deg] rounded-md border border-border bg-surface p-5">
          <div className="flex justify-between text-[13px] text-muted"><span>Maison Ferrand</span><span className="font-mono">2026-039</span></div>
        </div>

        <div className="relative rounded-md border border-border bg-surface p-6 shadow-[0_18px_40px_-24px_rgba(40,36,24,.35)]">
          <div className="mb-5 flex min-h-11 items-start justify-between gap-3">
            <div>
              <div className="font-display text-lg font-semibold">Atelier Morel</div>
              <div className="mt-1 text-[13px] text-muted">{t("echeance")}</div>
            </div>
            <span className="flex-none rounded-md bg-late-soft px-[9px] py-[5px] text-[13px] font-semibold text-late">{t("retard")}</span>
          </div>
          <div className="border-t border-rule font-mono text-sm tabular-nums">
            {lignes.map(({ cle, montant }) => (
              <div key={cle} className="flex justify-between gap-3 border-b border-rule py-2.5">
                <span className="font-sans text-muted">{t(cle)}</span>
                <span>{format.number(montant, decimales)}</span>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-3 pt-3.5 pb-1">
              <span className="font-sans font-medium">{t("total")}</span>
              <span className="text-2xl font-semibold">{format.number(2480, { style: "currency", currency: "EUR" })}</span>
            </div>
          </div>
          <ul className="mt-[18px] grid gap-2 border-t border-dashed border-border pt-3.5 text-[13px]">
            {relances.map((r) => (
              <li key={r.jour} className="flex justify-between gap-2">
                <span><span className="inline-block w-11 font-mono text-muted">{r.jour}</span>{r.canal}</span>
                <span className="text-muted">{r.etat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
