import { useFormatter, useTranslations } from "next-intl";

function Etape({ quand, titre, texte, accent = false, children }: {
  quand: string; titre: string; texte: string; accent?: boolean; children: React.ReactNode;
}) {
  return (
    <li className={`relative border-t-2 pb-10 ${accent ? "border-accent" : "border-foreground"}`}>
      <span aria-hidden className={`absolute -top-[7px] left-0 size-3 rounded-md ${accent ? "bg-accent" : "bg-foreground"}`} />
      <div className={`mt-6 mb-2.5 font-mono text-sm ${accent ? "text-accent" : "text-muted"}`}>{quand}</div>
      <h3 className="mb-2.5 font-display text-2xl font-semibold">{titre}</h3>
      <p className="mb-5 leading-normal text-muted">{texte}</p>
      {children}
    </li>
  );
}

export default function Fonctionnement() {
  const t = useTranslations("Fonctionnement");
  const jours = useTranslations("Jours");
  const canaux = useTranslations("Canaux");
  const tons = useTranslations("Tons");
  const format = useFormatter();

  const calendrier = [
    { jour: jours("j1"), canal: canaux("email"), ton: tons("cordial") },
    { jour: jours("j7"), canal: canaux("whatsapp"), ton: tons("neutre") },
    { jour: jours("j15"), canal: canaux("email"), ton: tons("ferme") },
  ];

  return (
    <section id="fonctionnement" className="scroll-mt-16 border-y border-border bg-surface">
      <div className="mx-auto max-w-page px-5 py-[clamp(72px,10vw,120px)]">
        <div className="mb-4 font-mono text-xs tracking-[.14em] text-muted uppercase">{t("eyebrow")}</div>
        <h2 className="mb-14 max-w-[20ch] text-balance font-display text-title font-semibold">{t("title")}</h2>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-x-8">
          <Etape quand={t("etape1.quand")} titre={t("etape1.title")} texte={t("etape1.text")}>
            <div className="flex flex-wrap gap-2 text-[13px]">
              {(t.raw("etape1.sources") as string[]).map((s) => (
                <span key={s} className="rounded-md border border-border bg-background px-2.5 py-1.5">{s}</span>
              ))}
            </div>
          </Etape>
          <Etape quand={t("etape2.quand")} titre={t("etape2.title")} texte={t("etape2.text")}>
            <ul className="rounded-md border border-border bg-background text-[13px]">
              {calendrier.map((c) => (
                <li key={c.jour} className="flex justify-between border-b border-border px-3 py-2 last:border-b-0">
                  <span><span className="inline-block w-11 font-mono">{c.jour}</span>{c.canal}</span>
                  <span className="text-muted">{c.ton}</span>
                </li>
              ))}
            </ul>
          </Etape>
          <Etape quand={t("etape3.quand")} titre={t("etape3.title")} texte={t("etape3.text")} accent>
            <div className="flex items-center justify-between gap-3 rounded-md border border-border bg-soft px-3.5 py-3 text-sm">
              <span>{t("etape3.virement")}</span>
              <span className="font-mono font-semibold text-accent tabular-nums">
                {format.number(2480, { style: "currency", currency: "EUR", signDisplay: "always" })}
              </span>
            </div>
          </Etape>
        </ol>
      </div>
    </section>
  );
}
