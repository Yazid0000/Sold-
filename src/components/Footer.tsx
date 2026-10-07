import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import ThemeToggle from "./ThemeToggle";

// chemin : la page actuelle, pour que FR/EN mène à la même page dans l'autre langue.
// Link de Next (pas celui de next-intl, qui ajouterait /fr puis redirigerait) + getPathname pour l'adresse.
export default function Footer({ chemin }: { chemin: "/" | "/tarifs" }) {
  const t = useTranslations("Footer");
  const locale = useLocale();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-x-10 gap-y-6 px-5 py-10">
        <div className="flex flex-wrap items-baseline gap-x-7 gap-y-3">
          <span className="font-display text-xl font-bold tracking-[-0.02em]">Soldé</span>
          <span className="text-sm text-muted">{t("demo")}</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <nav aria-label={t("langue")} className="inline-flex gap-0.5 rounded-md border border-border p-[3px]">
            {routing.locales.map((code) => (
              <Link
                key={code}
                href={getPathname({ href: chemin, locale: code })}
                hrefLang={code}
                aria-current={code === locale ? "true" : undefined}
                className="flex h-10 min-w-11 items-center justify-center rounded-md px-2.5 font-mono text-[13px] font-medium uppercase text-foreground no-underline hover:text-foreground aria-[current=true]:bg-foreground aria-[current=true]:text-background"
              >
                {code}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
