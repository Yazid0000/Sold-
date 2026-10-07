import { useFormatter, useTranslations } from "next-intl";

// Hypothèses de la maquette : 4 factures sur 10 en retard, 12 jours de retard (3 avec Soldé),
// 2 relances par retard, 12 minutes par relance.
export function simuler(factures: number, montant: number) {
  const enRetard = factures * montant * 0.4;
  return {
    dortSans: (enRetard * 12) / 30,
    dortAvec: (enRetard * 3) / 30,
    minutes: Math.round(factures * 0.4 * 2 * 12),
  };
}

const FACTURES = 12;
const MONTANT = 1800;

export default function Simulateur() {
  const t = useTranslations("Simulateur");
  const format = useFormatter();
  const euros = (v: number) => format.number(v, { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  const { dortSans, dortAvec, minutes } = simuler(FACTURES, MONTANT);
  const temps =
    minutes >= 60
      ? t("heures", { h: Math.floor(minutes / 60), m: String(minutes % 60).padStart(2, "0") })
      : t("minutes", { m: minutes });

  const curseur = "h-7 w-full accent-accent";
  const label = "flex justify-between gap-3 font-medium";

  return (
    <section className="mx-auto flex max-w-page flex-wrap items-center gap-[clamp(32px,6vw,72px)] px-5 py-section">
      <div className="min-w-0 flex-[1_1_420px]">
        <h2 className="mb-4 text-balance font-display text-title font-semibold">{t("title")}</h2>
        <p className="mb-10 max-w-[44ch] text-[17px] leading-[1.55] text-muted">{t("lead")}</p>
        <div className="grid gap-8">
          <label className="grid gap-3">
            <span className={label}><span>{t("factures")}</span><span className="font-mono tabular-nums">{FACTURES}</span></span>
            <input type="range" min={1} max={60} step={1} defaultValue={FACTURES} className={curseur} />
          </label>
          <label className="grid gap-3">
            <span className={label}><span>{t("montant")}</span><span className="font-mono tabular-nums">{euros(MONTANT)}</span></span>
            <input type="range" min={100} max={10000} step={100} defaultValue={MONTANT} className={curseur} />
          </label>
        </div>
      </div>
      <div className="min-w-0 flex-[1_1_380px] rounded-md border border-border bg-surface p-[clamp(24px,3vw,36px)] font-mono tabular-nums">
        <div className="mb-2 font-sans text-[15px] text-muted">{t("dort")}</div>
        <div className="text-[clamp(40px,5.5vw,64px)] leading-none font-medium tracking-[-0.04em]">{euros(dortSans)}</div>
        <div className="mt-3 mb-7 font-sans text-[15px]">
          {t("avecSolde")} <span className="font-mono font-semibold text-accent">{euros(dortAvec)}</span>
        </div>
        <div className="flex items-baseline justify-between gap-3 border-t border-dashed border-border pt-6">
          <span className="font-sans text-[15px] text-muted">{t("temps")}</span>
          <span className="text-[28px] font-medium">{temps}</span>
        </div>
        <p className="mt-6 font-sans text-[12.5px] leading-normal text-muted">{t("hypotheses")}</p>
      </div>
    </section>
  );
}
