import { useTranslations } from "next-intl";

// Version statique : le formulaire n'envoie rien. La Server Action Resend arrive en phase 5.
export default function Essai() {
  const t = useTranslations("Essai");

  return (
    <section id="essai" className="mx-auto max-w-page scroll-mt-16 px-5 pb-[clamp(72px,10vw,120px)]">
      <div className="flex flex-wrap items-end justify-between gap-10 rounded-md border border-border bg-surface p-[clamp(32px,6vw,72px)]">
        <div className="flex-[1_1_380px]">
          <h2 className="mb-4 text-balance font-display text-[clamp(34px,4.6vw,60px)] leading-[1.02] font-semibold tracking-[-0.035em]">{t("title")}</h2>
          <p className="text-[17px] text-muted">{t("note")}</p>
        </div>
        <form className="grid flex-[1_1_400px] gap-2">
          <label htmlFor="email" className="text-sm font-medium">{t("label")}</label>
          <div className="flex flex-wrap gap-2.5">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              aria-describedby="email-aide"
              className="h-13 min-w-0 flex-[1_1_220px] rounded-md border border-border bg-background px-3.5 text-base"
            />
            <button
              type="submit"
              className="h-13 flex-none cursor-pointer whitespace-nowrap rounded-md bg-accent px-[22px] text-base font-semibold text-on-accent hover:bg-accent-hover"
            >
              {t("bouton")}
            </button>
          </div>
          <p id="email-aide" className="text-sm text-muted">{t("aide")}</p>
        </form>
      </div>
    </section>
  );
}
