import { useTranslations } from "next-intl";
import SimulateurCalcul from "./SimulateurCalcul";

export default function Simulateur() {
  const t = useTranslations("Simulateur");

  return (
    <section className="mx-auto flex max-w-page flex-wrap items-center gap-[clamp(32px,6vw,72px)] px-5 py-section">
      <SimulateurCalcul>
        <h2 className="mb-4 text-balance font-display text-title font-semibold">{t("title")}</h2>
        <p className="mb-10 max-w-[44ch] text-[17px] leading-[1.55] text-muted">{t("lead")}</p>
      </SimulateurCalcul>
    </section>
  );
}
