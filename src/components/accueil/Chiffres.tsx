import { useTranslations } from "next-intl";
import RetardCorrige from "./RetardCorrige";

const valeur = "whitespace-nowrap font-mono text-[clamp(28px,4.4vw,52px)] font-medium tracking-[-0.03em] tabular-nums";

function Ligne({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <span className="basis-full text-[clamp(15px,1.5vw,18px)] wide:flex-none wide:basis-auto">{label}</span>
      <span aria-hidden className="hidden min-w-5 flex-1 -translate-y-1.5 border-b-2 border-dotted border-border wide:block" />
      <span className={valeur}>{children}</span>
    </div>
  );
}

export default function Chiffres() {
  const t = useTranslations("Chiffres");

  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto grid max-w-page gap-[18px] px-5 py-[clamp(28px,4vw,44px)]">
        <Ligne label={t("retard")}>
          <RetardCorrige avant={t("retardAvant")} apres={t("retardApres")} />
        </Ligne>
        <Ligne label={t("relances")}>0</Ligne>
        <p className="mt-1 text-[13px] text-muted">{t("note")}</p>
      </div>
    </section>
  );
}
