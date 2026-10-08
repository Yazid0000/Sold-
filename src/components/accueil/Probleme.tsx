import { useTranslations } from "next-intl";
import Brouillon from "./Brouillon";

export default function Probleme() {
  const t = useTranslations("Probleme");
  const lignes = [...(t.raw("brouillons") as string[]), t("debut")];

  return (
    <section className="mx-auto max-w-page px-5 py-section">
      <h2 className="mb-5 max-w-[16ch] text-balance font-display text-title font-semibold">{t("title")}</h2>
      <p className="mb-12 max-w-[52ch] text-pretty text-lg leading-[1.55] text-muted">{t("lead")}</p>
      <div className="ml-auto max-w-[720px] overflow-hidden rounded-md border border-border bg-surface">
        <div className="grid gap-1.5 border-b border-rule px-5 py-3.5 text-sm">
          <div><span className="inline-block w-14 text-muted">{t("a")}</span>compta@atelier-morel.fr</div>
          <div><span className="inline-block w-14 text-muted">{t("objet")}</span>{t("sujet")}</div>
        </div>
        <Brouillon lignes={lignes} />
        <div className="border-t border-rule px-5 py-2.5 font-mono text-[13px] text-muted">{t("meta")}</div>
      </div>
    </section>
  );
}
