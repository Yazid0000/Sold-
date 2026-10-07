import { useTranslations } from "next-intl";

const tons = ["cordial", "neutre", "ferme"] as const;
const choisi = "cordial";

export default function Ton() {
  const t = useTranslations("Ton");
  const noms = useTranslations("Tons");
  const message = `messages.${choisi}` as const;

  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-[760px] px-5 py-[clamp(72px,10vw,120px)] text-center">
        <h2 className="mb-4 font-display text-[clamp(32px,4.4vw,56px)] leading-[1.05] font-semibold tracking-[-0.03em]">{t("title")}</h2>
        <p className="mx-auto mb-9 max-w-[46ch] text-pretty text-lg leading-[1.55] text-muted">{t("lead")}</p>
        <div role="radiogroup" aria-label={t("groupe")} className="mb-6 inline-flex gap-1 rounded-md border border-border bg-background p-1">
          {tons.map((ton) => (
            <button
              key={ton}
              type="button"
              role="radio"
              aria-checked={ton === choisi}
              className="h-11 rounded-md px-[18px] text-[15px] font-medium aria-checked:bg-foreground aria-checked:text-background"
            >
              {noms(ton)}
            </button>
          ))}
        </div>
        <div className="overflow-hidden rounded-md border border-border bg-paper text-left">
          <div className="grid gap-1.5 border-b border-rule px-5 py-3.5 text-sm">
            <div><span className="inline-block w-14 text-muted">{t("de")}</span>Léa Martin</div>
            <div><span className="inline-block w-14 text-muted">{t("a")}</span>{t("destinataire")}</div>
            <div><span className="inline-block w-14 text-muted">{t("objet")}</span><span className="font-medium">{t(`${message}.subject`)}</span></div>
          </div>
          <div className="grid min-h-[220px] gap-3 px-5 py-[22px] leading-[1.55]">
            {(t.raw(`${message}.body`) as string[]).map((p) => <p key={p}>{p}</p>)}
            <div>
              <span className="inline-flex h-10 items-center rounded-md bg-accent px-4 text-sm font-semibold text-on-accent">{t("regler")}</span>
            </div>
          </div>
          <div className="border-t border-rule px-5 py-2.5 font-mono text-[13px] text-muted">{t(`${message}.meta`)}</div>
        </div>
      </div>
    </section>
  );
}
