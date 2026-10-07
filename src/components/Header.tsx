import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Header({ page }: { page: "accueil" | "tarifs" }) {
  const t = useTranslations("Nav");
  const lien = "text-foreground no-underline hover:text-accent";

  return (
    <header className={`border-b border-border bg-background ${page === "accueil" ? "sticky top-0 z-10" : ""}`}>
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-4 px-5">
        <Link href="/" className="font-display text-[22px] font-bold tracking-[-0.02em] text-foreground no-underline hover:text-foreground">
          Soldé
        </Link>
        <nav className="hidden gap-7 text-[15px] wide:flex">
          <Link href="/#fonctionnement" className={lien}>{t("fonctionnement")}</Link>
          <Link
            href="/tarifs"
            aria-current={page === "tarifs" ? "page" : undefined}
            className={`${lien} aria-[current=page]:underline aria-[current=page]:underline-offset-[6px]`}
          >
            {t("tarifs")}
          </Link>
          <Link href="/#faq" className={lien}>{t("faq")}</Link>
        </nav>
        <Link
          href="/#essai"
          className="inline-flex h-10 items-center whitespace-nowrap rounded-md bg-accent px-4 text-sm font-semibold text-on-accent no-underline hover:bg-accent-hover hover:text-on-accent"
        >
          {t("cta")}
        </Link>
      </div>
    </header>
  );
}
