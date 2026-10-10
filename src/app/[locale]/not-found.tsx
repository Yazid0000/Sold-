import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Introuvable() {
  const t = useTranslations("Introuvable");

  return (
    <>
      <Header page="accueil" />
      <main className="mx-auto grid min-h-[60vh] max-w-page content-center gap-6 px-5 py-section">
        <p className="font-mono text-sm text-muted">{t("facture")}</p>
        <h1 className="max-w-[18ch] text-balance font-display text-title font-semibold">{t("title")}</h1>
        <p className="max-w-[46ch] text-lg leading-normal text-muted">{t("text")}</p>
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-self-start rounded-md bg-accent px-5 text-[15px] font-semibold text-on-accent no-underline hover:bg-accent-hover hover:text-on-accent"
        >
          {t("retour")}
        </Link>
      </main>
      <Footer chemin="/" />
    </>
  );
}
