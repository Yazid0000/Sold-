import { useTranslations } from "next-intl";
import FactureHero from "./FactureHero";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="mx-auto flex max-w-page flex-wrap items-center gap-[clamp(40px,6vw,80px)] px-5 pt-[clamp(32px,5vw,64px)] pb-[clamp(48px,6vw,72px)]">
      <div className="min-w-0 flex-[1_1_440px] animate-monte">
        <h1 className="mb-6 text-balance font-display text-display font-semibold">{t("title")}</h1>
        <p className="mb-8 max-w-[34ch] text-pretty text-[clamp(17px,1.6vw,20px)] leading-normal text-muted">{t("lead")}</p>
        <div className="flex flex-col items-start gap-3.5">
          <a
            href="#essai"
            className="inline-flex h-13 items-center whitespace-nowrap rounded-md bg-accent px-6.5 text-[17px] font-semibold text-on-accent no-underline transition-colors hover:bg-accent-hover hover:text-on-accent"
          >
            {t("cta")}
          </a>
          <span className="text-sm text-muted">{t("note")}</span>
        </div>
      </div>
      <FactureHero />
    </section>
  );
}
