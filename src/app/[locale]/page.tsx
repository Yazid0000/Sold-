import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import ThemeToggle from "@/components/ThemeToggle";

// Page provisoire de la phase 1 : vitrine du design system, remplacée en phase 2.
const couleurs = [
  "background", "surface", "border", "foreground", "muted", "accent", "accent-hover",
  "on-accent", "late", "late-soft", "soft", "paper", "rule", "ink-card",
];

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale(use(params).locale);
  const t = useTranslations("Hero");

  return (
    <main className="mx-auto grid max-w-page gap-10 px-5 py-section">
      <h1 className="max-w-[16ch] font-display text-display font-semibold">{t("title")}</h1>
      <p className="max-w-[34ch] text-xl text-muted">{t("lead")}</p>
      <p className="font-mono text-2xl tabular-nums">2 480,00 €</p>
      <div className="flex flex-wrap items-center gap-4">
        <a
          href="#"
          className="inline-flex h-13 items-center rounded-md bg-accent px-6.5 text-[17px] font-semibold text-on-accent no-underline hover:bg-accent-hover hover:text-on-accent"
        >
          {t("cta")}
        </a>
        <ThemeToggle />
      </div>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3 font-mono text-xs">
        {couleurs.map((c) => (
          <li key={c} className="grid gap-2">
            <span className="h-14 rounded-md border border-border" style={{ background: `var(--color-${c})` }} />
            {c}
          </li>
        ))}
      </ul>
    </main>
  );
}
