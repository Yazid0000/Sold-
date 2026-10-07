import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import GrilleFormules from "./GrilleFormules";

export default function Formules() {
  const t = useTranslations("Formules");

  return (
    <section id="tarifs" className="mx-auto max-w-page px-5 pb-section">
      <div className="mb-4 font-mono text-xs tracking-[.14em] text-muted uppercase">{t("eyebrow")}</div>
      <GrilleFormules>
        <h2 className="max-w-[18ch] text-balance font-display text-title font-semibold">{t("title")}</h2>
      </GrilleFormules>
      <p className="mt-6 text-[15px]">
        <Link href="/tarifs" className="underline-offset-[3px]">{t("comparer")}</Link>
      </p>
    </section>
  );
}
